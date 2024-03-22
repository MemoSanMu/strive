const observeCallback = []

function observable(obj) {
  return new Proxy(obj, {
    set(target, name, value, receiver) {
      const suc = Reflect.set(target, name, value, receiver)
      observeCallback.forEach((observe) => observe())
      return suc
    }
  })
}

function observe(handle) {
  observeCallback.push(handle)
}

const person = observable({
  name: '张三',
  age: 20
})

function print() {
  console.log(`${person.name}, ${person.age}`)
}

observe(print)
person.name = '李四'
person.age = 18
// 输出
// 李四, 20
