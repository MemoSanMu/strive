// function getName(name: string): void;
// function getName(name: string, age: number): void;

// function getName(name: string) {
//   console.log('name');
// }

// 函数重载类型
function message(ops: object): void;
function message(message: string): void;
function message(message: string, cb?: () => void): void;
function message(message: string, mode?: string): void;
function message(message: string, mode?: string, duration?: number): void;
function message(message: string, duration?: number, cb?: () => void): void;

// 函数声明
function message(
  params1: string | object,
  params2?: Function | string | number,
  params3?: Function | number
): void {}

// 函数调用
// 调用方式1
message({
  mode: 'mode',
  text: 'msg',
  onClose: () => {},
  duration: 3000,
});
// 调用方式2
message('msg');
// 调用方式3
message('msg', () => {});
// // 调用方式4
message('msg', 'mode');
// // 调用方式5
// message('msg', 'mode');
// // 调用方式6
message('msg', 'mode', 3000);
// // 调用方式7
message('msg', 3000, () => {});

interface ShowMessage {
  (ops: object): void;
  (msg: string): void;
  (msg: string, mode?: string): void;
  (msg: string, cb?: Function): void;
  (msg: string, mode?: string, duration?: number): void;
  (msg: string, duration?: number, cb?: Function): void;
}

interface Utils {
  showMessage: ShowMessage;
}

const utils: Utils = {
  showMessage(
    p1: object | string,
    p2?: string | number | Function,
    p3?: number | Function
  ) {},
};

// 调用
utils.showMessage({
  mode: 'mode',
  text: 'msg',
  onClose: () => {},
  duration: 100,
});
utils.showMessage('msg');
utils.showMessage('msg', () => {});
utils.showMessage('msg', 'mode');
utils.showMessage('msg', 'mode', 3000);
utils.showMessage('msg', 3000, () => {});
