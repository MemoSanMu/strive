async function async1() {
  console.log('async1 start', 2);
  await async2(); // 放到微队列1
  console.log('async1 end', 7);
}
async function async2() {
  new Promise(function (resolve) {
    console.log('promise1', 3);
    resolve();
  }).then(function () {
    console.log('promise2', 6); // 放到微队列2
  });
}

console.log('script start', 1);

// 放到延迟队列
setTimeout(function () {
  console.log('setTimeout', 9);
});

async1();

new Promise(function (resolve) {
  console.log('promise3', 4);
  resolve();
}).then(function () {
  console.log('promise4', 8);
});

console.log('script end', 5);
