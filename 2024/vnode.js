class VNode {
  constructor({ tag, attrs, children }) {
    this.tag = tag
    this.attrs = attrs
    this.children = children
  }
}

const vNodeOps = {
  tag: 'div',
  attrs: { id: 'container', className: 'container-wrapper' },
  children: [
    {
      tag: 'h2',
      attrs: { id: 'h2' },
      children: 'this is h2'
    },
    {
      tag: 'div',
      attrs: { id: 'box' },
      children: 'this is box'
    },
    {
      tag: 'ul',
      attrs: { id: 'ul' },
      children: [
        {
          tag: 'li',
          attrs: { id: 'li' },
          children: 'this is li 1'
        },
        {
          tag: 'li',
          attrs: { id: 'li2' },
          children: 'this is li 2'
        },
        {
          tag: 'li',
          attrs: { id: 'li3' },
          children: 'this is li 3'
        }
      ]
    }
  ]
}

const virtualDom = new VNode(vNodeOps)

const createElement = (vNode) => {
  const { tag, attrs, children } = vNode
  // 创建div
  let ele = document.createElement(tag)
  if (attrs) {
    Object.entries(attrs).forEach(([key, val]) => {
      ele.setAttribute(key, val)
    })
  }
  // 创建文本节点
  if (typeof children === 'string') {
    ele.appendChild(document.createTextNode(children))
  } else {
    const frameEle = document.createDocumentFragment()
    children.forEach((child) => {
      frameEle.appendChild(createElement(child))
    })
    ele.appendChild(frameEle)
  }
  return ele
}

const app = document.getElementById('app')

const container = createElement(virtualDom)

function render(app, container) {
  app.appendChild(container)
}
render(app, container)
