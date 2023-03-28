import { setTimeout } from 'timers/promises'
import request from 'superwstest'
import sinon from 'sinon'

import { createToken, storeToken } from '../../../token.js'

import { createAuthenticatedTestApiInstance, createMockDb } from './../../fixtures.js'

import type { default as Hopr } from '@hoprnet/hopr-core'

const WS_PATH = '/api/v2/messages/websocket'

describe('GET /messages/websocket', function () {
  let node: Hopr
  let service: any

  before(async () => {
    node = sinon.fake() as any
    node.db = createMockDb()

    const loaded = await createAuthenticatedTestApiInstance(node)

    // start WS server
    service = loaded.service.listen(0, 'localhost')

    // wait until server started
    do {
      await setTimeout(10)
    } while (!service.listening)
  })

  after((done) => {
    service.close(done)
  })

  it('should not be able to connect with incorrect capabilities', async () => {
    const flow = request(service).ws(WS_PATH).expectConnectionError(401)
    return flow
  })

  it('should be able to connect with correct capabilities', async () => {
    // create token with correct capability
    const caps = [{ endpoint: 'messagesWebsocket' }]
    const token = await createToken(node.db, undefined, caps)
    await storeToken(node.db, token)

    const flow = request(service).ws(WS_PATH).set({ 'x-auth-token': token.id }).close()

    return flow
  })
})
