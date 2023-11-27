const doms = {
  container: document.querySelector('.swiper-container'),
  list: document.querySelector('.swiper-list'),
  ind: document.querySelectorAll('.indicator span'),
  left: document.querySelector('.left'),
  right: document.querySelector('.right')
};

let curIndex = 0;
const maxCount = doms.ind.length - 1;

function init() {
  const first = doms.list.firstElementChild.cloneNode(true);
  const last = doms.list.lastElementChild.cloneNode(true);

  doms.list.appendChild(first);
  doms.list.insertBefore(last, doms.list.firstElementChild);

  last.style.position = 'absolute';
  last.style.transform = 'translateX(-100%)';

  doms.ind.forEach((i, index) => {
    i.onclick = () => {
      curIndex = index;
      moveTo(index);
    };
  });
}
init();

let interval;

const play = () => {
  interval = setInterval(() => {
    rightNext();
  }, 2000);
};

play();

doms.container.addEventListener('mouseover', () => {
  clearInterval(interval);
  interval = null;
});
doms.container.addEventListener('mouseout', () => {
  play();
});

const handler = () => {
  // 也可以通过document.hidden属性（布尔类型）来判断
  // window.document.hidden (True/False)

  // document.visibilityState拥有两种字符串枚举值（'visible' 和 'hidden'）
  if (window.document.visibilityState === 'visible') {
    // 当页签处于可见状态，TODO
    play();
  } else {
    clearInterval(interval);
    interval = null;
    // 当页签处于不可见状态（hidden），TODO
  }
};

window.document.addEventListener('visibilitychange', handler);

function moveTo(index) {
  doms.list.style.transform = `translateX(-${index}00%)`;
  doms.list.style.transition = '.5s';

  const active = document.querySelector('.indicator span.active');
  active.classList.remove('active');
  doms.ind[index].classList.add('active');
}

function leftNext() {
  if (curIndex === 0) {
    doms.list.style.transform = `translateX(-${maxCount + 1}00%)`;
    doms.list.style.transition = 'none';
    doms.list.clientHeight;
    curIndex = maxCount;
    moveTo(curIndex);
  } else {
    moveTo(--curIndex);
  }
}

function rightNext() {
  if (curIndex === maxCount) {
    doms.list.style.transform = 'translateX(100%)';
    doms.list.style.transition = 'none';
    doms.list.clientHeight;
    curIndex = 0;
    moveTo(curIndex);
  } else {
    moveTo(++curIndex);
  }
}

doms.right.onclick = () => {
  rightNext();
};

doms.left.onclick = () => {
  leftNext();
};
