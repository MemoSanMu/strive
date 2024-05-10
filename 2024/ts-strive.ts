interface UserInfo {
  name: string;
  age: number;
}

// age必填、除了age非必填
type RequireOrPartial = Required<Pick<UserInfo, 'age'>> &
  Partial<Omit<UserInfo, 'age'>>;

const requireOrPartial: RequireOrPartial = {
  age: 18,
  name: '123',
};

type PickType = Pick<UserInfo, 'name'>; // 选择一个属性作为新类型

// 它的实现
type MyPick<T, K extends keyof T> = {
  [key in K]: T[key];
};

const userName: PickType = { name: 'sunflower' };

// Omit 实现[移除属性，得到新的未被移除的类型]
// Exclude 删除一个集合内的选中key，keyof T 拿到的就是接口对象的所有key集合
// Pick 就是选择接口对象的集合 作为需要的类型，这样写法就是选择集合内没有被移除的类型
type MyOmit<T, K extends keyof any> = Pick<T, Exclude<keyof T, K>>;

type OmitType = Omit<UserInfo, 'name'>; // 移除name属性，只要age类型

const userAge: OmitType = { age: 18 };

// ：快速把某个接口类型中定义的属性变成可选
// type Partial<P> = {
//   [key in keyof P]?: P[key]
// }

// ：快速把某个接口类型中定义的属性变成可选
type OptionalType = Partial<UserInfo>;

// ：快速把某个接口类型中定义的属性变成必选
// type Require<P> = {
//   [key in keyof P]-?: P[key] //  `-?` 符号是一个操作符，用于将属性变为必需的，即必须存在并且不能为 undefined 或 null。
// }

// 只读
// type Readonly<T> = {
//   readonly [key in keyof T]: T[key]
// }

// ---

// 范型
function getType<T extends object, K extends keyof T>(obj: T, key: K) {
  return obj[key];
}

class TypeFn<T extends object, U extends keyof T> {
  params: T;
  name: U;
  constructor(params: T, key: U) {
    this.params = params;
    this.name = key;
  }
}

// 范型断言
const obj = {
  name: 'sunflower',
  age: 18,
  address: 'beijing',
};

function getObjKey<T>(obj: T, key: keyof T): T[keyof T] {
  return obj[key];
}
getObjKey(obj, 'address');
