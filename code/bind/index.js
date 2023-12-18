Function.prototype.myBind = function (ctx, ...args) {
  const fn = this;
  return function () {
    const combineArgs = [...args, ...arguments];
    if (new.target) {
      return new fn(...combineArgs);
    }
    return fn.apply(ctx, combineArgs);
  };
};

function getName(firstName, lastName) {
  this.names = `${firstName} ${lastName}`;
  return `${firstName} ${lastName}`;
}

const func = getName.bind(null, '张三');

const res = new func('李四');

console.log(res.names, 'res');
