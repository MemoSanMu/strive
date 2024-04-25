function log() {
  console.log(name) // undefined
  console.log(age) // error
  var name = 'name'
  let age = 'age'
}
// log() // 这个说对了

function log2() {
  // 原因是同步和异步
  // for循环同步执行
  // settimeout异步执行
  // vat 声明的变量会提升，到作用域顶部，所以循环完后index已经是3了，等到异步执行的时候log的值自然就是3
  for (var index = 0; index < 3; index++) {
    setTimeout(() => {
      console.log(index) // 333  这个说对了
    }, 1)
  }
  // 是因为let 有块级作用域，所以每次循环都是一个新的index
  for (let index = 0; index < 3; index++) {
    setTimeout(() => {
      console.log(index) // 0 1 2  这个说对了
    }, 1)
  }
}

// log2() // 这个说对了

function Parent(name, age) {
  this.name = name
  this.age = age
}
Parent.getContent = () => {
  // this 在node环境这个指向global
  // this 在浏览器环境这个指向window
  //   console.log(this.name, this.age) // undefined undefined
  return this.name + this.age
}

const p = new Parent('zs', '18')

// console.log(Parent.getContent()) // 【这个说错了】，尖头函数定义在window上，所以this指向window，window上没有属性，undefined + undefined = NaN
