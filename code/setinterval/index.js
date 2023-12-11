// setTimeout模拟setInterval

function handSetInterval(cb, d) {
  let timer = null;
  let stop = false;
  function interval() {
    if (stop) {
      return;
    }
    timer = setTimeout(() => {
      cb();
      interval();
    }, d);
  }
  interval();
  return () => {
    stop = true;
    clearTimeout(timer);
    timer = null;
  };
}

let count = 0;

let clears = handSetInterval(() => {
  if (count >= 5) {
    clears();
    return;
  }
  console.log(count);
  count++;
}, 1000);
