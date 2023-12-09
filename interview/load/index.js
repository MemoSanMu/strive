// 设计一个 load 函数，满足以下要求 3
// (10 分钟)
// load(1).then(console.log)
// load(2).then(console.log)
// load(3).then(console.log)
// load(4).then(console.log)
// 要求：输出顺序按照调用顺序返回， 每次异步的时间随机，大约 10 分钟

const tasks = [];
let running = false;

// function run() {
//   while (tasks.length && running === false) {
//     const { resolve, reject, time, args } = tasks.shift();
//     running = true;
//     try {
//       setTimeout(() => {
//         running = false;
//         if (tasks.length) {
//           run();
//         }
//         resolve(...args);
//       }, time);
//     } catch (error) {
//       running = false;
//       if (tasks.length) {
//         run();
//       }
//       reject(error);
//     }
//   }
// }

function run() {
  if (!tasks.length || running) {
    return;
  }
  running = true;
  const { resolve, reject, args } = tasks.shift();
  return new Promise((res, rej) => {
    try {
      const time = String(Math.random()).slice(-3);
      setTimeout(() => {
        res(...args);
      }, time);
    } catch (error) {
      rej(...args);
    }
  })
    .then(resolve, reject)
    .finally(() => {
      running = false;
      run();
    });
}

function load() {
  const args = Array.prototype.slice.call(arguments);
  return new Promise((resolve, reject) => {
    tasks.push({ resolve, reject, args });
    run();
  });
}

load(11).then(console.log);
load(52).then(console.log);
load(31).then(console.log);
load(4).then(console.log);
