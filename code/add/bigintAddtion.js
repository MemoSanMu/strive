let a = '111199999';
let b = '99999';

function bigintAddtion(a, b) {
  const maxLen = Math.max(a.length, b.length);
  a = a.padStart(maxLen, 0);
  b = b.padStart(maxLen, 0);

  let add = 0;
  let res = '';

  let i = maxLen - 1;
  while (i >= 0) {
    const val = Number(a[i]) + Number(b[i]) + add;
    res = (val % 10) + res; // 通过10取余，获取个位数
    add = Math.floor(val / 10); // 通过值除10取整，获取十位数
    i--;
  }
  if (add) {
    res = add + res;
  }
  return res;
}

console.log(bigintAddtion(a, b));
