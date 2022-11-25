import { multiaddr } from '@multiformats/multiaddr'
import assert from 'assert'

import { privKeyToPeerId } from '@hoprnet/hopr-utils'
import { relayFromRelayAddress, nodeToMultiaddr } from './index.js'

const SELF = privKeyToPeerId('0x7519c19fd624599c0f97c89913b277a7d1b932d77100f4bbb2bc01969249add3')
const RELAY = privKeyToPeerId('0x152c95bd36e6ada51309558756d5f901853d45ab94336a0bd7bae1453e98ffd6')

describe(`test util functions`, function () {
  it('relay extraction from relay address', function () {
    const extracted = relayFromRelayAddress(multiaddr(`/p2p/${RELAY.toString()}/p2p-circuit`))

    assert(extracted.equals(RELAY))

    // Incorrect size
    assert.throws(() => relayFromRelayAddress(multiaddr(`/p2p/${SELF.toString()}`)))

    // Incorrect protocol
    assert.throws(() => relayFromRelayAddress(multiaddr(`/ip4/127.0.0.1`)))

    // Incorrect size and missing protocol
    assert.throws(() => relayFromRelayAddress(multiaddr(`/p2p/${SELF.toString()}`)))
  })

  it('Node.js AddressInfo to Multiaddr', function () {
    const tests = [
      [
        multiaddr(`/ip4/127.0.0.1/tcp/12345`),
        nodeToMultiaddr({
          address: '127.0.0.1',
          port: 12345,
          family: 'IPv4'
        })
      ],
      // Accept any *any* address
      [
        multiaddr(`/ip4/0.0.0.0/tcp/12345`),
        nodeToMultiaddr({
          address: '::',
          port: 12345,
          family: 'IPv4'
        })
      ],
      [
        multiaddr(`/ip4/0.0.0.0/tcp/12345`),
        nodeToMultiaddr({
          address: '0.0.0.0',
          port: 12345,
          family: 'IPv4'
        })
      ],
      [
        multiaddr(`/ip6/::1/tcp/12345`),
        nodeToMultiaddr({
          address: '::1',
          port: 12345,
          family: 'IPv6'
        })
      ],
      // Accecpt any *any* address
      [
        multiaddr(`/ip6/::/tcp/12345`),
        nodeToMultiaddr({
          address: '0.0.0.0',
          port: 12345,
          family: 'IPv6'
        })
      ],
      [
        multiaddr(`/ip6/::/tcp/12345`),
        nodeToMultiaddr({
          address: '::',
          port: 12345,
          family: 'IPv6'
        })
      ]
    ]

    for (const test of tests) {
      assert(
        test[0].equals(test[1]),
        `Expected Multiaddr ${test[0].toString()} must be equal to computed ${test[1].toString()}`
      )
    }

    assert.throws(() => nodeToMultiaddr({ address: '0.0.0.0', family: 'wrongFamily', port: 12345 }))
  })
})
