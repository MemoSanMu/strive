setTimeout(() => {
  console.log(1, 5); // 延迟队列
}, 0);

console.log(2, 1);

new Promise((resolve) => {
  console.log(3, 2);
}).then(() => {
  console.log(4);
});

console.log(5, 3);

Promise.resolve().then(() => {
  Promise.resolve().then(() => {
    console.log(6, 4);
  });
});
