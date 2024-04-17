const FULFILLED = 'fulfilled' // 成功
const REJECTED = 'rejected' // 失败
const PENDING = 'pending' // 进行中

function handlePromise(promise, x, resolve, reject) {
  if (promise === x) {
    return reject(new TypeError('Chaining cycle detected for promise #<Promise>'))
  }
  if (x && (typeof x === 'object' || typeof x === 'function')) {
    let called
    try {
      const then = x.then
      if (typeof then === 'function') {
        then.call(
          x,
          (res) => {
            if (called) return
            called = true
            handlePromise(promise, res, resolve, reject)
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
        resolve(x)
      }
    } catch (error) {
      if (called) return
      called = true
      reject(error)
    }
  } else {
    resolve(x)
  }
}

class MyPromise {
  state = PENDING
  value = undefined
  reason = undefined
  resolvedCallbackList = []
  fulfilledCallbackList = []
  constructor(executor) {
    function resolve(val) {
      if (this.state === PENDING) {
        this.state = FULFILLED
        this.value = val
        this.resolvedCallbackList.forEach((cb) => cb())
      }
    }
    function reject(reason) {
      if (this.state === PENDING) {
        this.state = REJECTED
        this.reason = reason
        this.fulfilledCallbackList.forEach((cb) => cb())
      }
    }
    try {
      executor(resolve.bind(this), reject.bind(this))
    } catch (error) {
      reject(error)
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
    const resultPromise = new MyPromise((res, rej) => {
      if (this.state === FULFILLED) {
        setTimeout(() => {
          try {
            const r = resolve(this.value)
            handlePromise(resultPromise, r, res, rej)
          } catch (error) {
            rej(error)
          }
        })
      }
      if (this.state === REJECTED) {
        setTimeout(() => {
          try {
            const e = reject(this.reason)
            handlePromise(resultPromise, e, res, rej)
          } catch (error) {
            rej(error)
          }
        })
      }
      if (this.state === PENDING) {
        this.resolvedCallbackList.push(() => {
          setTimeout(() => {
            try {
              const r = resolve(this.value)
              handlePromise(resultPromise, r, res, rej)
            } catch (error) {
              rej(error)
            }
          })
        })
        this.fulfilledCallbackList.push(() => {
          setTimeout(() => {
            try {
              const e = reject(this.reason)
              handlePromise(resultPromise, e, res, rej)
            } catch (error) {
              rej(error)
            }
          })
        })
      }
    })
    return resultPromise
  }
  catch() {
    return this.then(null, arguments[0])
  }
  // mdn 规范
  // https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Promise/finally
  finally(onFinally) {
    return this.then(
      (r) => this.resolve(onFinally()).then(() => r),
      (err) =>
        this.resolve(onFinally()).then(() => {
          throw err
        })
    )
  }
  resolve(res) {
    if (res instanceof Promise) {
      return res
    }
    if (res && typeof res === 'object' && typeof res.then === 'function') {
      return new MyPromise((r, rej) => {
        res.then(r, rej)
      })
    }
    return new MyPromise((resolve) => {
      resolve(res)
    })
  }
  reject(reason) {
    return new MyPromise((_, reject) => {
      reject(reason)
    })
  }
  all(promises) {
    return new MyPromise((resolve, reject) => {
      let count = 0
      let result = []
      for (let index = 0; index < promises.length; index++) {
        MyPromise.resolve(promises[index]).then(
          (res) => {
            result.push(res)
            count++
            if (count === promises.length) {
              resolve(result)
            }
          },
          (err) => {
            reject(err)
          }
        )
      }
    })
  }
  race(promises) {
    return new MyPromise((resolve, reject) => {
      for (let index = 0; index < promises.length; index++) {
        // 谁先执行完，谁就先执行
        MyPromise.resolve(promises[index]).then(resolve, reject)
      }
    })
  }
}

const p = new MyPromise((resolve, reject) => {
  // reject(1);
  setTimeout(() => {
    resolve(1)
  }, 2000)
})
  .then(
    (v) => {
      console.log(v, 'then')
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve(2)
        }, 1000)
      })
    },
    (e) => {
      console.log(e, 'catch')
    }
  )
  .then(
    (v) => {
      console.log(v, 'then2')
      return { 3: '3' }
    },
    (e) => {
      console.log(e, 'catch')
    }
  )
  .then(
    (v) => {
      console.log(v, 'then3')
    },
    (e) => {
      console.log(e, 'catch')
    }
  )

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
