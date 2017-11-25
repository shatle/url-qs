'use strict';
// encode '[' = '%5B', ']' = '%5D'
function transferObject(obj, prefix) {
    var str = [], p;
    if (Array.isArray(obj)) {
        for(p in obj) {
            if (obj.hasOwnProperty(p)) {
                var k = prefix ? prefix + "[]" : p, v = obj[p];
                str.push((v !== null && typeof v === "object") ?
                transferObject(v, k) :
                encodeURIComponent(k) + "=" + encodeURIComponent(v));
            }
        }
    } else {
        for(p in obj) {
            if (obj.hasOwnProperty(p)) {
                var k = prefix ? prefix + "[" + p + "]" : p, v = obj[p];
                str.push((v !== null && typeof v === "object") ?
                transferObject(v, k) :
                encodeURIComponent(k) + "=" + encodeURIComponent(v));
            }
        }
    }
    return str.filter(e => e).join("&");
}

function _isNaN(key) {
    return key + '' === 'NaN'
}

function transferKeyValue(key, val, obj) {
    if (_isNaN(+key)) {
        // 如果是非数值
        var bracketStartIndex = key.indexOf('[')
        var bracketEndIndex = key.indexOf(']')
        if (bracketStartIndex > -1 && bracketEndIndex > -1) {
            var firstKey = key.slice(0, bracketStartIndex)
            var secondKey = key.slice(bracketStartIndex + 1, bracketEndIndex)
            if (bracketEndIndex + 1 !== key.length) {
                var res = key.slice(bracketEndIndex + 1)
                obj[firstKey] = obj[firstKey] || {}
                transferKeyValue(secondKey + res, val, obj[firstKey])
            } else {
                obj[firstKey] = obj[firstKey] || (_isNaN(+secondKey) ? {} : [])
                transferKeyValue(secondKey, val, obj[firstKey])
            }
        } else {
            obj[key] = val
        }
    } else {
        obj.push(val)
    }
}

exports.stringify = function (obj) {
    return transferObject(obj)
}

exports.parse = function (queryString) {
    var result = {}
    queryString.split('&').forEach(function(part) {
        if(!part) return;
        part = part.split('+').join(' ');
        var eq = part.indexOf('=');
        var key = decodeURIComponent(eq > -1 ? part.substr(0, eq) : part);
        var val = eq > -1 ? decodeURIComponent(part.substr(eq + 1)) : '';
        transferKeyValue(key, val, result)
    });
    return result;
}
