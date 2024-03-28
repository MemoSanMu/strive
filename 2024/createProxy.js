function createProxy(value) {
  return new Proxy(
    {},
    {
      get(target, prop) {
        if (prop === Symbol.toPrimitive) {
          return () => value
        }
        return createProxy(value + Number(prop))
      }
    }
  )
}

const add = createProxy(0)

const r1 = add[1][2][10] + 1
// const r1 = add[1][2][3] + 1

console.log(r1)
