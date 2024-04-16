Function.prototype.myCall = function (context, ...args) {
  if (typeof this !== 'function') {
    throw new TypeError('被调用必须是函数')
  }
  content = context || globalThis
  const self = symbol('fn')
  context[self] = this
  const res = context[self](...args)
  delete context[self]
  return res
}

Function.prototype.myBind = function (context, ...args) {
  if (typeof this !== 'function') {
    throw new TypeError('被调用必须是函数')
  }
  const self = this
  return function () {
    const combineArgs = [...args, ...arguments]
    if (new.target) {
      return new self(...combineArgs) // new 调用函数
    }
    return self.apply(context, combineArgs) // 执行调用函数
  }
}

Function.prototype.myApply = function (context, args) {
  if (typeof this !== 'function') {
    throw new TypeError('被调用必须是函数')
  }
  content = context || globalThis
  const self = symbol('fn')
  context[self] = this
  const res = context[self](...args)
  delete context[self]
  return res
}
