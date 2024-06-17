function jsonStringify(obj) {
  const type = typeof obj;

  if (type === 'string') {
    return `"${obj.replace(/"/g, '\\"')}"`;
  } else if (type === 'number' || type === 'boolean') {
    return String(obj);
  } else if (obj === null) {
    return 'null';
  } else if (Array.isArray(obj)) {
    return `[${obj.map(jsonStringify).join(',')}]`;
  } else if (type === 'object') {
    const props = Object.keys(obj)
      .map((key) => `${jsonStringify(key)}:${jsonStringify(obj[key])}`)
      .join(',');
    return `{${props}}`;
  }

  // 对于未知类型，返回undefined
  return undefined;
}

// 测试代码
console.log(
  jsonStringify({ a: 1, b: 'text', c: true, d: [1, 2, 3], e: { f: 'hello' } })
);
