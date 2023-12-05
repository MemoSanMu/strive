// 红灯3秒亮一次，黄灯2秒亮一次，绿灯1秒亮一次；如何让三个灯不断交替重复亮灯？（用Promise实现）三个亮灯函数已经存在：

function red() {
  console.log('red');
  return 'red';
}
function green() {
  console.log('green');
  return 'green';
}
function yellow() {
  console.log('yellow');
  return 'yellow';
}

function next(d, cb, type) {
  return new Promise((resolve, reject) => {
    try {
      setTimeout(() => {
        resolve(cb());
      }, d);
    } catch (error) {
      reject(error);
    }
  });
}

let count = 0;
const maxCount = 5;

function lamp() {
  count++;
  return Promise.resolve(next(1000, green))
    .then(() => next(2000, yellow))
    .then(() => next(3000, red))
    .then(() => {
      // 暂时控制执行maxCount次
      if (count < maxCount) {
        lamp();
      }
    });
}

lamp();
