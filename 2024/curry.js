// 定义一个普通的函数，它接收两个参数并返回他们的和
function add(x, y) {
  return x + y
}

// 编写一个curry函数，它可以对任何函数进行科里化
function curry(fn) {
  const args = Array.prototype.slice.call(arguments, 1)
  return function () {
    const combine = args.concat(Array.prototype.slice.call(arguments))
    if (combine.length >= fn.length) {
      return fn.apply(this, combine)
    } else {
      return curry.call(this, fn, ...combine)
    }
  }
}

// 使用curry函数对add进行科里化
var curriedAdd = curry(add)
console.log(curriedAdd(2)(3))
