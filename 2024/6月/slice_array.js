// 分割数组的题，给一个数组和一个数字，数字是几就把数组几个分为一个新数组，最后输出新数组
// 牛客网看的面经，不知道是不是这个意思
let data = [
  { name: '小赵', value: '12' },
  { name: '小钱', value: '12' },
  { name: '小孙', value: '12' },
  { name: '小李', value: '12' },
  { name: '小周', value: '12' },
  { name: '小吴', value: '12' },
  { name: '小郑', value: '12' },
  { name: '小王', value: '12' },
  { name: '小付', value: '12' },
  { name: '小张', value: '12' },
];
function getSliceArr(data, count) {
  let i = 0;
  const ans = [];
  while (i < data.length) {
    const chunk = data.slice(i, i + count);
    ans.push(chunk);
    i += count;
  }
  return ans;
}

console.log(getSliceArr(data, 3));
