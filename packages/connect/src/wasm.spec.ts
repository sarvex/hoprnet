import { async_test } from '../lib/connect_relay.js'
import { setTimeout } from 'timers/promises'

describe(`async test`, function () {
  it('should take and return an async iterable', async function () {
    let i = 0
    const it = (async function* () {
      while (i < 23) {
        yield i++
        await setTimeout(23)
      }
    })()

    const result: AsyncIterable<any> = {
      [Symbol.asyncIterator]() {
        return async_test(it)
      }
    }

    for await (const msg of result) {
      console.log(msg)
    }
  })
})
