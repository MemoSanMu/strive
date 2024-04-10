class TaskPro {
  constructor() {
    this.tasks = []
    this.running = false
    this.currentIndex = 0
    this.next = async () => {
      this.currentIndex++
      await this._doWork()
    }
  }
  addTask(task) {
    this.tasks.push(task)
  }
  run() {
    if (this.running || !this.tasks.length) {
      return
    }
    if (this.currentIndex >= this.tasks.length) {
      this._resetTasks()
      return
    }
    this._doWork()
  }
  async _doWork() {
    const task = this.tasks[this.currentIndex]
    let pre = this.currentIndex
    this.running = true
    await task(this.next)
    this.running = false
    let cur = this.currentIndex
    // 说明没有手动调用 next
    if (pre === cur) {
      // 那么就需要自动next
      this.currentIndex++
      this.run()
    }
  }

  _resetTasks() {
    this.tasks = []
    this.running = false
    this.currentIndex = 0
  }
}

const t = new TaskPro()

t.addTask(async (next) => {
  console.log(1, 'start')
  await next()
  console.log(1, 'end')
})

t.addTask(() => {
  console.log(2)
})

t.addTask(() => {
  console.log(3)
})

t.run()
