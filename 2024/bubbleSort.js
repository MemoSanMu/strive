function bubbleSort(arr) {
  for (let i = 0; i < arr.length; i++) {
    let j = i + 1
    while (j < arr.length) {
      if (arr[i] > arr[j]) {
        // const temp = arr[i]
        // arr[i] = arr[j]
        // arr[j] = temp
        ;[arr[i], arr[j]] = [arr[j], arr[i]]
      }
      j++
    }
  }
  return arr
}

const sortArray = [5, 6, 8, 6, 3, 4, 4, 6, 7, 8, 92, 100, 35, 56, 4, 3, 2, 1, 4, 6]
console.log(bubbleSort(sortArray))
