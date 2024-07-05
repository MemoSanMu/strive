function Arrange(params) {
  if (!new.target) {
    return new Arrange(params);
  }
  const task = (next) => {
    console.log(`${params} is notified`);
    next();
  };
  this.queue = [task];
  return this;
}

Arrange.prototype.run = function () {
  if (!this.queue.length) {
    return;
  }
  const task = this.queue.shift();
  task(this.run.bind(this));
};

Arrange.prototype.waitFirst = function (duration) {
  function task(next) {
    setTimeout(() => {
      next();
    }, duration * 1000);
  }
  this.queue.unshift(task);
  return this;
};

Arrange.prototype.wait = function (duration) {
  function task(next) {
    setTimeout(() => {
      next();
    }, duration * 1000);
  }
  this.queue.push(task);
  return this;
};

Arrange.prototype.do = function (message) {
  function task(next) {
    console.log(`start to ${message}`);
    next();
  }
  this.queue.push(task);
  return this;
};

Arrange.prototype.execute = function () {
  this.run();
  return this;
};

Arrange('william').wait(5).do('commit').waitFirst(3).execute();
// 等待3秒
// william is notified
// 等待5秒
// start to commit
