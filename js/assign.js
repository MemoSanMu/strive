// Object.assign() is not available in IE11. And the babel compiled output for object spread
// syntax checks a bunch of Symbol stuff and is almost a kb. So this function is the smaller replacement.
export function assign() {
  for (let i = arguments.length - 1; i > 0; i--) {
    for (let key in arguments[i]) {
      if (key === "__proto__") {
        continue;
      }
      arguments[i - 1][key] = arguments[i][key];
    }
  }

  return arguments[0];
}


/**
 * while循环语句
 * @returns objects combine
 */
export function assignWhile() {
 let index = arguments.length 
  while (--index > 0) {
    for (let key in arguments[index]) {
       if (key === "__proto__") {
        continue;
      }
      arguments[index - 1][key] = arguments[index][key];
    }
}
 return arguments[0];
}
