const htmlString = '<div class="test"><p>Hello</p><span>World</span></div>';
const tree = htmlToTree(htmlString);
console.log(tree);

function htmlToTree(html) {
  const parser = new DOMParser(); // DOMParser 可以将存储在字符串中的 XML 或 HTML 源代码解析为一个 DOM Document。
  const doc = parser.parseFromString(html, 'text/html'); // parseFromString()该接口的方法解析DOMParser包含 HTML 或 XML 的字符串，返回一个HTMLDocument或一个XMLDocument.
  return domToTree(doc.documentElement);
}

function domToTree(node) {
  // 依次处理 节点名称、节点属性、子节点（需要判断是不是Node.ELEMENT_NODE）
  // node.tagName 获取节点名称
  // node.attributes 获取节点属性
  // node.childNodes 获取子节点
  // node.nodeType 获取元素类型
  const treeNode = {
    tagName: node.tagName,
    children: [],
  };

  if (node.attributes) {
    treeNode.attributes = Array.from(node.attributes).reduce(
      (pre, cur) => ({ ...pre, [cur.name]: cur.value }),
      {}
    );
  }

  if (node.childNodes) {
    node.childNodes.forEach((node) => {
      // 如果是元素节点
      if (node.nodeType === Node.ELEMENT_NODE) {
        treeNode.children.push(domToTree(node));
      }
    });
  }
  return treeNode;
}
