const obj = {
  a: 1,
  b: {
    c: [1],
    d: 3
  },
  e: {
    k: {
      g: {
        l: 18
      }
    }
  }
}

function objectFlat(obj, parentkey = '') {
  //   if (typeof obj !== 'object' || obj === null) {
  //     return obj
  //   }
  //   let res = Array.isArray(obj) ? [] : {}
  //   for (let key in obj) {
  //     const newkey = parentkey ? `${parentkey}.${key}` : key
  //     let value = obj[key]
  //     if (typeof value !== 'object' || value === null) {
  //       res[newkey] = value
  //     } else {
  //       //   res[newkey] = objectFlat(value, newkey)
  //       const values = objectFlat(value, newkey)
  //       //   console.log(values)
  //       Object.assign(res, values)
  //     }
  //   }
  //   return res
  let result = {}

  function dfs(obj, parentkey) {
    if (typeof obj !== 'object' || obj === null) {
      return (result[parentkey] = obj)
    }
    for (let key in obj) {
      const newkey = parentkey ? `${parentkey}.${key}` : key
      let value = obj[key]
      if (typeof value !== 'object' || value === null) {
        result[newkey] = value
      } else {
        dfs(value, newkey)
        // const values = objectFlat(value, newkey)
        //   console.log(values)
        // Object.assign(res, values)
      }
    }
  }
  dfs(obj, '')
  return result
}

const res = objectFlat(obj)

console.log(res, 'res')
// { a: 1, 'b.c.0': 1, 'b.d': 3, 'e.k.g.l': 18 }
