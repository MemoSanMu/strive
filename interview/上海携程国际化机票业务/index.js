// class 定时器
// stop
// run
// 5s + 1
const MAX_TIME = 5000;
class Time {
  timer = null;
  curTime = 0;
  differenceTime = 0;
  duration = MAX_TIME;
  isStop = false;
  isPending = false;
  constructor() {
    this.init();
  }
  init() {
    this.run();
  }
  run() {
    if (this.isPending) {
      console.log('正在进行中');
      return;
    }
    this.curTime = +new Date(); // 初始化调用更新执行时间
    this.isPending = true;
    // 是否记录过hover 停止间隔时间
    if (this.isStop) {
      this.duration = this.differenceTime; // 有间隔时间就用间隔时间继续下次间歇调用
      this.differenceTime = 0; // 清空间隔时间
    }
    this.timer = setInterval(() => {
      console.log(this.duration, 'this.duration');
      if (this.isStop) {
        this.duration = MAX_TIME; // 恢复到1s开始执行
        this.isStop = false; // 恢复状态
        this.handleClear();
        this.run();
        return;
      }
      this.curTime = +new Date(); // 每次间歇，更新执行时间
    }, this.duration);
  }
  stop() {
    this.isStop = true;
    const dt = MAX_TIME - (+new Date() - this.curTime); // 计算出当前间歇的剩余时间
    this.differenceTime = dt > 0 ? dt : MAX_TIME; // hover 停止时，记录上一次执行到hover此刻的耗时时间。
    this.handleClear();
  }
  handleClear() {
    this.isPending = false;
    clearInterval(this.timer);
    this.timer = null;
  }
}

const instance = new Time();

const startNode = document.querySelector('.start'),
  stopNode = document.querySelector('.stop');

startNode.addEventListener('click', () => {
  instance.run();
});

stopNode.addEventListener('click', () => {
  instance.stop();
});
