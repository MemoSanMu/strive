//手写instanceof
function myInstanceof(left, right) {
    let leftValue = left.__proto__
    let rightValue = right.prototype
    while (true) {
        if (leftValue === rightValue) {
            return true
        }
        if (leftValue === null) {
            return false
        }
        leftValue = leftValue.__proto__
    }
}
// 手写promise
function MyPromise(executor) {
    const PENDING = 'pending';
    const FULFILLED = 'fulfilled';
    const REJECTED = 'rejected';

    let self = this;
    self.state = PENDING;

    function resolve(value) {
        if (self.state === PENDING) {
            self.state = FULFILLED;
        }
    }

    function reject(reason) {
        if (self.state === PENDING) {
            self.state = REJECTED;
        }
    }

    try {
        executor(resolve, reject);
    } catch (reason) {
        reject(reason);
    }
}
// 手写promise.all
function myAll(arr) {
    if (!Array.isArray(arr)) {
        return
    }
    let index = 0
    let result = []
    return new Promise((reslove, rejects) => {
        for (let i = 0; i < arr.length; i++) {
            arr[i].then((res) => {
                result.push(res);
                index++;
                if (index === arr.length) {
                    reslove(result)
                }
            }).catch((res) => {
                rejects(res)
            })

        }
    })
}
// 手写bind
Function.prototype.Mybind = function (obj) {
    let scope = this
    let arr = Array.prototype.slice.call(arguments, 1)
    return function () {
        let sArr = Array.prototype.slice.call(arguments, 1)
        scope.apply(obj, arr.concat(sArr))
    }
}

// 手写防抖（以最后一次为基准）
function deb(fn, await) {
    let timer = null
    return (...args) => {
        if (timer) {
            clearTimeout(timer)
        }
        timer = setTimeout(() => {
            fn.apply(this, ...args)
            timer = null
        }, await);
    }
}
// 手写节流（以第一次为基准）
// 节流 (Throttling) setTimeout 的含义是指在一定时间内，多次触发同一个事件，只执行第一次操作 由于进入函数，就执行setTimeout，所以不会立即触发函数执行。后续则每隔wait时间执行一次，如果停止触发，而后还会触发执行一次函数
function throttle(event, time) {
    let timer = null;
    return function (...arg) {
        if (!timer) {
            timer = setTimeout(() => {
                timer = null;
                event.apply(this, arg)
            }, time)
        }
    }
}
// 节流 时间戳方式 由于首次previous = 0，则此时函数第一次触发就会立即执行。后续则每隔wait时间执行一次，如果停止触发，则不会再执行函数。
function throttle2(func, wait) {
    let context, now;
    let previous = 0; // 设置过去的执行时间初始值为0
    return function (...args) {
        context = this;
        now = +(Date.now() || new Date().getTime());
        if (now - previous > wait) {
            func.apply(context, args);
            previous = now;
        }
    };
}

//快速排序
function foo(arr) {
    if (arr.length <= 1) {
        return arr
    }
    let defIndex = Math.floor(arr.length / 2)
    let def = arr.splice(defIndex, 1)[0]
    let left = []
    let right = []
    for (let i = 0; i < arr.length; i++) {
        if (def > arr[i]) {
            left.push(arr[i])
        } else {
            right.push(arr[i])

        }
    }
    return foo(left).concat([def], foo(right))
}

// 寻找第k大大数字
// 基于快排算法
function searchK(arr, low, high, key) {
    if (low > high) {
        return -1;
    }
    var mid = parseInt((high + low) / 2);
    if (arr[mid] == key) {
        return mid;
    } else if (arr[mid] > key) {
        high = mid - 1;
        return searchK(arr, low, high, key);
    } else if (arr[mid] < key) {
        low = mid + 1;
        return searchK(arr, low, high, key);
    }
};

//js遍历二叉树 非递归 深度
function dfs(tree) {
    let result = []
    let stack = []
    stack.push(tree)
    while (stack.length) {
        let node = stack.pop()
        result.push(node.value)
        if (node.right) {
            stack.push(node.right.value)  // 先压右子树
        }
        if (node.left) {
            stack.push(node.left.value)
        }
    }
    return result
}

// 广度 层序遍历
function BFS(node) {
    var result = [];

    if (node != null) {
        var queue = [];
        queue.unshift(node);

        while (queue.length != 0) {
            var item = queue.shift();
            result.push(item);
            var children = item.children;
            for (var i = 0; i < children.length; i++)
                queue.push(children[i]);
        }
    }
    return result;
}

