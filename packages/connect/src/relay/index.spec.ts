import assert from 'assert'
import EventEmitter from 'events'

import { handshake } from 'it-handshake'
import { multiaddr } from '@multiformats/multiaddr'

import type { HoprConnectTestingOptions } from '../types.js'
import type { PeerId } from '@libp2p/interface-peer-id'
import type { Stream } from '@libp2p/interface-connection'

import { Relay } from './index.js'
import { privKeyToPeerId, stringToU8a, u8aEquals } from '@hoprnet/hopr-utils'
import { createFakeLibp2p, createFakeNetwork } from '../utils/libp2p.mock.spec.js'

import type { ConnectComponents } from '../components.js'

const initiator = privKeyToPeerId(stringToU8a('0xa889bad3e2a31cceff4faccdd374af67db485ac0e05e7e654530aff0da5199f7'))
const relay = privKeyToPeerId(stringToU8a('0xcd1fb76053833d9bb5b3ff243b2d17b96dc5ad7cc09b33c4cf77ba83c297443f'))
const counterparty = privKeyToPeerId(stringToU8a('0x4090ca3740b1fe0f6da22befc4f7cba26389c51808d245dd29a2076fc66103aa'))

function msgToEchoedMessage(message: string): Uint8Array {
  return new TextEncoder().encode(`Echo: <${message}>`)
}

async function onIncomingStream(stream: Stream) {
  const shaker = handshake(stream)
  const message = new TextDecoder().decode(((await shaker.read()) as Uint8Array).slice())

  shaker.write(msgToEchoedMessage(message))
}

/**
 * Creates a minimum instance of ConnectComponents
 * @returns mocked ConnectComponents
 */
function createFakeConnectComponents(): ConnectComponents {
  return {
    getWebRTCUpgrader() {
      const webRTCInstance = new EventEmitter()
      return {
        upgradeOutbound() {
          return webRTCInstance
        },
        upgradeInbound() {
          return webRTCInstance
        }
      } as NonNullable<ConnectComponents['webRTCUpgrader']>
    }
  } as ConnectComponents
}

async function getPeer(
  peerId: PeerId,
  network: ReturnType<typeof createFakeNetwork>,
  port: number,
  testingOptions?: HoprConnectTestingOptions
) {
  const relay = new Relay({ environment: `testingEnvironment` }, testingOptions ?? { __noWebRTCUpgrade: true })

  relay.init(
    await createFakeLibp2p(peerId, network, {
      listeningAddrs: [multiaddr(`/ip4/127.0.0.1/tcp/${port}`)],
      onIncomingStream
    })
  )
  relay.initConnect(createFakeConnectComponents())

  await relay.afterStart()

  return relay
}

describe('test relay', function () {
  it('connect to a relay, close the connection and reconnect', async function () {
    const network = createFakeNetwork()

    const Alice = await getPeer(initiator, network, 1)
    const Bob = await getPeer(relay, network, 2)
    const Charly = await getPeer(counterparty, network, 3)

    await Alice.components
      .peerStore
      .addressBook.add(Bob.components.peerId, Bob.components.getTransportManager().getAddrs())

    await Bob.components
      .peerStore
      .addressBook.add(Charly.components.peerId, Charly.components.getTransportManager().getAddrs())

    for (let i = 0; i < 5; i++) {
      const conn = await Alice.connect(Bob.components.peerId, Charly.components.peerId, () => {})

      assert(conn != undefined, `Should be able to connect`)
      const shaker = handshake(conn as any)

      const msg = '<Hello>, that should be sent and echoed through relayed connection'
      shaker.write(new TextEncoder().encode(msg))

      assert(u8aEquals(((await shaker.read()) as Uint8Array).slice(), msgToEchoedMessage(msg)))

      shaker.rest()

      await conn.close()

      // Let I/O happen
      await new Promise((resolve) => setTimeout(resolve))
    }

    Alice.stop()
    Bob.stop()
    Charly.stop()

    network.stop()
  })

  it('connect to a relay and reconnect', async function () {
    const network = createFakeNetwork()

    const Alice = await getPeer(initiator, network, 1)
    const Bob = await getPeer(relay, network, 2)
    const Charly = await getPeer(counterparty, network, 3)

    await Alice.components
      .peerStore
      .addressBook.add(Bob.components.peerId, Bob.components.getTransportManager().getAddrs())

    await Bob.components
      .peerStore
      .addressBook.add(Charly.components.peerId, Charly.components.getTransportManager().getAddrs())

    for (let i = 0; i < 3; i++) {
      const conn = await Alice.connect(Bob.components.peerId, Charly.components.peerId, () => {})

      assert(conn != undefined, `Should be able to connect`)
      const shaker = handshake(conn as any)

      const msg = '<Hello>, that should be sent and echoed through relayed connection'
      shaker.write(new TextEncoder().encode(msg))

      assert(u8aEquals(((await shaker.read()) as Uint8Array).slice(), msgToEchoedMessage(msg)))

      shaker.rest()

      // Let I/O happen
      await new Promise((resolve) => setTimeout(resolve))
    }

    Alice.stop()
    Bob.stop()
    Charly.stop()

    network.stop()
  })
})
