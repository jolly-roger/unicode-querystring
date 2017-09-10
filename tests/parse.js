const tape = require('tape');

const qs = require('../src');

tape.test('parse', (t) => {
    t.test('parse undefined', () => {
        const q = qs.parse();
        
        t.equal(typeof q, 'object');
        t.equal(Object.keys(q).length, 0);
        t.end();
    });
    t.test('parse empty string', (t) => {
        const q = qs.parse('');
        
        t.equal(typeof q, 'object');
        t.equal(Object.keys(q).length, 0);
        t.end();
    });
    t.test('parse only question mark', (t) => {
        const q = qs.parse('?');
        
        t.equal(typeof q, 'object');
        t.equal(Object.keys(q).length, 0);
        t.end();
    });
    t.test('parse only hash', (t) => {
        const q = qs.parse('?');
        
        t.equal(typeof q, 'object');
        t.equal(Object.keys(q).length, 0);
        t.end();
    });
    t.test('parse only question mark and hash', (t) => {
        const q = qs.parse('?#');
        
        t.equal(typeof q, 'object');
        t.equal(Object.keys(q).length, 0);
        t.end();
    });
    t.test('parse one none unicode value', (t) => {
        const q = qs.parse('var0=value0');
        
        t.equal(typeof q, 'object');
        t.equal(Object.keys(q).length, 1);
        t.equal(q.var0, 'value0');
        t.end();
    });
    t.test('parse one unicode value', (t) => {
        const q = qs.parse('var0=' + encodeURI('ф+ы'));
        
        t.equal(typeof q, 'object');
        t.equal(Object.keys(q).length, 1);
        t.equal(q.var0, 'ф+ы');
        t.end();
    });
    t.test('parse no parameter name', (t) => {
        const q = qs.parse('=' + encodeURI('ф+ы'));
        
        t.equal(typeof q, 'object');
        t.equal(Object.keys(q).length, 1);
        t.equal(q._, 'ф+ы');
        t.end();
    });
    t.test('parse duplicate values', (t) => {
        const q = qs.parse('var0=' + encodeURI('ф+ы0') + '&' +
            'var0=' + encodeURI('ф+ы0'));
        
        t.equal(typeof q, 'object');
        t.equal(Object.keys(q).length, 1);
        t.equal(q.var0, 'ф+ы0');
        t.end();
    });
    t.test('parse array', (t) => {
        const q = qs.parse('var0=' + encodeURI('ф+ы0') + '&' +
            'var0=' + encodeURI('ф+ы1'));
        
        t.equal(typeof q, 'object');
        t.equal(Object.keys(q).length, 1);
        t.ok(Array.isArray(q.var0));
        t.equal(q.var0[0], 'ф+ы0');
        t.equal(q.var0[1], 'ф+ы1');
        t.end();
    });
    t.test('parse multiple values', (t) => {
        const q = qs.parse('var0=' + encodeURI('ф+ы0') + '&' +
            'var1=' + encodeURI('ф+ы1') + '&' +
            'var2=' + encodeURI('ф+ы2'));
        
        t.equal(typeof q, 'object');
        t.equal(Object.keys(q).length, 3);
        t.equal(q.var0, 'ф+ы0');
        t.equal(q.var1, 'ф+ы1');
        t.equal(q.var2, 'ф+ы2');
        t.end();
    });
    t.test('parse numeric parameters names', (t) => {
        const q = qs.parse('0=' + encodeURI('ф+ы0') + '&' +
            '1=' + encodeURI('ф+ы1') + '&' +
            '2=' + encodeURI('ф+ы2'));
        
        t.equal(typeof q, 'object');
        t.equal(Object.keys(q).length, 3);
        t.equal(q['0'], 'ф+ы0');
        t.equal(q['1'], 'ф+ы1');
        t.equal(q['2'], 'ф+ы2');
        t.end();
    });
    t.test('parse mixed values', (t) => {
        const q = qs.parse('var0=' + encodeURI('ф+ы0') + '&' +
            'var0=' + encodeURI('ф+ы01') + '&' +
            'var1=' + encodeURI('ф+ы1') + '&' +
            'var2=' + encodeURI('ф+ы2'));
        
        t.equal(typeof q, 'object');
        t.equal(Object.keys(q).length, 3);
        t.ok(Array.isArray(q.var0));
        t.equal(q.var0[0], 'ф+ы0');
        t.equal(q.var0[1], 'ф+ы01');
        t.equal(q.var1, 'ф+ы1');
        t.equal(q.var2, 'ф+ы2');
        t.end();
    });
    t.test('parse all in one', (t) => {
        const q = qs.parse('?var0=' + encodeURI('ф+ы0') + '&' +
            'var0=' + encodeURI('ф+ы0') + '&' +
            'var0=' + encodeURI('ф+ы01') + '&' +
            'var1=' + encodeURI('ф+ы1') + '&' +
            'var2=' + encodeURI('ф+ы2') + '#hash');
        
        t.equal(typeof q, 'object');
        t.equal(Object.keys(q).length, 3);
        t.ok(Array.isArray(q.var0));
        t.equal(q.var0[0], 'ф+ы0');
        t.equal(q.var0[1], 'ф+ы01');
        t.equal(q.var1, 'ф+ы1');
        t.equal(q.var2, 'ф+ы2');
        t.end();
    });
});