// 枚举 enum

// 枚举 常量集合

// 枚举分为
// 1、数字枚举
// 2、字符串枚举
// 3、异构枚举【数字枚举和字符串枚举的混合】

// 1 数字枚举
// 默认不赋值 从0开始累加up = 0 left = 1 right = 2 down = 3
enum NumberEnum {
  Up,
  Left,
  Right,
  Down,
}

// 赋值后 从10开始累加 up = 10 left = 11 right = 12 down = 13
enum NumberEnum2 {
  Up = 10,
  Left,
  Right,
  Down,
}

// 字符串枚举
enum StringEnum {
  Up = 'up',
  Left = 'left',
  Right = 'right',
  Down = 'down',
}

// 异构枚举[数字枚举和字符串枚举的混合写法]
enum MixedEnum {
  Up = 1,
  Left = 'left',
  Right = 2,
  Down = 'down',
}

// 获取值可以正反映射操作
// 获取值 MixedEnum[0] > up MixedEnum[1] > left MixedEnum[2] > right MixedEnum[3] > down
//  获取值 MixedEnum['Up'] = 1 MixedEnum['Left'] = 'left' MixedEnum['Right'] = 2 MixedEnum['Down'] = 'down'

// 文档://vue3js.cn/interview/typescript/enum.html#%E4%BA%8C%E3%80%81%E4%BD%BF%E7%94%A8
