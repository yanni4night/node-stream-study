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
import ObjectWriter from '../object-writable-stream';
import ReverseTransform from '../reverse-transform-stream';
import through2 from 'through2';

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
    t.is(await wa, 'abcdefghijklmnopqrstuvwxyz');
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
    t.is(await wa, 'abc');
});

test('alphabet->arraywriter', async t => {
    const wa = new Promise((resolve, reject) => {
        const arr = [];
        const s = new ArrayWriter({
            array: arr
        });
        s.on('finish', () => {
            resolve(arr.join(''));
        });

        new Alphabet().pipe(s);
    });
    t.is(await wa, 'abcdefghijklmnopqrstuvwxyz');
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
    }]);
});

test('object writable stream', async t => {
    const wa = new Promise((resolve, reject) => {
        const result = [];
        const s = new ObjectWriter({
            array: result
        });
        s.on('finish', () => {
            resolve(result);
        });
        s.write({
            idx: 1
        });
        s.end({
            idx: 2
        });
    });
    t.deepEqual(await wa, [{
        idx: 1
    }, {
        idx: 2
    }]);
});

test('ObjectReader->ObjectWriter', async t => {
    const wa = new Promise((resolve, reject) => {
        const result = [];
        const s = new ObjectWriter({
            array: result
        });
        s.on('finish', () => {
            resolve(result);
        });
        new ObjectReader().pipe(s);
    });
    t.deepEqual(await wa, [{
        idx: 1
    }, {
        idx: 2
    }], 'equals');
});

test('revert transform stream', async t => {
    const wa = new Promise((resolve, reject) => {
        const s = new ReverseTransform();
        let result = '';
        s.on('data', data => {
            result += data;
        });
        s.on('end', () => {
            resolve(result);
        });
        s.end('abc');
    });
    t.is(await wa, 'cba\n');
});

test('through2', async t => {
    const wa = new Promise((resolve, reject) => {
        const arr = [];
        const s = through2((chunk, encoding, callback) => {
            arr.push(chunk.toString());
            callback();
        });
        s.on('finish', () => {
            resolve(arr);
        });
        s.write('1');
        s.end('2');
    });
    t.deepEqual(await wa, ['1', '2']);
});