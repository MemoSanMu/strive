// <T, U>

// function extend<T, U>(pre: T, cur: U): T & U {
//   return { ...pre, ...cur };
// }

function extend<T, U>(pre: T, cur: U): T & U {
  let result = <T & U>{};
  for (let key in pre) {
    (<any>result)[key] = pre[key];
  }
  for (let key in cur) {
    if (!(<any>result).hasOwnProperty(key)) {
      (<any>result)[key] = cur[key];
    }
  }
  return result;
}
