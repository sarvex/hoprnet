import assert from 'assert'
import { Multiaddr } from '@multiformats/multiaddr'
import { pipe } from 'it-pipe'

import type { Libp2p } from 'libp2p'
import type { Address, AddressBook, PeerStore } from '@libp2p/interface-peer-store'
import type { Connection } from '@libp2p/interface-connection'
import type { PeerId } from '@libp2p/interface-peer-id'
import type { ConnectionManager } from '@libp2p/interface-connection-manager'

import { dial as dialHelper, DialStatus } from './dialHelper.js'
import { privKeyToPeerId } from './privKeyToPeerId.js'
import { u8aEquals, stringToU8a } from '../u8a/index.js'
import { createRelayerKey } from './relayCode.js'
import { getNode } from './testHelpers.js'

const TEST_PROTOCOL = '/test'
const TEST_MESSAGE = new TextEncoder().encode('test msg')

const Alice = privKeyToPeerId(stringToU8a('0xcf0b158c5f9d83dabf81a43391cce6cced6d0f912ed7152fc8b67dcdae9db591'))
const Bob = privKeyToPeerId(stringToU8a('0x801f499e287fa0e5ac546a86d7f1e3ca766249f62759e6a1f2c90de6090cc4c0'))
const Chris = privKeyToPeerId(stringToU8a('0x1bbb9a915ddd6e19d0f533da6c0fbe8820541a370110728f647829cd2c91bc79'))

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
    const peerA = await getNode(Alice)

    const result = await dialHelper(peerA, Bob, [TEST_PROTOCOL])

    assert(result.status === DialStatus.DIAL_ERROR, `Must return dht error`)

    // Shutdown node
    await peerA.stop()
  })

  it('regular dial with DHT', async function () {
    this.timeout(5e3)

    const oracle = new Map<string, Libp2p>()

    const peerB = await getNode(Bob)
    const peerC = await getNode(Chris)

    // Secretly tell peerA the address of peerC
    // libp2p type clash
    const peerA = await getNode(Alice, undefined, oracle)

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
    const components = {
      contentRouting: {
        // Returning an empty iterator
        findProviders: () => (async function* () {})()
      },
      connectionManager: getConnectionManager(),
      peerStore: getPeerStore()
    }

    const peerA = await getNode(Alice, dht, undefined, false, components)

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
    const components = {
      contentRouting: {
        // Returning an empty iterator
        findProviders: () =>
          (async function* () {
            throw Error(`boom`)
          })()
      },
      connectionManager: getConnectionManager(),
      peerStore: getPeerStore()
    }

    const peerA = await getNode(Alice, dht, undefined, false, components)
    const result = await dialHelper(peerA, Bob, [TEST_PROTOCOL])

    assert(result.status === DialStatus.DIAL_ERROR)
  })
})
