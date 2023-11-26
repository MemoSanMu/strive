/**
 * @param {number[]} nums
 * @return {void} 不要返回任何内容，而是就地修改nums。*/
var moveZeroes = function (nums) {
  let i = 0,
    len = nums.length;
  for (let j = 0; j < len; j++) {
    if (nums[j] === 0) {
      continue;
    }
    nums[i] = nums[j];
    i++;
  }
  while (i < len) {
    nums[i++] = 0;
  }
  return nums;
};

console.log(moveZeroes([0, 1, 0, 3, 12]));
