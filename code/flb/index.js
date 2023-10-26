// 力扣509题：斐波那契数列
// [0,1,1,2,3,5,8,13...]

// 输入：n = 3
// 输出：2
// 解释：F(3) = F(2) + F(1) = 1 + 1 = 2

const flb = (n) => {
  const arr = [0, 1];
  for (let index = 2; index <= n; index++) {
    arr[index] = arr[index - 1] + arr[index - 2];
  }
  return arr[n];
};

console.log(flb(3)); // 2
