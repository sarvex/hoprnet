use crate::error::RealError;
use crate::error::Result;

// These functions are meant to be used in pure Rust code, since they are cleared from WASM types

pub fn read_file(file: &str) -> Result<Box<[u8]>> {
    wasm::read_file(file).map_err(RealError::from)
}

pub fn write_file(file: &str, data: &[u8]) ->Result<()> {
    wasm::write_file(file, data).map_err(RealError::from)
}

pub mod wasm {
    use wasm_bindgen::prelude::*;

    type JsResult<T> = Result<T, JsValue>;

    #[wasm_bindgen(module = "@hoprnet/hopr-real")]
    extern "C" {
        // Reads the given file and returns it as array of bytes.
        #[wasm_bindgen(catch)]
        pub fn read_file(file: &str) -> JsResult<Box<[u8]>>;

        #[wasm_bindgen(catch)]
        pub fn write_file(file: &str, data: &[u8]) -> JsResult<()>;
    }
}
