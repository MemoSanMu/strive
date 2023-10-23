const arr = Array.from(new Array(50)).map((v, i) => Math.floor(Math.random() * 100));

const target = Math.floor(Math.random() * 200);

const getTargetSumIndex = (data, t) => {
  let ind = 0;
  const getIndex = (array, ind) => {
    if (ind === data.length - 1 || !t) {
      return {
        ind,
        element: null
      };
    }
    const cur = t - data[ind];
    for (let index = 0; index < array.length; index++) {
      const element = array[index];
      if (element === cur) {
        return {
          value: `${data[ind]} + ${cur}`,
          index: `first：${ind} -- last：${index}`
        };
      }
    }
    ind += 1;
    return getIndex(data, ind);
  };
  return getIndex(data, ind);
};

console.log(arr, 'arr');
console.log(target, 'target');

console.log(getTargetSumIndex(arr, target), 'res');
