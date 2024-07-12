const myObject = {
  data: [10, 20, 30],
};

myObject[Symbol.iterator] = function () {
  let index = 0;
  const data = this.data;
  return {
    next() {
      return index < data.length
        ? { value: data[index++], done: false }
        : { value: undefined, done: true };
    },
  };
};

for (const item of myObject) {
  console.log(item);
}
