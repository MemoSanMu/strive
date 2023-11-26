let [a, b, c, d, e] = (function () {
  const result = [];
  for (let i = 0; i < 5; i++) {
    let timeLimit = 1000;
    let fn = function () {
      return new Promise((resolve) => {
        setTimeout(() => {
          console.log(i);
          resolve(i);
        }, timeLimit);
      });
    };
    result.push(fn);
  }
  return result;
})();

class Concurrency {
  constructor(tasks = [], max = 2) {
    this.tasks = tasks;
    this.max = max;
    this.runCount = 0;
    this._run();
  }

  add(tasks) {
    // const fns = tasks.map(fn => {
    //     new Promise((res, rej) => {
    //           this.tasks.push({ fn,res, rej  })
    //     })
    // });
    this.tasks.push(...tasks);
    this._run();
  }

  _run() {
    while (this.tasks.length && this.runCount < this.max) {
      const fn = this.tasks.shift();
      this.runCount++;
      Promise.resolve(fn()).finally(() => {
        this.runCount--;
        this._run();
      });
    }
  }
}

function getName() {
  console.log('getName');
}

const concurrency = new Concurrency([a, b, c], 3);

concurrency.add([e]);
concurrency.add([e]);
concurrency.add([getName]);
