// 【代码题】实现一个拼手气抢红包算法
// 提供了一个RedPackage的类，初始化时传入红包金额和个数，需要实现一个openRedPackage方法，每调一次都进行一次“抢红包”，并以console.log的形式输出抢到的红包金额。
class RedPackage {
    money = 0;
    count = 0;
    sumMoney = 0;

    constructor(money, count) {
        this.money = money;
        this.sumMoney = money;
        this.count = count;
    }

    openRedPackage() {
        if (this.count <= 0) {
            console.log('红包已经被抢完了');
            return 0
        }

          //  只剩一个红包
          if (this.count === 1) {
            this.count--;
            return  this.money
        }


        const r = Math.random() * (this.money / this.sumMoney)

        let getMoney = (r * this.money).toFixed(2)

         const money = this.money - getMoney

         this.count--

        const allLast = this.count * 0.01 // 后面红包 最少一个多少钱

        // 剩余金额不够后面分
        if (money < allLast) {
            getMoney = (this.money - allLast).toFixed(2) // 获取的金额为剩余金额 减去 后面最少金额
            this.money = allLast
        } else {
            this.money = money
        }

        console.log(getMoney, 'getMoney');
        return getMoney
    }
}

const red = new RedPackage(100, 10)
// red.openRedPackage()

const res = []

for (let index = 0; index < 11; index++) {
    res.push(red.openRedPackage())
}

console.log(res.reduce((pre, cur) => Number(pre) + Number(cur) , 0));