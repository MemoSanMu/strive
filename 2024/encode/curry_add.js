// add(1) // 1
// add(1)(2) // 3
// add(1)(3)(5) // 9
// add(1, 2, 3, 4) // 10

function add(a, b, c) {
  return a + b + c;
}

function curry(fn) {
  const argLens = fn.length; // 取到的是参数的长度
  const args = Array.prototype.slice.call(arguments, 1);
  return function _curry() {
    const combineArgs = args.concat(Array.prototype.slice.call(arguments));
    if (combineArgs.length === argLens) {
      return fn.call(this, ...combineArgs);
    }
    return curry.apply(this, [fn, ...combineArgs]);
    // return (..._args) => {
    //   return _curry.apply(this, args.concat(_args));
    // };
  };
}

const curriedAdd = curry(add);
console.log(curriedAdd(1)(2)(3));
