// 首先 promise 这样用的吧
// new Promise((resolve, reject) => {})

const PEDDING = 'pending'

// 基础用法
function MyPromise(cb) {
  const that = this
  that.status = PEDDING
  that.value = null
  that.onFullfilledCallback = [] // 存放成功时的回调函数
  that.onRejectedCallback = [] // 存放时的失败的回调函数

  const resolveFn = (res) => {
    const timer = setTimeout(() => {
      clearTimeout(timer)
      if (that.status === PEDDING) {
        that.status = 'resolved'
        that.value = res
        // 异步完成后 将存储的then函数回调执行并且返回(透传)reslove的结果，在then的时候就能取到 promise内部resolve的 'res'
        that.onFullfilledCallback.forEach((cb) => cb(res))
      }
    })
  }

  const rejectFn = (err) => {
    const timer = setTimeout(() => {
      clearTimeout(timer)
      if (that.status === PEDDING) {
        that.status = 'rejected'
        that.value = err
        that.onRejectedCallback.forEach((cb) => cb(err))
      }
    })
  }

  return cb(resolveFn, rejectFn)
}

MyPromise.prototype.then = function (resolve, reject) {
  // 把then的回掉函数存在this内部
  if (this.status === PEDDING) {
    this.onFullfilledCallback.push(resolve)
  }
  if (this.status === PEDDING) {
    this.onRejectedCallback.push(reject)
  }
}

const pro = new MyPromise((resolve, reject) => {
  // todo: 执行异步
  // 一步调用接口
  setTimeout(() => {
    // 成功后返回
    resolve('res')
  }, 1000)

  // 接口异常 ｜ 接口异常
  // reject('error')
}).then((res) => {
  console.log('resolve', res)
})
