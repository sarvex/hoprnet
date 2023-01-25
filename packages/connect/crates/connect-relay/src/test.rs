use futures::stream::{Stream, StreamExt};
use js_sys::{AsyncIterator, Uint8Array};
use serde::Serialize;
use serde_wasm_bindgen;
use wasm_bindgen::prelude::*;
use wasm_bindgen_futures::stream::JsStream;

#[wasm_bindgen]
#[derive(Serialize, Clone)]
pub struct IteratorResult {
    done: bool,
    #[serde(with = "serde_bytes")]
    value: Option<Vec<u8>>,
}

pub fn to_vec_u8_stream(item: Result<JsValue, JsValue>) -> Result<Vec<u8>, String> {
    match item {
        Ok(x) => Ok(Uint8Array::new(&x).to_vec()),
        Err(e) => Err(format!("{:?}", e)),
    }
}

#[wasm_bindgen]
pub struct AsyncIterableHelper {
    stream: Box<dyn Stream<Item = Result<Vec<u8>, String>> + Unpin>,
}

#[wasm_bindgen]
impl AsyncIterableHelper {
    pub async fn next(&mut self) -> Result<JsValue, JsValue> {
        match self.stream.as_mut().next().await {
            Some(Ok(m)) => Ok(serde_wasm_bindgen::to_value(&IteratorResult {
                done: false,
                value: Some(m),
            })
            .unwrap()),
            Some(Err(e)) => Err(JsValue::from(e)),
            None => Ok(serde_wasm_bindgen::to_value(&IteratorResult {
                done: true,
                value: None,
            })
            .unwrap()),
        }
    }
}

#[wasm_bindgen]
pub fn async_test(some_async_iterable: AsyncIterator) -> Result<AsyncIterableHelper, JsValue> {
    let stream = JsStream::from(some_async_iterable);

    let stream = stream.map(to_vec_u8_stream).map(|x| x);

    Ok(AsyncIterableHelper {
        stream: Box::new(stream),
    })
}
