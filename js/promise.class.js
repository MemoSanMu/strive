class MyPromise {
  static PENDING = 'pending'
  static FULFILLED = 'fulfilled'
  static REJECTED = 'rejected'
  constructor(cb) {
    this.state = MyPromise.PENDING
    this.value = undefined
    this.reason = undefined
    this.onFulfilledCallback = []
    this.onRejectedCallback = []
    try {
      cb(this.resolveFn.bind(this), this.rejectFn.bind(this))
    } catch (err) {
      this.rejectFn(err)
    }
  }
  resolveFn(v) {
    if (this.state === MyPromise.PENDING) {
      this.state = MyPromise.FULFILLED
      this.value = v
      // 异步完成后 将存储的then函数回调执行并且返回(透传)resolve的结果，在then的时候就能取到 promise内部resolve的 'res'
      this.onFulfilledCallback.forEach((fn) => fn())
    }
  }
  rejectFn(reason) {
    if (this.state === MyPromise.PENDING) {
      this.state = MyPromise.REJECTED
      this.reason = reason
      this.onRejectedCallback.forEach((fn) => fn())
    }
  }
  then(resolve, reject) {
    resolve = typeof resolve === 'function' ? resolve : (v) => v
    reject =
      typeof reject === 'function'
        ? reject
        : (e) => {
            throw e
          }
    const resultNewPromise = new MyPromise((newResolve, newReject) => {
      // 已完成 状态 直接执行
      // 里面直接使用this是因为，内部在箭头函数中，没有this指向，所以this还是指向外层的then对象的this
      if (this.state === MyPromise.FULFILLED) {
        setTimeout(() => {
          try {
            const res = resolve(this.value)
            handleResolvePromise(resultNewPromise, res, newResolve, newReject)
          } catch (error) {
            newReject(error)
          }
        })
      }
      // 已失败 状态 直接执行
      if (this.state === MyPromise.REJECTED) {
        setTimeout(() => {
          try {
            const res = reject(this.reason)
            handleResolvePromise(resultNewPromise, res, newResolve, newReject)
          } catch (error) {
            newReject(error)
          }
        })
      }
      // 等待状态
      // 把then的回掉函数存储
      if (this.state === MyPromise.PENDING) {
        this.onFulfilledCallback.push(() => {
          setTimeout(() => {
            try {
              const res = resolve(this.value)
              handleResolvePromise(resultNewPromise, res, newResolve, newReject)
            } catch (error) {
              newReject(error)
            }
          })
        })
        this.onRejectedCallback.push(() => {
          setTimeout(() => {
            try {
              const res = reject(this.reason)
              handleResolvePromise(resultNewPromise, res, newResolve, newReject)
            } catch (error) {
              newReject(error)
            }
          })
        })
      }
    })
    return resultNewPromise
  }
  static resolve(val) {
    if (val instanceof MyPromise) {
      return val
    }

    if (typeof val === 'object') {
      return new MyPromise((resolve, reject) => {
        if (val.then) {
          if (typeof val.then === 'function') {
            val.then(resolve, reject)
          } else {
            resolve(val)
          }
        } else {
          resolve(val)
        }
      })
    } else {
      return new MyPromise((resolve, reject) => {
        resolve(val)
      })
    }
  }
  all(promises) {
    return new MyPromise((resolve, reject) => {
      let count = 0
      const result = []
      for (let index = 0; index < promises.length; index++) {
        MyPromise.resolve(promises[index]).then(
          (res) => {
            result.push(res)
            count++
            if (count === promises.length) {
              resolve(result)
            }
          },
          (err) => reject(err)
        )
      }
    })
  }
  catch(reject) {
    return this.then(undefined, reject)
  }
  finally(fn) {
    return this.then(fn, fn)
  }
  race(promises) {
    return new MyPromise((resolve, reject) => {
      for (let index = 0; index < promises.length; index++) {
        MyPromise.resolve(promises[index]).then(resolve, reject)
      }
    })
  }
}

const pro = new MyPromise((resolve, reject) => {
  // todo: 执行异步
  // 一步调用接口
  setTimeout(() => {
    // 成功后返回
    resolve('res')
    // reject('error')
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
  .then()
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
  .catch((err) => {
    console.log(err, 'err')
  })

function handleResolvePromise(newP, result, resolve, reject) {
  // 循环引用
  if (newP === result) {
    reject(new TypeError('Chaining cycle'))
  }

  // 如果result不为空，且是函数或者对象
  if (result && (typeof result === 'object' || typeof result === 'function')) {
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

// 通过插件 promise-aplus-tests 跑测试用例
// 第一步 全局下载 promises-aplus-tests  yarn global add promises-aplus-tests
// 第二步 创建 package.json 文件,写入以下内容
// {
//   "scripts": {
//     "test": "promises-aplus-tests ./js/promise.class.js"
//   }
// }
// 第三步 执行 yarn test

MyPromise.defer = MyPromise.deferred = function () {
  let dfd = {}
  dfd.promise = new MyPromise((resolve, reject) => {
    dfd.resolve = resolve
    dfd.reject = reject
  })
  return dfd
}
module.exports = MyPromise
