const n = {
  count: 0,
  valueOf: function (params) {
    return ++this.count
  }
}

// 根据对象的隐式类型转换，通过valueOf方法，实现对象的自增

if (1 == n && 2 == n && 3 == n) {
  console.log('1==n&&2==n&&3==n')
}
