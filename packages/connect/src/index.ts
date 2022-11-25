import errCode from 'err-code'
import Debug from 'debug'
import chalk from 'chalk'
import { CustomEvent } from '@libp2p/interfaces/events'
import { peerIdFromBytes } from '@libp2p/peer-id'
import { symbol } from '@libp2p/interface-transport'

import type { Multiaddr } from '@multiformats/multiaddr'
import type { PeerId } from '@libp2p/interface-peer-id'
import type { Startable } from '@libp2p/interfaces/startable'
import type { Connection, MultiaddrConnection } from '@libp2p/interface-connection'
import type { CreateListenerOptions, DialOptions, Transport } from '@libp2p/interface-transport'

import { CODE_DNS4, CODE_DNS6, CODE_IP4, CODE_IP6, CODE_P2P } from './constants.js'
import { createTCPConnection, Listener } from './base/index.js'

// Do not type-check JSON files
// @ts-ignore
import pkg from '../package.json' assert { type: 'json' }

import {
  PeerConnectionType
} from './types.js'

import type {
  PublicNodesEmitter,
  HoprConnectOptions,
  HoprConnectTestingOptions,
  Libp2pComponents
} from './types.js'

import { Relay } from './relay/index.js'
import { Filter } from './filter.js'
import { Discovery } from './discovery.js'
import { ConnectComponents } from './components.js'
import { EntryNodes } from './base/entry.js'
import { WebRTCUpgrader } from './webrtc/upgrader.js'
import { UpnpManager } from './base/upnp.js'
import { create_counter, timeout } from '@hoprnet/hopr-utils'
import { cleanExistingConnections } from './utils/index.js'

const DEBUG_PREFIX = 'hopr-connect'
const log = Debug(DEBUG_PREFIX)
const verbose = Debug(DEBUG_PREFIX.concat(':verbose'))
const error = Debug(DEBUG_PREFIX.concat(':error'))

// Metrics
const metric_successfulDirectDials = create_counter(
  'connect_counter_successful_direct_dials',
  'Number of successful direct dials'
)
const metric_failedDirectDials = create_counter('connect_counter_failed_direct_dials', 'Number of failed direct dials')

const metric_successfulRelayedDials = create_counter(
  'connect_counter_successful_relayed_dials',
  'Number of successful relayed dials'
)

const metric_failedRelayedDials = create_counter(
  'connect_counter_failed_relayed_dials',
  'Number of failed relayed dials'
)

const DEFAULT_CONNECTION_UPGRADE_TIMEOUT = 2000

type HoprConnectConfig = {
  config?: HoprConnectOptions
  testing?: HoprConnectTestingOptions
}

/**
 * @class HoprConnect
 */
class HoprConnect implements Transport, Startable {
  public discovery: Discovery

  private readonly options: HoprConnectOptions
  private readonly testingOptions: HoprConnectTestingOptions

  private readonly components: Libp2pComponents
  private readonly connectComponents: ConnectComponents

  private _started: boolean

  constructor(init: Libp2pComponents, opts: HoprConnectConfigOptions) {
    this.options = opts.config ?? {}
    this.testingOptions = opts.testing ?? {}
    this.components = init

    this.discovery = new Discovery()

    log(`HoprConnect: `, pkg.version)

    if (!!this.testingOptions.__noWebRTCUpgrade) {
      verbose(`DEBUG mode: no WebRTC upgrade`)
    }

    if (!!this.testingOptions.__preferLocalAddresses) {
      verbose(`DEBUG mode: treat local addresses as public addresses.`)
    }

    const upgrader =  new WebRTCUpgrader(this.options)

    this.connectComponents = new ConnectComponents({
      addressFilter: new Filter(components, this.options),
      entryNodes: new EntryNodes(components, this.options),
      relay: new Relay(components, upgrader, this.options, this.testingOptions),
      upnpManager: new UpnpManager(components),
      webRTCUpgrader: upgrader
    })

    this._started = false
  }

  get [symbol](): true {
    return true
  }

  get [Symbol.toStringTag]() {
    return 'HoprConnect'
  }

