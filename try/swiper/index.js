const doms = {
  list: document.querySelector('.swiper-list'),
  ind: document.querySelectorAll('.indicator span'),
  left: document.querySelector('.left'),
  right: document.querySelector('.right'),
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
