var scope = 123;
var obj = {
  scope: 456,
  getScope: function () {
    var scope = 789;
    console.log(scope);
    console.log(this.scope);
    var f = function () {
      console.log(scope);
      console.log(this.scope);
    };
    f();
  },
};

obj.getScope(); // 789 456 789 123
var getScope = obj.getScope;
getScope(); // 789 123 789 123
var a = { scope: 1 };
var b = { scope: 2 };
getScope.apply(a); // 789 1 789 123
console.log(getScope.bind(a)); // function () {}
getScope.bind(b).call(a); // 789 2 789 123
