// 冒泡排序
function bubbleSort(array) {
  for (let i = 0; i < array.length - 1; i++) {
    for (let j = i + 1; j < array.length; j++) {
      //   array[i] => 0
      //   array[1] => 0 + 1
      if (array[i] > array[j]) {
        let temp = array[i];
        array[i] = array[j];
        array[j] = temp;
      }
    }
  }
  return array;
}

const sortArray = [5, 6, 8, 6, 3, 4, 4, 6, 7, 8, 92, 100, 35, 56, 4, 3, 2, 1, 4, 6];
console.log(bubbleSort(sortArray));
