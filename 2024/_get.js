var object = { a: [{ b: { c: 3 } }] };

// _.get(object, 'a[0].b.c');
// // => 3

// _.get(object, ['a', '0', 'b', 'c']);
// // => 3

// _.get(object, 'a.b.c', 'default');
// // => 'default'

function get(params, path, defaultValue) {
  let res = params;
  if (typeof path === 'string') {
    const reg = /[^\[\].]+/g;
    path = path.match(reg);
  }
  for (const key of path) {
    if (!res) {
      return defaultValue;
    }
    res = res[key];
  }
  return res === undefined ? defaultValue : res;
}

console.log(get(object, 'a[0].b.c'));
// // => 3

console.log(get(object, ['a', '0', 'b', 'c']));
// // => 3

console.log(get(object, 'a.b.c', 'default'));
// // => 'default'
