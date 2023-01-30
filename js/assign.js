// Object.assign() is not available in IE11. And the babel compiled output for object spread
// syntax checks a bunch of Symbol stuff and is almost a kb. So this function is the smaller replacement.
export function assign() {
  for (let i = arguments.length - 1; i > 0; i--) {
    for (let key in arguments[i]) {
      if (key === '__proto__') {
        continue
      }
      arguments[i - 1][key] = arguments[i][key]
    }
  }

  return arguments[0]
}

/**
 * while循环语句
 * @returns objects combine
 */
export function assignWhile() {
  let index = arguments.length
  while (--index > 0) {
    for (let key in arguments[index]) {
      if (key === '__proto__') {
        continue
      }
      arguments[index - 1][key] = arguments[index][key]
    }
  }
  return arguments[0]
}

// 目的：将参数除了第一条数据的key都赋值更新到第一条数据内，实现assign合并功能
// 1、第一步遍历行参，倒叙，不循环第一条
// 2、for循环遍历行参，参数对象，做赋值处理（细节：key位__proto__原型参数时跳出循环体），行参[i-1]=行参[i] 实现向前更新
// 3、将第一条数据return
