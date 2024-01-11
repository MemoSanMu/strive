// 设计一个 load 函数，满足以下要求：
// load 内部有一个执行时间不确定的异步任务，但是要保证 输出顺序和调用顺序保持一致
// 关键点，并行执行任务，顺序输出
// load(1).then(console.log);
// load(2).then(console.log);
// load(3).then(console.log);
// load(4).then(console.log);
// 这个是我后来写出来的答案： https://codeshare.io/OdgO8g

// 并发任务控制器
function requestLimit(taskList, maxNum, handle) {
  // code here
}

// 实现一个 lodash 的 get 方法
// 示例：
const obj = {
  a: {
    b: 1,
    c: [
      {
        d: 2
      },
      {
        e: 3
      }
    ]
  }
};
function get(obj, path) {
  // code here
}
console.log(get(obj, a.b)); // 输出 1
console.log(get(obj, a.c[1].e)); // 输出 3

// <!-- 用多种方式实现深拷贝，说出每种优缺点 -->
// <!-- 我写了3种, 说了下各自优缺点 -->
function deepClone(obj) {
  return JSON.parse(JSON.stringify(obj));
}
function deepClone2(obj) {
  return window.structuredClone(obj);
}
function deepClone3(obj, map = new WeakMap()) {
  // your code
}

// 实现数组的洗牌算法
// 我用了排序的这个
const shuffle = (arr) => arr.sort(() => 0.5 - Math.random());
// 实际还有其他几种方式
// 比如搞个空数组，每次生成一个随机索引，然后从原数组取值
// 等等


//  1. 至少用三种方式求数组最大值，细节点：不用拓展运算符，怎么使用 Math.max()
//  2. 函数柯里化，实现一个  add  函数，你们都懂
//  3. 井字棋游戏: https://blog.csdn.net/ft_sunshine/article/details/103595665
//  4. 实现一个 stringify 方法，要支持深层嵌套的循环引用
//    const a = {
//     attr: b
//    }
//    b = {
//     attr: c
//    }
//    c = {
//     attr: d
//    }
//    d = {
//     attr: a
//    }
// 5. 正则解析：
//    输入： '<html><body attr="11" attr1="22"><div attr="33"></div></body></html>'
//    输出： {
//     body: [
//         {
//             key: 'attr',
//             value: 11
//         },
//         {
//             key: 'attr1',
//             value: 22
//         }
//     ],
//     div: [{
//         key: 'attr',
//         value: 33
//     }]
//    }

// 手写题：实现一个 JSON.stringify() 方法


//  1. 手写一种继承的实现
//  2. 说明输出结果
// function Foo() {
//   getName = function () {
//     console.log(1);
//   };
//   return this;
// }
// Foo.getName = function () {
//   console.log(2);
// };
// Foo.prototype.getName = function () {
//   console.log(3);
// };
// var getName = function () {
//   console.log(4);
// };
// function getName() {
//   console.log(5);
// }
// Foo.getName(); // 2
// getName(); // 4
// Foo().getName(); // 1
// getName(); // 1
// new Foo.getName(); // 2
// new Foo().getName(); // 3
// new new Foo().getName(); // 3


// 手写题： https://leetcode.cn/problems/median-of-two-sorted-arrays/description/
// 我的答案：
var findMedianSortedArrays = function (arr1, arr2) {
  let i = 0;
  let j = 0;
  let ln = arr1.length + arr2.length;
  const res = [];
  while (i < arr1.length || j < arr2.length) {
    if (j >= arr2.length || arr1[i] <= arr2[j]) {
      res.push(arr1[i]);
      i++;
    } else if (i >= arr1.length || arr1[i] > arr2[j]) {
      res.push(arr2[j]);
      j++;
    }
    const flag = ln % 2 === 0;
    const flagIndex = flag ? Math.ceil(ln / 2) : Math.floor(ln / 2);
    if (i + j > flagIndex) {
      return flag
        ? (res[res.length - 1] + res[res.length - 2]) / 2
        : res[res.length - 1];
    }
  }
};


// 题目：
const a = {
  b: 1,
  c: {
    d: 2,
    e: {
      f: 2
    }
  }
};

function proxyObj(obj) {
  // code here
}

const proxyA = proxyObj(a);

console.log(proxyA.b);
// 输出 ‘b’

console.log(proxyA.c.d);
// 输出 ’c.d‘

// 高频问答题：
//  1. react hooks 的理解？
//  2. 说一下  react 的  fiber 架构？
//  3. useEffect 和 useLayoutEffect 的区别？
//  4. useCallback 和 useMemo 主要来解决什么问题？要回答出 配合 memo 使用，可以减少子组件的渲染
//  5. http1, http2, http3 各自做了哪些优化？
//  6. vue3 做了哪些优化？
//  7. 如果让你选型，vue 和 react你会怎么选？理由是什么？
//  8. 小程序中 组件 怎么监听 页面 退到后台 和 进入前台 的事件？
//  9. vue3中 ref 和 reactive 的区别？
//  10.安全相关的，比如如何防御 csrf 和 xss 等, 会追问细节，比如 SameSite 的值都有哪些？各自代表什么意思？

// 其他一些比较有意思的问题
// 1. setTimeout 底层是怎么实现的？
// 2. 代码重复率检测是如何实现的？
// 3. 你平时CR时，看到的一些问题，有考虑过去拓展 eslint 规则来形成约束吗？

// 最重要的就是简历里的项目，一定要很熟悉，项目永远是被问的最多的，三面和四面基本上都是聊项目和业务了
