import assert from 'assert'
import request from 'supertest'
import sinon from 'sinon'
import chaiResponseValidator from 'chai-openapi-response-validator'
import chai, { expect } from 'chai'

import { createToken, storeToken } from '../../token.js'

import { createAuthenticatedTestApiInstance, createMockDb } from './../fixtures.js'

import type { default as Hopr } from '@hoprnet/hopr-core'

describe('GET /token', function () {
  let node: Hopr
  let service: any

  before(async function () {
    node = sinon.fake() as any
    node.db = createMockDb()

    const loaded = await createAuthenticatedTestApiInstance(node)

    service = loaded.service

    // @ts-ignore ESM / CommonJS compatibility issue
    chai.use(chaiResponseValidator.default(loaded.api.apiDoc))
  })

  it('should fail with not found error when using superuser token', async function () {
    const res = await request(service).get('/api/v2/token').set('x-auth-token', 'superuser')
    assert.equal(res.status, 404)
    expect(res).to.satisfyApiSpec
  })

  it('should fail with unauthenticated error when using no token', async function () {
    const res = await request(service).get('/api/v2/token')
    assert.equal(res.status, 401)
    expect(res).to.satisfyApiSpec
  })

  it('should fail with unauthorized error when using token with missing capability', async function () {
    // create token with wrong capability
    const caps = [{ endpoint: 'tokensCreate' }]
    const token = await createToken(node.db, undefined, caps)
    await storeToken(node.db, token)

    const res = await request(service).get('/api/v2/token').set('x-auth-token', token.id)
    assert.equal(res.status, 403)
    expect(res).to.satisfyApiSpec
  })

  it('should succeed when using token with correct capability', async function () {
    // create token with correct capability
    const caps = [{ endpoint: 'tokensCreate' }, {endpoint: 'tokensGetToken'}]
    const token1 = await createToken(node.db, undefined, caps)
    await storeToken(node.db, token1)

    const res1 = await request(service).get('/api/v2/token').set('x-auth-token', token1.id)
    assert.equal(res1.status, 200)
    expect(res1).to.satisfyApiSpec
    assert(res1.body.capabilities, "capabilities should not be missing")
    assert.equal((res1.body.capabilities.length), 2, "capabilities should have 2 entries")
    assert(!!!res1.body.valid_until, "valid_until should be missing")

    const token2 = await createToken(node.db, undefined, caps, "", 1000)
    await storeToken(node.db, token2)

    const res2 = await request(service).get('/api/v2/token').set('x-auth-token', token2.id)
    assert.equal(res2.status, 200)
    expect(res2).to.satisfyApiSpec
    assert(res2.body.capabilities, "capabilities should not be missing")
    assert.equal((res2.body.capabilities.length), 2, "capabilities should have 2 entries")
    assert(!!res2.body.valid_until, "valid_until should not be missing")
  })
})
