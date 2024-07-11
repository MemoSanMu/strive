// 迭代器
function* getIterator(params) {
  let res = '';
  for (const iterator of params) {
    if (iterator === '-') {
      yield res;
      res = '';
    } else {
      res += iterator;
    }
  }
  if (res) {
    yield res;
  }
}

// 获取迭代器
function* getIteratorObj(params) {
  for (const key in params) {
    yield params[key];
  }
}

const iterator = getIteratorObj({ a: 1, b: 2, c: 3, d: 4, e: 5 });
console.log(iterator.next());
console.log(iterator.next());
console.log(iterator.next());
console.log(iterator.next());
console.log(iterator.next());
console.log(iterator.next());
