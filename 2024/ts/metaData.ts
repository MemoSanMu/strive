// 百度已到场景题：设计类，检测类中的属性的类型是否一致，不一致则抛出异常

function assertPropertyTypes<T>() {
  return function <U extends T>(target: U) {
    for (const [key, value] of Object.entries(target)) {
      const propType = Reflect.getMetadata('design:type', target, key); // 拿到类型
      if (propType && !(value instanceof propType)) {
        // 判断值是不是继承自拿到的类型，不是则异常
        throw new Error('类型不一致');
      }
    }
    return target;
  };
}

const MyClass = assertPropertyTypes<{ prop1: String; prop2: Number }>();

@MyClass
class MyActualClass {
  prop1: String = 'hello';
  prop2: Number = 42;
}

// 百度查的

// // function assertPropertyTypes<T>() {
//   return function <U extends T>(target: U) {
//     for (const [key, value] of Object.entries(target)) {
//       const propType = Reflect.getMetadata('design:type', target, key);
//       if (propType && !(value instanceof propType)) {
//         throw new TypeError(`Property ${key} must be of type ${propType.name}`);
//       }
//     }
//     return target;
//   };
// }

// const MyClass = assertPropertyTypes<{ prop1: String, prop2: Number }>();

// @MyClass
// class MyActualClass {
//   prop1: String = 'hello';
//   prop2: Number = 42;
// }

// 尝试创建一个不符合类型约束的实例将抛出异常
// new MyActualClass(); // 应该没有问题

// 如果类型不匹配，则会抛出异常
// const wrongInstance = new MyActualClass();
// wrongInstance.prop1 = 123; // 这将抛出异常，因为 prop1 应为 String，而不是 Number
