// N(O)
// function factorial(n) {
//   //   归
//   if (n === 1) {
//     return 1
//   }
//   return n * factorial(n - 1)
// }

// N（1）
function factorial(n, total = 1) {
  //   归
  if (n === 1) {
    return total
  }
  return factorial(n - 1, total * n)
}

console.log(factorial(10))
