## url-qs

A tool which transfer url between object and string.

```
# Every value should be string when parse string to object

# plain
test('parse to plain object', t => {
    t.deepEqual(fn.parse('a=1&b=2'), {a: '1', b: '2'})
})

test('stringify object with array', t => {
    t.deepEqual(fn.stringify({a: 1, b: [2, 3]}), "a=1&b%5B%5D=2&b%5B%5D=3")
})

test('stringify object with array 2', t => {
    t.deepEqual(fn.stringify({a: 1, b: [2, 3]}), "a=1&b%5B%5D=2&b%5B%5D=3")
})

# complicate object
test('stringify complicate object', t => {
    t.deepEqual(fn.stringify({
        a: 1, 
        b: [2, 3], 
        c: {d: 4, e: [5, 6]},
        f: {g: 7, h: 8}
    }), "a=1&b%5B%5D=2&b%5B%5D=3&c%5Bd%5D=4&c%5Be%5D%5B%5D=5&c%5Be%5D%5B%5D=6&f%5Bg%5D=7&f%5Bh%5D=8")
})
```

#### Install && Usage

```
npm install url-qs --save
```

```
import qs from 'url-qs'

const str = qs.stringify(paramObject)
const obj = qs.parse(str)
```


