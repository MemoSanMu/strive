let synchronousResolve;
let p = new Promise((resolve) => {
  synchronousResolve = function () {
    console.log(' invoking resolve ==> 1');
    resolve();
    console.log(' resolve returns ==> 2');
  };
});

p.then(() => {
  console.log('then handler executes ==> 4');
});

synchronousResolve();

console.log('synchronousResolve returns ==> 3');
