function A(params) {
  this.a = 'a';
}
A.prototype.a = 'prototype';
const a = new A();
console.log(a);
a.a = 'update';
console.log(a.a);
delete a.a;
console.log(a.a);
delete a.a;
console.log(a.a);
a.a = undefined;
console.log(a.a);
