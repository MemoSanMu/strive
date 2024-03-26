function defineReactive(target, prop, val) {
  observe(val)
  let curData = target[prop]
  Object.defineProperty(target, prop, {
    get() {
      console.log(`get ${prop}:${val}`)
      return val
    },
    set(newValue) {
      if (newValue !== val) {
        console.log(`set ${prop}:${newValue}`)
        curData = newValue
      }
    }
  })
}

function observe(obj) {
  if (typeof obj !== 'object' || obj === null) {
    return
  }
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      defineReactive(obj, key, obj[key])
    }
  }
}

const obj = {
  foo: 'foo',
  bar: 'bar'
}
observe(obj)
delete obj.foo // no ok
obj.new = 'new' // no ok
obj.bar = 'new bar' //  ok
obj.bar //  ok

const arr = [1, 2]
observe(arr)
arr[1] // ok
arr[0] = 'new 1' // ok
arr[2] = 3 // no ok
arr.push('push')

// 监听不到对象的删除、新增操作
// 监听不到数据的添加操作
