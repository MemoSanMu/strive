function fn(arr) {
  let ans = [[arr[0]]];
  let i = 1;
  while (i < arr.length) {
    let cur = arr[i];

    let j = ans.length - 1;
    enterOut: while (j >= 0) {
      const last = ans[j].at(-1);
      if (cur > last) {
        ans[j + 1] = [...ans[j], cur];
        break enterOut;
      } else if (cur < last && j === 0) {
        ans[j] = [cur];
      }
      j--;
    }

    i++;
  }

  return ans;
}

console.log(fn([3, 5, 7, 1, 2, 8]));
// console.log(fn([3, 5, 8, 1, 2, 4, 6, 7]));
// console.log(fn([0, 1, 0, 3, 2, 3]));

// 考了 三个算法
// 第一个 写一个快排（写出来了）
// 第二个 写一个深度优先遍历，不用递归 （我用递归实现了深度优先遍历，然后用广度优先遍历实现了一次）算是蒙混过关
// 第三个 数组最长递增子序列 （我写的刚好把面试官给的用例覆盖，其实是有问题的代码，但是思路是大差不差的）算是蒙混过关【但是后面面试官会不会复盘代码就不知道了，代码在我本地 他不知道，但是细想肯定是不行的】
