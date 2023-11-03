// /* throttle1函数,节流实现方式1:时间戳+定时器
//  *  @params method,duration 第一个参数为事件触发时的真正要执行的函数
//  *  第二个参数duration表示为定义的间隔时间
//  *
//  *  原理:通过判断是否达到一定的时间来触发函数,若没有规定时间则使用计时器进行延迟,而下一次事件则会重新设定计时器,它是间隔时间执行,不管事件触发有多频繁,都会保证在规定内的事件一定会执行一次真正事件处理函数
//  *
//  * */
// function throttle1(method, duration) {
//   var timer = null;
//   var prevTime = new Date(); // 之前的时间
//   return function () {
//     var that = this,
//       currentTime = new Date(), // 获取系统当前时间
//       resTime = currentTime - prevTime; // 时间戳
//     // 打印本次当前的世间和上次世间间隔的时间差
//     console.log('时间差', resTime);
//     // 当前距离上次执行时间小于设置的时间间隔
//     if (resTime < duration) {
//       // 清除上次的定时器,取消上次调用的队列任务，重新设置定时器。这样就可以保证500毫秒秒内函数只会被触发一次，达到了函数节流的目的
//       clearTimeout(timer);
//       timer = setTimeout(function () {
//         prevTime = currentTime;
//         method.apply(that);
//       }, duration);
//     } else {
//       // 当前距离上次执行的时间大于等于设置的时间时,直接执行函数
//       // 记录执行方法的时间
//       prevTime = currentTime;
//       method.apply(that);
//     }
//   };
// }

// // 事件触发的方法(函数),函数节流1
// function handleJieLiu1() {
//   console.log('节流方式1');
// }

// var handleJieLiu1 = throttle1(handleJieLiu1, 500);
// document.addEventListener('mousewheel', handleJieLiu1);

// /*
// * throttle2函数节流实现方式2:重置一个开关变量+定时器
// * @params method,duration形参数与上面的含义一致
// * @return 返回的是一个事件处理函数
// *
// * 在throttle2执行时定义了runFlag的初始值,通过闭包返回一个匿名函数作为事件处理函数,
// *
// * 在返回的函数内部判断runFlag的状态并确定执行真正的函数method还是跳出,

// 每次执行method后会更改runFlag的状态,通过定时器在durtion该规定的间隔时间内重置runFlag锁的状态
// *
// */
// function throttle2(method, duration) {
//   // 当前时间间隔内是否有方法执行,设置一个开关标识
//   var runFlag = false;
//   // 返回一个事件处理函数
//   return function (e) {
//     // 判断当前是否有方法执行,有则什么都不做,若为true,则跳出
//     if (runFlag) {
//       return false;
//     }
//     // 开始执行
//     runFlag = true;
//     // 添加定时器,在到达时间间隔时重置锁的状态
//     setTimeout(function () {
//       method(e);
//       // 执行完毕后,声明当前没有正在执行的方法,方便下一个时间调用
//       runFlag = false;
//     }, duration);
//   };
// }
// // 事件触发的方法(函数),函数节流2
// function handleJieLiu2() {
//   console.log('节流方式2');
// }
// var handleJieLiu2 = throttle2(handleJieLiu2, 500);
// document.addEventListener('mousewheel', handleJieLiu2);

//利用时间间隔实现
function throttle(method, wait) {
  let time1 = 0;
  return (...args) => {
    const time2 = Date.now();
    const timeInterval = time2 - time1;
    if (timeInterval >= wait) {
      time1 = time2;
      method.apply(this, args);
    }
  };
}
window.onresize = throttle(() => {
  console.log(1);
}, 1000);
//页面在频繁resize的时候，控制台会每隔1秒打印一次

function throttle(m, d) {
  let pre = 0;
  return (...argv) => {
    const cur = Date.now();
    if (cur - pre >= d) {
      pre = cur;
      m.apply(this, argv);
    }
  };
}