  public isStarted(): boolean {
    return this._started
  }

  // Simulated NAT:
  // If we don't allow direct connections (being a NATed node), then a connection
  // can happen if outgoing, i.e. by establishing a connection to someone else
  // we populate the address mapping of the router.
  // Or, if we get contacted by a relay to which we already have an *outgoing*
  // connection that gets reused.
  private setupSimulatedNAT(): void {
    // Simulated NAT using connection gater
    const denyInboundConnection = this.components.connectionGater.denyInboundConnection
    this.components.connectionGater.denyInboundConnection = async (maConn: MultiaddrConnection) => {
      if (await denyInboundConnection(maConn)) {
        // Blocked by e.g. Network Registry
        return true
      }

      if (maConn.remoteAddr.toString().startsWith(`/p2p/`)) {
        return false
      }

      log(`closing due to simulated NAT`)
      // log(`remotePeer ${maConn.remotePeer.toB58String()}`)
      // log(`localAddr: ${conn.localAddr?.toString()}`)
      // log(`remotePeer ${conn.localPeer.toB58String()}`)
      return true
    }
  }

  public async beforeStart() {
    await this.components.beforeStart()
  }

  public async start(): Promise<void> {
    if (this._started) {
      return
    }

    this._started = true

    if (!!this.testingOptions.__noDirectConnections) {
      verbose(`DEBUG mode: always using relayed or WebRTC connections.`)

      this.setupSimulatedNAT()
    }
    await this.components.start()
  }

  public async afterStart() {
    await this.components.afterStart()
  }

  public async stop(): Promise<void> {
    this._started = false
    await this.components.stop()
  }

  /**
   * Tries to establish a connection to the given destination
   * @param ma destination
   * @param options optional dial options
   * @returns An upgraded Connection
   */
  async dial(ma: Multiaddr, options: DialOptions): Promise<Connection> {
    const maTuples = ma.tuples()

    // This works because destination peerId is for both address
    // types at the third place.
    // Other addresses are not supported.
    const destination = peerIdFromBytes((maTuples[2][1] as Uint8Array).slice(1))

    if (destination.equals(this.components.peerId)) {
      throw new Error(`Cannot dial ourself`)
    }

    switch (maTuples[0][0]) {
      case CODE_DNS4:
      case CODE_DNS6:
      case CODE_IP4:
      case CODE_IP6:
        try {
          let conn = await this.dialDirectly(ma, options)
          metric_successfulDirectDials.increment()
          return conn
        } catch (e) {
          metric_failedDirectDials.increment()
          throw e
        }
      case CODE_P2P:
        if ((options as any).noRelay === true) {
          throw new Error(`Cannot extend already relayed connections`)
        }
        const relay = peerIdFromBytes((maTuples[0][1] as Uint8Array).slice(1))

        try {
          let conn = await this.dialWithRelay(relay, destination, options)
          metric_successfulRelayedDials.increment()
          return conn
        } catch (e) {
          metric_failedRelayedDials.increment()
          throw e
        }
      default:
        throw new Error(`Protocol not supported. Given address: ${ma.toString()}`)
    }
  }

  /**
   * Creates a TCP listener. The provided `handler` function will be called
   * anytime a new incoming Connection has been successfully upgraded via
   * `upgrader.upgradeInbound`.
   * @param opts
   * @returns A TCP listener
   */
  // @ts-ignore libp2p type clash
  public createListener(opts: CreateListenerOptions): Listener {
    return new Listener(this.options, this.testingOptions, this.components, this.connectComponents)
  }

