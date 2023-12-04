const catchMap = new WeakMap(); // 缓存对象 防止无限循环

function deepClone(val) {
  if (val === null || typeof val !== 'object' || val instanceof Date || val instanceof RegExp) {
    return val;
  }
  if (catchMap.has(val)) {
    return catchMap.get(val);
  }
  if (val instanceof Set) {
    const resSet = new Set();
    catchMap.set(val, resSet);
    for (const iterator of val) {
      resSet.add(deepClone(iterator));
    }
    return resSet;
  }
  if (val instanceof Map) {
    const resMap = new Map();
    catchMap.set(val, resMap);
    for (const iterator of val) {
      resMap.set(iterator[0], deepClone(iterator[1]));
    }
    return resMap;
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

let map = new Map();
map.set('key1', 1);
map.set('key2', [1, 2, 3]);
let set = new Set();
set.add([1, 2, 3]);
set.add(123);

let set2 = new Set();
set2.add([2, 3, 4]);
set2.add(67);

const obj = {
  a: 1,
  b: [1, 2, 3, 4],
  c: Number(3),
  d: String(4),
  e: {
    e1: 1,
    e2: [1, 2, 3]
  },
  f: new RegExp(),
  g: map,
  s: set,
  set2,
  h: undefined,
  i: null,
  j: Symbol('j'),
  k: new Date(),
  p: new Person('zhangsan', 18)
};

Person.prototype.prototype_1 = 1;

obj.o = obj;

const res = deepClone(obj);
console.log(res, 'deepClone');
