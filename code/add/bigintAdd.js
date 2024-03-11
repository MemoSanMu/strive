function bigIntAdd(a, b) {
  const maxLen = Math.max(String(a).length, String(b).length) // 获取最长的长度
  // 向前补零
  a = a.padStart(maxLen, 0)
  b = b.padStart(maxLen, 0)

  let ans = '',
    add = 0
  for (let i = maxLen - 1; i >= 0; i--) {
    const val = Number(a[i]) + Number(b[i]) + add
    ans = `${val % 10}${ans}`
    add = Math.floor(val / 10) // 获取十位数，注意需要向下取整
  }
  if (add) {
    ans = `${add}${ans}`
  }

  return ans
}

let a = '99999'
let b = '99999'

console.log(bigIntAdd(a, b))
