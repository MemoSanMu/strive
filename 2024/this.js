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
    const params = [...args, ...arguments]
    if (new.target) {
      return new self(...params)
    }
    return this.apply(context, params)
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
