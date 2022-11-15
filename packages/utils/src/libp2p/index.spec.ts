import assert from 'assert'
import { peerIdFromString } from '@libp2p/peer-id'
import { createSecp256k1PeerId, createEd25519PeerId } from '@libp2p/peer-id-factory'
import { multiaddr } from '@multiformats/multiaddr'
import { Uint8ArrayList } from 'uint8arraylist'

import type { PeerId } from '@libp2p/interface-peer-id'
import type { Connection, Stream, StreamStat } from '@libp2p/interface-connection'
import type { Components } from '@libp2p/interfaces/components'
import type { StreamHandler, IncomingStreamData } from '@libp2p/interface-registrar'

import { defer, type DeferType } from '../async/index.js'
import { u8aEquals } from '../u8a/index.js'
import {
  isSecp256k1PeerId,
  convertPubKeyFromPeerId,
  convertPubKeyFromB58String,
  hasB58String,
  getB58String,
  libp2pSubscribe,
  libp2pSendMessage,
  type LibP2PHandlerArgs
} from './index.js'

/**
 * Base copied from
 * https://github.com/ChainSafe/lodestar/blob/unstable/packages/beacon-node/test/unit/network/reqresp/utils.ts
 *
 * Useful to simulate a LibP2P stream source emitting prepared bytes
 * and capture the response with a sink accessible via `this.resultChunks`
 */
class MockLibP2pStream implements Stream {
  id = "mock";
  stat = {
    direction: "inbound",
    timeline: {
      open: Date.now(),
    },
  } as StreamStat;
  metadata = {};
  source: Stream["source"];
  sink: Stream["sink"];
  resultChunks: Uint8Array[] = [];

