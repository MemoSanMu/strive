type BaseType = number | string | boolean; // [number, string, boolean];

// 这里表示 copy 的参数
// 只能是字符串、数字、布尔这几种基础类型
function copy<T extends BaseType>(arg: T): T {
  return arg;
}
// 正常调用
// copy(false);
// copy(1);
// copy('1');

// 通过范性和类型约束 extends 约束
function copy2<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}

const val = copy2({ a: 1, b: 2, c: 3 }, 'a');
