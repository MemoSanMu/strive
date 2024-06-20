function isEqual(obj1, obj2) {
  // 普通类型
  if (
    typeof obj1 !== 'object' ||
    obj1 === null ||
    typeof obj2 !== 'object' ||
    obj2 === null
  ) {
    return Object.is(obj1, obj2);
  }
  // 对象，判断长度
  if (Object.keys(obj1).length !== Object.keys(obj2).length) {
    return false;
  }
  for (const key in obj1) {
    // obj2不含有当前key
    if (!obj2.hasOwnProperty(key)) {
      return false;
    }
    // 递归判断，不一样直接返回，一样就不管
    if (!isEqual(obj1[key], obj2[key])) {
      return false;
    }
  }
  return true;
}

const fn = () => {};

// 测试示例
const obj1 = { a: 1, b: [2, 3], c: { d: 4 }, fn };
const obj2 = { a: 1, b: [2, 3], c: { d: 4 }, fn };
console.log(isEqual(obj1, obj2));
