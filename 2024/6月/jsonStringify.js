function jsonStringify(val) {
  const type = typeof val; // 类型
  // 判断几个分支
  // 1、字符串==》需要\\转义
  // 2、null number boolean ==》转成字符串返回
  // 3、数组，用[]包裹，然后遍历每一项，递归调用jsonStringify
  // 4、对象，用{}包裹，然后遍历每一项（包括key也需要处理），递归调用jsonStringify
  // 5、未知类型，返回undefined
  if (val === null) {
    return 'null';
  } else if (type === 'string') {
    return `"${val.replace(/"/g, '\\"')}"`;
  } else if (type === 'number' || type === 'boolean') {
    return String(val);
  } else if (Array.isArray(val)) {
    return `[${val.map(jsonStringify).join(',')}]`;
  } else if (type === 'object') {
    const keys = Object.keys(val);
    const res = keys
      .map((key) => {
        return `${jsonStringify(key)}:${jsonStringify(val[key])}`;
      })
      .join(',');
    return `{${res}}`;
  }
  return undefined;
}

// 测试代码
console.log(
  jsonStringify({
    a: 1,
    b: 'text',
    c: true,
    d: [1, 2, 3],
    e: { f: 'hello' },
    h: 'h',
  })
);
