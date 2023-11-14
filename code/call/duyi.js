// 渡一实现方法

Function.prototype.myCall = function (ctx, ...args) {
  ctx = ctx === undefined || ctx === null ? globalThis : Object(ctx);

  const fn = this;
  const key = Symbol('fn');

  // ctx[key] = fn;
  Object.defineProperty(ctx, key, {
    enumerable: false, // 不可枚举
    value: fn
  });
  const res = ctx[key](...args);
  delete ctx[key];
  return res;
};

function getName() {
  return Array.from(arguments).reduce((a, b) => a + b, 0);
}

const result = getName.myCall(null, 1, 2, 43);

console.log(result, 'result');
