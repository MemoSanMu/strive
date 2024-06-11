// 可以引⼊的库和版本相关请参考 “环境说明”
// Please refer to the "Environmental Notes" for the libraries and versions that can be introduced.

// function main() {
// console.log('Talk is cheap, show me the code.');
// }
// main()

// width:100px border: 1px padding: 10px

// content-box: 100
// border-box: 111

// 1 + false + true + undefined + 'shuhe' + null + 1 = 'NaNshuhenull1'

// 1+ 0 + 1 + NaN + 'NaNshuhenull1' +

// var a = {
// val: 1,
// valueOf () {
// return this.val++
// }
// };

// if (a == 1 && a == 2 && a == 3) {
// console.log(1)
// }

function add (a, b, c, d) {
return a + b + c + d
// return [...arguments].reduce((pre, cur) => pre + cur, 0)
}
function carry (fn, ...arg) {
const args = Array.prototype.slice.call(arg)
return function (...a) {
const combineArgs = [...args, ...a]
if (combineArgs.length === fn.length) {
return fn.apply(this, combineArgs)
}
return carry.call(this, fn, ...combineArgs)
}
}

const sum = carry(add)

const val = sum(1)(2)(3)(4)

console.log(val, 'val')
// sum(1)(2)(3) // 6

// 处理不同？
// 1、<Children / >

// 2、{props.children}

// 17 前合成事件更新？
react onClick

上海数禾信息科技有限公司 => 互联网金融 /信贷 => 还呗 app
技术中心（320+）
app 及前台研发部（45）
客户端（8）
对客产品前端组（7）
内部运营前端组（26）React + dataseed design
一组
二组
基础架构（组件库、低代码、微前端、工程化、脚手架...）

需求前置沟通 => 需求宣贯会 => 详细设计 => 排期 => 开发 => dev、微环境（自测）、sit（测试环境） => prod
