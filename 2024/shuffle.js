function shuffle(arr) {
  const res = arr.sort(() => Math.random() - 0.5)
  return res
}

console.log(shuffle([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]))
