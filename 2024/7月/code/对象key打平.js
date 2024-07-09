var entry = {
  a: {
    b: {
      c: {
        dd: 'abcdd',
      },
    },
    d: {
      xx: 'adxx',
    },
    e: 'ae',
    f: [2],
    g: {},
  },
};

function transferObject(obj) {
  const res = {};
  const dfs = (obj, parentKey = '') => {
    for (const key in obj) {
      const curVal = obj[key];
      const curKey = parentKey ? `${parentKey}.${key}` : key;
      if (
        typeof curVal !== null &&
        typeof curVal === 'object' &&
        Object.keys(curVal).length
      ) {
        dfs(curVal, curKey);
      } else {
        res[curKey] = curVal;
      }
    }
  };
  dfs(obj);
  return res;
}
console.log(transferObject(entry));

// 要求转换成如下对象
var output = {
  'a.b.c.dd': 'abcdd',
  'a.d.xx': 'adxx',
  'a.e': 'ae',
};
