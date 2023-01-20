use futures::stream::{Stream, StreamExt};
use js_sys::*;
use wasm_bindgen::convert::IntoWasmAbi;
use wasm_bindgen::prelude::*;
use wasm_bindgen_futures::JsFuture;

// impl Into<Stream> for js_sys::AsyncIterator {}

use core::future::Future;
use core::pin::Pin;
use core::task::{Context, Poll};
use js_sys::{AsyncIterator, IteratorNext};
use wasm_bindgen::{prelude::*, JsCast};

/// A `Stream` that yields values from an underlying `AsyncIterator`.
pub struct JsStream {
    iter: AsyncIterator,
    next: Option<JsFuture>,
    done: bool,
}

impl JsStream {
    fn next_future(&self) -> Result<JsFuture, JsValue> {
        self.iter.next().map(JsFuture::from)
    }

    fn to_foo(self) -> MyAsyncIterator {
        MyAsyncIterator::from(self)
    }
}

impl From<AsyncIterator> for JsStream {
    fn from(iter: AsyncIterator) -> Self {
        JsStream {
            iter,
            next: None,
            done: false,
        }
    }
}

impl Stream for JsStream {
    type Item = Result<JsValue, JsValue>;

    fn poll_next(mut self: Pin<&mut Self>, cx: &mut Context) -> Poll<Option<Self::Item>> {
        if self.done {
            return Poll::Ready(None);
        }

        let future = match self.next.as_mut() {
            Some(val) => val,
            None => match self.next_future() {
                Ok(val) => {
                    self.next = Some(val);
                    self.next.as_mut().unwrap()
                }
                Err(e) => {
                    self.done = true;
                    return Poll::Ready(Some(Err(e)));
                }
            },
        };

        match Pin::new(future).poll(cx) {
            Poll::Ready(res) => match res {
                Ok(iter_next) => {
                    let next = iter_next.unchecked_into::<IteratorNext>();
                    if next.done() {
                        self.done = true;
                        Poll::Ready(None)
                    } else {
                        self.next.take();
                        Poll::Ready(Some(Ok(next.value())))
                    }
                }
                Err(e) => {
                    self.done = true;
                    Poll::Ready(Some(Err(e)))
                }
            },
            Poll::Pending => Poll::Pending,
        }
    }
}

// impl::Item: Sized {}

// #[derive(Clone, Debug)]
#[wasm_bindgen]
pub struct MyAsyncIterator {
    stream: JsStream,
}

#[wasm_bindgen]
impl MyAsyncIterator {
    #[wasm_bindgen]
    pub fn next(&self) -> Result<Promise, JsValue> {
        Ok(js_sys::Promise::resolve(JsValue::from("123").as_ref()))
    }
}

impl<T: Stream + Unpin> From<T> for MyAsyncIterator
where
    <T as Stream>::Item: Into<Result<JsValue, JsValue>>,
{
    fn from(value: T) -> Self {
        MyAsyncIterator {
            stream: value.into(),
        }
    }
}

#[wasm_bindgen]
pub fn async_test(some_async_iterable: js_sys::AsyncIterator) -> Result<MyAsyncIterator, JsValue> {
    let stream = JsStream::from(some_async_iterable);

    let stream = stream
        .map(|x| match x {
            Ok(x) => match x.as_f64() {
                Some(x) => Ok(JsValue::from(x + 3.0)),
                None => Ok(JsValue::from(0.0)),
            },
            Err(e) => Err(e),
        })
        .map(|x| x);

    // stream.collect()

    // Pin::new(stream).
    // stream.poll_next_unpin(cx);
    // let foo = stream.next;

    // stream.poll_next_unpin(cx)
    // let stream = stream.enumerate();
    // let stream: Stream = some_async_iterable.into();

    // let foo = AsyncIterator { obj };
    Ok(MyAsyncIterator::from(stream))
    // let nums = js_sys::Array::new();

    // let iterator =
    //     js_sys::try_iter(some_async_iterable)?.ok_or_else(|| "need to pass iterable JS values!")?;

    // for x in iterator {
    //     // If the iterator's `next` method throws an error, propagate it
    //     // up to the caller.
    //     let x = x?;

    //     // If `x` is a number, add it to our array of numbers!
    //     if x.as_f64().is_some() {
    //         nums.push(&x);
    //     }
    // }

    // Ok(JsValue::from(""))
}
