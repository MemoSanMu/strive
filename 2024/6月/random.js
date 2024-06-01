const str = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';

const random = (max, str) => {
  const len = str.length;
  const ans = [];
  for (let index = 0; index < max; index++) {
    const randomIndex = Math.floor(Math.random() * len);
    ans[index] = str.charAt(randomIndex);
  }
  return ans;
};

const res = random(4, str);

console.log(res, res.length, 'res');
