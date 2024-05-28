# ts

### ts 的类型和接口区别

> 类型 type 使用范围更广，支持（对象、普通/原始类型、交叉类型、联合类型）
> 接口 interface 只能用与定义对象

```ts
type Type = string; // 普通/原始
// 对象
type Type = {
  name: string;
};

interface GetName {
  name: string;
}
```