  /**
   * Takes a list of Multiaddrs and returns those addrs that we can use.
   * @example
   * new Multiaddr(`/ip4/127.0.0.1/tcp/0/p2p/16Uiu2HAmCPgzWWQWNAn2E3UXx1G3CMzxbPfLr1SFzKqnFjDcbdwg`) // working
   * new Multiaddr(`/p2p/16Uiu2HAmCPgzWWQWNAn2E3UXx1G3CMzxbPfLr1SFzKqnFjDcbdwg/p2p-circuit/p2p/16Uiu2HAkyvdVZtG8btak5SLrxP31npfJo6maopj8xwx5XQhKfspb`) // working
   * @param multiaddrs
   * @returns applicable Multiaddrs
   */
  public filter(multiaddrs: Multiaddr[]): Multiaddr[] {
    return (Array.isArray(multiaddrs) ? multiaddrs : [multiaddrs]).filter(
      this.connectComponents.addressFilter.filter.bind(this.connectComponents.addressFilter)
    )
  }

  /**
   * Attempts to establish a relayed connection to one of the given relays.
   * @param relay peerId of designated relay that we can use
   * @param destination peerId of destination
   * @param options optional dial options
   */
  private async dialWithRelay(relay: PeerId, destination: PeerId, options: DialOptions): Promise<Connection> {
    log(`Dialing ${chalk.yellow(`/p2p/${relay.toString()}/p2p-circuit/p2p/${destination.toString()}`)}`)

    let conn: Connection | undefined

    let maConn = await this.connectComponents
      .relay
      .connect(
        relay,
        destination,
        () => {
          if (conn) {
            this.components.upgrader.dispatchEvent(
              new CustomEvent(`connectionEnd`, {
                detail: conn
              })
            )
          }
        },
        options
      )

    if (maConn == undefined) {
      throw Error(`Could not establish relayed connection.`)
    }

    try {
      conn = await options.upgrader.upgradeOutbound(maConn)
      log(`Successfully established relayed connection to ${destination.toString()}`)
    } catch (err) {
      error(err)
      // libp2p needs this error to understand that this connection attempt failed but we
      // want to log it for debugging purposes
      throw err
    }

    // Not supposed to throw any exception
    cleanExistingConnections(this.components, conn.remotePeer, conn.id, error)

    // Merges all tags from `maConn` into `conn` and then make both objects
    // use the *same* array
    // This is necessary to dynamically change the connection tags once
    // a connection gets upgraded from WEBRTC_RELAYED to WEBRTC_DIRECT
    if (conn.tags == undefined) {
      conn.tags = []
    }
    conn.tags.push(...maConn.tags)

    // assign the array *by value* and its entries *by reference*
    maConn.tags = conn.tags as any

    verbose(`Relayed connection to ${maConn.remoteAddr.toString()} has been established successfully!`)
    return conn
  }

  /**
   * Attempts to establish a direct connection
   * @param ma destination
   * @param options optional dial options
   */
  public async dialDirectly(ma: Multiaddr, options: DialOptions): Promise<Connection> {
    log(`Dialing ${chalk.yellow(ma.toString())}`)

    let conn: Connection | undefined
    const maConn = await createTCPConnection(
      ma,
      () => {
        if (conn) {
          this.components.upgrader.dispatchEvent(
            new CustomEvent(`connectionEnd`, {
              detail: conn
            })
          )
        }
      },
      options
    )

    verbose(
      `Establishing a direct connection to ${maConn.remoteAddr.toString()} was successful. Continuing with the handshake.`
    )

    conn = await timeout(DEFAULT_CONNECTION_UPGRADE_TIMEOUT, () => options.upgrader.upgradeOutbound(maConn))

    // Not supposed to throw any exception
    cleanExistingConnections(this.components, conn.remotePeer, conn.id, error)

    verbose(`Direct connection to ${maConn.remoteAddr.toString()} has been established successfully!`)
    if (conn.tags) {
      conn.tags.push(PeerConnectionType.DIRECT)
    } else {
      conn.tags = [PeerConnectionType.DIRECT]
    }

    return conn
  }
}

export type { PublicNodesEmitter, HoprConnectConfig }
export { compareAddressesLocalMode, compareAddressesPublicMode } from './utils/index.js'

export { PeerConnectionType }
export type { HoprConnect }

export function hoprConnect(init: HoprConnectConfig): (components?: Libp2pComponents) => HoprConnect {
  return (components: Libp2pComponents = {}) => {
    return new HoprConnect(components, init)
  }
}
