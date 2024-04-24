let input = [
  {
    id: 1,
    val: '学校',
    parentId: null,
  },
  {
    id: 2,
    val: '班级1',
    parentId: 1,
  },
  {
    id: 3,
    val: '班级2',
    parentId: 1,
  },
  {
    id: 4,
    val: '学生1',
    parentId: 2,
  },
  {
    id: 5,
    val: '学生2',
    parentId: 3,
  },
  {
    id: 6,
    val: '学生3',
    parentId: 3,
  },
];

function transferTree(input, id = null) {
  // const res = [];
  // for (let i = 0; i < input.length; i++) {
  //   if (input[i].parentId === id) {
  //     const item = input[i];
  //     item.children = transferTree(input, input[i].id);
  //     res.push(item);
  //   }
  // }
  // return res;
  return input
    .filter((item) => item.parentId === id)
    .map((item) => ({
      ...item,
      children: transferTree(input, item.id),
    }));
}

const result = JSON.stringify(transferTree(input));

console.log(result);
// {
//   "id": 1,
//   "val": "学校",
//   "parentId": null,
//   "children": [
//     {
//       "id": 2,
//       "val": "班级1",
//       "parentId": 1,
//       "children": [
//         {
//           "id": 4,
//           "val": "学生1",
//           "parentId": 2,
//           "children": []
//         }
//       ]
//     },
//     {
//       "id": 3,
//       "val": "班级2",
//       "parentId": 1,
//       "children": [
//         {
//           "id": 5,
//           "val": "学生2",
//           "parentId": 3,
//           "children": []
//         },
//         {
//           "id": 6,
//           "val": "学生3",
//           "parentId": 3,
//           "children": []
//         }
//       ]
//     }
//   ]
// }
