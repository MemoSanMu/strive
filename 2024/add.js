//前端面试手写题：请实现以下效果，对数组的索引|进行累加
//考察 Proxy 的掌握

function createProxy(val) {
  return new Proxy(
    {},
    {
      get(target, key) {
        if (key === Symbol.toPrimitive) {
          return () => val;
        }
        return createProxy(val + Number(key));
      },
    }
  );
}

const add2 = createProxy(0);

const result1 = add2[3] + 3; //输出6
const result2 = add2[3][4][5] + 6; //输出 18

console.log(result1, result2);
