function binarySearch(arr, target) {
  let l = 0,
    r = arr.length - 1,
    mid = 0;

  while (l <= r) {
    mid = Math.floor((l + r) / 2);
    if (arr[mid] > target) {
      r = mid - 1;
    } else if (arr[mid] < target) {
      l = mid + 1;
    } else {
      return mid;
    }
  }
  return -1;
}

const arr = [1, 2, 3, 4, 5, 6, 7, 8, 99, 233, 3435, 565757];

const target = 565757;

console.log(binarySearch(arr, target));
