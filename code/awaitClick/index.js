function getElement(cssSelector) {
  // 请完成getElement函数，让后续的程序顺序执行
  const dom = document.querySelector(cssSelector)
  const result = new Proxy(dom, {
    get: (target, prop) => {
      if (!prop.startsWith('await')) {
        return Reflect.get(target, prop)
      }
      const type = prop.replace('await', '').toLowerCase()
      return new Promise((res) => {
        dom.addEventListener(type, res, { once: true })
      })
    }
  })
  return result
}

;(async () => {
  const button = getElement('button')
  let f = true
  while (f) {
    await button.awaitClick
    f = false
    console.log('我被执行了')
  }
  console.log('等待后执行，函数内部，会被影响')
})()
// 自己分析：是因为async await语法，返回promise产生异步，不会影响后续代码执行
console.log('等待后执行，不影响')
