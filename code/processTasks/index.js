// 大方
// 依次顾序执行一系列任务
// * 所有任务全部完成后可以得到每个任务的执行结果
// * 需要返回两个方法，start用于启动任务，pause用于暂停任务
// *每个任务具有原子性，即不可中断，只能在两个任务之间中斷
// * aparam-
// {…Function}
// tasks 任务列表，每个任务无参、异步

function processTasks(tasks) {
    let i = 0,
        result = [],
    isRunning = false
    return {
        start() {
            return new Promise(async (resolve, reject) => {
                if (isRunning) {
                    return
                }
                isRunning = true
                while (i < tasks.length) {
                    console.log(`开始执行${i}`);
                    const res = await tasks[i]()
                    result.push(res)
                    console.log(`执行完成${i}`);
                    i++
                    if (!isRunning) {
                        console.log(`${i - 1}中断执行, 待执行${i}`);
                        return
                    }
                }
                isRunning = false
                resolve(result)
            })
        },
        pause() {
            isRunning = false
            // ...
        }
    }
}

const process = () => {
    return Array(10).fill(0).map((i, index) => {
        return () => new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(`${Date.now()} ---${index + 1}`)
            }, 1000)
        })
    })
}


const p = process()

const tasks = processTasks(p)

const doms = {
    start: document.getElementById('start'),
    pause: document.getElementById('pause')
}


doms.start.addEventListener('click', async () => {
    const res = await tasks.start()
    console.log(res, 'res');
})

doms.pause.addEventListener('click', () => {
    tasks.pause()
})

