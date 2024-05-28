// 通过 in 关键字做类型的映射，遍历已有接口的 key 或者是遍历联合类型，如下例子：

type MyType<T> = {
  readonly [K in keyof T]: T[K];
};

interface Pe {
  name: string;
  age: number;
}

type ReadOnly = MyType<Pe>;

let obj: ReadOnly = { name: 'zs', age: 18 };
