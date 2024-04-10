function myInstanceof(left, right) {
  // 核心是左侧实力对象和右侧构造函数的关系是否存在
  // 返回boolean
  // 那么首先判断左侧是不是对象或者函数
  // object function
  if (!['object', 'function'].includes(typeof left) || left === null) {
    // throw new TypeError('需要函数')
    return false
  }
  // 判断左侧的__proto__ === 右侧的prototype
  // 获取原型
  let proto = Object.getPrototypeOf(left) // __proto__
  while (proto !== null) {
    if (proto === right.prototype) {
      return true
    }
    proto = Object.getPrototypeOf(proto)
  }
  //   最后兜底情况
  return false
}

class MyClass {}

const obj = new MyClass()

console.log(myInstanceof(obj, MyClass)) // true
console.log(myInstanceof(obj, Array)) // false

let Fn = function () {}
let p1 = new Fn()

console.log(myInstanceof({}, Object)) // true
console.log(myInstanceof(p1, Fn)) // true
console.log(myInstanceof({}, Fn)) // false
console.log(myInstanceof(null, Fn)) // false
console.log(myInstanceof(1, Fn)) // false
console.log(myInstanceof(function a() {}, Function)) // true
