function add() {
  return [...arguments].reduce((pre, cur) => pre + cur, 0);
}
function carry(fn) {
  const combineArgs = [].slice.call(arguments, 1);
  function _carry(...args) {
    const params = [...combineArgs, ...args];
    console.log(params, 'params');
    return carry.apply(null, [fn, ...params]);
  }
  _carry.toString = function () {
    return fn.apply(null, combineArgs);
  };
  return _carry;
}

const sum = carry(add);

const val = sum(1)(2)(3)(4);

console.log(+val, 'val');

// sum(1)(2)(3) // 6
