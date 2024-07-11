// #### 题目：版本号比较

// 编写一个函数，该函数接收两个字符串参数，
// 它们表示软件的版本号 v1 和 v2。如果 v1 > v2 返回 1，如果 v1 < v2 返回 -1，否则返回 0。

// 版本号是由若干修订号组成，每项修订号之间以点分隔。每项修订号可能包含任意数量的数字。
// 版本号不以 0 开始，除非整个版本号就是 0.

// 请注意，修订号的比较是基于单个修订号的数字值，而不是整体作为一个数字进行比较。
// 例如，2.5 不等于 2.50。

// 函数示例：compareVersion("version1", "version2")

// 测试用例：

// compareVersion("0.1", "0.0.1") == 1
// compareVersion("1.0", "1.0.0") == 0
// compareVersion("7.3.2", "7.3") == 1
// compareVersion("1.2.10", "1.2.2") == 1
// compareVersion("1.13", "1.13.4") == -1
// compareVersion("1.0", "0.1") == 1
// compareVersion("0.1", "1.1") == -1
// compareVersion("[7.5.2.4](http://7.5.2.4/)", "7.5.3") == -1

// 当场写的
function compareVersion(v1, v2) {
  const l = v1.split('.'),
    r = v2.split('.');
  const lLen = l.length,
    rLen = r.length;
  const max = Math.max(lLen, rLen);

  let i = 0;
  while (i < max) {
    const left = parseInt(l[i]) || 0,
      right = parseInt(r[i]) || 0;
    i++;

    if (left === right) {
      continue;
    }
    // v1 > v2 返回 1
    return left > right ? 1 : -1;
  }
  return 0;
}

const res = compareVersion('0.1', '0.0.1');
const res2 = compareVersion('1.13', '1.13.4');
console.log(res, 'res');
console.log(res2, 'res2');
console.log(compareVersion('1.0', '1.0.0'));
