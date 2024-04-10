// 排序算法：快速排序使用分治思想，通过把数组分成较小的块来排序。

const quickSort = (data) => {
  if (data.length <= 1) {
    return data
  }
  const left = [],
    right = []
  const mid = data[0]
  let i = 1
  while (i < data.length) {
    if (data[i] < mid) {
      left.push(data[i])
    } else {
      right.push(data[i])
    }
    i++
  }
  return [...quickSort(left), mid, ...quickSort(right)]
}

const result = quickSort([3, 4, 5, 6, 8, 1, 2, 10, 60, 57, 803, 4343])

console.log(result, 'sort result')
