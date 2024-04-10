const obj1 = { a: 1, b: 2, c: 'cc' }
const obj2 = { c: 3, d: 4 }
const obj3 = { a: 3, d: 7, f: 4, g: 5, c: 'c' }

function objectASign(...args) {
  const res = [...args]
  let i = res.length - 1
  while (i > 0) {
    for (const key in res[i]) {
      if (res[i].hasOwnProperty(key) && key !== '__proto__') {
        res[i - 1][key] = res[i][key]
      }
    }
    i--
  }
  return res[0]
}

const res = objectASign(obj1, obj2, obj3)

console.log(res, 'res')
