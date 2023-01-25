use futures::future;
use futures::stream::{Stream, StreamExt};
use js_sys::*;
use pin_project_lite::pin_project;
use utils_misc::utils::wasm;
use wasm_bindgen::convert::IntoWasmAbi;
use wasm_bindgen::prelude::*;
use wasm_bindgen_futures::{stream::JsStream, JsFuture};

// impl Into<Stream> for js_sys::AsyncIterator {}

use core::future::Future;
use core::task::{Context, Poll};
use js_sys::{AsyncIterator, IteratorNext};
// use std::process::Output;
// use std::marker::StructuralEq;
use serde::Serialize;
use serde_wasm_bindgen::to_value;
use std::marker::PhantomPinned;
use std::pin::Pin;
use wasm_bindgen::prelude::*;

mod pin;
mod test;

// #[derive(Serialize, Clone)]
// #[wasm_bindgen(getter_with_clone)]
// pub struct IteratorResult {
//     pub done: bool,
//     /// done == true => JsValue != undefined
//     /// done == false => JsValue == undefined
//     pub value: String,
// }

// #[wasm_bindgen(getter_with_clone)]
// pub struct FlatStreamStuff {
//     stream: Box<dyn Stream<Item = Result<JsValue, JsValue>> + Unpin>,
// }

// // When the Interval is destroyed, cancel its `setInterval` timer.
// // impl Drop for FlatStreamStuff {
// //     fn drop(&mut self) {
// //         // cancelInterval(self.token);
// //     }
// // }

// #[wasm_bindgen]
// impl FlatStreamStuff {
//     // #[wasm_bindgen(constructor)]
//     // pub fn new() -> Self {
//     //     Self { stream: None }
//     // }
//     fn from(stream: (impl Stream<Item = Result<JsValue, JsValue>> + Unpin + 'static)) -> Self {
//         // stream.into()
//         Self {
//             stream: Box::new(stream),
//         }
//     }

//     // pub unsafe fn next_item(self: Pin<&'static mut Self>) -> Promise {
//     //     self.get_unchecked_mut();
//     //     let foo = self.stream.into_future();

//     //     let promise = wasm_bindgen_futures::future_to_promise(async move {
//     //         let bar = foo.await;

//     //         self.stream = bar.1;

//     //         bar.0.unwrap()
//     //     });

//     //     // self.stream = Some(Box::new(foo.1));

//     //     promise
//     // }

//     // pub fn test(self: Pin<&mut Self>) -> String {
//     //     self.stream;
//     //     "foo".into()
//     // }
//     // pub fn next(mut self) -> Promise {
//     //     // let mut fut = Some(async move {
//     //     //     self.stream.as_mut().next().await;
//     //     //     Ok("".into())
//     //     //     //  {
//     //     //     //     Some(Ok(x)) => Ok("".into()),
//     //     //     //     Some(Err(e)) => Err("".into()),
//     //     //     //     None => Err("".into()),
//     //     //     // }
//     //     // });

//     //     // Promise::new(&mut |resolve, reject| {
//     //     //     let future = fut.take().unwrap_throw();

//     //     //     wasm_bindgen_futures::spawn_local(async move {
//     //     //         match future.await {
//     //     //             Ok(val) => {
//     //     //                 resolve.call1(&JsValue::undefined(), &val).unwrap_throw();
//     //     //             }
//     //     //             Err(val) => {
//     //     //                 reject.call1(&JsValue::undefined(), &val).unwrap_throw();
//     //     //             }
//     //     //         }
//     //     //     });
//     //     // })

