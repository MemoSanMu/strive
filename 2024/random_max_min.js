// 原理分析
// Math.random() 生成0-1之间的小数，不包含1
// max - min + 1  => 9 - 1 = 8 = 8 + 1 = 9，最大不超过max
// 由于随机数不超过1 所以相乘结果肯定小于9 max,
// 用math.floor 向下取证 保证数据在max范围内，最大不超过max 然后加1 保证最小不小于1
// 最后+ 1 是因为有可能 Math.random()  生成的数位0 所以需要加1

function getRandomMaxMin(max, min) {
  return Math.floor(Math.random() * (max - min + 1)) + 1;
}

// for (let index = 1; index < 20; index++) {
// console.log(getRandomMaxMin(100, index));
// }

const sortArr = [1, 2, 3, 4, 6, 7, 8];

// 打乱数组
console.log(
  sortArr.sort(() => Math.random() - 0.5),
  '打乱数组'
);

// 打乱数组2

function shuffle(arr) {
  const res = arr.slice(0);
  for (let index = 0; index < arr.length; index++) {
    const randomIndex = Math.floor(Math.random() * (index + 1));
    [res[randomIndex], res[index]] = [res[index], res[randomIndex]];
  }
  return res;
}

console.log(shuffle(sortArr), '打乱数组 2');
