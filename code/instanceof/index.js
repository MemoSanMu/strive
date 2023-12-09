// 在 JavaScript 中，可以使用原型链来实现类似于 instanceOf 的功能。instanceOf 实际上是检查一个对象的原型链中是否存在指定的构造函数。

function myInstanceOf(left, right) {
  if (!['object', 'function'].includes(typeof left) || left === null) {
    return false;
  }

  let proto = Object.getPrototypeOf(left);
  while (proto !== null) {
    if (proto === right.prototype) {
      return true;
    }
    proto = Object.getPrototypeOf(proto);
  }
  return false;
}

class MyClass {}

const obj = new MyClass();

console.log(myInstanceOf(obj, MyClass)); // true
console.log(myInstanceOf(obj, Array)); // false

let Fn = function () {};
let p1 = new Fn();

console.log(myInstanceOf({}, Object)); // true
console.log(myInstanceOf(p1, Fn)); // true
console.log(myInstanceOf({}, Fn)); // false
console.log(myInstanceOf(null, Fn)); // false
console.log(myInstanceOf(1, Fn)); // false
console.log(myInstanceOf(function a() {}, Function)); // true
