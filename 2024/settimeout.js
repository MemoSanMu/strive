// 模拟settimeout

function mySetTimeout(fn, time) {
  const preTime = +new Date()
  function loop() {
    const id = window.requestAnimationFrame(loop)
    if (+new Date() - preTime >= time) {
      fn.call(null)
      window.cancelAnimationFrame(id)
    }
  }
  window.requestAnimationFrame(loop)
}

mySetTimeout(function () {
  console.log('2s后执行')
}, 2000)
