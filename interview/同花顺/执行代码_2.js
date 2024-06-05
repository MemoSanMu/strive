async function foo() {
  console.log(2, '==> 2');
  console.log(await Promise.resolve(8), '==> 5');
  console.log(9, '==> 6');
}

async function bar() {
  console.log(await 6, '==> 7');
  console.log(7, '==> 8');
}

console.log(1, '==> 1');

foo();

console.log(3, '==> 3');

bar();

console.log(5, '==> 4');
