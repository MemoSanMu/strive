// 菜单数组转换为嵌套树形结构，但示例只有两级

// [
//   { id: 1, menu: '水果', level: 1 },
//   { id: 2, menu: '橘子', level: 2, parentId: 1 }
//   // ...
// ]
// // 转换为
// [
//   {
//     id: 1, menu: '水果', level: 1, children: [{ id: 2, menu: '橘子', level: 2, parentId: 1 }]
//   },
//   // ...
// ]
