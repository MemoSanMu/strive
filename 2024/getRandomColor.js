// 随机获取16进制颜色值

function getRandomColor() {
  const r = Math.floor(Math.random() * 256)
  const g = Math.floor(Math.random() * 256)
  const b = Math.floor(Math.random() * 256)
  const res = `#${r.toString(16)}${b.toString(16)}${g.toString(16)}`
  return res
}

console.log(getRandomColor())
