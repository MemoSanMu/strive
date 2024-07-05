interface Fn {
  (...args: any[]): void;
}

const fn: Fn = () => {};

const fn1: Fn = function () {};
