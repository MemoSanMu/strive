# react

## [文档链接](https://mp.weixin.qq.com/s/qMutfBr6bA_fWYjAKF7s9A)

### 生命周期

```jsx
// 初始化
constructor;
static getDerivedStateFromProps
render;
componentDidMount;

// 更新
static getDerivedStateFromProps
shouldComponentUpdate
render
getSnapShopBeforeUpdate
componentDidUpdate

// 卸载
componentWillUnmount

// 错误边界
static getDerivedStateFromError // 渲染错误ui
componentDidCatch // 打印错误信息
```

### 错误边界

```jsx
// 错误边界
// 语法
 static getDerivedStateFromError(error) {
    // 更新 state 使下一次渲染能够显示降级后的 UI
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // 你同样可以将错误日志上报给服务器
    logErrorToMyService(error, errorInfo);
  }
```

### 实现 useState

```jsx
  // 一、实现useState
const { render } = require("react-dom");
let memoriedStates = [];
let lastIndex = 0;
function useState(initialState) {
  memoriedStates[lastIndex] = memoriedStates[lastIndex] || initialState;
  function setState(newState) {
    memoriedStates[lastIndex] = newState;
    // 状态更新完毕，调用render函数。重新更新视图
    render();
  }
  // 返回最新状态和更新函数，注意 index 要前进
  return [memoriedStates[lastIndex++], setState];
}

// 二、实现useEffect
let lastDendencies; // 存放依赖项的数组
functionuseEffect(callback, dependencies) {
  if (lastDendencies) {
    // 判断传入的依赖项是不是都没有变化，只要有以一项改变，就需要执行callback
    const isChange = dependencies && dependencies.some((dep, index) => dep !== lastDendencies[index]);
    if (isChange) {
      // 一开始没有值，需要更新一次(相当于componentDidMount)
      typeof callback === 'function' && callback();
      // 更新依赖项
      lastDendencies = dependencies;
    }
  } else {
    // 一开始没有值，需要更新一次(相当于componentDidMount)
    typeof callback === 'function' && callback();
    // 更新依赖项
    lastDendencies = dependencies;
  }
}

// 三、实现useCallback
let lastCallback; // 最新的回调函数
let lastCallbackDependencies = []; // 回调函数的依赖项
functionuseCallback(callback, dependencies = []) {
  if (lastCallback) {
    const isChange = dependencies && dependencies.some((dep, index) = dep !== lastCallbackDependencies[index]);
    if (isChange) {
      // 只要有一个依赖项改变了，就更新回调(重新创建)
      lastCallback = callback;
      lastCallbackDependencies = dependencies;
    }
  } else {
    lastCallback = callback;
    lastCallbackDependencies = dependencies;
  }
  // 最后需要返回最新的函数
  return lastCallback;
}

// 四、实现useRef
let lastRef;
functionuseRef(initialValue = null){

  lastRef = lastRef != undefined ? lastRef : initialValue;
  // 本质上就是返回一个对象，对象种有一个current属性，值为初始化传入的值，如果没有传入初始值，则默认为null
  return {
    current: lastRef
  }
}

// 五、实现useContext
functionuseContext(context){
  // 很简单，就是返回context的_currentValue值
  return context._currentValue;
}

// 六、实现useReducer
let lastState;
functionuseReducer(reducer, initialState){
  lastState = lastState !== undefined ? lastState : initialState;
  // dispatch一个action，内部就是自动调用reducer来计算新的值返回
  functiondispatch(action){
    lastState = reducer(lastState, action);
    // 更新完毕后，需要重新渲染视图
    render();
  }
  // 最后返回一个的状态值和派发action的方法
  return [lastState, dispatch];
}
```
