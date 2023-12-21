// 【代码题】按照版本号由小到大排序
// 样例输入：versions = ['0.1.1', '2.3.3', '0.302.1', '4.2', '4.3.5', '4.3.4.5']
// 输出：['0.1.1', '0.302.1', '2.3.3', '4.3.4.5', '4.3.5']

function compareVersions(versions) {
    // 通过sort进行排序
    return versions.sort((a, b) => {
        // 前后值根据小数点为分隔符分隔为数组，然后轮训逐个对比
        let l = a.split('.')
        let r = b.split('.')
        let i = 0
        while (true) {
            // 获取当前分隔的前后值
            const pre = l[i]
            const cur = r[i]
            i++ // 递增
            // 1、如果分隔的值其中一个是undefined，就通过版本的长度排序
            if (pre === undefined || cur === undefined) {
                return l.length - r.length
            }
            // 2、如果分隔的值相等，就进行后续判断
            if (pre === cur) {
                continue
            }
            // 3、最后根据分隔后的值进行比较排序
            return pre - cur
        }
    })
}

const versions = ['0.1.1', '2.3.3', '0.302.1', '4.2', '4.3.5', '4.3.4.5']

console.log(compareVersions(versions));