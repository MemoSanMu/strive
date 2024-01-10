class ListNode{
    constructor(val, next) {
        this.val = (val===undefined ? 0 : val)
        this.next = (next===undefined ? null : next)
    }
}

const n0 = new ListNode(0)
const n1 = new ListNode(1)
const n2 = new ListNode(2)
const n3 = new ListNode(3)
const n4 = new ListNode(4)
const n5 = new ListNode(5)

n0.next = n1
n1.next = n2
n2.next = n3
n3.next = n4
n4.next = n5

function findTarget(head, target) {
    let index = 0
    while (head && head.val !== null) {
        if (head.val === target) {
            return indexs
        }
        index++
        head = head.next // 持续遍历
    }
    return -1
}

console.log(findTarget(n0, 1));