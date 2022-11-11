import assert from 'assert'
import { noise } from '@chainsafe/libp2p-noise'
import { mplex } from '@libp2p/mplex'
import { createLibp2p, type Libp2p } from 'libp2p'
import { kadDHT } from '@libp2p/kad-dht'
import { multiaddr, Multiaddr } from '@multiformats/multiaddr'
import { tcp, TCPDialOptions } from '@libp2p/tcp'
import { pipe } from 'it-pipe'

import type { Address, AddressBook, PeerStore } from '@libp2p/interface-peer-store'
import type { Connection } from '@libp2p/interface-connection'
import type { PeerId } from '@libp2p/interface-peer-id'
import type { ConnectionManager } from '@libp2p/interface-connection-manager'

import { dial as dialHelper, DialStatus } from './dialHelper.js'
import { privKeyToPeerId } from './privKeyToPeerId.js'
import { u8aEquals, stringToU8a } from '../u8a/index.js'
import { createRelayerKey } from './relayCode.js'

const TEST_PROTOCOL = '/test'
const TEST_MESSAGE = new TextEncoder().encode('test msg')

const Alice = privKeyToPeerId(stringToU8a('0xcf0b158c5f9d83dabf81a43391cce6cced6d0f912ed7152fc8b67dcdae9db591'))
const Bob = privKeyToPeerId(stringToU8a('0x801f499e287fa0e5ac546a86d7f1e3ca766249f62759e6a1f2c90de6090cc4c0'))
const Chris = privKeyToPeerId(stringToU8a('0x1bbb9a915ddd6e19d0f533da6c0fbe8820541a370110728f647829cd2c91bc79'))

/**
 * Used to annotate libp2p's TCP module to work similarly as `hopr-connect`
 * by using an oracle that knows how to connect to hidden nodes
 */
 async function custom_tcp_dial(ma: Multiaddr, options: TCPDialOptions): Promise<Connection> {
    if (ma.toString().startsWith('/ip4')) {
      return super.dial(ma, options)
    } else if (this.oracle != undefined) {
      const destination = ma.getPeerId() as string
      for (const address of this.oracle.get(destination.toString())?.getTransportManager().getAddrs()) {
        let conn: Connection
        try {
          conn = await super.dial(address, options)
        } catch (err) {
          continue
        }

        if (conn != undefined) {
          return conn
        }
      }
    }
  }

function custom_tcp_filter(multiaddrs: Multiaddr[]): Multiaddr[] {
  return multiaddrs
}

function testDHT() {
  return kadDHT({ protocolPrefix: '/hopr', clientMode: false, pingTimeout: 1e3 })
}

async function getNode(id: PeerId, dht?: any, oracle?: Map<string, Libp2p>): Promise<Libp2p> {
  const mytcp = tcp()
  Object.assign(tcp, {oracle, filter: custom_tcp_filter, dial: custom_tcp_dial })

  const node = await createLibp2p({
    addresses: {
      listen: [multiaddr(`/ip4/0.0.0.0/tcp/0/p2p/${id.toString()}`).toString()]
    },
    peerId: id,
    transports: [mytcp],
    streamMuxers: [mplex()],
    connectionEncryption: [noise()],
    // @ts-ignore
    dht: dht,
    metrics: {
      enabled: false
    },
    nat: {
      enabled: false
    },
    relay: {
      enabled: false
    },
    connectionManager: {
      autoDial: false,
      // Use custom sorting to prevent from problems with libp2p
      // and HOPR's relay addresses
      addressSorter: () => 0
    }
  })

  // Loopback
  node.handle([TEST_PROTOCOL], async ({ stream }) => {
    await pipe(stream.source, stream.sink)
  })

  await node.start()

  return node
}

function getPeerStore(): PeerStore {
  const peerStore = new Map<PeerId, Set<Address>>()

  return {
    addressBook: {
      add: async (peerId: PeerId, multiaddrs: Multiaddr[]): Promise<void> => {
        const addresses = peerStore.get(peerId) ?? new Set<Address>()
        for (const address of multiaddrs) {
          // libp2p type clash
          addresses.add({ multiaddr: address as any, isCertified: true })
        }
        peerStore.set(peerId, addresses)
      },
      get: async (peerId: PeerId): Promise<Address[]> => {
        // Make sure that Typescript does not build unit test if Libp2p API changes.
        const addresses: Set<Address> = peerStore.get(peerId) ?? new Set<Address>()
        const result: Address[] = []
        for (const address of addresses.values()) {
          result.push(address)
        }
        return result
      }
    } as unknown as AddressBook
  } as PeerStore
}

