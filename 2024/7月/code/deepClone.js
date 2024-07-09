const catchMap = new WeakMap();
function deepClone(obj) {
  // 基本数据类型直接返回
  if (
    obj === null ||
    typeof obj !== 'object' ||
    obj instanceof Date ||
    obj instanceof RegExp
  ) {
    return obj;
  }
  if (catchMap.has(obj)) {
    return catchMap.get(obj);
  }
  if (obj instanceof Set) {
    const set = new Set();
    for (const iterator of obj) {
      set.add(deepClone(iterator));
    }
    catchMap.set(obj, set);
    return set;
  }
  if (obj instanceof Map) {
    const map = new Map();
    for (const iterator of obj) {
      map.set(deepClone(iterator));
    }
    catchMap.set(obj, map);
    return map;
  }
  // 深拷贝
  const res = Array.isArray(obj) ? [] : {};
  Object.setPrototypeOf(res, Object.getPrototypeOf(obj)); // 复制原型
  catchMap.set(obj, res);
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      const element = obj[key];
      res[key] = deepClone(element);
    }
  }
  return res;
}

const obj = {
  a: 1,
  b: [1, 2, 3, 4],
  c: Number(3),
  d: String(4),
  e: {
    e1: 1,
    e2: [1, 2, 3],
  },
  f: new RegExp(),
  h: undefined,
  i: null,
  j: Symbol('j'),
  k: new Date(),
  l: new Set(),
  m: new Map(),
  n: function () {},
  o: () => {},
};
obj.self = obj;

const res = deepClone(obj);
console.log(res);
