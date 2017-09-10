const tape = require('tape');

const uqs = require('../index');

tape.test('stringify', (t) => {
    t.test('undefined', (t) => {
        var qs = uqs.stringify();
        
        t.equal(qs, '');
        t.end();
    });
    t.test('empty object', (t) => {
        var qs = uqs.stringify({});
        
        t.equal(qs, '');
        t.end();
    });
    t.test('undefined param value', (t) => {
        var qs = uqs.stringify({
            var0: undefined
        });
        
        t.equal(qs, '');
        t.end();
    });
    t.test('one none unicode param', (t) => {
        var qs = uqs.stringify({
            var0: 'a+b'
        });
        
        t.equal(qs, 'var0=a+b');
        t.end();
    });
    t.test('one unicode param', (t) => {
        var qs = uqs.stringify({
            var0: 'ф+ы'
        });
        
        t.equal(qs, 'var0=' + encodeURI('ф+ы'));
        t.end();
    });
    t.test('one numeric params names', (t) => {
        var qs = uqs.stringify({
            '0': 'ф+ы'
        });
        
        t.equal(qs, '0=' + encodeURI('ф+ы'));
        t.end();
    });
    t.test('array', (t) => {
        var qs = uqs.stringify({
            var0: ['ф+ы0', 'ф+ы01']
        });
        
        t.equal(qs, 'var0=' + encodeURI('ф+ы0') +
            '&var0=' + encodeURI('ф+ы01'));
        t.end();
    });
    t.test('undefined array param value', (t) => {
        var qs = uqs.stringify({
            var0: ['ф+ы0', undefined]
        });
        
        t.equal(qs, 'var0=' + encodeURI('ф+ы0'));
        t.end();
    });
    t.test('multiple params', (t) => {
        var qs = uqs.stringify({
            var0: 'ф+ы0',
            var1: 'ф+ы1',
            var2: 'ф+ы2',
        });
        
        t.equal(qs, 'var0=' + encodeURI('ф+ы0') +
            '&var1=' + encodeURI('ф+ы1') +
            '&var2=' + encodeURI('ф+ы2'));
        t.end();
    });
    t.test('param value is object', (t) => {
        var qs = uqs.stringify({
            obj: {
                var0: ['ф+ы0', 'ф+ы01'],
                var1: 'ф+ы1',
                var2: 'ф+ы2'
            }
        });
        
        t.equal(qs, 'obj=' + encodeURI(JSON.stringify({
            var0: ['ф+ы0', 'ф+ы01'],
            var1: 'ф+ы1',
            var2: 'ф+ы2'
        })));
        t.end();
    });
    t.test('mixed params', (t) => {
        var qs = uqs.stringify({
            var0: ['ф+ы0', 'ф+ы01'],
            var1: 'ф+ы1',
            var2: 'ф+ы2',
        });
        
        t.equal(qs, 'var0=' + encodeURI('ф+ы0') +
            '&var0=' + encodeURI('ф+ы01') +
            '&var1=' + encodeURI('ф+ы1') +
            '&var2=' + encodeURI('ф+ы2'));
        t.end();
    });
});