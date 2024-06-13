// js 实现 给一个正整数（非常长，可能有5000位），给一个k，给一个p，要求找到这个正整数中长度为k的一段数字的最大值，输出这个最大值%p的结果
function findMaxMod(str, k, p) {
  let ans = 0;
  for (let i = 0; i < str.length - k; i++) {
    const curStr = str.slice(i, i + k);
    const max = parseInt(curStr);
    if (max > ans) {
      ans = max;
    }
  }
  // return ans % p;
  return ans;
}

// 示例用法
const numStr = '123456789123456789123456789';
const k = 3;
const p = 10;
console.log(findMaxMod(numStr, k, p));
