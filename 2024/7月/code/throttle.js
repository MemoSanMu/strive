function throttle(func, delay) {
  let preTime = 0;
  return function (...args) {
    const nowTime = Date.now();
    if (nowTime - preTime >= delay) {
      func.apply(this, args);
      preTime = nowTime;
    }
  };
}

// 示例用法
function myFunction() {
  console.log('执行函数');
}

const throttledFunction = throttle(myFunction, 500);

document.addEventListener('scroll', throttledFunction);