//     //     // Promise::new(&mut |resolve, reject| {
//     //     //     let futur = fut.take().unwrap();
//     //     //     wasm_bindgen_futures::spawn_local(async move {
//     //     //         futur.await;
//     //     //         // match fut.await {
//     //     //         //     Some(Ok(m)) => {
//     //     //         //         // let serialized = serde_wasm_bindgen::to_value(&IteratorResult {
//     //     //         //         //     done: true,
//     //     //         //         //     value: "".into(),
//     //     //         //         // })
//     //     //         //         // .unwrap();
//     //     //         //         resolve
//     //     //         //             .call1(&JsValue::undefined(), &JsValue::from(""))
//     //     //         //             .unwrap_throw();
//     //     //         //     }
//     //     //         //     Some(Err(e)) => {
//     //     //         //         reject.call1(&JsValue::undefined(), &e).unwrap_throw();
//     //     //         //     }
//     //     //         //     None => {
//     //     //         //         // let serialized = serde_wasm_bindgen::to_value(&IteratorResult {
//     //     //         //         //     done: true,
//     //     //         //         //     value: "".into(),
//     //     //         //         // })
//     //     //         //         // .unwrap();
//     //     //         //         resolve
//     //     //         //             .call1(&JsValue::undefined(), &JsValue::from(""))
//     //     //         //             .unwrap_throw();
//     //     //         //     }
//     //     //         // }
//     //     //     });
//     //     // })
//     //     wasm_bindgen_futures::future_to_promise(async move {
//     //         // Ok(JsValue::from("d"))
//     //         self.stream.as_mut().unwrap().into_future().await.0.unwrap()

//     //         // .unwrap().next().await {
//     //         //     Some(Ok(x)) => {
//     //         //         let serialized = serde_wasm_bindgen::to_value(&IteratorResult {
//     //         //             done: false,
//     //         //             value: format!("value of x: {:?}", x),
//     //         //         })
//     //         //         .unwrap();
//     //         //         Ok(serialized)
//     //         //     }
//     //         //     Some(Err(x)) => Err(JsValue::from("err")),
//     //         //     None => {
//     //         //         let serialized = serde_wasm_bindgen::to_value(&IteratorResult {
//     //         //             done: true,
//     //         //             value: "empty value".into(),
//     //         //         })
//     //         //         .unwrap();
//     //         //         Ok(serialized)
//     //         //     }
//     //         // }
//     //     })
//     //     // .then(cb)
//     // }
// }

// pin_project! {
//     struct StreamStuff<St> where St: Unpin {
//         #[pin]
//         stream: Option<St>,
//     }
// }

// pub trait SomeStreamStuffTrait {
//     fn next_promise(self: Pin<&'static mut Self>) -> Promise;
// }

// impl<St> SomeStreamStuffTrait for StreamStuff<St>
// where
//     St: Stream<Item = Result<JsValue, JsValue>> + Unpin,
// {
//     fn next_promise(self: Pin<&'static mut Self>) -> Promise {
//         let mut this = self.project();
//         wasm_bindgen_futures::future_to_promise(async move {
//             let foo = this.stream.as_mut().unwrap().into_future().await;
//             this.stream.replace(foo.1);

//             foo.0.unwrap()
//         })
//     }
// }

// impl<St> From<St> for StreamStuff<St>
// where
//     St: Stream + Unpin,
//     <St as Stream>::Item: Into<Result<JsValue, JsValue>>,
// {
//     fn from(value: St) -> Self {
//         Self {
//             stream: Some(value),
//         }
//     }
// }

// #[wasm_bindgen]
// struct ToExport {
//     sth: Pin<Box<dyn SomeStreamStuffTrait>>,
// }

// impl<St> From<St> for ToExport
// where
//     St: Stream<Item = Result<JsValue, JsValue>> + Unpin + 'static,
// {
//     fn from(value: St) -> Self {
//         Self {
//             sth: Box::pin(StreamStuff::from(value)),
//         }
//     }
// }

// #[wasm_bindgen]
// impl ToExport {
//     // pub unsafe fn next(&mut self) {
//     //     let foo = self.sth.as_ref();

//     //     //.next_promise();

//     //     // .get_unchecked_mut().next_promise();

//     //     // self.sth.as_mut().next_promise();
//     // }
// }

// #[wasm_bindgen]
// pub fn async_test(some_async_iterable: js_sys::AsyncIterator) -> Result<ToExport, JsValue> {
//     let stream = JsStream::from(some_async_iterable);

