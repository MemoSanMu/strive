type Tree<T, U> = {
  id: T;
  name: U;
  children?: Array<Tree<T, U>>;
  // children?: Tree<T, U>[]; // 这个和上面的 Array<Tree<T, U>> 一个意思
};

// 交叉类型实现
type Tree1<T, U> = {
  id: T;
  name: U;
} & { children?: Array<Tree<T, U>> };
