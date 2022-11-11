/*
 * Add a more usable API on top of LibP2P
 */
import { type PeerId, isPeerId } from '@libp2p/interface-peer-id'
import type { Connection, Stream } from '@libp2p/interface-connection'
import { type Multiaddr, protocols as maProtocols } from '@multiformats/multiaddr'
import type { Libp2p } from 'libp2p'

import { debug } from '../process/index.js'
import { createRelayerKey } from './relayCode.js'
import { createCircuitAddress } from '../network/index.js'
import { peerIdFromString } from '@libp2p/peer-id'

import { TimeoutController } from 'timeout-abort-controller'

const DEBUG_PREFIX = `hopr-core:libp2p`

const CODE_P2P = maProtocols('p2p').code

const log = debug(DEBUG_PREFIX)
const error = debug(DEBUG_PREFIX.concat(`:error`))

const DEFAULT_DHT_QUERY_TIMEOUT = 20000

export enum DialStatus {
  SUCCESS = 'SUCCESS',
  TIMEOUT = 'E_TIMEOUT',
  ABORTED = 'E_ABORTED',
  DIAL_ERROR = 'E_DIAL',
  DHT_ERROR = 'E_DHT_QUERY',
  NO_DHT = 'E_NO_DHT'
}

export type DialOpts = {
  timeout?: number
}

export type DialResponse =
  | {
      status: DialStatus.SUCCESS
      resp: {
        conn: Connection,
        stream: Stream
      }
    }
  | {
      status: DialStatus.TIMEOUT
    }
  | {
      status: DialStatus.ABORTED
    }
  | {
      status: DialStatus.DIAL_ERROR
      dhtContacted: boolean
    }
  | {
      status: DialStatus.DHT_ERROR
      query: string
    }
  | {
      status: DialStatus.NO_DHT
    }

async function printPeerStoreAddresses(prefix: string, destination: PeerId, libp2p: Libp2p): Promise<string> {
  const SUFFIX = 'Known addresses:\n'

  let out = `${prefix}\n${SUFFIX}`

  let length = 0
  for (const address of await libp2p.peerStore.addressBook.get(destination)) {
    length++
    out += `  ${address.multiaddr.toString()}\n`
  }

  if (length == 0) {
    out += `  No addresses known for peer ${destination.toString()}\n`
  }

  // Remove last `\n`
  return out.substring(0, out.length - 1)
}

// Timeout protocol selection to prevent from irresponsive nodes
const PROTOCOL_SELECTION_TIMEOUT = 10e3

/**
 * Tries to use existing connection to connect to the given peer.
 * Closes all connection that could not be used to speak the desired
 * protocols.
 * @dev if used with unsupported protocol, this function might close
 * connections unintendedly
 *
 * @param connectionManager libp2p connection manager
 * @param destination peer to connect to
 * @param protocols desired protocol
 * @returns
 */
export async function tryExistingConnections(
  libp2p: Libp2p,
  destination: PeerId,
  protocols: string | string[]
): Promise<
  | undefined
  | {
      conn: Connection,
      stream: Stream
    }
> {
  const existingConnections = libp2p.connectionManager.getConnections(destination)

  if (existingConnections == undefined || existingConnections.length == 0) {
    return
  }

  let stream: Stream | undefined
  let conn: Connection | undefined

  const deadConnections: Connection[] = []

  for (conn of existingConnections) {
    let timeoutController = new TimeoutController(PROTOCOL_SELECTION_TIMEOUT)

    const options = {
      signal: timeoutController.signal
    }

    try {
      stream = await conn.newStream(protocols, options)
    } catch (err: any) {
      error(`Could not open stream to ${destination.toString()} due to "${err?.message}".`)
    } finally {
      timeoutController.clear()
    }

    if (stream == undefined) {
      deadConnections.push(conn)
    } else {
      break
    }
  }

  if (deadConnections.length > 0) {
    log(
      `dead connection${deadConnections.length == 1 ? '' : 's'} to ${destination.toString()}`,
      deadConnections.map((deadConnection: Connection) => deadConnection.id)
    )
  }

  // Close dead connections later
  ;(async function () {
    for (const deadConnection of deadConnections) {
      // @fixme does that work?
      try {
        await deadConnection.close()
      } catch (err) {
        error(`Error while closing dead connection`, err)
      }
    }
  })()

  if (stream != undefined) {
    return { conn, stream }
  }
}

