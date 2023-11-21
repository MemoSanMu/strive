const catchMap = new WeakMap(); // 缓存对象 防止无限循环

function deepClone(val) {
  if (typeof val !== 'object' || typeof val === null) {
    return val;
  }
  if (catchMap.has(val)) {
    return catchMap.get(val);
  }
  let res = Array.isArray(val) ? [] : {};
  Object.setPrototypeOf(res, Object.getPrototypeOf(val)); // 设置原型，res的原型为val的原型。保证原型统一
  catchMap.set(val, res);
  for (const key in val) {
    // hasOwnProperty 只克隆对象本身的属性，不克隆原型链上的属性
    if (val.hasOwnProperty(key)) {
      res[key] = deepClone(val[key]);
    }
  }
  return res;
}

class Person {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }
  getName() {}
}

const obj = new Person();

Person.prototype.a = 1;

obj.o = obj;

const res = deepClone(obj);
console.log(res, 'res');
