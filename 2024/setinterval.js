function setinterval(fn, duration) {
  let running = true
  let pre = Date.now()
  function run() {
    if (Date.now() - pre >= duration) {
      pre = Date.now()
      fn(pre)
    }
    running && requestAnimationFrame(run)
  }
  run()
  return () => {
    running = false
  }
}

let count = 1
const stop = setinterval(function () {
  if (count >= 3) {
    stop()
  }
  count++
  console.log(arguments)
}, 1000)
