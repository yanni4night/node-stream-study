/**
 * Copyright (C) 2016 yanni4night.com
 * arraywriter-writable-stream.js
 *
 * changelog
 * 2016-10-09[16:20:30]:revised
 *
 * @author yanni4night@gmail.com
 * @version 0.1.0
 * @since 0.1.0
 */
'use strict';
const Writable = require('stream').Writable;

class ArrayWriter extends Writable {
    constructor(options) {
        super(options);
        this._arr = (options || {}).array || [];
    }

    _write(chunk, encoding, callback) {
        this._arr.push(chunk);
        callback();
    }
}

module.exports = ArrayWriter;