// 获取树的深度
function handleGetTreeDeep(fileHeader) {
    let deep = 0;
    fileHeader.forEach((item) => {
        if (item.children) {
            deep = Math.max(deep, handleGetTreeDeep(item.children) + 1);
        } else {
            deep = Math.max(deep, 1);
        }
    });
    return deep;
}

// 斐波那契数
function foo3(n) {
    if (n <= 2) {
        return 1
    } else {
        return arguments.callee(n - 1) + arguments.callee(n - 2)
    }
}

//手写promise all 
function foo(arr) {
    let result = []
    let index = 0
    new Promise((reslove, reject) => {
        for (let i = 0; i < arr.length; i++) {
            arr[i].then((res) => {
                result.push(res)
                index++
                if (index = i) {
                    reslove(result)
                }
            }).catch((res) => {
                reject(res)
            })
        }
    })
}

//手写bind
Function.prototype.myBind = function (obj) {
    let scope = this
    let arr = Array.prototype.slice.call(arguments, 1)
    return function () {
        let arr2 = Array.prototype.slice.call(arguments, 1)

        scope.apply(obj, arr.concat(arr2))
    }
}

// 数组拍平
function arrFor(arr) {
    if (!Array.isArray(arr)) {
        return
    }
    let result = []
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] instanceof Array) {
            result = result.concat(arrFor(arr[i]))
        } else {
            result.push(arr[i])
        }
    }
    return result
}
function foo(arr) {
    if (!Array.isArray(arr)) return
    return arr.reduce((pre, cur) => {
        return pre.concat(Array.isArray(cur) ? foo(cur) : cur)
    }, [])
}

// 约瑟夫问题（自杀问题）
function foo(m, k) {
    let arr = []
    for (let i = 1; i <= m; i++) {
        arr.push(i)
    }
    let flag = 0
    while (arr.length > 1) {
        let arrLen = arr.length
        let num = 0
        for (let i = 0; i < arrLen; i++) {
            flag++;
            if (flag == k) {
                arr.splice(i - num, 1)
                flag = 0;
                num++
            }
        }
    }
    return arr[0]
}

// js每个数组元素右侧第一个比当前数大的数的下标
function fuc(nums) {
    const stack = [[0, nums[0]]];
    const res = Array(nums.length).fill(-1)

    for (let i = 1; i < nums.length; i++) {
        while (stack.length && nums[i] > stack[stack.length - 1][1]) {
            res[stack[stack.length - 1][0]] = i

            stack.pop()
        }
        stack.push([i, nums[i]])
    }

    return res
}

//返回出现最多的标签
function findMaxTag() {
    let tags = document.getElementsByTagName('*')
    let obj = {}
    let maxTag = ''
    let maxNum = 0
    for (const item of tags) {
        let tagName = item.tagName
        if (!obj[tagName]) {
            obj[tagName] = 1
        } else {
            obj[tagName]++

            if (obj[tagName] > maxNum) {
                maxTag = tagName
                maxNum = obj[tagName]
            }
        }
    }
    return maxTag
}

// 实现模版字符传对象
function getTemplate(pattern, data) {
    let str = ""
    let stack = []
    for (let key of pattern) {
        if (key === "{") {
            stack.push(str)
            str = ""
        } else if (key === "}") {
            const _data = stack.pop()
            const result = data[str]
            str = _data + result
        } else if (key === "$") {
            continue
        } else {
            str += key
        }
    }
    return str
}
getTemplate("${name} is  ${age} years old", { name: "Jim", age: 20 })
getTemplate('asdd ${tgy}  has ${gender}', { tgy: 'tgy', gender: 'man' })

// sort 冒泡排序
function mySort(arr) {
    for (let i = 0; i < arr.length - 1; i++) {
        for (let j = 0; j < arr.length; j++) {
            if (arr[j] > arr[j + 1]) {
                let temp = arr[j]
                arr[j] = arr[j + 1]
                arr[j + 1] = temp
            }
        }
    }
    return arr
}

