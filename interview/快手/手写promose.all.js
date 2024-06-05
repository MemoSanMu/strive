function all(arr) {
  return new Promise((resolve, reject) => {
    let count = 0;
    const result = [];
    for (let index = 0; index < arr.length; index++) {
      Promise.resolve(arr[index]).then(
        (res) => {
          count++;
          result[index] = res;
          if (count === arr.length) {
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
