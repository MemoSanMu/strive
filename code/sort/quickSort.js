// 排序算法：快速排序使用分治思想，通过把数组分成较小的块来排序。

const quickSort = (data) => {
  if (data.length < 2) {
    return data;
  }

  const center = data[0],
    left = [],
    right = [];

  for (let index = 1; index < data.length; index++) {
    const cur = data[index],
      isMin = cur < center;
    if (isMin) left.push(cur);
    else right.push(cur);
  }

  const res = [...quickSort(left), center, ...quickSort(right)];
  return res;
};

const result = quickSort([3, 4, 5, 6, 8, 1, 2, 10, 60, 57, 803, 4343]);

console.log(result, 'sort result');
