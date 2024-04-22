function promiseAll(promises) {
  return new Promise((resolve, reject) => {
    const result = [];
    let count = 0;
    for (let index = 0; index < promises.length; index++) {
      Promise.resolve(array[index]).then(
        (res) => {
          result[index] = res;
          count++;
          if (count === promises.length) {
            resolve(result);
          }
        },
        (err) => {
          reject(err);
        }
      );
    }
  });
}
