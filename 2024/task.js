function timeout(time) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve()
    }, time)
  })
}

class SuperTask {
  constructor(max = 2) {
    this.tasks = []
    this.max = max
    this.runningCount = 0
  }
  add(task) {
    return new Promise((resolve, reject) => {
      this.tasks.push({ task, resolve, reject })
      this._run()
    })
  }
  _run() {
    while (this.tasks.length && this.runningCount < this.max) {
      const { task, resolve, reject } = this.tasks.shift()
      this.runningCount++
      task()
        .then(resolve)
        .catch(reject)
        .finally(() => {
          this.runningCount--
          this._run()
        })
    }
  }
}

const superTask = new SuperTask()
function addTask(time, name) {
  superTask
    .add(() => timeout(time))
    .then(() => {
      console.log(`任务${name}完成`)
    })
}
addTask(10000, 1)
addTask(5000, 2)
addTask(3000, 3)
addTask(4000, 4)
addTask(5000, 5)
/*
期望结果:
10000毫秒后输出 任务1完成
5000毫秒后输出 任务2完成
8000毫秒后输出 任务3完成
12000毫秒后输出 任务4完成
15000毫秒后输出 任务5完成
*/
