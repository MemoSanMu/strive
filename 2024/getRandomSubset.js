function getRandomSubset(arr, max) {
  const res = arr.slice(0)
  for (let i = 0; i < arr.length; i++) {
    const randomIndex = Math.floor(Math.random() * (i + 1))
    ;[res[i], res[randomIndex]] = [res[randomIndex], res[i]]
  }
  return res.slice(0, max)
}

console.log(getRandomSubset([1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 5))
