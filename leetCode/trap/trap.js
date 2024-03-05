/*
 * @lc app=leetcode.cn id=42 lang=javascript
 *
 * [42] 接雨水
 */

// @lc code=start
/**
 * @param {number[]} height
 * @return {number}
 */
var trap = function (height) {
  //   // 前区最大集合
  //   const pre_max = new Array(height.length).fill(0)
  //   // 后区最大值集合
  //   const suf_max = new Array(height.length).fill(0)
  //   pre_max[0] = height[0]
  //   //   从第一项开始循环
  //   for (let i = 1; i < height.length; i++) {
  //     pre_max[i] = Math.max(height[i], pre_max[i - 1])
  //   }
  //   let lastIndex = height.length - 1
  //   suf_max[lastIndex] = height[lastIndex]
  //   //   倒排开始循环
  //   for (let i = lastIndex - 1; i >= 0; i--) {
  //     suf_max[i] = Math.max(height[i], suf_max[i + 1])
  //   }
  //   let i = 0
  //   let res = 0
  //   while (i < height.length) {
  //     // 前区、后区最小值 - 高度
  //     res += Math.min(pre_max[i], suf_max[i]) - height[i]
  //     i++
  //   }
  //   return res
  let pre_max = 0,
    suf_max = 0,
    ans = 0
  let left = 0,
    right = height.length - 1
  while (left <= right) {
    pre_max = Math.max(pre_max, height[left])
    suf_max = Math.max(suf_max, height[right])
    if (pre_max < suf_max) {
      ans += pre_max - height[left]
      left++
    } else {
      ans += suf_max - height[right]
      right--
    }
  }
  return ans
}
// @lc code=end

console.log(trap([0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1]))
