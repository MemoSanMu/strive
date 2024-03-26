function isObject(params) {
  return Object.prototype.toString.call(params) === '[object Object]'
}

function reactive(target) {
  if (target === null || typeof target !== 'object') {
    return target
  }
  // 监听器
  const observer = new Proxy(target, {
    get(target, prop, receiver) {
      const value = Reflect.get(target, prop, receiver)
      const res = isObject(value) ? reactive(value) : value
      console.log(`获取${prop}:${value}`)
      return res
    },
    set(target, prop, value, receiver) {
      const res = Reflect.set(target, prop, value, receiver)
      console.log(`设置${prop}:${value}`)
      return res
    },
    deleteProperty(target, prop) {
      const res = Reflect.deleteProperty(target, prop)
      console.log(`删除${prop}:res${res}`)
      return res
    }
  })
  return observer
}

const state = reactive({
  foo: 'foo',
  a: { b: 1 }
})
// 1.获取
state.foo // ok
// 2.设置已存在属性
state.foo = 'new fooooooo' // ok
// 3.设置不存在属性
state.dong = 'new dong' // ok
// 4.删除属性
delete state.dong // ok

state.a.b = 'new b' // ok

const arrState = reactive([1, 2])

arrState.pop()
arrState.push(3)
