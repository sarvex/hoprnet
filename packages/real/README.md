This directory contains Rust WASM modules for HOPR.
Each WASM module corresponds to a Rust crate.

## Structure

The package itself consists of two parts:

- the Typescript code - mostly wrappers for JS functions that cannot be called from WASM modules (IO, sockets,...), sometimes called `REAL` - see [#3823](https://github.com/hoprnet/hoprnet/issues/3823).
- directories containing Rust crates (currently only `hopr-real`)

During build, all the Rust crates are build first using `make all` (see `Makefile` in `packages/wasm`), then the Typescript sources are built as well.

## Usage in Typescript code

Add dependency to `@hoprnet/hopr-real` to your `package.json`

```typescript
import * as wasm from '@hoprnet/hopr-real'

if (wasm.common.dummy_get_one() === '1') {
  console.log('It works!!')
}
```

## <a id="adding_mod"></a> Adding a new Rust WASM module

To add a new Rust WASM module (crate) into the existing `real` package:

1. `cd packages/real/crates`
2. `wasm-pack new my-module`, this will create a new Rust crate for WASM.
3. add `my-module` to `PACKAGES` space separated list in `Makefile`
4. run `make all && make install` for the first time
5. export your WASM Rust crate under its alias in `packages/real/src/index.ts`, e.g.: `export * as my-modules from '../lib/my-module'`

Optionally if you want to make your crate available to other crates within the HOPR monorepo,
add a path to it into the `members` section in `Cargo.toml` in the root of the monorepo.

## Testing

Each WASM module can have its own unit tests and integration tests.

- Unit tests are placed within the module file
- Integration tests are placed in `tests/` directory next to `src/`
