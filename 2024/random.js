// 手写在 给定的 n 个数中随机取出 m 个数，要求等概率
function getRandomSubset(arr, m) {
  const ans = arr.slice(0)
  let i = ans.length
  while (i--) {
    const randomIndex = Math.floor(Math.random() * (i + 1))
    ;[ans[randomIndex], ans[i]] = [ans[i], ans[randomIndex]]
    // const temp = ans[randomIndex]
    // ans[randomIndex] = ans[i]
    // ans[i] = temp
  }
  return ans.slice(0, m)
}

// 给定的 n 个数
const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
const m = 5 // 需要取出的个数

const randomSubset = getRandomSubset(numbers, m)
console.log(randomSubset)
