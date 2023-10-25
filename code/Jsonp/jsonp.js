// 在客户端（浏览器）创建一个 < script > 标签，并指定其 src 属性为跨域请求的 URL，该 URL 必须指向一个服务器端的接口或资源。
// 在请求 URL 中包含一个回调函数的名称作为查询参数，通常是类似 callback = callbackFunction 的形式。
// 服务器端接收到请求后，将返回数据包装在回调函数中，并将其作为响应内容返回给客户端。
// *** 客户端接收到响应后，由于响应内容是通过 < script > 标签加载的，因此浏览器会将其作为 JavaScript 代码执行。
// 在客户端定义的回调函数会被执行，并将服务器返回的数据作为参数传入，从而实现跨域数据的获取。

function jsonp(url, params, callback) {
  // 判断是否含有参数
  let queryString = url.indexOf('?') === '-1' ? '?' : '&';

  // 添加参数
  for (var k in params) {
    if (params.hasOwnProperty(k)) {
      queryString += k + '=' + params[k] + '&';
    }
  }

  // 处理回调函数名
  let random = Math.random().toString().replace('.', ''),
    callbackName = 'myJsonp' + random;

  // 添加回调函数
  queryString += 'callback=' + callbackName;

  // 构建请求
  let scriptNode = document.createElement('script');
  scriptNode.src = url + queryString;

  window[callbackName] = function () {
    // 调用回调函数
    callback(...arguments);

    // 删除这个引入的脚本
    document.getElementsByTagName('head')[0].removeChild(scriptNode);
  };

  // 发起请求
  document.getElementsByTagName('head')[0].appendChild(scriptNode);
}
