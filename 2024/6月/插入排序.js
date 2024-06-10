function insertionSort(arr) {
  for (let i = 0; i < arr.length; i++) {
    const cur = arr[i];
    let j = i - 1;
    while (j >= 0 && arr[j] > cur) {
      arr[j + 1] = arr[j];
      j--;
    }
    arr[j + 1] = cur;
  }
  return arr;
}

console.log(insertionSort([5, 6, 3, 2, 6, 8, 1]));