// 柯里化!!!!!
function add() {
    // 第一次执行时，定义一个数组专门用来存储所有的参数
    var _args = Array.prototype.slice.call(arguments);
    // 在内部声明一个函数，利用闭包的特性保存_args并收集所有的参数值
    var _adder = function () {
        _args.push(...arguments);
        return _adder;
    };
    // 利用toString隐式转换的特性，当最后执行时隐式转换，并计算最终的值返回
    _adder.toString = function () {
        return _args.reduce(function (a, b) {
            return a + b;
        });
    }
    return _adder;
}
function p() {
    let args = [...arguments];
    let adder = function () {
        args = args.concat([...arguments])
    }
    adder.toString = function () {
        return args.reduce((a, b) => {
            return a + b
        })
    }
    return adder;
}
// 使用reudce模拟map
Array.prototype._map = function (fn, callbackThis) {
    // 最终返回的新数组
    let res = [];
    // 定义回调函数的执行环境
    // call第一个参数传入null，则 this指向全局对象，同 map的规则
    let CBThis = callbackThis || null;
    this.reduce((brfore, after, idx, arr) => {
        // 传入map回调函数拥有的参数
        // 把每一项的执行结果push进res中
        res.push(fn.call(CBThis, after, idx, arr));
    }, null);
    return res;
};

//模拟new操作
function myNew(constructor, ...args) {
    // 创建一个空对象
    const obj = Object.create(null)
    // 将该对象的原型指向构造函数的prototype
    obj.__proto__ = constructor.prototype
    // 执行构造函数 并将构造函数的this指向该对象
    const result = constructor.apply(obj, args)
    // 判断返回结果是否为空对象 
    return typeof result ==='object' && result!==null ? result : obj
}

//输入：[['a','b'],['n','m'],['0','1']]
//输出：['an0','an1','am0','am1','bn0','bn1','bm0','bm1'] 
let arr1 = [['a', 'b'], ['n', 'm'], ['0', '1']]
let result = arr1.reduce((pre, cur) => {
    let list = []
    for (let i = 0; i < pre.length; i++) {
        for (let j = 0; j < cur.length; j++) {
            list.push(pre[i] + cur[j])
        }
    }
    return list

})

// 比较版本号
var compareVersion = function (version1, version2) {
    const V1 = version1.split('.')
    const V2 = version2.split('.')
    const max = Math.max(V1.length, V2.length)
    for (let i = 0; i < max; i++) {
        let A = Number(V1[i] ? V1[i] : 0)
        let B = Number(V2[i] ? V2[i] : 0)
        if (A > B) {
            return 1
        }
        if (A < B) {
            return -1
        }
    }
    return 0
};

// 返回无重复最长字串
var lengthOfLongestSubstring = function (s) {
    let str = []
    let maxStr = ''
    for (let item of s) {
        while (str.includes(item)) {
            str.shift()
        }
        str.push(item)
        maxStr = str.join('').length > maxStr.length ? str.join('') : maxStr
    }
    return maxStr
};
// 返回最长回文子串
var longestPalindrome = function (s) {
    if (s.length < 2) {
        return s
    }
    let res = ''
    for (let i = 0; i < s.length; i++) {
        // 回文子串长度是奇数
        helper(i, i)
        // 回文子串长度是偶数
        helper(i, i + 1)
    }

    function helper(m, n) {
        while (m >= 0 && n < s.length && s[m] == s[n]) {
            m--
            n++
        }
        // 注意此处m,n的值循环完后  是恰好不满足循环条件的时刻
        // 此时m到n的距离为n-m+1，但是mn两个边界不能取 所以应该取m+1到n-1的区间  长度是n-m-1
        if (n - m - 1 > res.length) {
            // slice也要取[m+1,n-1]这个区间 
            res = s.slice(m + 1, n)
        }
    }
    return res
};
// 判断括号是否有效
var isValid = function (s) {
    const stack = [];
    const Map = { '(': ')', '{': '}', '[': ']' }
    for (let i = 0; i < s.length; i++) {
        let c = s[i];
        if (Map[c]) stack.push(Map[c])
        else if (c !== stack.pop()) return false
    }
    return stack.length === 0;
};

