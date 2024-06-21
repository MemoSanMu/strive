var object = { a: [{ b: { c: 3 } }] };

// _.get(object, 'a[0].b.c');
// // => 3

// _.get(object, ['a', '0', 'b', 'c']);
// // => 3

// _.get(object, 'a.b.c', 'default');
// // => 'default'

function get(obj, path, defaultValue) {
  let res = obj;
  if (typeof path === 'string') {
    const matchReg = /[^\[\].]+/g;
    const matchArr = path.match(matchReg);
    path = matchArr;
  }
  for (const val of path) {
    if (!res) {
      return defaultValue;
    }
    res = res[val];
  }
  return res === undefined ? defaultValue : res;
}

console.log(get(object, 'a[0].b.c'));
// // => 3

console.log(get(object, ['a', '0', 'b', 'c']));
// // => 3

console.log(get(object, 'a.b.c', 'default'));
// // => 'default'
