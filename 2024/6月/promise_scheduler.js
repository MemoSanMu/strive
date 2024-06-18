// 延迟函数
const sleep = (time) => new Promise((resolve) => setTimeout(resolve, time));

class Scheduler {
  tasks = [];
  isRunning = false;
  runCount = 0;
  constructor(limit = 2) {
    this.max = limit;
  }
  add(cb) {
    this.tasks.push(cb);
    this.run();
  }
  run() {
    if (!this.tasks.length) {
      return;
    }
    while (this.tasks.length && this.runCount < this.max) {
      const task = this.tasks.shift();
      this.runCount++;
      task().finally(() => {
        this.runCount--;
        this.run();
      });
    }
  }
}

// 同时进行的任务最多2个
const scheduler = new Scheduler(2);

// 添加异步任务
// time: 任务执行的时间
// val: 参数˜
const addTask = (time, val) => {
  scheduler.add(() => {
    return sleep(time).then(() => console.log(val));
  });
};

addTask(1000, '1');
addTask(500, '2');
addTask(300, '3');
addTask(400, '4');
// 2
// 3
// 1
// 4
