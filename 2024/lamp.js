// 红灯3秒亮一次，黄灯2秒亮一次，绿灯1秒亮一次；如何让三个灯不断交替重复亮灯？（用Promise实现）三个亮灯函数已经存在：

function red() {
  console.log('red')
  return 'red'
}
function green() {
  console.log('green')
  return 'green'
}
function yellow() {
  console.log('yellow')
  return 'yellow'
}

function next(cb, duration) {
  return new Promise((resolve, reject) => {
    try {
      setTimeout(() => {
        resolve(cb())
      }, duration)
    } catch (error) {
      reject(error)
    }
  })
}

function lamp() {
  // do something
  next(green, 1000)
    .then(() => next(yellow, 1000))
    .then(() => next(red, 1000))
    .finally(() => {
      lamp()
    })
}

lamp()
