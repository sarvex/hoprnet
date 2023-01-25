import { async_test } from '../lib/connect_relay.js'
import { setTimeout } from 'timers/promises'
import { randomBytes } from 'crypto'

describe(`async test`, function () {
  it('should take and return an async iterable', async function () {
    let i = 0
    const it = (async function* () {
      while (i++ < 23) {
        yield randomBytes(512)
        await setTimeout(23)
      }
    })()

    // const result: AsyncIterable<any> = {
    //   [Symbol.asyncIterator]() {
    //     return async_test(it)
    //   }
    // }

    const foo = async_test(it)

    for (let i = 0; i < 26; i++) {
      console.log(await foo.next())
    }
    // console.log(await foo.next_promise())
    // console.log(await foo.next_promise())

    // for await (const msg of result) {
    //   console.log(msg)
    //   // await setTimeout(23)
    // }
  })
})
