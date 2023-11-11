function add(x, y) {
  return x + y;
}

const memoize = function (func, content) {
  let cache = Object.create(null);
  content = content || this;
  return (...key) => {
    if (!cache[key]) {
      cache[key] = func.apply(content, key);
    }
    return cache[key];
  };
};

const calc = memoize(add);
const num1 = calc(100, 200);
const num2 = calc(100, 200); // 缓存得到的结果