function getConnectionManager(): ConnectionManager {
  const connections = new Map<string, Connection[]>()
  const getConnections = (peer: PeerId) => {
    return connections.get(peer.toString()) ?? []
  }

  return {
    dialer: {
      dial() {
        return Promise.resolve()
      }
    },
    getConnections
  } as any // dialer is not part of interface
}

describe('test dialHelper', function () {
  it('call non-existing', async function () {
    const peerA = await getNode(Alice)

    const result = await dialHelper(peerA, Bob, [TEST_PROTOCOL])

    assert(result.status === DialStatus.NO_DHT)

    // Shutdown node
    await peerA.stop()
  })

  it('regular dial', async function () {
    const peerA = await getNode(Alice)
    const peerB = await getNode(Bob)

    await peerA.peerStore.addressBook.add(peerB.peerId, peerB.getMultiaddrs())

    const result = await dialHelper(peerA, Bob, [TEST_PROTOCOL])

    assert(result.status === DialStatus.SUCCESS)

    pipe([TEST_MESSAGE], result.resp.stream.sink)

    for await (const msg of result.resp.stream.source) {
      assert(u8aEquals(msg.slice(), TEST_MESSAGE))
    }

    // Shutdown nodes
    await Promise.all([peerA.stop(), peerB.stop()])
  })

  it('call non-existing with DHT', async function () {
    const peerA = await getNode(Alice, testDHT())

    const result = await dialHelper(peerA, Bob, [TEST_PROTOCOL])

    assert(result.status === DialStatus.DIAL_ERROR, `Must return dht error`)

    // Shutdown node
    await peerA.stop()
  })

  it('regular dial with DHT', async function () {
    this.timeout(5e3)

    const oracle = new Map<string, Libp2p>()

    const peerB = await getNode(Bob, testDHT())
    const peerC = await getNode(Chris, testDHT())

    // Secretly tell peerA the address of peerC
    // libp2p type clash
    const peerA = await getNode(Alice, testDHT(), oracle)

    oracle.set(Chris.toString(), peerC)

    await peerB.peerStore.addressBook.add(peerA.peerId, peerA.getMultiaddrs())
    await peerA.peerStore.addressBook.add(peerB.peerId, peerB.getMultiaddrs())

    await peerB.peerStore.addressBook.add(peerC.peerId, peerC.getMultiaddrs())
    await peerC.peerStore.addressBook.add(peerB.peerId, peerB.getMultiaddrs())

    await peerA.start()
    await peerB.start()
    await peerC.start()

    await peerA.dial(peerB.peerId)
    await peerC.dial(peerB.peerId)

    await new Promise((resolve) => setTimeout(resolve, 200))

    // libp2p type clash
    await peerB.contentRouting.provide(createRelayerKey(Chris) as any)

    await new Promise((resolve) => setTimeout(resolve, 200))

    let result = await dialHelper(peerA, Chris, [TEST_PROTOCOL])

    assert(result.status === DialStatus.SUCCESS, `Dial must be successful`)

    pipe([TEST_MESSAGE], result.resp.stream.sink)

    for await (const msg of result.resp.stream.source) {
      assert(u8aEquals(msg.slice(), TEST_MESSAGE))
    }

    // Shutdown nodes
    await Promise.all([peerA.stop(), peerB.stop(), peerC.stop()])
  })

  it('DHT does not find any new addresses', async function () {
      const dht = {
          [Symbol.toStringTag]: 'some DHT that is not @libp2p/dummy-dht'
      }
    const peerA = await getNode(Alice, dht)
   Object.assign(peerA, {
     contentRouting: {
          // Returning an empty iterator
          findProviders: () => (async function* () {})()
      },
    connectionManager: getConnectionManager(),
      peerStore: getPeerStore()
    })

    // Try to call Bob but does not exist
    const result = await dialHelper(peerA, Bob, [TEST_PROTOCOL])

    // Must fail with a DHT error because we obviously can't find
    // Bob's relay address in the DHT
    assert(result.status === DialStatus.DIAL_ERROR)
  })

  it('DHT throws an error', async function () {
      const dht = {
          [Symbol.toStringTag]: 'some DHT that is not @libp2p/dummy-dht'
      }
    const peerA = await getNode(Alice, dht)
   Object.assign(peerA, {
      contentRouting: {
          // Returning an empty iterator
          findProviders: () =>
            (async function* () {
              throw Error(`boom`)
            })()
      },
      connectionManager: getConnectionManager(),
      peerStore: getPeerStore()
    })

    const result = await dialHelper(peerA, Bob, [TEST_PROTOCOL])

    assert(result.status === DialStatus.DIAL_ERROR)
  })
})
