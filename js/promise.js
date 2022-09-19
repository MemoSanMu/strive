// 首先 promise 这样用的吧
// new Promise((resolve, reject) => {})

const PENDING = 'pending'
const FULFILLED = 'fulfilled'
const REJECTED = 'fulfilled'

// 基础用法
function MyPromise(cb) {
  this.status = PENDING
  this.value = undefined
  this.reason = undefined
  this.onFulfilledCallback = [] // 存放成功时的回调函数
  this.onRejectedCallback = [] // 存放时的失败的回调函数
  const that = this

  // resolveFn（）和rejected（）这里为什么要用setTimeout将它变为异步执行呢？
  // 因为如果不用setTimeout这种方式的话，若Promise里面的代码是同步代码，在执行到reject或者resolve的时候，还没有执行then，所以数组里还没有值，
  // 这个时候调用的话不会报错但是不会输出任何结果，用setTimeout转为异步的话，会先去执行then方法，将回调收集到数组里，然后再去执行异步任务，这个时候就有值了
  const resolveFn = (res) => {
    const timer = setTimeout(() => {
      clearTimeout(timer)
      if (that.status === PENDING) {
        that.status = FULFILLED
        that.value = res
        // 异步完成后 将存储的then函数回调执行并且返回(透传)resolve的结果，在then的时候就能取到 promise内部resolve的 'res'
        that.onFulfilledCallback.forEach((cb) => cb(res))
      }
    })
  }

  const rejectFn = (err) => {
    const timer = setTimeout(() => {
      clearTimeout(timer)
      if (that.status === PENDING) {
        that.status = REJECTED
        that.reason = err
        that.onRejectedCallback.forEach((cb) => cb(err))
      }
    })
  }

  return cb(resolveFn, rejectFn)
}

const handleResolvePromise = (newP, result = undefined, resolve, reject) => {
  // 循环引用
  if (newP === result) {
    return reject(new TypeError('循环引用'))
  }

  // 如果result不为空，且是函数或者对象
  if (
    result !== null &&
    (typeof result === 'object' || typeof result === 'function')
  ) {
    let called
    try {
      const then = result.then
      if (typeof then === 'function') {
        then.call(
          result,
          (res) => {
            if (called) return
            called = true
            handleResolvePromise(newP, res, resolve, reject)
          },
          (err) => {
            if (called) return
            called = true
            reject(err)
          }
        )
      } else {
        if (called) return
        called = true
        resolve(result)
      }
    } catch (error) {
      if (called) return
      called = true
      reject(error)
    }
  } else {
    resolve(result)
  }
}

// 执行then，将then的cb参数存储到对应的执行队列中
MyPromise.prototype.then = function (resolve, reject) {
  const that = this
  const resultNewPromise = new MyPromise((newResolve, newReject) => {
    // 已完成 状态 直接执行
    if (that.status === FULFILLED) {
      const res = resolve(that.value)
      handleResolvePromise(resultNewPromise, res, newResolve, newReject)
    }
    // 已失败 状态 直接执行
    if (that.status === REJECTED) {
      const res = reject(that.reason)
      handleResolvePromise(resultNewPromise, res, newResolve, newReject)
    }
    // 等待状态
    // 把then的回掉函数存储
    if (that.status === PENDING) {
      that.onFulfilledCallback.push(() => {
        const res = resolve(that.value)
        handleResolvePromise(resultNewPromise, res, newResolve, newReject)
      })
      that.onRejectedCallback.push(() => {
        const res = reject(that.reason)
        handleResolvePromise(resultNewPromise, res, newResolve, newReject)
      })
    }
  })
  return resultNewPromise
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
})
  .then((res) => {
    console.log(`第一次log ${res}`)
    return new MyPromise((resolve) => {
      setTimeout(() => {
        resolve(`新new promise`)
      }, 200)
    })
  })
  .then((res) => {
    console.log(`第二次log ${res}`)
    return `第二次return ${res}`
  })
  .then((res) => {
    console.log(`第三次log ${res}`)
    return {
      res,
    }
  })
  .then((res) => {
    console.log('last then', res)
  })
