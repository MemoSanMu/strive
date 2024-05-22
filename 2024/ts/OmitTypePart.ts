type RequireType = {
  name: string;
  address: string;
  age: number;
};

type OmitTypePart<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>; // 写一个类型，将对象中的属性变成可选

// 思路
// & 交叉类型，将对象中的属性变成可选
// 先用范型接收参数
// 然后使用omit移除掉传入的k，然后使用交叉类型，将k再通过Partial拓展成可选（内部使用pick 选择范型传入的k）
// 从而实现

// 这样就 将对象中的属性变成可选
type GetObjType = OmitTypePart<RequireType, 'age'>; // 调用OmitTypePart，将RequireType类型的age属性变成可选

let partObj: GetObjType = {
  name: 'sunflower',
  address: 'beijing',
  // age就是非必填了
};
