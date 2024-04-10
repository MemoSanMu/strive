// function objectASign() {
//   const args = Array.from(arguments);
//   let res = {};
//   for (let index = 0; index < args.length; index++) {
//     for (const key in args[index]) {
//       if (key === '__proto__') {
//         continue;
//       }
//       res[key] = args[index][key];
//     }
//   }
//   return res;
// }

function objectASign() {
  const args = Array.from(arguments)
  for (let index = args.length - 1; index > 0; index--) {
    for (const key in args[index]) {
      if (key === '__proto__') {
        continue
      }
      args[index - 1][key] = args[index][key]
    }
  }
  return args[0]
}

const obj1 = { a: 1, b: 2, c: 'cc' }
const obj2 = { c: 3, d: 4 }
const obj3 = { a: 3, d: 7, f: 4, g: 5, c: 'c' }

const res = objectASign(obj1, obj2, obj3)

console.log(res, 'res')
