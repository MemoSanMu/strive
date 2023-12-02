let o = (function () {
  const obj = {
    a: 1,
    b: 2,
  };
  return {
    get: function (key) {
      // 限制串改obj对象
      // if (obj.hasOwnProperty(key)) {
      //   return obj[key];
      // }
      return obj[key];
    },
  };
})();

// 如何在不修改上面代码的情况，
// 修改obj对象

// 解：

// 通过在原型定义一个属性，返回该对象的自生，然后即可更改、添加该对象的属性
Object.defineProperty(Object.prototype, 'getSelf', {
  get: function () {
    return this;
  },
});

let obj = o.get('getSelf');

obj.c = 'c'; // 添加一个c

console.log(obj, 'set obj');
