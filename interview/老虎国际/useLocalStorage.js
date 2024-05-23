function useLocalStorage(key, init) {
  function init() {
    try {
      const localState = localStorage.getItem(key);
      if (localState) {
        return JSON.parse(localState);
      }
      localStorage.setItem(key, JSON.stringify(init));
      return init;
    } catch (error) {
      console.error(error);
      return init;
    }
  }
  const [val, setVal] = useState(init); // 要通过useState处理数据，组件才会更新

  // 设置数据
  function handleSetVal(val) {
    try {
      localStorage.setItem(key, JSON.stringify(val));
    } catch (error) {
      console.error(error);
    }
    setVal(val);
  }
  // 清空数据
  function handleDelete() {
    // clear
    localStorage.removeItem(key);
    setVal('');
  }

  // 返回
  return [val, handleSetVal, handleDelete];
}

const [val, setVal] = useLocalStorage();
