class TaskPro {
  constructor() {
    this.tasks = [];
    this.running = false;
    this.currentIndex = 0;
    this.next = async () => {
      this.currentIndex++;
      await this._runningWork();
    };
  }
  addTask(task) {
    this.tasks.push(task);
  }
  run() {
    if (this.running || !this.tasks.length) {
      return;
    }
    // 执行完成
    if (this.currentIndex >= this.tasks.length) {
      this._resetTasks();
      return;
    }
    this.running = true;
    this._runningWork();
  }
  async _runningWork() {
    const task = this.tasks[this.currentIndex];
    const i = this.currentIndex;
    await task(this.next);
    const j = this.currentIndex;
    this.running = false;
    if (i === j) {
      this.currentIndex++;
      this.run();
    }
  }
  _resetTasks() {
    this.tasks = [];
    this.running = false;
    this.currentIndex = 0;
  }
}

const t = new TaskPro();

t.addTask(async (next) => {
  console.log(1, 'start');
  await next();
  console.log(1, 'end');
});

t.addTask(() => {
  console.log(2);
});

t.addTask(() => {
  console.log(3);
});

t.run();
