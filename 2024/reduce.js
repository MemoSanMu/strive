// https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce#accumulator

Array.prototype.handReduce = function (fn, init) {
  const self = this
  //  判断是不是数组
  if (!self || !self.length) {
    throw new TypeError('reduce of empty array with no initial value')
  }
  if (typeof fn !== 'function') {
    throw new TypeError('fn is not function')
  }
  let pre = init
  let i = 0
  if (init === undefined) {
    pre = self[i]
    i = 1
  }
  while (i < self.length) {
    pre = fn(pre, self[i], i, self)
    i++
  }
  return pre
}

const reduceArr = [15, 16, 17, 18, 19]

const res = reduceArr.handReduce((pre, cur) => {
  return pre + cur
}, 5)

console.log(res, 'res')
console.log([15, 16, 17, 18, 19].reduce((p, c) => p + c))
