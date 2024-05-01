// _.chunk(['a', 'b', 'c', 'd'], 2);
// // => [['a', 'b'], ['c', 'd']]

// _.chunk(['a', 'b', 'c', 'd'], 3);
// // => [['a', 'b', 'c'], ['d']]

function chunk(array, size) {
  if (size <= 0) {
    return [];
  }
  const result = [];
  let i = 0;
  while (i < array.length) {
    result.push(array.slice(i, i + size));
    i += size;
  }
  return result;
}

console.log(chunk(['a', 'b', 'c', 'd'], 2)); // // => [['a', 'b'], ['c', 'd']]
console.log(chunk(['a', 'b', 'c', 'd'], 3)); // // => [['a', 'b', 'c'], ['d']]
