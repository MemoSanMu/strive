const add1 = (x) => {
  console.log(x, 'add1');
  return x + 1;
};
const mul3 = (x) => {
  console.log(x, 'mul3');
  return x * 3;
};
const div2 = (x) => {
  console.log(x, 'div2');
  return x / 2;
};

const compose = (...fns) => {
  return fns.reduce(
    (pre, cur) =>
      (...args) =>
        cur(pre(...args))
  );
};

const res = compose(add1, mul3, div2)(10);
console.log(res);
