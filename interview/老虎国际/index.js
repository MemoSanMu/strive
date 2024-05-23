// 实现 on(parent, eventType, selector, callback)
// on 函数是用来在父元素上监听特定的事件，并在该事件发生在指定的子元素上时执行一个回调函数。这个函数通常用于事件委托，以提高性能。以下是一个简单的实现：

// // 使用示例
// var parent = document.getElementById('parent');
// on(parent, 'click', '.child', function (event) {
//   console.log('Clicked on:', this.id);
// });

// 总结：实现核心就是closest这个元素方法，
// 它的原理就是，通过selector从底层开始寻找，父级元素，直到找到指定的元素，然后就返回这个元素。

/**
 * 考察事件委托 实现on函数 找到除法的selector元素，并执行callback回调函数
 * @param {HTMLElement} parent
 * @param {string} eventName
 * @param {string} selector
 * @param {Function} callback
 * @returns
 */

function on(parent, eventType, selector, callback) {
  parent.addEventListener(eventType, function (event) {
    let target = event.target;
    if (selector) {
      // Element.closest() 方法用来获取：匹配特定选择器且离当前元素最近的祖先元素（也可以是当前元素本身）。如果匹配不到，则返回 null。
      target = target.closest(selector);
    }
    if (target) {
      callback.call(target, event);
    }
  });
}

// 使用示例
const parent = document.getElementById('parent');
on(parent, 'click', '.child', function (event) {
  console.log(event, '执行回调函数');
});
