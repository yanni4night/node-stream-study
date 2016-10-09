/**
 * Copyright (C) 2016 yanni4night.com
 * test.js
 *
 * changelog
 * 2016-10-09[14:14:18]:revised
 *
 * @author yanni4night@gmail.com
 * @version 0.1.0
 * @since 0.1.0
 */
'use strict';
import test from 'ava';
import Alphabet from '../alphabet-readable-stream';

test('alphabet readable stream', async t => {
    const wa = new Promise((resolve, reject) => {
        const s = new Alphabet();
        let result = '';
        s.on('data', data => {
            result += data;
        });
        s.on('end', () => {
            resolve(result);
        });
    });
    t.is(await wa, 'abcdefghijklmnopqrstuvwxyz', 'equals');
});