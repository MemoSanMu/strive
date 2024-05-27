function fn(arr) {
  let ans = [[arr[0]]];
  let i = 1;
  while (i < arr.length) {
    let cur = arr[i];

    let j = ans.length - 1;
    enterOut: while (j >= 0) {
      const last = ans[j].at(-1);
      if (cur > last) {
        ans[j + 1] = [...ans[j], cur];
        break enterOut;
      } else if (cur < last && j === 0) {
        ans[j] = [cur];
      }
      j--;
    }

    i++;
  }

  return ans;
}

console.log(fn([3, 5, 7, 1, 2, 8]));
// console.log(fn([3, 5, 8, 1, 2, 4, 6, 7]));
// console.log(fn([0, 1, 0, 3, 2, 3]));
