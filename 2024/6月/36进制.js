function toBase36(number) {
  return number.toString(36);
}

function fromBase36(string) {
  return parseInt(string, 36);
}

// 示例
console.log(toBase36(123456789)); // 输出：21i3v9
console.log(fromBase36('21i3v9')); // 输出：123456789
