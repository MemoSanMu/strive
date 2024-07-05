const arr1 = [1, 2, 3, 4, 5];
const arr2 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

function combineSort(arr1, arr2) {
  const ans = [];
  let i = 0;
  j = 0;
  const len1 = arr1.length;
  const len2 = arr2.length;
  // 左边数组和右边数组同时遍历，对比每一项，让较小的放入结果数组，然后递增
  while (i < len1 && j < len2) {
    if (arr1[i] < arr2[j]) {
      ans.push(arr1[i]);
      i++;
    } else {
      ans.push(arr1[j]);
      j++;
    }
  }
  // 剩余部分
  if (i < len1) ans.push(...arr1.slice(i));
  if (i < len2) ans.push(...arr2.slice(j));
  return ans;
}
const res = combineSort(arr1, arr2);

console.log(res, 'res');