  constructor(source: Stream["source"], sink: Stream["sink"]) {
    this.source = source
    this.sink = sink
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  close: Stream["close"] = () => {};
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  closeRead = (): void => {};
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  closeWrite = (): void => {};
  reset: Stream["reset"] = () => this.close();
  abort: Stream["abort"] = () => this.close();
}

function createStream(source: Stream["source"], sink: Stream["sink"]) {
  return new MockLibP2pStream(source, sink);
}


describe(`test convertPubKeyFromPeerId`, function () {
  it(`should equal to a newly created pubkey from PeerId`, async function () {
    const id = await createSecp256k1PeerId()
    const pubKey = convertPubKeyFromPeerId(id)
    assert(u8aEquals(id.publicKey, pubKey.bytes))
  })
  it(`should equal to pubkey from a PeerId CID`, async function () {
    const testIdB58String = '16Uiu2HAmCPgzWWQWNAn2E3UXx1G3CMzxbPfLr1SFzKqnFjDcbdwg'
    const pubKey = convertPubKeyFromB58String(testIdB58String)
    const id = peerIdFromString(testIdB58String)
    assert(u8aEquals(id.publicKey, pubKey.bytes))
  })
})

describe(`test hasB58String`, function () {
  it(`should return a boolean value`, function () {
    const response = hasB58String('test')
    assert(typeof response === 'boolean')
  })
  it(`should return false to a content w/o a b58string`, function () {
    const response = hasB58String('A random string w/o a b58string')
    assert(response === false)
  })
  it(`should return true to a content w/a b58string`, function () {
    const response = hasB58String('16Uiu2HAmCPgzWWQWNAn2E3UXx1G3CMzxbPfLr1SFzKqnFjDcbdwg')
    assert(response === true)
  })
  it(`should return true to a content w/a b58string`, function () {
    const tweet = `16Uiu2HAkz2s8kLcY7KTSkQBDUmfD8eSgKVnYRt8dLM36jDgZ5Z7d 
@hoprnet
 #HOPRNetwork
    `
    const response = hasB58String(tweet)
    assert(response === true)
  })
})

describe(`test getB58String`, function () {
  it(`should return a string value`, function () {
    const response = getB58String('test')
    assert(typeof response === 'string')
  })
  it(`should return an empty string to a content w/o a b58string`, function () {
    const response = getB58String('A random string w/o a b58string')
    assert(response === '')
  })
  it(`should return the b58string to a content w/a b58string`, function () {
    const response = getB58String('16Uiu2HAmCPgzWWQWNAn2E3UXx1G3CMzxbPfLr1SFzKqnFjDcbdwg')
    assert(response === '16Uiu2HAmCPgzWWQWNAn2E3UXx1G3CMzxbPfLr1SFzKqnFjDcbdwg')
  })
  it(`should return the b58string to a content w/a b58string`, function () {
    const tweet = `16Uiu2HAkz2s8kLcY7KTSkQBDUmfD8eSgKVnYRt8dLM36jDgZ5Z7d 
@hoprnet
 #HOPRNetwork
    `
    const response = getB58String(tweet)
    assert(response === '16Uiu2HAkz2s8kLcY7KTSkQBDUmfD8eSgKVnYRt8dLM36jDgZ5Z7d')
  })
})

function getFakeLibp2p(
  state:
    | {
        msgReceived?: DeferType<void>
        waitUntilSend?: DeferType<void>
      }
    | undefined,
  messages:
    | {
        msgToReceive?: Uint8Array
        msgToReplyWith?: Uint8Array
      }
    | undefined
): Components {
  const stream = createStream(
(async function* (): AsyncIterable<Uint8ArrayList> {
                      state?.waitUntilSend && (await state.waitUntilSend.promise)

                      if (messages.msgToReplyWith) {
                        yield new Uint8ArrayList(messages.msgToReplyWith)
                      }
                    })(),
  async (source: AsyncIterable<Uint8ArrayList>) => {
                      for await (const msg of source) {
                        if (messages?.msgToReceive && u8aEquals(Uint8Array.from(msg.slice()), messages.msgToReceive)) {
                          state?.msgReceived?.resolve()
                        } else {
                          state?.msgReceived?.reject()
                        }

                        await new Promise((resolve) => setTimeout(resolve, 50))
                        state?.waitUntilSend?.resolve()
                      }
                    }
  )
  return {
    getConnectionManager() {
      return {
        getConnections(_peer: PeerId): Connection[] {
          return []
        },
        dialer: {
          dial(destination: PeerId, ..._opts: any[]): Promise<Connection> {
            return Promise.resolve<Connection>({
              newStream: (protocol: string) =>
                Promise.resolve({
                  stream,
                  protocol
                }),
              remotePeer: destination
            } as Connection)
          }
        }
      } as Components['connectionManager']
    },
    getPeerStore() {
      return {
        addressBook: {
          async get(_peer: PeerId) {
            return [
              {
                multiaddr: multiaddr(`/ip4/1.2.3.4/`),
                isCertified: true
              }
            ]
          }
        }
      } as Components['peerStore']
    }
  } as Components
}

describe(`test libp2pSendMessage`, function () {
  it(`send message`, async function () {
    const msgToReceive = new TextEncoder().encode(`This message should be received.`)

    const destination = await createSecp256k1PeerId()
    const msgReceived = defer<void>()

    const libp2pComponents = getFakeLibp2p(
      {
        msgReceived
      },
      {
        msgToReceive
      }
    )

    await libp2pSendMessage(libp2pComponents, destination, ['demo protocol'], msgToReceive, false, {
      timeout: 5000
    })

    await msgReceived.promise
  })
})

describe(`test libp2pSendMessage with response`, function () {
  it(`send message and get response`, async function () {
    const msgToReceive = new TextEncoder().encode(`This message should be received.`)
    const msgToReplyWith = new TextEncoder().encode(`This message should be received.`)

    const destination = await createSecp256k1PeerId()

    const msgReceived = defer<void>()

    const waitUntilSend = defer<void>()

    const libp2pComponents = getFakeLibp2p(
      {
        waitUntilSend,
        msgReceived
      },
      {
        msgToReceive,
        msgToReplyWith
      }
    )

    const results = await Promise.all([
      msgReceived.promise,
      libp2pSendMessage(libp2pComponents, destination, ['demo protocol'], msgToReceive, true, {
        timeout: 5000
      })
    ])

    assert(u8aEquals(results[1][0], msgToReplyWith), `Replied message should match the expected value`)
  })
})

describe(`test libp2pSubscribe`, async function () {
  it(`subscribe and reply`, async function () {
    const msgToReceive = new TextEncoder().encode(`This message should be received.`)
    const msgToReplyWith = new TextEncoder().encode(`This message should be replied by the handler.`)

    const remotePeer = await createSecp256k1PeerId()

    let msgReceived = defer<void>()
    let msgReplied = defer<void>()

    const fakeOnMessage = async (msg: Uint8Array): Promise<Uint8Array> => {
      if (u8aEquals(msg, msgToReceive)) {
        msgReceived.resolve()
      } else {
        msgReceived.reject()
      }

      return new Promise((resolve) => setTimeout(resolve, 50, msgToReplyWith))
    }

    const stream = createStream(
              (async function* (): AsyncIterable<Uint8ArrayList> {
                  yield new Uint8ArrayList(msgToReceive)
              })(),
async (source: AsyncIterable<Uint8ArrayList>) => {
                const msgs = []
                for await (const msg of source) {
                  msgs.push(msg)
                }
                if (msgs.length > 0 && u8aEquals(msgs[0], msgToReplyWith)) {
                  msgReplied.resolve()
                } else {
                  msgReplied.reject()
                }
              }
    )

    const libp2p = {
      registrar: {
        async handle(protocols: string | string[], handlerFunction: StreamHandler) {
          handlerFunction({
            stream,
            connection: {
              remotePeer
            } as Connection,
            protocol: protocols[0]
          } as IncomingStreamData)
        }
      }
    }

    libp2pSubscribe(libp2p, ['demo protocol'], fakeOnMessage, () => {}, true)

    await Promise.all([msgReceived.promise, msgReplied.promise])
  })

  it(`subscribe and consume`, async function () {
    const msgToReceive = new TextEncoder().encode(`This message should be received.`)

    const remotePeer = await createSecp256k1PeerId()
    let msgReceived = defer<void>()

    const fakeOnMessage = async (msg: Uint8Array) => {
      await new Promise((resolve) => setTimeout(resolve, 50))

      if (u8aEquals(msg, msgToReceive)) {
        msgReceived.resolve()
      } else {
        msgReceived.reject()
      }
    }

    const stream = createStream((async function* (): AsyncIterable<Uint8ArrayList> {
                  yield new Uint8ArrayList(msgToReceive)
                })(),
                (() => {}) as any)

    const libp2pComponents = {
      getRegistrar() {
        return {
          async handle(protocols: string[], handlerFunction: (args: LibP2PHandlerArgs) => Promise<void>) {
            handlerFunction({
              stream,
              connection: {
                remotePeer
              } as any,
              protocol: protocols[0]
            })
          }
        } as Components['registrar']
      }
    } as Components

    libp2pSubscribe(libp2pComponents, ['demo protocol'], fakeOnMessage, () => {}, false)

    await msgReceived.promise
  })
})

describe('test libp2p utils', function () {
  it('should be a secp256k1 peerId', async function () {
    const pId = await createSecp256k1PeerId()

    assert(isSecp256k1PeerId(pId) == true, 'peerId must have a secp256k1 keypair')

    const pIdDifferentKey = await createEd25519PeerId()

    assert(isSecp256k1PeerId(pIdDifferentKey) == false, 'peerId does not have a secp256k1 keypair')
  })
})
