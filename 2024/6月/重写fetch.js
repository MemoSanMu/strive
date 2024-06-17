const originalFetch = window.fetch;

function monitorableFetch(url, options = {}) {
  const startTime = new Date().getTime();

  return originalFetch(url, options)
    .then((response) => {
      const endTime = new Date().getTime();
      const duration = endTime - startTime;

      console.log(
        `接口: ${url}, 状态码: ${response.status}, 耗时: ${duration}ms`
      );

      return response;
    })
    .catch((error) => {
      const endTime = new Date().getTime();
      const duration = endTime - startTime;

      console.error(`接口: ${url}, 出错, 耗时: ${duration}ms, 错误: ${error}`);

      throw error;
    });
}

window.fetch = monitorableFetch;
