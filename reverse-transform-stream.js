/**
  * Copyright (C) 2016 yanni4night.com
  * reverse-transform-stream.js
  *
  * changelog
  * 2016-10-09[21:58:05]:revised
  *
  * @author yanni4night@gmail.com
  * @version 0.1.0
  * @since 0.1.0
  */
'use strict';

const Transform = require('stream').Transform;

class ReverseTransform extends Transform {
    constructor(options) {
        super(options);
    }
    _transform(chunk, encoding, callback) {
        callback(null, chunk.toString().split('').reverse().join(''));
    }
    _flush(cb) {
        this.push('\n');
        cb();
    }
}

module.exports = ReverseTransform;
