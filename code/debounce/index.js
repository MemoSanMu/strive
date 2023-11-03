/*
 *  函数防抖
 *  例如：假定时间间隔时500ms,频繁不同的操作5s,且每两次执行时间小于等于间隔500ms
 *  那么最后只执行了1次，也就是每一次执行时都结束上一次的执行
 *  @params method,duration,与上面一致
 *
 *  原理:它是维护一个计时器,规定在duration时间后出发时间处理函数,但是在duration时间内再次出发的化,都会清除当前的timer重新计时,这样一来,只有最后一次操作事件处理函数才被真正的触发
 *
 * 一般用于输入框事件,常用场景就是表单的搜索或者联想查询,如果不使用防抖会连续发送请求,增加服务器的压力,使用防抖后,会在用户输入要查询的关键词后才发送请求，百度搜索就是这么实现的
 *
 *
 */
function debounce(method, duration) {
  var timer = null;
  return function (...args) {
    var that = this;
    // 在本次调用之间的一个间隔时间内若有方法在执行,则终止该方法的执行
    if (timer) {
      clearTimeout(timer);
    }
    // 开始执行本次调用
    timer = setTimeout(function () {
      method.apply(that, args);
    }, duration);
  };
}

window.onresize = debounce(() => {
  console.log(1);
}, 1000);
//页面在频繁resize的时候，控制台也只会打印一次1
