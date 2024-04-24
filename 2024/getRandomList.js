function getRandomList(arr, max) {
  const res = []
  for (let index = 0; index < max; index++) {
    const randomIndex = Math.floor(Math.random() * arr.length)
    res.push(arr[randomIndex])
  }
  return res
}

console.log(getRandomList([1, 2, 3, 4, 5, 6, 7, 8, 9], 4))