/**
 * Performs a dial attempt and handles possible errors.
 * Uses global connection timeout as defined in libp2p constructor call
 * (see ConnectionManager config)
 *
 * @param connectionManager libp2p connection manager
 * @param destination which peer to dial
 * @param protocols which protocol to use
 */
async function establishNewConnection(
  libp2p: Libp2p,
  destination: PeerId,
  protocols: string | string[],
  noRelay: boolean = false
): Promise<
  | undefined
  | {
      conn: Connection,
      stream: Stream
    }
> {
  log(`Trying to establish connection to ${destination.toString()}`)

  let conn: Connection | undefined
  try {
    conn = (await libp2p.dial(destination, {
      // @ts-ignore extension to libp2p's DialOptions
      noRelay
    })) as any as Connection
  } catch (err: any) {
    if (err == undefined || err.code == undefined) {
      error(`Dial error:`, err)
    } else {
      switch (err.code) {
        case 'ERR_PEER_DIAL_INTERCEPTED':
          error(`Cannot dial ${destination.toString()}. Node has not been registered.`)
          return
        case 'ERR_NO_VALID_ADDRESSES':
          // We currently don't know any addresses to dial, but after after running
          // a DHT query we might known more addresses
          return
        default:
          error(`Dial error:`, err)
      }
    }
  }

  if (conn == undefined) {
    return
  }

  log(`Connection ${destination.toString()} established !`)

  const timeoutController = new TimeoutController(PROTOCOL_SELECTION_TIMEOUT)

  const options = {
    signal: timeoutController.signal
  }

  let stream: Stream | undefined
  let errThrown = false
  try {
    // Timeout protocol selection to prevent from irresponsive nodes
    stream = await conn.newStream(protocols, options)
  } catch (err) {
    error(`error while trying to establish protocol ${protocols} with ${destination.toString()}`, err)
    errThrown = true
  } finally {
    timeoutController.clear()
  }

  if (stream == undefined || errThrown) {
    try {
      await conn.close()
    } catch (err) {
      error(`Error while ending obsolete write stream`, err)
    }
    return
  }

  return {
    conn,
    stream
  }
}

/**
 * Performs a DHT query and handles possible errors
 * @param contentRouting libp2p content routing
 * @param destination which peer to look for
 */
async function* queryDHT(libp2p: Libp2p, destination: PeerId): AsyncIterable<PeerId> {
  const key = createRelayerKey(destination)
  log(`fetching relay keys for node ${destination.toString()} from DHT.`, key)

  const timeoutController = new TimeoutController(DEFAULT_DHT_QUERY_TIMEOUT)

  const options = {
    signal: timeoutController.signal
  }

  try {
    for await (const dhtResult of libp2p.contentRouting.findProviders(key as any, options)) {
      yield dhtResult.id
    }
  } catch (err) {
    error(`Error while querying the DHT for ${destination.toString()}.`)
    if (err?.message) {
      error(`DHT error: ${err.message}`)
    }
  } finally {
    timeoutController.clear()
  }
}

async function doDirectDial(
  libp2p: Libp2p,
  id: PeerId,
  protocols: string | string[],
  noRelay: boolean = false
): Promise<DialResponse> {
  // First let's try already existing connections
  let struct = await tryExistingConnections(libp2p, id, protocols)

  if (struct) {
    log(`Successfully reached ${id.toString()} via existing connection !`)
    return { status: DialStatus.SUCCESS, resp: struct }
  }

  // Fetch known addresses for the given destination peer
  const knownAddressesForPeer = await libp2p.peerStore.addressBook.get(id)
  if (knownAddressesForPeer.length > 0) {
    let out = `There ${knownAddressesForPeer.length == 1 ? 'is' : 'are'} ${
      knownAddressesForPeer.length
    } already known address${knownAddressesForPeer.length == 1 ? '' : 'es'} for ${id.toString()}:\n`
    // Let's try using the known addresses by connecting directly

    for (const address of knownAddressesForPeer) {
      out += `- ${address.multiaddr.toString()}\n`
    }
    // Remove last `\n`
    log(out.substring(0, out.length - 1))
    struct = await establishNewConnection(libp2p, id, protocols, noRelay)
  } else {
    log(`No currently known addresses for peer ${id.toString()}`)
  }

  if (struct != undefined) {
    log(`Successfully reached ${id.toString()} via already known addresses !`)
    return { status: DialStatus.SUCCESS, resp: struct }
  }

  return { status: DialStatus.DIAL_ERROR, dhtContacted: false }
}

