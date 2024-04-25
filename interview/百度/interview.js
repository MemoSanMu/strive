async function async1() {
  console.log('async1 start', 2) // 2
  await async2()
  console.log('async1 end', 7) // 7
}
async function async2() {
  new Promise(function (resolve) {
    console.log('promise1', 3) // 3
    resolve()
  }).then(function () {
    console.log('promise2', 6) // 6
  })
}
console.log('script start', 1) // 1
setTimeout(function () {
  console.log('setTimeout', 9) // 9
}, 0)
async1()
new Promise(function (resolve) {
  console.log('promise3', 4) // 4
  resolve()
}).then(function () {
  console.log('promise4', 8) // 8
})
console.log('script end', 5) // 5

// 这个输出说错了，挂了
