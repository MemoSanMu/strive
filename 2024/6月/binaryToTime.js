// 示例使用
const binaryStr = '000000000000000000000000000000000000000000000000';
console.log(binaryToTime(binaryStr)); // 输出: "00:00:00"

function binaryToTime(binaryStr) {
  // if (binaryStr.length !== 48) {
  //   throw new Error('error');
  // }
  const str = parseInt(binaryStr, 2);
  const h = Math.floor(str / 3600);
  const m = Math.floor((str % 3600) / 60);
  const s = str % 60;
  return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s
    .toString()
    .padStart(2, '0')}`;
}
