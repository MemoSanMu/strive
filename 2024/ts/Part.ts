type Ops = {
  name: string;
  age: number;
  address?: string;
};

// 写一个类型，剔除必填的类型，留下选填的类型

// 实现思路：
// 通过范型接入，然后通过keyof获取到所有key，然后通过条件类型，剔除必填的类型，留下选填的类型
// keyof T => string | number | symbol  【keyof T 得到的是一个集合，keys，可以通过in对它进行循环】
// 核心的判断：通过as改名称的方式，判断当前T[K]是否继承自Required<T>[K]，
// 如果是，那么就是必填的（必填返回never），否则就是选填的( 选填返回当前K )
// never 的意思是不存在，不存在就是代表当前key被干掉，理解为 delete obj[k] 将它移出
type GetPart<T> = {
  [K in keyof T as T[K] extends Required<T>[K] ? never : K]: T[K];
};

type GetObjType = GetPart<Ops>;

let obj: GetObjType = {
  address: '123',
};
