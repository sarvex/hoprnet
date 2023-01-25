// use futures::stream::{self, StreamExt};
// use futures::Stream;
// use std::marker::PhantomPinned;
// use std::pin::Pin;
// use wasm_bindgen::prelude::*;
// use wasm_bindgen_futures::future_to_promise;

// #[derive(Debug)]
// struct Test<St> {
//     stream: St,
// }

// impl<St> Test<St>
// where
//     St: Stream + Unpin,
//     St::Item: Into<Result<JsValue, JsValue>>,
// {
//     // fn new(txt: &str) -> Pin<Box<Self>> {
//     //     let t = Self {
//     //         a: String::from(txt),
//     //         b: std::ptr::null(),
//     //         _marker: PhantomPinned,
//     //     };
//     //     let mut boxed = Box::pin(t);
//     //     let self_ptr: *const String = &boxed.a;
//     //     unsafe { boxed.as_mut().get_unchecked_mut().b = self_ptr };

//     //     boxed
//     // }

//     pub fn next_item(mut self: Pin<&mut Self>) -> js_sys::Promise {
//         let this = self.as_mut().stream.poll_next_unpin(cx);

//         Pin::new(self).stream.
//         future_to_promise(async move {
//             match this.stream.next().await {
//                 Some(x) => match x.into() {
//                     Ok(x) => Ok(x),
//                     Err(x) => Err(x),
//                 },
//                 None => Ok(JsValue::from("end")),
//             }
//         })
//     }

//     // fn a(self: Pin<&Self>) -> &str {
//     //     &self.get_ref().a
//     // }

//     // fn b(self: Pin<&Self>) -> &String {
//     //     unsafe { &*(self.b) }
//     // }
// }

// impl<St> From<St> for Test<St>
// where
//     St: Stream + Unpin,
//     St::Item: Into<Result<JsValue, JsValue>>,
// {
//     fn from(value: St) -> Self {
//         Self { stream: value }
//     }
// }

// // #[wasm_bindgen]
// // struct Wrapped {
// //     test: Pin<Box<Test>>,
// // }

// // #[wasm_bindgen]
// // impl Wrapped {
// //     pub fn new() -> Self {
// //         Self {
// //             test: Test::new("foo"),
// //         }
// //     }

// //     pub fn a(&self) -> String {
// //         String::from(self.test.as_ref().a())
// //     }
// // }

// // pub fn main() {
// //     let test1 = Test::new("test1");
// //     let test2 = Test::new("test2");

// //     println!("a: {}, b: {}", test1.as_ref().a(), test1.as_ref().b());
// //     println!("a: {}, b: {}", test2.as_ref().a(), test2.as_ref().b());
// // }