// 数组转换为树
const data = [
    { id: 35, parentId: 30, text: "三级菜单-35" },
    { id: 10, parentId: 0, text: "一级菜单-1" },
    { id: 20, parentId: 0, text: "一级菜单-2" },
    { id: 30, parentId: 20, text: "二级菜单-3" },
    { id: 25, parentId: 30, text: "三级菜单-25" },
];
function conver(data) {
    let result = [...data]
    result.sort((a, b) => a.parentId - b.parentId)

    function haveParent(ele1, ele2) {
        if (ele1.parentId === ele2.id) {
            ele2.children = ele2.children || []
            if (ele2.children.indexOf({ ...ele1 } < 0)) {
                ele2.children.push({ ...ele1 })
            }
            return true
        }
        return false
    }
    for (let i = result.length - 1; i >= 0; i--) {
        for (let j = i - 1; j >= 0; j--) {
            if (haveParent(result[i], result[j])) {
                result.splice(i, 1)
                break
            }
        }
    }
    return result
}

// 数组转换为树
const arr = [
    {
        id: 2,
        name: '部门B',
        parentId: 0,
    },
    {
        id: 3,
        name: '部门C',
        parentId: 1,
    },
    {
        id: 1,
        name: '部门A',
        parentId: 2,
    },
    {
        id: 4,
        name: '部门D',
        parentId: 1,
    },
    {
        id: 5,
        name: '部门E',
        parentId: 2,
    },
    {
        id: 6,
        name: '部门F',
        parentId: 3,
    },
    {
        id: 7,
        name: '部门G',
        parentId: 2,
    },
    {
        id: 8,
        name: '部门H',
        parentId: 4,
    },
];
function arrayToTree(arr, parentId) {
    const tree = []
    function buildTree(arr, parentId, tree) {
        for (let i = 0; i < arr.length; i++) {
            if (arr[i].parentId === parentId) {
                const obj = { ...arr[i], children: [] };
                buildTree(arr, arr[i].id, obj.children)
                tree.push(obj);
            }
        }
    }
    buildTree(arr, parentId, tree);
    return tree;
}
// 两个有序数组的合并去重复
function merge(arr1, arr2) {
    const resultArr = [];
    while (arr1.length > 0 && arr2.length > 0) {
        if (arr1[0] < arr2[0]) {
            if (resultArr.indexOf(arr1[0]) == -1) {

                resultArr.push(arr1.shift())
            } else arr1.shift()
        } else {
            if (resultArr.indexOf(arr2[0]) == -1) {

                resultArr.push(arr2.shift())
            } else arr2.shift()
        }
    }
    return resultArr.concat(arr1, arr2);
}
// 合并两个生序链表
const mergeTwoLists = function (list1, list2) {
    let res = new ListNode()
    const list = res
    while (list1 && list2) {
        if (list1.val < list2.val) {
            res.next = new ListNode(list1.val)
            list1 = list1.next
        } else {
            res.next = new ListNode(list2.val)
            list2 = list2.next
        }
        res = res.next
    }
    if (list2) res.next = list2
    if (list1) res.next = list1
    return list.next
};

// 手写promisify函数
function promisify(fn) {
    return function (...args) {
        return new Promise(function (resolve, reject) {
            args.push(function (err, ...arg) {
                if (err) {
                    reject(err);
                    return;
                }
                resolve(...arg);
            });

            fn.apply(null, args);
        });
    }
}

// 实现trim   
function trim(str) {
    let arr = str.split('');
    let i = 0;
    while (arr[i] === ' ') {
        arr.shift();
    }
    i = arr.length - 1;
    while (arr[i] === ' ') {
        arr.pop();
        i--;
    }
    return arr.join('');
}
// 正则
function trim(str) {
    return str.replace(/(^[\s]+)|([\s]+$)/g, '');
}
// 子数组的最大累加和（动态规划）
var maxSubArray = function (nums) {

    let pre = 0
    let max = nums[0]

    nums.forEach((num) => {

        pre = Math.max(num, pre + num)

        max = Math.max(max, pre)

    })

    return max

};

//链表删除第K个节点
var getKthFromEnd = function (head, k) {
    let fast = head;
    let low = head;
    let n = 0;
    while (fast) {
        fast = fast.next;
        if (n >= k) {
            low = low.next;
        }
        n++;
    }
    return low;
};

// 反转链表
var reverseList = function (head) {
    let prev = null;
    let curr = head;
    while (curr) {
        const next = curr.next;
        curr.next = prev;
        prev = curr;
        curr = next;
    }
    return prev;
};

