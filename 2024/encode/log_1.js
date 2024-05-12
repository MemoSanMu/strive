// 三：下面代码。什么时候打印1
// js
// var
// if（ == 1 8& a -- 2 88
// -= 3）｛
// console.1og （1）；

var a = {
  val: 1,
  valueOf: function () {
    return this.val++;
  },
};

if (a == 1 && a == 2 && a == 3) {
  console.log(1);
}
