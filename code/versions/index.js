// // [1.0.1, 1.1.0, 1.0.2, 2.0.0]

const versions = ['1.0.1', '1.1.0', '1.0.2', '2.0.0', '3', '9', '5.6', '1.2', '1.2.4'];

function versionSort(data) {
  //   let len = data[0].split('.').length;
  //   while (num < len) {
  //     data = data.sort((a, b) => {
  //       return a.split('.')[num] - b.split('.')[num];
  //     });
  //     ++num;
  //   }
  //   return data;
  // return data.sort((a, b) => {
  //   return a.replace('.', '') - b.replace('.', '');
  // });
  return data.sort((a, b) => {
    let arr1 = a.split('.');
    let arr2 = b.split('.');

    let curCount = 0;
    while (true) {
      let cur1 = arr1[curCount];
      let cur2 = arr2[curCount];
      curCount++;

      // 位数短的往前排
      if (cur1 === undefined || cur2 === undefined) {
        return arr1.length - arr2.length;
      }

      // 相同跳出循环，再次重复进行后位对比
      if (cur1 === cur2) {
        continue;
      }

      // 不同，返回大小
      return cur1 - cur2;
    }
  });
}

console.log(versionSort(versions), 'versionSort');

// 方法一：从左到右迭代，从高位判断，返回高位的大小结果 注意：仅适用于版本号各个位的位数相同
// let versions = ['1.45.0', '1.45', '1.5', '6', '2.3.4.5'];
// versions = versions.sort((a, b) => {
//   let arr1 = a.split('.');
//   let arr2 = b.split('.');
//   let i = 0;
//   while (true) {
//     let s1 = arr1[i];
//     let s2 = arr2[i];
//     i++;
//     if (s1 == undefined || s2 == undefined) {
//       return arr1.length - arr2.length;
//     }
//     if (s1 == s2) {
//       continue;
//     }
//     return s1 - s2;
//   }
// });

// console.log(versions); //[ '1.5', '1.45.0', '2.3.4.5', '6' ]
