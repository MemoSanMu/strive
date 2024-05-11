function allSort(arr) {
  const ans = [];
  const maxLen = arr.length;

  function dfs(res, arr) {
    // 边界，终止，组合长度边界
    if (res.length === maxLen) {
      ans.push(res.join(''));
      return;
    }
    // 循环，递归
    for (let index = 0; index < arr.length; index++) {
      const newArr = [...arr];
      const newRes = [...res, newArr[index]];
      newArr.splice(index, 1); // 删除一个
      dfs(newRes, newArr);
    }
  }
  dfs([], arr);
  return ans;
}

console.log(allSort(['a', 'b', 'c', 'd']));
