Array.prototype.customReduce = function (fn, initVal) {
  let res;
  let index = 0;
  // 如果带初始化参数了
  if (arguments.length === 2) {
    res = initVal;
  } else {
    // 否则reduce(pre, cur, i)
    // pre需要处理从this[0]开始传递
    res = this[0];
    // 循环下标从1开始
    index = 1;
  }
  for (let i = index; i < this.length; i++) {
    res = fn(res, this[i], i, this);
  }
  return res;
};

const res = [1, 2, 3].customReduce((pre, cur) => {
  return pre + cur;
});

console.log(res, 'customReduce res');
