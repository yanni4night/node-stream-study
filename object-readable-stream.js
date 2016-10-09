/**
 * Copyright (C) 2016 yanni4night.com
 * object-readable-stream.js
 *
 * changelog
 * 2016-10-09[16:43:12]:revised
 *
 * @author yanni4night@gmail.com
 * @version 0.1.0
 * @since 0.1.0
 */
'use strict';
const Readable = require('stream').Readable;

class ObjectReader extends Readable {
    constructor(options) {
        options = options || {};
        options.objectMode = true;
        super(options);
        this._idx = 0;
    }
    _read() {
        if (++this._idx < 3) {
            this.push({
                idx: this._idx
            });
        } else {
            this.push(null);
        }
    }
}

module.exports = ObjectReader;