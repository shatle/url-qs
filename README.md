## url-qs

A tool which transfer url between object and string.

```
# Every value should be string when parse string to object

test('parse to plain object', t => {
    t.deepEqual(fn.parse('a=1&b=2'), {a: '1', b: '2'})
})
```
