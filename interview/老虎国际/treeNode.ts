// 简单版
type TreeData = {
  id: number;
  name: string;
  children?: TreeData[];
};

// 范性版1
type TreeDataT1<T> = {
  id: number;
  name: string;
  children?: TreeDataT1<T>[];
};

// 范性版2，使用交叉类型【这个比较秀】
type TreeDataT2<T> = {
  [K in keyof T]: T[K];
} & { children?: TreeDataT2<T>[] };
