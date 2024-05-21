const add = (a, b) => a + b;
const calc = memoize(add); // 函数缓存

function memoize(fn) {
  const curCatch = new Map();
  return function (...args) {
    if (curCatch.has(args)) {
      return curCatch.get(args);
    }
    const res = fn.apply(null, args);
    curCatch.set(args, res);
    return res;
  };
}

// calc(10, 20); // 30
// calc(10, 20); // 30 缓存

console.log(calc(10, 20)); // 30
console.log(calc(10, 20)); // 30 缓存
