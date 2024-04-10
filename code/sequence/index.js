// 实现函数 compose，compose 接受多个函数作为参数，并返回一个新的函数，新的函数会从右向左依次执行原函数， 并且上一次结果的返回值将会作为下一个函数的参数。

function sequence(...funcs) {
  return function (val) {
    return funcs.reduceRight((pre, curCb) => curCb(pre), val)
  }
}

function multiplyTwo(num) {
  return num * 2
}
function minusOne(num) {
  return num - 1
}
function addTwo(num) {
  return num + 2
}
function addThree(num) {
  return num + 3
}

const res = sequence(addThree, addTwo, minusOne, multiplyTwo)(10) //24˜

console.log(res, 'res')

// 真骚;
/**
 * Return a function that executes a sequence of functions from left to right,
 * passing the result of a previous operation to the next  *返回从左到右执行一系列函数的函数，

*将上一个操作的结果传递给下一个操作
 *
 * @param {...funcs}
 * @return {Function}
 */

// export function sequence(...funcs) {
//   return function (value) {
//     return funcs.reduce((val, fn) => fn.call(null, val), value)
//   }
// }
