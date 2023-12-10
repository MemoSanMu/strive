// https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce#accumulator

Array.prototype.handReduce = function name(fn, init) {
  const target = this; // 这个this指向的是调用这个函数的数组对象
  // 异常
  // TypeError
  // 如果数组为空且未提供 initialValue，则会抛出异常。
  if (!target || target.length === 0) {
    throw new TypeError('reduce of empty array with no initial value');
  }

  if (typeof fn !== 'function') {
    throw new TypeError('callback must be a function');
  }

  let start = 0;
  if (target.length === 1) {
    return target[start];
  }

  let pre = init;

  // 处理没有传递初始值的情况，默认从0开始循环
  if (init === undefined) {
    pre = target[start];
    start++;
  }
  for (let index = start; index < target.length; index++) {
    const cur = target[index];
    pre = fn(pre, cur, index, target);
  }

  return pre;
};

const reduceArr = [15, 16, 17, 18, 19];

const res = reduceArr.handReduce((pre, cur) => {
  return pre + cur;
});

console.log(res, 'res');
