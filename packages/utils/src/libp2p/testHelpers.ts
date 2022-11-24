import { createLibp2p } from 'libp2p'
import { tcp } from '@libp2p/tcp'
import { mplex } from '@libp2p/mplex'
import { noise } from '@chainsafe/libp2p-noise'
import { kadDHT } from '@libp2p/kad-dht'
import { multiaddr } from '@multiformats/multiaddr'
import { createSecp256k1PeerId } from '@libp2p/peer-id-factory'

import type { Libp2p } from 'libp2p'
import type { PeerId } from '@libp2p/interface-peer-id'
import type { Connection } from '@libp2p/interface-connection'
import type { TCPDialOptions } from '@libp2p/tcp'
import type { Multiaddr } from '@multiformats/multiaddr'

function custom_tcp_filter(multiaddrs: Multiaddr[]): Multiaddr[] {
  return multiaddrs
}

/**
 * Used to annotate libp2p's TCP module to work similarly as `hopr-connect`
 * by using an oracle that knows how to connect to hidden nodes
 */
async function custom_tcp_dial(ma: Multiaddr, options: TCPDialOptions): Promise<Connection> {
  if (ma.toString().startsWith('/ip4')) {
    return this.originalDial(ma, options)
  } else if (this.oracle != undefined) {
    const destination = ma.getPeerId() as string
    for (const address of this.oracle.get(destination.toString())?.getTransportManager().getAddrs()) {
      let conn: Connection
      try {
        conn = await this.originalDial(address, options)
      } catch (err) {
        continue
      }

      if (conn != undefined) {
        return conn
      }
    }
  }
}

/**
 * Creates and starts a minimal libp2p instance
 * @param id peerId of the node to create
 * @returns a started libp2p instance with a DHT
 */
export async function getNode(peerId?: PeerId, dht?: any, oracle?: Map<string, Libp2p>, autoDial?: boolean, components?: any): Promise<Libp2p> {
  peerId ??= await createSecp256k1PeerId()
  dht ??= kadDHT({ clientMode: false, protocolPrefix: '/hopr', pingTimeout: 1e3 })
  autoDial ??= true

  // We overwrite the tcp dial function to be able to use our own oracle. It
  // acts the same if no oracle is defined.
  const mytcp = tcp()
  Object.assign(tcp, { oracle, filter: custom_tcp_filter, dial: custom_tcp_dial, originalDial: mytcp().dial })

  const connectionManager = {
    autoDial
  }

  if (!autoDial) {
    // Use custom sorting to prevent from problems with libp2p
    // and HOPR's relay addresses
    Object.assign(connectionManager, { addressSorter: () => 0 })
  }

  const node = await createLibp2p({
    addresses: {
      listen: [multiaddr(`/ip4/0.0.0.0/tcp/0/p2p/${peerId.toString()}`).toString()]
    },
    peerId,
    transports: [mytcp],
    streamMuxers: [mplex()],
    connectionEncryption: [noise()],
    // @ts-ignore
    dht,
    metrics: {
      enabled: false
    },
    nat: {
      enabled: false
    },
    relay: {
      enabled: false
    },
    connectionManager,
  })

  await node.start()

  // overwrite libp2p components if any are given
  if (components) {
    Object.assign(node, components)
  }

  return node
}
