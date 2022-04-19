const findIndex = <T>(
  arr: T[],
  callback: (value: T, index: number) => boolean
) => {
  let len = arr ? arr.length : 0,
    index = -1;

  while (++index < len) {
    if (callback(arr[index], index)) {
      return index;
    }
  }

  return -1;
};

const findLastIndex = <T>(
  arr: T[],
  callback: (value: T, index: number) => boolean
) => {
  let index = arr ? arr.length : 0;

  while (--index > -1) {
    if (callback(arr[index], index)) {
      return index;
    }
  }

  return -1;
};

const find = <T>(arr: T[], callback: (value: T, index: number) => boolean) => {
  let len = arr ? arr.length : 0,
    index = -1;

  while (++index < len) {
    if (callback(arr[index], index)) {
      return arr[index];
    }
  }

  return undefined;
};
