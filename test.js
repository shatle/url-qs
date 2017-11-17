import { test } from "ava";
import fn from "./index";

test('stringify plain object', t => {
    t.deepEqual(fn.stringify({a: 1, b: 2}), "a=1&b=2")
})

test('stringify object with array', t => {
    t.deepEqual(fn.stringify({a: 1, b: [2, 3]}), "a=1&b%5B0%5D=2&b%5B1%5D=3")
})

test('stringify complicate object', t => {
    t.deepEqual(fn.stringify({
        a: 1, 
        b: [2, 3], 
        c: {d: 4, e: [5, 6]},
        f: {g: 7, h: 8}
    }), "a=1&b%5B0%5D=2&b%5B1%5D=3&c%5Bd%5D=4&c%5Be%5D%5B0%5D=5&c%5Be%5D%5B1%5D=6&f%5Bg%5D=7&f%5Bh%5D=8")
})

test('parse to plain object', t => {
    t.deepEqual(fn.parse('a=1&b=2'), {a: '1', b: '2'})
})

test('parse to object with array', t => {
    t.deepEqual(fn.parse('a=1&b%5B0%5D=2&b%5B1%5D=3'), {a: '1', b: ['2', '3']})
})

test('parse to complicate object', t => {
    t.deepEqual(fn.parse('a=1&b%5B0%5D=2&b%5B1%5D=3&c%5Bd%5D=4&c%5Be%5D%5B0%5D=5&c%5Be%5D%5B1%5D=6&f%5Bg%5D=7&f%5Bh%5D=8'), {
        a: '1', 
        b: ['2', '3'], 
        c: {d: '4', e: ['5', '6']},
        f: {g: '7', h: '8'}
    })
})