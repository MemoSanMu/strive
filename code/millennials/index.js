function millennials(a) {
  const val = String(a);
  let index = val.length;
  let count = 0;
  let res = '';
  while (--index >= 0) {
    const mind = count !== 0 && count % 3 === 0 ? ',' : '';
    res = `${val[index]}${mind}${res}`;
    count++;
  }
  return res;
}

const amount = 123456780;
const res = millennials(amount);

console.log(res, 'res');

// 1、倒叙遍历
// 2、每隔三位加逗号
// 3、通过count来判断循环的次数，然后判断3 % 0 === 0 做逗号拼接