async function fetchCircuitAddressesAndDial(
  libp2p: Libp2p,
  destination: PeerId,
  protocols: string | string[]
): Promise<DialResponse> {
  // Check if DHT is available
  if (libp2p.dht[Symbol.toStringTag] === /* catchall package of libp2p */ '@libp2p/dummy-dht') {
    // Stop if there is no DHT available
    error(
      await printPeerStoreAddresses(
        `Could not establish a connection to ${destination.toString()} and libp2p was started without a DHT. Giving up`,
        destination,
        libp2p
      )
    )
    return { status: DialStatus.NO_DHT }
  }

  const knownAddressesForPeer = await libp2p.peerStore.addressBook.get(destination)

  // Try to get some fresh addresses from the DHT
  log(`Could not reach ${destination.toString()} using known addresses, querying DHT for more addresses...`)

  const knownCircuitAddressSet = new Set<string>()

  for (const knownAddressForPeer of knownAddressesForPeer) {
    const tuples = knownAddressForPeer.multiaddr.tuples()

    if (tuples.length > 0 && tuples[0].length > 0 && tuples[0][0] == CODE_P2P) {
      knownCircuitAddressSet.add(knownAddressForPeer.multiaddr.decapsulateCode(CODE_P2P).toString())
    }
  }

  // Take all the known circuit addresses from the existing set of known addresses

  let relayStruct:
    | void
    | {
        conn: Connection,
        stream: Stream
      }

  for await (const relay of queryDHT(libp2p, destination)) {
    // Make sure we don't use self as relay
    if (relay.equals(libp2p.peerId)) {
      continue
    }

    const circuitAddress = createCircuitAddress(relay)

    // Filter out the circuit addresses that were tried using the previous attempt
    if (knownCircuitAddressSet.has(circuitAddress.toString())) {
      continue
    }

    // Share new knowledge about peer with Libp2p's peerStore, dropping `/p2p/<DESTINATION>`
    await libp2p.peerStore.addressBook.add(destination, [circuitAddress as any])

    log(`Trying to reach ${destination.toString()} via circuit ${circuitAddress}...`)

    relayStruct = await establishNewConnection(libp2p, destination, protocols)

    // Return if we were successful
    if (relayStruct) {
      log(`Successfully reached ${destination.toString()} via circuit ${circuitAddress} !`)
      return { status: DialStatus.SUCCESS, resp: relayStruct }
    }
  }

  return { status: DialStatus.DIAL_ERROR, dhtContacted: true }
}

/**
 * Runs through the dial strategy and handles possible errors
 *
 * 1. Use already known addresses
 * 2. Check the DHT (if available) for additional addresses
 * 3. Try new addresses
 *
 * @param libp2p instance of libp2p
 * @param destination which peer to connect to
 * @param protocols which protocol to use
 * @returns
 */
export async function dial(
  libp2p: Libp2p,
  destination: PeerId | Multiaddr,
  protocols: string | string[],
  withDHT: boolean = true,
  noRelay: boolean = false
): Promise<DialResponse> {
  let id: PeerId
  if (isPeerId(destination)) {
    id = destination
  } else {
    const idStr = destination.getPeerId()

    if (idStr == null) {
      error(`Cannot determine PeerId from ${destination.toString()}`)
      return {
        status: DialStatus.DIAL_ERROR,
        dhtContacted: false
      }
    }
    id = peerIdFromString(idStr)
    await libp2p.peerStore.addressBook.add(id, [destination.decapsulateCode(CODE_P2P)])
  }

  const res = await doDirectDial(libp2p, id, protocols, noRelay)

  if (noRelay == true || withDHT == false || (withDHT == true && res.status == DialStatus.SUCCESS)) {
    // Take first result and don't do any further steps
    return res
  }

  return await fetchCircuitAddressesAndDial(libp2p, id, protocols)
}
