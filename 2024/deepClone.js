const catchMap = new WeakMap()
function deepClone(val) {
  if (val == null || typeof val !== 'object' || val instanceof Date || val instanceof RegExp) {
    return val
  }
  //   存在过直接取缓存，不循环引用
  if (catchMap.has(val)) {
    return catchMap.get(val)
  }
  if (val instanceof Set) {
    const set = new Set()
    catchMap.set(val, set) // 缓存引用类型
    for (const iterator of val) {
      set.add(deepClone(iterator))
    }
    return set
  }
  if (val instanceof Map) {
    const map = new Map()
    catchMap.set(val, map) // 缓存引用类型
    for (const iterator of val) {
      map.add(deepClone(iterator))
    }
    return map
  }
  const res = Array.isArray(val) ? [] : {}
  Object.setPrototypeOf(res, Object.getPrototypeOf(val)) // 复制原型
  catchMap.set(val, res) // 缓存引用类型
  for (const key in val) {
    // 原型属性不复制，只复制自有属性
    if (val.hasOwnProperty(key)) {
      res[key] = deepClone(val[key])
    }
  }
  return res
}

let map = new Map()
let set = new Set()
set.add(1)

class Http {
  url = ''
  constructor(url = '') {
    this.url = url
  }
  test() {}
}

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
  map: map,
  set: set,
  set2: set,
  h: undefined,
  i: null,
  j: Symbol('j'),
  k: new Date(),
  fun: function fn(params) {
    console.log(params)
  },
  new: new Http()
}

obj.obj2 = obj

const copy = deepClone(obj)

console.log(copy)
