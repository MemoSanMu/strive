// tag
// attrs
// children

const vNode = {
  tag: 'div',
  attrs: { id: 'container', className: 'container-class' },
  children: [
    {
      tag: 'h1',
      attrs: { id: 'p1', className: 'p-class' },
      children: 'Hello, Virtual DOM!'
    },
    {
      tag: 'p',
      attrs: { id: 'p2', className: 'p-class' },
      children: 'Hello, Virtual DOM!'
    }
  ]
}

class VNode {
  constructor({ tag, attrs, children }) {
    this.tag = tag
    this.attrs = attrs
    this.children = children
  }
}

function virtual2Dom(vNode) {
  const ele = document.createElement(vNode.tag)
  if (vNode.attrs) {
    Object.entries(vNode.attrs).forEach(([key, value]) => {
      ele.setAttribute(key, value)
    })
  }
  if (typeof vNode.children === 'string') {
    const text = document.createTextNode(vNode.children)
    ele.appendChild(text)
  } else {
    const frame = document.createDocumentFragment()
    vNode.children.forEach((child) => {
      const node = virtual2Dom(child)
      frame.appendChild(node)
    })
    ele.appendChild(frame)
  }
  return ele
}

const virtualDom = new VNode(vNode)
const container = virtual2Dom(virtualDom)
const app = document.getElementById('app')

app.appendChild(container)