//     let stream = stream
//         .map(|x| match x {
//             Ok(x) => match x.as_f64() {
//                 Some(x) => Ok(JsValue::from(x + 3.0)),
//                 None => Ok(JsValue::from(0.0)),
//             },
//             Err(e) => Err(e),
//         })
//         .map(|x| x);

//     // stream.(cx)
//     // let foo = StreamStuff { stream };

//     // let fun = move || {
//     //     let mut next_item = stream.next();

//     //     let bar = async move {
//     //         match next_item.await {
//     //             Some(x) => (),
//     //             None => (),
//     //         }
//     //     };

//     //     wasm_bindgen_futures::spawn_local(bar);

//     //     // wasm_bindgen_futures::future_to_promise(bar)
//     //     // Promise::new(&mut |resolve, reject| {
//     //     //     wasm_bindgen_futures::spawn_local(async move {
//     //     //         match next_item.await {
//     //     //             Some(x) => {
//     //     //                 resolve.call1(&JsValue::undefined(), &JsValue::from("foo"));
//     //     //             }
//     //     //             None => {
//     //     //                 reject.call1(&JsValue::undefined(), &JsValue::from("foo"));
//     //     //             }
//     //     //         }
//     //     //     })
//     //     // })
//     // };

//     // wasm_bindgen_futures::spawn_local(async move {
//     //     let foo = stream.next().await.unwrap().unwrap();
//     //     callback.call1(&JsValue::undefined(), &foo);
//     // });

//     // let foo = FlatStreamStuff::from(stream);
//     // let mut stream_stuff = StreamStuff::from(stream);
//     // stream.next();
//     // stream.next();
//     // wasm_bindgen_futures::spawn_local(async move { stream.await });

//     // let foo = ClosureStuff::new(move || {
//     //     let mut stream = stream;
//     //     // let fut = Some(stream.next());

//     //     let fut = stream.next();
//     //     js_sys::Promise::resolve(&JsValue::from("42"))
//     //     // Promise::new(&mut |resolve, reject| {
//     //     //     wasm_bindgen_futures::spawn_local(async move {
//     //     //         let foo = stream.next();
//     //     //         // match foo.await {
//     //     //         //     Some(x) => {
//     //     //         //         resolve
//     //     //         //             .call1(&JsValue::undefined(), &JsValue::from("foo"))
//     //     //         //             .unwrap_throw();
//     //     //         //     }
//     //     //         //     None => {
//     //     //         //         resolve
//     //     //         //             .call1(&JsValue::undefined(), &JsValue::from("foo"))
//     //     //         //             .unwrap_throw();
//     //     //         //     } // Ok(val) => {
//     //     //         //       //     resolve.call1(&JsValue::undefined(), &val).unwrap_throw();
//     //     //         //       // }
//     //     //         //       // Err(val) => {
//     //     //         //       //     reject.call1(&JsValue::undefined(), &val).unwrap_throw();
//     //     //         //       // }
//     //     //         // }
//     //     //     });
//     //     // })
//     // });
//     // let foo = ;
//     // let cl = ClosureStuff::new(move || {
//     //     let fut = async {
//     //         match stream.next().await {
//     //             Some(x) => x,
//     //             None => Err(JsValue::from("foo")),
//     //         }
//     //     };
//     //     // let fut = js_sys::Promise::from(JsValue::from("value"));
//     //     wasm_bindgen_futures::future_to_promise(fut)
//     // });

//     Ok(ToExport::from(stream))
//     // let nums = js_sys::Array::new();

//     // let iterator =
//     //     js_sys::try_iter(some_async_iterable)?.ok_or_else(|| "need to pass iterable JS values!")?;

//     // for x in iterator {
//     //     // If the iterator's `next` method throws an error, propagate it
//     //     // up to the caller.
//     //     let x = x?;

//     //     // If `x` is a number, add it to our array of numbers!
//     //     if x.as_f64().is_some() {
//     //         nums.push(&x);
//     //     }
//     // }

//     // Ok(JsValue::from(""))
// }
