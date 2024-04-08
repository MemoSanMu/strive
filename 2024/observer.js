// 观察者
class Observer {
  update(...args) {
    console.log(...args, '观察者')
  }
}

// 订阅者
class Subscribe {
  constructor() {
    this.observer = []
  }
  addObserver(...handles) {
    this.observer.push(...handles)
  }
  removeObserver(handle) {
    this.observer = this.observer.filter((cb) => cb !== handle)
  }
  notify(...args) {
    this.observer.forEach((cb) => cb(...args))
  }
}

const s = new Subscribe()
const o = new Observer()
s.addObserver(o.update)
s.notify('触发通知')
