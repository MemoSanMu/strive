// sum（1，2，3）（）
// sum（1）（2）（3）（）

function sum() {
  const args = Array.prototype.slice.call(arguments);
  function fn() {
    const curArgs = Array.prototype.slice.call(arguments);
    return curArgs.length
      ? sum.call(null, ...args.concat(curArgs))
      : args.reduce((pre, cur) => pre + cur, 0);
  }
  //   fn.getSum = () => args.reduce((pre, cur) => pre + cur, 0);
  return fn;
}

// const res = sum(1, 2, 3)();
const res = sum(1, 2)(3, 4)(5)(6)();

console.log(res);

// sum(1, 2)(3, 4)(5)(6)();
