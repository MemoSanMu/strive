var findIndex = function (arr, callback) {
  var len = arr ? arr.length : 0,
    index = -1;
  while (++index < len) {
    if (callback(arr[index], index)) {
      return index;
    }
  }
  return -1;
};
var findLastIndex = function (arr, callback) {
  var index = arr ? arr.length : 0;
  while (--index > -1) {
    if (callback(arr[index], index)) {
      return index;
    }
  }
  return -1;
};
var find = function (arr, callback) {
  var len = arr ? arr.length : 0,
    index = -1;
  while (++index < len) {
    if (callback(arr[index], index)) {
      return arr[index];
    }
  }
  return undefined;
};
