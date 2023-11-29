let states = [];
let lastIndex = 0;
function useState(initState) {
  states = states[lastIndex] || initState;
  function setCb(val) {
    states[lastIndex] = val;
    // 触发 render 更新
  }
  // 缓存返回值
  return [states[lastIndex++], setCb];
}

// const [a, setA] = useState(1)
