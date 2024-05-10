// 写一个fetch方法，支持超时
function createFetchInstance(config) {
  config = config || { duration: 5000 };
  return function (url, options) {
    const controller = new AbortController(); // 创建终止fetch请求的controller，超时后终止请求
    if (options.signal) {
      // options.signal.onabort = () => {
      //   controller.abort();
      // };
      // 如果传入的signal有abort方法，就用传入的，并且监听传入的终止信号，终止后同时也终止内部的controller
      options.signal.addEventListener('abort', () => {
        controller.abort();
      });
    }
    options = options || { signal: controller.signal };
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        controller.abort(); // 超时取消请求
        reject(new Error('timeout'));
      }, config.duration);
      fetch(url, options).then(resolve, reject);
    });
  };
}

// { duration: 5000 } 默认5s超时
const fetch = createFetchInstance();