// 手写实现发布订阅模式
class EventEmitter {
    constructor() {
        // 事件对象，存放订阅的名字和事件  如:  { click: [ handle1, handle2 ]  }
        this.events = {}
    }
    // 订阅事件的方法
    on(eventName, callback) {
        if (!this.events[eventName]) {
            // 一个名字可以订阅多个事件函数
            this.events[eventName] = [callback]
        } else {
            // 存在则push到指定数组的尾部保存
            this.events[eventName].push(callback)
        }
    }
    // 触发事件的方法
    emit(eventName, ...rest) {
        // 遍历执行所有订阅的事件
        this.events[eventName] &&
            this.events[eventName].forEach(f => f.apply(this, rest))
    }
    // 移除订阅事件
    remove(eventName, callback) {
        if (this.events[eventName]) {
            this.events[eventName] = this.events[eventName].filter(f => f != callback)
        }
    }
    // 只执行一次订阅的事件，然后移除
    once(eventName, callback) {
        // 绑定的时fn, 执行的时候会触发fn函数
        const fn = (...rest) => {
            callback.apply(this, rest) // fn函数中调用原有的callback
            this.remove(eventName, fn) // 删除fn, 再次执行的时候之后执行一次
        }
        this.on(eventName, fn)
    }
}

//  手写岛屿问题
function dfs(grid, i, j) {
    // 把当前项变为0, 防止重新查找
    grid[i][j] = 0
    // 当前项 上下左右检查
    if (grid[i - 1] && grid[i - 1][j] == 1) dfs(grid, i - 1, j)  // 上
    if (grid[i + 1] && grid[i + 1][j] == 1) dfs(grid, i + 1, j)  // 下
    if (grid[i][j - 1] && grid[i][j - 1] == 1) dfs(grid, i, j - 1)  // 左
    if (grid[i][j + 1] && grid[i][j + 1] == 1) dfs(grid, i, j + 1)  // 右
}
var numIslands = function (grid) {
    if (grid.length < 1) return 0
    let islands = 0
    for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid[0].length; j++) {
            if (grid[i][j] == 1) {
                islands++             // 岛屿加1
                dfs(grid, i, j)       // 寻找与当前项相邻的 1 并把它们变成0
            }
        }
    }
    return islands
};

//repeat
function repeat(func, times, wait) {
    let index = 0;
    let timer = null;
    return function (...args) {
        timer = setInterval(() => {
            index++;
            func.call(this, ...args)
            if (index === times) {
                clearInterval(timer)
            }
        }, wait)

    }
}

// 字符传转驼峰
function tranformStr1(str) {
    var strArr = str.split('_');
    for (var i = 1; i < strArr.length; i++) {
        strArr[i] = strArr[i].charAt(0).toUpperCase() + strArr[i].substring(1);
    }
    return strArr.join('');
}
console.log(tranformStr1('zhang_san'))

//手写分饼干
function main() {
    //胃口值数组
    let g = [5, 10, 2, 9, 15, 9];
    //饼干尺寸值数组
    let s = [6, 1, 20, 3, 8];
    let max = getMax(g, s);

    function getMax(g, s) {
        //两个数组都从小到大排序
        g.sort();
        s.sort();
        //代表第几个孩子得到满足
        let child = 0,
            //代表当前是第几个饼干
            cookie = 0;
        //当孩子的胃口被满足，孩子的索引加1，无论孩子的胃口是否被满足，饼干的索引都加1
        //如此一直用后面的大饼干来满足当前孩子的胃口
        while (child < g.length && cookie < s.length) {
            if (g[child] <= s[cookie]) {
                child++;
            }
            cookie++;
        }
        //满足胃口的孩子数量，即为最大值
        return child;
    }

}

// 实现异步调度器
class Scheduler {
    constructor(limit) {
        this.limit = limit
        this.number = 0
        this.queue = []
    }

    addTask(timeout, str) {
        this.queue.push([timeout, str])
    }

    start() {
        if (this.number < this.limit && this.queue.length) {
            var [timeout, str] = this.queue.shift()
            this.number++
            setTimeout(() => {
                console.log(str)
                this.number--
                this.start()
            }, timeout * 1000);

            this.start()
        }
    }
}
const scheduler = new Scheduler(2)
scheduler.addTask(1, '1');   // 1s后输出’1'
scheduler.addTask(2, '2');  // 2s后输出’2'
scheduler.addTask(1, '3');  // 2s后输出’3'
scheduler.addTask(1, '4');  // 3s后输出’4'
scheduler.start();

