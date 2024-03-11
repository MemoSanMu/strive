Function.prototype.myCall = function (ctx, ...args) {
  if (typeof this !== 'function') {
    return '被调用必须是函数'
  }
  const fn = Symbol('call')
  ctx = ctx || globalThis
  ctx[fn] = this
  const res = ctx[fn](...args)
  delete ctx[fn]
  return res
}

Function.prototype.myApply = function (ctx, args) {
  if (typeof this !== 'function') {
    return '被调用必须是函数'
  }
  if (!Array.isArray(args)) {
    return '参数必须是数组'
  }
  const fn = Symbol('apply')
  ctx = ctx || globalThis
  ctx[fn] = this
  const res = ctx[fn](...args)
  delete ctx[fn]
  return res
}

Function.prototype.myBind = function (ctx, ...args) {
  if (typeof this !== 'function') {
    return '被调用必须是函数'
  }
  const self = this // 指向被bind的函数
  return function Fn() {
    const combine = [...args, ...arguments]
    // this 指向返回的Fn执行后的this
    // 如果this的原型对象指向了Fn本身，说明是new调用
    if (this instanceof Fn) {
      return new self(...combine)
    }
    // 普通调用，直接执行原函数
    return self.apply(ctx, combine)
  }
}

function getName(args) {
  console.log(args, 'p')
}
getName.apply(null, [1, 2])

function getNames(firstName, lastName) {
  // 判断调用方式
  //   1
  if (this.constructor === getNames) {
    console.log(' new 调用')
  } else {
    console.log('普通调用')
  }

  //   2
  //   if (this instanceof getNames) {
  //     console.log(' new 调用')
  //   } else {
  //     console.log('普通调用')
  //   }

  //   3
  //   if (new.target) {
  //     console.log(' new 调用')
  //   } else {
  //     console.log('普通调用')
  //   }

  //   4
  //   'use strict'
  //   try {
  //     this.name = 'BabyChin'
  //     console.log('new调用')
  //   } catch (error) {
  //     console.log('普通调用')
  //   }
  //   this.names = `${firstName} ${lastName}`
  return `${firstName} ${lastName}`
}

const func = getNames.myBind(null, '张三')

console.log(new func('李四'), 'res')
