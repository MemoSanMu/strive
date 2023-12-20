// 设计一个 超时函数
// 支持传入 promise 和 time，如果超时了，就返回函数超时，如果没有, 就返回 promise 的执行结果

function timer(time) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      reject('函数超时');
    }, time);
  });
}

function timeout(promise, time) {
  return Promise.race([promise(time - 1), timer(time)]);
}

function p(time) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('res');
    }, time);
  });
}

timeout(p, 2000)
  .then((res) => {
    console.log(res, ' res');
  })
  .catch((err) => {
    console.log(err, 'err');
  });
