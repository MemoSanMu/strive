function usePrevious(initial) {
  let count = 0;
  let states = [initial];
  function handleSet(val) {
    states[count] = val;
    count++;
    // render 更新
  }
  const getVal = () => states[count - 2] || states[count - 1];
  return [getVal, handleSet];
}

const [getVal, set] = usePrevious();

set('pre');
set('cur');
console.log(getVal(), 'value');
