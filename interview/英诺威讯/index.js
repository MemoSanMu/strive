// 给定一个只包括 '('，')'，'{'，'}'，'['，']' 的字符串 s ，判断字符串是否有效。

// 有效字符串需满足：

// 左括号必须用相同类型的右括号闭合。
// 左括号必须以正确的顺序闭合。
// 每个右括号都有一个对应的相同类型的左括号。

// 示例 1：

// 输入：s = "()"
// 输出：true
// 示例 2：

// 输入：s = "()[]{}"
// 输出：true
// 示例 3：

// 输入：s = "(]"
// 输出：false

function is(s) {
  const queue = [];
  const map = {
    '(': ')',
    '{': '}',
    '[': ']',
  };

  for (let key of s) {
    // （  右括号
    if (map[key]) {
      queue.push(key); // (
    } else {
      // ） 左括号
      const last = queue.pop(); // (
      if (map[last] !== key) {
        return false;
      }
    }
  }
  return !queue.length;
}

console.log(is('()'));
console.log(is('()[]{}'));
console.log(is('(]'));
