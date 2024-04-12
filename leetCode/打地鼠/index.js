// /**
//  * @param {number[][]} moles
//  * @return {number}
//  */
// // 参考题解【不是特别理解】
// // 【十分巧妙的解】
// // 动态规划=》状态转移 〉 状态递增 > 最后的值就是打地鼠的次数
// var getMaximumNumber = function (moles) {
//   // 根据时间排序
//   moles.sort((a, b) => a[0] - b[0])
//   let first = 0
//   // 初始时刻（即第 0 秒）锤子位于正中间的格子 (1,1)
//   // 因为初始化 0s 在[1,1]的位置，而移动打地鼠需要花费1s, 所以时间数据为0开头的都需要剔除，因为根本打不到。
//   while (moles.length) {
//     const [t, x, y] = moles[0]
//     if (t === 0) {
//       // 时间为0，只有刚好在1，1的位置的时候，不需要移动就可以打到。所以需要记录这个可以打到的值。
//       if (x === 1 && y === 1) {
//         first++
//       }
//       moles.shift()
//       // 时间为0，从1，1开始移动，除了1，1不需要移动可以直接打
//       // 其他方式移动，需要话费1s+,根本打不到,所以直接剔除数据差
//     } else {
//       break
//     }
//   }
//   moles = [[0, 1, 1], ...moles] // 从初始时刻（即第 0 秒）锤子位于正中间的格子 (1,1)
//   const len = moles.length
//   let dp = new Array(len).fill(0).map(() => [0, 0])
//   for (let i = 1; i < len; i++) {
//     debugger
//     const [t, x, y] = moles[i] // 当前移动的数据
//     // 当前移动的x值，为前一次移动的x,y最大值
//     dp[i][0] = Math.max(dp[i - 1][0], dp[i - 1][1])
//     // 每次j--为了状态转移 保留上一次打地鼠的解；
//     // 循环内满足条件即，可以打中地鼠，前一次的状态+1，和当前解取最大值，
//     // 不满足条件--，继续找上一次的解，状态存储
//     for (let s = 0, j = i - 1; s < 10 && j >= 0; j--, s++) {
//       debugger
//       // j代表前一步的指针
//       // 每走一步j就多退一步
//       const [cT, cX, cY] = moles[j] // 前一步的[t, x, y]
//       // 当前x 减去 前一步的x，取绝对值 + 当前y 减去 前一步的y，取绝对值
//       // 步骤小于等于了 当前步 到下一步的时间，则是满足地鼠出现的时机。
//       if (Math.abs(x - cX) + Math.abs(y - cY) <= t - cT) {
//         // 将dp，y值 更新为，当前y 和 前一个步骤y + 1 的最大值
//         // [0, 0] [0, 0]  => [0, 0 + 1] [0, 0], max(0 , 1) => 1
//         dp[i][1] = Math.max(dp[i][1], dp[j][1] + 1)
//       }
//     }
//     // res = Math.max(res, dp[i][0], dp[i][1])
//   }
//   // 当前打地鼠到前一次打地鼠的最大集合
//   const [x, y] = dp[len - 1]
//   const res = first + Math.max(x, y)
//   return res
// }

/**
 * @description: 打地鼠
 * @param {*} moles
 * @return {number} 返回勇者最多能够敲击多少只地鼠。
 */
function getMaximumNumber(moles) {
  let ans = 0
  // 先排序
  moles.sort((a, b) => a[0] - b[0])

  while (moles.length) {
    const [t, x, y] = moles[0]
    // 如果时间为0，从1，1开始移动，除了1，1不需要移动可以直接打
    if (t === 0) {
      if (x === 1 && y === 1) {
        ans++
      }
      moles.shift()
    } else {
      // 否则直接跳出循环
      break
    }
  }
  moles = [[0, 1, 1], ...moles]
  let dp = new Array(moles.length).fill(0).map(() => [0, 0])

  let i = 1
  while (i < moles.length) {
    const [t, x, y] = moles[i]
    dp[i][0] = Math.max(dp[i - 1][0], dp[i - 1][1])
    let j = i - 1 // 从上一次打到当前的地鼠数
    let step = 0 // step 不能大于9
    while (j >= 0 && step <= 9) {
      const [preT, preX, preY] = moles[j]
      const diff = Math.abs(x - preX) + Math.abs(y - preY)
      const timer = t - preT
      // 如果步骤小于等于了 当前步 到下一步的时间，则是满足地鼠出现的时机。
      if (diff <= timer) {
        dp[i][1] = Math.max(dp[i][1], dp[j][1] + 1)
      }
      j--
      step++
    }
    i++
  }
  const [x, y] = dp[dp.length - 1]
  ans += Math.max(x, y)
  return ans
}

console.log(
  getMaximumNumber([
    [4, 2, 1],
    [1, 1, 2],
    [2, 1, 0],
    [3, 2, 1],
    [4, 0, 0],
    [0, 1, 1]
  ])
)
