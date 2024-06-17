// // 重写 XMLHttpRequest
// const originalXHR = window.XMLHttpRequest;

// function MonitorableXMLHttpRequest() {
//   let _this = this;

//   this.open = function (method, url) {
//     _this.method = method;
//     _this.url = url;
//     _this.startTime = new Date().getTime();
//   };

//   this.send = function (data) {
//     const xhr = new originalXHR();

//     xhr.onreadystatechange = function () {
//       if (xhr.readyState === 4) {
//         const endTime = new Date().getTime();
//         const duration = endTime - _this.startTime;

//         console.log(
//           `接口: ${_this.url}, 状态码: ${xhr.status}, 耗时: ${duration}ms`
//         );
//       }
//     };

//     xhr.open(_this.method, _this.url);
//     xhr.send(data);
//   };
// }

// // 替换默认的 XMLHttpRequest
// window.XMLHttpRequest = MonitorableXMLHttpRequest;

const originalXMLHttpRequest = window.XMLHttpRequest;
window.XMLHttpRequest = function () {
  const _this = this;
  this.open = function (method, url) {
    _this.method = method;
    _this.url = url;
    _this.startTime = new Date().getTime();
  };
  this.send = function (data) {
    // 发送
    const xhr = new originalXMLHttpRequest();
    xhr.onreadystatechange = function () {
      if (xhr.readyState) {
        // xhr.status >= 200 && < 300; // 成功
        // xhr.responseText
        const endTime = new Date().getTime();
        const duration = endTime - _this.startTime;
        console.log(duration);
        // handleReport(_this.url, xhr.status, duration); // 上报内容
      }
    };
    xhr.open(_this.method, _this.url);
    xhr.open(data);
  };
};

const xhr = window.XMLHttpRequest();
