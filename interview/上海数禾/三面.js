/**
 * 反转字符串中被括号包围的字符子串，如果有多层括号则子串需要被多次反转。
 * 如果出现不匹配的括号则抛出异常。
 * @param str
 */
// 自己当时写的，没有写出来
// function reverse(str) {
//   // show me your code
//   let ans = '';

//   function combineRes(path) {
//     return path.reduce((pre, cur) => `${pre}${cur}`, '');
//   }
//   let i = 0;
//   let path = []; // ['cdg', 'ef']
//   while (i < str.length) {
//     const cur = str.charAt(i);
//     // ( 开始
//     // ) 结束
//     if (cur === '(') {
//       dfs(i + 1, 0);
//     }
//     // let j = i + 1
//     // while (cur === '(' && str.charAt(j) !== ')') {
//     //     subStr = `${subStr}${str.charAt(j)}`
//     //     j++
//     // }

//     if (path.length) {
//       console.log(path, 'path');
//       const combine = combineRes(path);
//       ans = `${ans}${combine}`;
//       i += combine.length + path.length * 2;
//       path = [];
//       continue;
//     }
//     ans = `${ans}${cur}`;
//     i++;
//   }
//   function dfs(start, index) {
//     while (start < str.length) {
//       const subCur = str.charAt(start);
//       if (subCur === '(') {
//         dfs(start + 1, index + 1);
//         start++;
//       }
//       if (subCur === ')') {
//         // start++
//         // dfs(start + 1, index - 1)
//         break;
//       }
//       path[index] = `${subCur}${path[index] || ''}`;
//       start++;
//     }
//   }
//   return ans;
// }

function reverse(s) {
  // while (s.includes('(')) {
  //   s = s.replaceAll(/\(([^()]*)\)/g, (_, val) =>
  //     val.split('').reverse().join('')
  //   );
  // }
  // return s;
}

// 例1：下面括号中的`def`被反转
console.log(reverse('abc(def)ghi')); // 输出：abcfedghi ['def']

// // 例2：存在嵌套的括号，最内侧括号的内容`ef`，先被反转成`fe`，与括号外侧的内容拼接后得到`cdfeg`，最终`cdfeg`再次被反转得倒输出中的字符串
console.log(reverse('ab(cd(ef)g)hi')); // 输出：abgefdchi

// // 例3：存在不匹配的括号，抛出异常
// console.log(reverse('ab(cd(ef)ghi')); // 异常

// 》〉
// 》〉
// 》〉
// 【正确答案】
/**
 * @param {string} s
 * @return {string}
 */
var reverseParentheses = function (s) {
  // 参考别人的题解，这个比较好理解
  // 我们可以用栈来存储括号的信息，因为右括号总是会匹配它左边最近的左括号。
  // 因此，每当我们找到一个左括号就入栈，找到一个右括号就出栈，就能知道哪里需要反转。
  let i = 0;
  const path = []; //
  let ans = s;
  while (i < s.length) {
    const cur = s.charAt(i);
    if (cur === '(') {
      path.push(i + 1);
    } else if (cur === ')') {
      const index = path.pop();
      ans = `${ans.slice(0, index)}${reverse(ans.slice(index, i))}${ans.slice(
        i
      )}`;
    }
    i++;
  }
  function reverse(str) {
    return str.split('').reverse().join('');
  }
  return ans.replace(/(\(|\))/g, '');
};
