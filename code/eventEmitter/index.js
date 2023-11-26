class EventEmitter {
  constructor() {
    this.events = {};
  }

  on(k, v) {
    if (!this.events[k]) {
      this.events[k] = [];
    }
    this.events[k].push(v);
  }

  emit(k, ...args) {
    if (!this.events[k]) {
      console.log('没有定义');
      return;
    }
    this.events[k].forEach((fn) => {
      fn(...args);
    });
  }
  del(k, v) {
    if (!this.events[k]) {
      console.log('没有定义');
      return;
    }
    this.events[k] = this.events[k].filter((fn) => fn !== v);
  }
}

const ee = new EventEmitter();

ee.on('wakeUp', (name) => {
  console.log(`${name} 2`);
});

ee.on('eat', (name) => {
  console.log(`${name} 3`);
});

ee.emit('eat', 'eat');
ee.emit('wakeUp', 'wakeUp');
ee.emit('wakeUps', 'wakeUp');
