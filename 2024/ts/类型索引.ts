interface Person {
  name: string;
  age: number;
}

// keyof 类似js 的object.keys() 方法（比较官方：用于获取一个接口key的联合类型），用于获取对象的所有key集合，

type Keys = keyof Person;
// 与下方一样
// type Keys = 'name' | 'age';
// 遍历keys ==  k in Keys
