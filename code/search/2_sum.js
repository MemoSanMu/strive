const arr = Array.from(new Array(50)).map((v, i) => i + 1);

const target = 4;

const getTargetSumIndex = (data, t) => {
  let ind = 0;
  const getIndex = (array, ind) => {
    if (ind === data.length - 1) {
      return {
        ind,
        element: null
      };
    }
    const cur = t - data[ind];
    for (let index = 0; index < array.length; index++) {
      const element = array[index];
      console.log(`${element} = ${cur}`);
      if (element === cur) {
        return {
          first: `value：${data[ind]} -- index：${ind}`,
          last: `value：${element} -- index：${index}`
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
