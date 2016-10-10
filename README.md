# node-stream-study
[![Build Status][travis-image]][travis-url] [![Dev Dependency status][david-dm-dev-image]][david-dm-dev-url]

Study [Node.js stream](https://nodejs.org/api/stream.html).

As the [definition](https://nodejs.org/api/stream.html#stream_stream) of Node.js, _A stream is an abstract interface for working with streaming data in Node.js_. That means you CANNOT construct a stream object directly, but implement it. Streams can be **readable**, **writable**, both(**duplex**) or **transformable**.


## Implement a stream

### Readable stream

Extend `stream.Readable` to implement a readable stream. The only method you have to implement is **_read()**:

```js
class MyReadable extends Readable {
  constructor(options) {
    super(options);
  }
  _read(size) {
  }
}
```

The _\_read()_ method don't have to return anything. Data being read is push to a internal buffer:

```js
  _read(size) {
    this.push('xyz');// or this.push(Buffer.from('xyz'))
  }
```

If there is nothing to read, just push a _null_:

```js
this.push(null);
```

E.g. [alphabet-readable-stream.js](alphabet-readable-stream.js)

### Writable stream

Extend `stream.Writable` to implement a writable stream. The method you have to implement is **_write()** or **_writev()**:

```js
const Writable = require('stream').Writable;

class MyWritable extends Writable {
  constructor(options) {
    super(options);
  }
  _write(chunk, encoding, callback) {
    callback();
  }
}
```

Call _callback()_ function to represent a complete. Passing an error object is optional.

_\_writev()_ acts as a bulk of _\_writev()_ somehow.

E.g. [arraywriter-writable-stream.js](arraywriter-writable-stream.js)

### Duplex stream

A duplex stream is a mixin of readable stream and writable stream, but extending `stream.Duplex`.

### Transform stream

A transform stream is a kind of duplex stream that the output is in some way related to the input. The only method you have to implement is **_transform()**:

```js
const Transform = require('stream').Transform;

class MyTransform extends Transform {
  constructor(options) {
    super(options);
  }
  _transform(chunk, encoding, callback) {
  }
}
```

_\_transform()_ is similar to _\_write()_.

Another method you can implement is _\_flush()_:

```js
  _flush(cb) {
    this.push('\n');
    cb();
  }
```

E.g. [reverse-transform-stream.js](reverse-transform-stream)

## Object mode stream

In the examples above, we read, write or transform strings and buffers. Actually, objects can be read, wrote and transformed too. Pass a `objectMode` to constructor:

```js
new MyReadable({objectMode: true});
```

E.g. [object-readable-stream.js](object-readable-stream.js)
E.g. [object-writable-stream.js](object-writable-stream.js)

## through2

To simplify the procedure of creating a duplex stream, [through2](http://npmjs.org/through2) is highly recommended.

[travis-url]: https://travis-ci.org/yanni4night/node-stream-study
[travis-image]: http://img.shields.io/travis/yanni4night/node-stream-study.svg
[david-dm-dev-url]:https://david-dm.org/yanni4night/node-stream-study#type=dev
[david-dm-dev-image]:https://david-dm.org/yanni4night/node-stream-study/dev-status.svg