//手写路径和
var pathSum = function (root, sum) {
    // 思路一：递归实现
    if (!root) return []

    const res = [], calcSum = a => a.reduce((p, c) => p + c)

    const DFS = (node, prev) => {
        if (!node.left && !node.right && calcSum(prev) === sum) res.push(prev)

        node.left && DFS(node.left, [...prev, node.left.val])
        node.right && DFS(node.right, [...prev, node.right.val])
    }

    DFS(root, [root.val])

    return res

    // 思路人：stack 栈实现
    // if (!root) return []

    // const res = [], calcSum = a => a.reduce((p, c) => p + c), stack = [[root, [root.val]]]

    // while (stack.length) {
    //     const [node, prev] = stack.pop()

    //     if (!node.left && !node.right && calcSum(prev) === sum) res.push(prev)

    //     node.right && stack.push([ node.right, [...prev, node.right.val] ])
    //     node.left && stack.push([ node.left, [...prev, node.left.val] ])

    // }

    // return res

};

// 手写JSON.stringify（）
function myStringIfy(jsonobj) {
    var result = '', curVal;
    if (jsonobj == null) {
        return String(jsonobj)
    }
    // 基本数据类型
    switch (typeof jsonobj) {
        case 'number':
        case 'boolean':
            return String(jsonobj);
        case 'string':
            return '' + jsonobj + '';
        case 'undefined':
        case 'function':
            return undefined;
    }
    // 引用数据类型
    switch (Object.prototype.toString.call(jsonobj)) {
        case '[object Array]':
            for (var i = 0; i < jsonobj.length; i++) {
                curVal = JSON.myStringIfy(jsonobj[i]);
                result += curVal
            }
            return result
        case '[object Object]':
            for (i in jsonobj) {
                if (jsonobj.hasOwnProperty(i)) {
                    curVal = JSON.stringify(jsonobj[i]);
                    if (curVal !== undefined) {
                        result += '"' + i + '":' + curVal + ',';
                    }
                }
            }
            return result
        case '[object String]':
            return '"' + jsonobj.toString() + '"';
        case '[object Number]':
        case '[object Boolean]':
            return jsonobj.toString();
    }

}

//手写实现axios类
class myAxios {
    constructor() {

    }
    request(config) {
        return new Promise((reslove, reject) => {
            const { url, method, data } = config;
            const xhr = new XMLHttpRequest();

            xhr.open(method, url, true);
            xhr.responseType = 'json'
            xhr.onreadystatechange = () => {
                if (xhr.readyState == 4) {
                    if (xhr.status >= 200 && xhr.status < 300) {
                        reslove(xhr.responseText)
                    } else {
                        reject(xhr.status)
                    }
                }
            }
            if (data) {
                body = JSON.stringify(data)
            }
            xhr.send(body)
        })
    }
}
//依次在Axios.prototype添加对应的方法
const methodsArr = ['get', 'post']
methodsArr.forEach(meth => {
    myAxios.prototype[meth] = function () {
        if (meth === 'get') {
            return this.request({
                method: meth,
                url: arguments[0],
                ...arguments[1]
            })
        } else {
            return this.request({
                method: meth,
                url: arguments[0],
                data: arguments[1],
                ...arguments[2]
            })
        }
    }
})
//myAxios.prototype上的方法搬运到request
const utils = {
    extend(a, b, context) {
        for (let key in b) {
            if (b.hasOwnProperty(key)) {
                if (typeof b[key] === 'function') {
                    a[key] = b[key].bind(context);
                } else {
                    a[key] = b[key]
                }
            }

        }
    }
}
function createAxios() {
    let axios = new myAxios();
    let req = axios.request.bind(axios);
    utils.extend(req, myAxios.prototype, axios)
    return req;
}

//转换数字
function revert(num) {
    let numbers = ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九'];
    let counts = ['十', '百', '千', '万'];
    let arr = [];
    while (num) {
        arr.push(num % 10);
        num = Math.floor(num / 10);
    }
    let res = "";
    for (let i = arr.length - 1; i >= 0; i--) {
        if (arr[i] !== 0) {
            if (arr[i + 1] === 0) {
                res += numbers[0];
            }
            res += numbers[arr[i]];
            if (i >= 1) {
                res += counts[i - 1];
            }
        }
    }
    return res;
}

