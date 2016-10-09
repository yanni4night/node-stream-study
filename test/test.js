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
import ArrayWriter from '../arraywriter-writable-stream';
import ObjectReader from '../object-readable-stream';

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

test('arraywriter writable stream', async t => {
    const wa = new Promise((resolve, reject) => {
        const arr = [];
        const s = new ArrayWriter({
            array: arr
        });
        s.on('finish', () => {
            resolve(arr.join(''));
        });
        s.write('a');
        s.write('b');
        s.end('c');
    });
    t.is(await wa, 'abc', 'equals');
});

test('object readable stream', async t => {
    const wa = new Promise((resolve, reject) => {
        const s = new ObjectReader();
        let result = [];
        s.on('data', data => {
            result.push(data);
        });
        s.on('end', () => {
            resolve(result);
        });
    });
    t.deepEqual(await wa, [{
        idx: 1
    }, {
        idx: 2
    }], 'equals');
});