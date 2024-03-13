// 跨浏览的事件处理方式：

const EventUtils = {
  handleEvents: function (element, type, handler) {
    if (element.addEventListener) {
      element.addEventListener(type, handler)
    } else if (element.attachEvent) {
      element.attachEvent('on' + type, handler)
    } else {
      element['on' + type] = handler
    }
  },
  removeEventHandler: function (element, type, handler) {
    if (element.removeEventListener) {
      element.removeEventListener(type, handler)
    } else if (element.detachEvent) {
      element.detachEvent('on' + type, handler)
    } else {
      element['on' + type] = null
    }
  }
}
