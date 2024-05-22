// 给定有一个 Add 函数，要支持以下形式的调用

// Add(1)(2)(3).sumOf(); // 输出 6
// Add(1,2)(3)(4).sumOf(); // 输出 10
// Add(1,2,...)(3)(4)(...).sumOf();  // ...

// 这道题考查了 闭包，函数科里化
function Add() {
  const combineArgs = Array.prototype.slice.call(arguments, 0);
  function fn(...args) {
    combineArgs.push(...args);
    return fn;
  }
  fn.sumOf = function () {
    return combineArgs.reduce((pre, cur) => pre + cur, 0);
  };
  return fn;
}

console.log(Add(1)(2)(3).sumOf()); // 输出 6
console.log(Add(1, 2)(3)(4).sumOf()); // 输出 10
console.log(Add(1, 2)(3)(4)(5).sumOf()); // ...
