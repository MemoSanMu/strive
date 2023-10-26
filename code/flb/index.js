// 力扣509题：斐波那契数列
// [0,1,1,2,3,5,8,13...]

// 输入：n = 3
// 输出：2
// 解释：F(3) = F(2) + F(1) = 1 + 1 = 2

// 数组方式，动态规划
const flb = (n) => {
  const arr = [0, 1];
  for (let index = 2; index <= n; index++) {
    arr[index] = arr[index - 1] + arr[index - 2];
  }
  return arr[n];
};

// 递归方式
const fbl2 = (n) => {
  if (n === 1 || n === 2) {
    return 1;
  }
  return fbl2(n - 1) + fbl2(n - 2);
};

console.log(flb(8), fbl2(8)); // 2
