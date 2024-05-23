// 实现一个LazyMan，可以按照以下方式调用:
// LazyMan('Hank')输出:
// Hi! This is Hank!
// LazyMan('Hank').sleep(10).eat('dinner')输出
// Hi! This is Hank!
// //等待10秒..
// Wake up after 10
// Eat dinner~
// LazyMan('Hank').sleep(10).eat('dinner').eat('supper')输出
// Hi This is Hank!
// Eat dinner~
// Eat supper~
// LazyMan('Hank').sleepFirst(5).eat('supper')输出
// //等待5秒
// Wake up after 5
// Hi This is Hank!
// Eat supper~
// 以此类推。

// 【面试的时候没有做出来】【看了题解后觉得并不难】
// 思路就是维护一个执行tasks任务列表
// 1.普通调用，支持链式调用
// 2.支持传入一个回调函数，在执行完所有tasks后执行回调函数
// 然后细节就是通过next继续执行下一个任务

function LazyMan(name) {
  // 普通调用，使用new 返回实例，支持链式调用
  if (!new.target) {
    return new LazyMan(name);
  }
  const fn = (next) => {
    console.log(`Hi This is ${name}!`);
    next();
  };

  this.tasks = [fn];
  setTimeout(() => {
    this.next();
  }, 0);
  return this;
}

LazyMan.prototype.next = function () {
  if (!this.tasks.length) return;
  const task = this.tasks.shift();
  task(this.next.bind(this));
};

LazyMan.prototype.sleep = function (duration) {
  function task(next) {
    setTimeout(() => {
      console.log(`Wake up after ${duration}`);
      next();
    }, duration * 100);
  }
  this.tasks.push(task);
  return this;
};

LazyMan.prototype.sleepFirst = function (duration) {
  function task(next) {
    setTimeout(() => {
      console.log(`Wake up after ${duration}`);
      next();
    }, duration * 100);
  }
  this.tasks.unshift(task);
  return this;
};

LazyMan.prototype.eat = function (name) {
  function task(next) {
    console.log(`Eat ${name}~`);
    next();
  }
  this.tasks.push(task);
  return this;
};

LazyMan('Hank');

LazyMan('Hank').sleep(10).eat('dinner');

LazyMan('Hank').sleep(10).eat('dinner').eat('supper');

LazyMan('Hank').sleepFirst(5).eat('supper');
