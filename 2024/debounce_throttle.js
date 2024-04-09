function debounce(fn, d) {
  let timer = null
  return function (...args) {
    if (timer) clearTimeout(timer)
    timer = setTimeout(() => {
      fn.apply(this, args)
      timer = null
    }, d)
  }
}

function throttle(fn, duration) {
  let preTime = 0
  return function (...args) {
    let now = Date.now()
    if (now - preTime >= duration) {
      preTime = now
      fn.apply(this, args)
    }
  }
}
