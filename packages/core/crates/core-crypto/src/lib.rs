pub mod derivation;
pub mod errors;
pub mod iterated_hash;
pub mod parameters;
pub mod prg;
pub mod primitives;
pub mod prp;
pub mod random;
pub mod shared_keys;
pub mod types;

#[cfg(test)]
pub(crate) mod dummy_rng;

#[cfg(feature = "wasm")]
pub mod wasm {
    use wasm_bindgen::prelude::wasm_bindgen;

    #[allow(dead_code)]
    #[wasm_bindgen]
    pub fn core_crypto_set_panic_hook() {
        // When the `console_error_panic_hook` feature is enabled, we can call the
        // `set_panic_hook` function at least once during initialization, and then
        // we will get better error messages if our code ever panics.
        //
        // For more details see
        // https://github.com/rustwasm/console_error_panic_hook#readme
        #[cfg(feature = "console_error_panic_hook")]
        console_error_panic_hook::set_once();
    }

    // When the `wee_alloc` feature is enabled, use `wee_alloc` as the global
    // allocator.
    #[cfg(feature = "wee_alloc")]
    #[global_allocator]
    static ALLOC: wee_alloc::WeeAlloc = wee_alloc::WeeAlloc::INIT;
}
