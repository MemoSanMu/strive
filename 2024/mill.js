// 100000000
// 100,000,000

function mill(num) {
  const str = String(num);
  let ans = '';
  let i = str.length - 1;
  let count = 1;
  while (i >= 0) {
    ans = count % 3 === 0 && i !== 0 ? `,${str[i]}${ans}` : `${str[i]}${ans}`;
    count++;
    i--;
  }
  return ans;
}

console.log(mill(10000000000000));

console.log(String(100000000000).replace(/\B(?=(\d{3})+$)/g, ',')); // 正则前瞻写法
