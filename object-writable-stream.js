/**
  * Copyright (C) 2016 yanni4night.com
  * object-writable-stream.js
  *
  * changelog
  * 2016-10-10[09:32:03]:revised
  *
  * @author yanni4night@gmail.com
  * @version 0.1.0
  * @since 0.1.0
  */
'use strict';
const Writable = require('stream').Writable;

class ObjectWriter extends Writable {
    constructor(options) {
        options = options || {};
        options.objectMode = true;
        super(options);
        this._arr = (options || {}).array || [];
    }
    _write(chunk, encoding, callback) {
        this._arr.push(chunk);
        callback();
    }
}

module.exports = ObjectWriter;
