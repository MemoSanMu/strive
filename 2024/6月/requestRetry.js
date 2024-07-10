// 实现一个request，可以在失败的时候重试，有interval和maxCount参数
function request(url, ops = {}, maxCount = 3, interval = 200) {
  let resolve, reject;
  const instance = new Promise((res, rej) => {
    resolve = res;
    reject = rej;
  });

  function retry(maxCount) {
    setTimeout(() => {
      console.log('requestRetry', maxCount);
      requestRetry(maxCount - 1);
    }, interval);
  }

  function requestRetry(maxCount) {
    fetch(url, ops)
      .then((res) => {
        if (res.status === 200) {
          return resolve(res);
        }
        if (maxCount > 0) {
          retry(maxCount);
        } else {
          reject(res);
        }
      })
      .catch((err) => {
        if (maxCount > 0) {
          retry(maxCount);
        } else {
          reject(err);
        }
      });
  }
  requestRetry(maxCount);
  return instance;
}
// 正确的地址https://zmage.caldis.me/imgSet/childsDream/1.jpg
request('https://zmage.caldis.me/imgSet/childsDream/13.jpg', {
  method: 'GET',
})
  .then((res) => {
    console.log(res, 'request res');
  })
  .catch((err) => {
    console.log(err, 'request err');
  });
