class VNode {
  constructor({ tag, attrs, children }) {
    this.tag = tag;
    this.attrs = attrs;
    this.children = children;
  }
}

// jsx模版语法
{
  /* <div class="container-wrapper" id="container">
  <h2 id="h2">this is h2</h2>
  <div id="box">this is box</div>
  <ul id="ul">
    <li id="li">this is li 1</li>
    <li id="li2">this is li 2</li>
    <li id="li3">this is li 3</li>
  </ul>
</div>; */
}

// babel jsx_runtime 转换成 virtual dom

// jsx('div', { id: 'container', className: 'container-wrapper' }, [
//   h('h2', { id: 'h2' }, 'this is h2'),
//   h('div', { id: 'box' }, 'this is box'),
//   h('ul', { id: 'ul' }, [
//     h('li', { id: 'li' }, 'this is li 1'),
//     h('li', { id: 'li2' }, 'this is li 2'),
//     h('li', { id: 'li3' }, 'this is li 3'),
// ])

// jsx 通过 React.createElement 创建react 元素，也就是虚拟dom virtual dom
const vNodeOps = {
  tag: 'div',
  attrs: { id: 'container', className: 'container-wrapper' },
  children: [
    {
      tag: 'h2',
      attrs: { id: 'h2' },
      children: 'this is h2',
    },
    {
      tag: 'div',
      attrs: { id: 'box' },
      children: 'this is box',
    },
    {
      tag: 'ul',
      attrs: { id: 'ul' },
      children: [
        {
          tag: 'li',
          attrs: { id: 'li' },
          children: 'this is li 1',
        },
        {
          tag: 'li',
          attrs: { id: 'li2' },
          children: 'this is li 2',
        },
        {
          tag: 'li',
          attrs: { id: 'li3' },
          children: 'this is li 3',
        },
      ],
    },
  ],
};

const virtualDom = new VNode(vNodeOps);

const createElement = (vNode) => {
  const { tag, attrs, children } = vNode;
  // 创建div
  let ele = document.createElement(tag);
  if (attrs) {
    Object.entries(attrs).forEach(([key, val]) => {
      ele.setAttribute(key, val);
    });
  }
  // 创建文本节点
  if (typeof children === 'string') {
    ele.appendChild(document.createTextNode(children));
  } else {
    const frameEle = document.createDocumentFragment();
    children.forEach((child) => {
      frameEle.appendChild(createElement(child));
    });
    ele.appendChild(frameEle);
  }
  return ele;
};

const app = document.getElementById('app');

const container = createElement(virtualDom);

function render(app, container) {
  app.appendChild(container);
}

// 将虚拟dom元素，生成真实的dom
render(app, container);
