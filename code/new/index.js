function myNew(fn, ...args) {
  const obj = {}; // 创建空对象
  obj.__proto__ = fn.prototype; // 将空对象的原型指向被new函数的原型
  const res = fn.apply(obj, args); // apply调用函数，传入this obj新对象
  return res instanceof Object ? res : obj; // 返回时判断如果函数返回的是对象，返回新对象，否则返回obj
}
