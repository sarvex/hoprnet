// Use errCode library to add metadata to errors and align with libp2p transport interface
import errCode from 'err-code'

import { isStartable } from '@libp2p/interfaces/startable'
import type { Startable } from '@libp2p/interfaces/startable'

import type { WebRTCUpgrader } from './webrtc/upgrader.js'
import type { UpnpManager } from './base/upnp.js'
import type { Filter } from './filter.js'
import type { EntryNodes } from './base/entry.js'
import type { Relay } from './relay/index.js'

export interface ConnectComponentsInit {
  addressFilter?: Filter
  entryNodes?: EntryNodes
  relay?: Relay
  upnpManager?: UpnpManager
  webRTCUpgrader?: WebRTCUpgrader
}

export class ConnectComponents implements Startable {

  private readonly components: ConnectComponentsInit
  private _isStarted: boolean

  constructor(init: ConnectComponentsInit) {
    this._isStarted = false
    this.components = init
  }

  public isStarted(): boolean {
    return this._isStarted
  }

  async beforeStart(): Promise<void> {
    const promises: (Promise<void> | void)[] = []

    for (const module of Object.values(this)) {
      if (isStartable(module)) {
        promises.push(module.beforeStart?.())
      }
    }

    await Promise.all(promises)
  }

  async start(): Promise<void> {
    const promises: (Promise<void> | void)[] = []

    for (const module of Object.values(this)) {
      if (isStartable(module)) {
        promises.push(module.start())
      }
    }

    await Promise.all(promises)

    this._isStarted = true
  }

  async afterStart(): Promise<void> {
    const promises: (Promise<void> | void)[] = []

    for (const module of Object.values(this)) {
      if (isStartable(module)) {
        promises.push(module.afterStart?.())
      }
    }

    await Promise.all(promises)
  }

  async beforeStop(): Promise<void> {
    const promises: (Promise<void> | void)[] = []

    for (const module of Object.values(this)) {
      if (isStartable(module)) {
        promises.push(module.beforeStop?.())
      }
    }

    await Promise.all(promises)
  }

  async stop(): Promise<void> {
    const promises: (Promise<void> | void)[] = []

    for (const module of Object.values(this)) {
      if (isStartable(module)) {
        promises.push(module.stop())
      }
    }

    await Promise.all(promises)

    this._isStarted = false
  }

  async afterStop(): Promise<void> {
    const promises: (Promise<void> | void)[] = []

    for (const module of Object.values(this)) {
      if (isStartable(module)) {
        promises.push(module.afterStop?.())
      }
    }

    await Promise.all(promises)
  }
}
