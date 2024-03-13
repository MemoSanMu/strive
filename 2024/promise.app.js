function promiseAll(promises) {
  return new Promise((resolve, reject) => {
    const result = []
    let count = 0
    for (let i = 0; i < promises.length; i++) {
      Promise.resolve(promises[i])
        .then((res) => {
          result[i] = res
          if (++count === promises.length) {
            resolve(result)
          }
        })
        .catch((err) => reject(err))
    }
  })
}
