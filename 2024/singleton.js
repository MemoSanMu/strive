function proxySingleton(className) {
  let instance = null;
  // 用于拦截new
  const proxy = new Proxy(className, {
    construct(target, args) {
      if (!instance) {
        // construct 等效于 new target
        instance = Reflect.construct(target, args);
      }
      return instance;
    },
  });
  className.prototype.constructor = proxy; // 防止使用原型的constructor完成 new 创建实例
  return proxy;
}

class Video {
  // 静态属性 static
  static name = 'zs'; // 静态属性只能通过类本身调用访问，会被实例所继承
  // 私有属性 #定义 ，私有属性只有类 内部才能访问【不会被继承】
  #age = 18; //  2022后 现在通过#定义私有属性, 以前是_下划线规范约束,语义约束
  type = 'video'; // 原型属性，会被继承
  constructor(name, age) {
    this.name = name;
    this.#age = age;
  }

  // 原型方法，会被实例继承
  getAge() {
    return this.#age;
  }

  // 静态方法，不会被实例继承
  static getName() {
    return this.name;
  }
}

// 实现单例模式，拦截new
const MyVideo = proxySingleton(Video);

const VideoInstance = new MyVideo('ls', 19);
// const new2 = new MyVideo.prototype.constructor('ws');

// console.log(new1 === new2, new1, new2);

// console.log(VideoInstance.getAge(), '获取私有属性');
// console.log(VideoInstance, '树实例');
// console.log(Video, 'Video类');

class Child extends MyVideo {
  constructor(name, age) {
    super(name, age);
  }
}

const MyChild = proxySingleton(Child);

const MyChildInStance = new MyChild('ls', 19);

console.log(MyChildInStance);
