function createObject(obj) {
  function F() {}
  F.prototype = obj;
  const Obj = new F();
  return Obj;
}

console.log(createObject({ a: '1' }));
