const fn = (function (params) {
  const obj = {
    a: 1,
    b: 2
  }
  return {
    getObj: function (key) {
      return obj[key]
    }
  }
})()

Object.defineProperty(Object.prototype, 'hack', {
  get: function (key) {
    return this
  }
})

const newObj = fn.getObj('hack')
newObj.c = 'c'
newObj.b = 'update'
console.log(newObj, 'newObj')