//queue
class Queue {
    constructor() {
        this.queue = [];
        this.timer = null;
        this.pro = Promise.resolve();
    }
    task(time, fn) {
        this.queue.push([time, fn]);
        return this;
    };
    start() {
        this.queue.forEach((item) => {
            this.pro = this.pro.then(() => {
                return new Promise((resolve, reject) => {
                    this.timer = setTimeout(() => {
                        resolve(item[1]());
                    }, item[0]);
                });
            });
        });
    };
    stop() {
        this.pro = Promise.reject();
        clearTimeout(this.timer);
    }
}
// 红包算法
function generateRedPack(totalAmount, numPackets) {
    const minAmount = 0.01
    const maxAmount = 4.9

    // 生成numPackets个随机数字
    const randomAmounts = []
    let remainingAmount = totalAmount

    for (let index = 0; index < numPackets - 1; index++) {
        // 保证随机数载最大和最小之间
        const maxPoss = remainingAmount - (numPackets - index - 1) * minAmount
        // 注意范围 剩余数范围划分
        const random = Math.random() * (Math.min(maxPoss, maxAmount) - minAmount) + minAmount
        const randomAmount = parseFloat(random.toFixed(2))
        randomAmounts.push(randomAmount)
        remainingAmount -= randomAmount
    }
    randomAmounts.push(parseFloat(remainingAmount.toFixed(2))) //最后一个数
    return randomAmounts
}
// 给你一个整数数组 nums，将它重新排列成 nums[0] < nums[1] > nums[2] < nums[3]... 的顺序。
var wiggleSort = function (nums) {
    const arr = nums.slice();
    arr.sort((a, b) => a - b);
    const n = nums.length;
    const x = Math.floor((n + 1) / 2);
    for (let i = 0, j = x - 1, k = n - 1; i < n; i += 2, j--, k--) {
        nums[i] = arr[j];
        if (i + 1 < n) {
            nums[i + 1] = arr[k];
        }
    }
};
//判断是否有效给定一个只包括 '('，')'，'{'，'}'，'['，']' 的字符串 s ，判断字符串是否有效。
var isValid = function (s) {
    const stack = [];
    for (let i = 0; i < s.length; i++) {
        let c = s[i];
        switch (c) {
            case ('{'): stack.push('}'); break
            case ('['): stack.push(']'); break
            case ('('): stack.push(')'); break
            default: if (c !== stack.pop()) return false
        }
    }
    return stack.length === 0;
};

//数字金额千分位转换如 `14290023.23` 为 `14,290,023.23`，使用正则和非正则两种方式
function formatRegExp2(number) {
    var pattern = /(\d)(?=(?:\d{3})+\.)/g
    return number.toFixed(2).toString().replace(pattern, '$1,')
}
function formateNumber(integer) {
    var p = integer;
    var width = 1000;
    var odds = [];

    while (p > 0) {
        odds.push(p % width);
        p = parseInt(p / width);
    }
    return odds.reverse().join(',')
}

