/**
  * Copyright (C) 2016 yanni4night.com
  * alphabet-readable-stream.js
  *
  * changelog
  * 2016-10-09[14:12:57]:revised
  *
  * @author yanni4night@gmail.com
  * @version 0.1.0
  * @since 0.1.0
  */
'use strict';
const Readable = require('stream').Readable;

class Alphabet extends Readable {
    constructor(options) {
        super(options);
        this._idx = 0;
    }
    _read() {
        if (this._idx === 26) {
            // The 'end' event is emitted when there is no more data to be consumed from the stream.
            this.push(null);
            return;
        }
        // The 'data' event is emitted whenever the stream is relinquishing ownership of a chunk of data to a consumer. 
        this.push(String.fromCharCode(97 + (this._idx % 26)));
        this._idx += 1;
    }
}

module.exports = Alphabet;