console.log(formatRegExp2(114290023))
console.log(formateNumber(2114290023))
// 打家劫舍 给定一个代表每个房屋存放金额的非负整数数组，计算你在不触动警报装置的情况下，能够偷窃到的最高金额。
// [3,1,5,12,6,8,13,2] 
function Rob(nums) {
    const length = nums.length
    if (length === 0) return 0
    if (length === 1) return nums[0]
    if (length === 2) return Math.max(nums[0], nums[1])
    //动态规划 逐行分析
    const findMaxMoney = (nums, start, end) => {
        let pMax = nums[start]
        let cMax = Math.max(pMax, nums[start + 1])
        for (let i = start + 2; i <= end; i++) {
            let tmp = cMax
            cMax = Math.max((pMax + nums[i]), cMax)
            pMax = tmp
        }
        return cMax
    }
    return Math.max(rob(nums, 0, len - 2), rob(nums, 1, len - 1))
}
// 输出重复的字符串 求字符串重复字符和长度
str = "asddsasdkkggg"
output = {
    d: 2,
    k: 2,
    g: 3
}
const getStr = str => {
    const res = {}
    let indexNum = ''
    for (let index = 0; index < str.length; index++) {
        const indexStr = str[index]
        if (indexNum === indexStr) {
            if (res[indexStr]) {
                ++res[indexStr]
            } else {
                res[indexStr] = 2
            }
        }
        indexNum = indexStr
    }
    console.log(res, '1--')
}
//手写实现apply-call-bind
Function.prototype.myBind = function (thisArg, ...args) {
    const self = this
    const bound = function (...innerArgs) {
        const finalArgs = [...args, ...innerArgs]
        const isNew = this instanceof bound
        if (isNew) {
            return new self(...finalArgs)
        }
        return self.apply(thisArg, finalArgs)
    }
    return bound
}
// 完整代码
Function.prototype.myCall = function (thisArg, ...args) {
    // 替换为全局对象：global或window
    thisArg = thisArg || global
    const prop = Symbol();
    thisArg[prop] = this;
    let result = thisArg[prop](...args);
    delete thisArg[prop];
    return result;
};
// 把剩余参数改成接收一个数组
Function.prototype.myApply = function (thisArg, args) {
    thisArg = thisArg || global
    // 判断是否接收参数，若未接收参数，替换为[]
    args = args || []
    const prop = Symbol();
    thisArg[prop] = this;
    // 用...运算符展开传入
    let result = thisArg[prop](...args);
    delete thisArg[prop];
    return result;
};
// 实现 LazyMan(“Hank”).sleep(10).eat(“supper”).sleepFirst(5)输出
const LazyMan = (name) => {
    const queue = []
    queue.push(() => {
        console.log(`${name}`)
    })
    function sleep(time) {
        queue.push(() => new Promise((reslove, reject) => {
            setTimeout(() => {
                console.log(`sleep${time}`)
                reslove(10)
            }, time * 1000)
        }))
        return this
    }
    function eat(supper) {
        queue.push(() => {
            console.log(`eat ${supper}`)
        })
        return this
    }
    function sleepFirst(time) {
        queue.unshift(() => new Promise((reslove, reject) => {
            setTimeout(() => {
                console.log(`sleepFirst${time}`)
                reslove(10)
            }, time * 1000)
        }))
        return this
    }
    async function execute() {
        for (let i = 0; i < queue.length; i++) {
            await queue[i]()
        }
    }
    setTimeout(() => {
        console.log(queue)
        debugger
        execute()
    }, 0)

    return {
        sleep,
        eat,
        sleepFirst,
    }
}

LazyMan("Hank").sleep(10).eat("supper").sleepFirst(5)
// 给定一个链表，删除链表的倒数第 n 个节点，并且返回链表的头结点。

// 判断链表有没有环 并且返回链表的节点
var hasCycle = function (head) {
    let fast = head, slow = head
    while (fast && slow && fast.next) {
        fast = fast.next.next
        slow = slow.next
        if (fast === slow) {
            fast = head
            while (fast !== slow) {
                fast = fast.next
                slow = slow.next
            }
            return fast
        }
    }
    return null
};
// 实现一个深拷贝
const deepClonetext = (obj, map = new WeakMap()) => {
    if (obj === null || typeof obj !== null) return obj
    if (map.has(obj)) return map.get(obj)
    const newObj = Object.isArray(obj) ? [] : {}
    // 克隆目标对象的原型
    Object.setPrototypeOf(newObj, Object.getPrototypeOf(obj))
    // 遍历对象的属性
    map.set(obj, newObj)
    for (let key in obj) {
        // 自由属性才遍历
        if (obj.hasOwnProperty(key)) {
            newObj[key] = deepClonetext(obj[key], map)
        }
    }
}
// 实现compose
const compose = (...args) => {
    return args.reduce((pre, cur) => (...arguments) => cur(pre(...arguments)))
}
// 对象转换为字符串
const tranformObj = (obj, preKey = '') => {
    const resObj = {}
    for (const key in obj) {
        let keyName = `${preKey}${key}`
        if (typeof obj[key] === 'object') {
            tranformObj(obj[key], keyName + '.')
        } else {
            resObj[keyName] = obj[key]
        }
    }
    return resObj
}
const entry = {
    'a.b.c.dd': 'abcdd',
    'a.d.xx': 'adxx',
    'a.e': 'ae',
};
const changObjStructureOfNormal = output => {
    const keys = Object.keys(output);
    const resObj = {};
    for (const key of keys) {
        const everyKey = key.split('.');
        everyKey.reduce((pre, next, index, array) => {
            if (index === array.length - 1) {
                pre[next] = output[key];
                return;
            }
            pre[next] = pre[next] || {};
            return pre[next];
        }, resObj);
    }
    return resObj;
};
changObjStructureOfNormal(entry);