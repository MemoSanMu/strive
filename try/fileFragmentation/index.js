const fileDom = document.getElementById('file')

const CHUNK_SIZE = 1024 * 1024 * 1
const THREAD_COUNT = navigator.hardwareConcurrency || 4 // 硬件并发

fileDom.addEventListener('change', async (e) => {
  const file = e.target.files[0]
  console.time('cutChunk')
  const chunks = await cutChunk(file)
  console.timeEnd('cutChunk')
  console.log(chunks, 'chunks')
})

async function cutChunk(file) {
  const chunkCount = Math.ceil(file.size / CHUNK_SIZE) // 总共分成多少片
  const count = Math.ceil(chunkCount / THREAD_COUNT) // 每个线程要处理多少个数据
  //   THREAD_COUNT 开启多少线程
  for (let index = 0; index < THREAD_COUNT; index++) {
    let endIndex = (index + 1) * count
    if (endIndex > chunkCount) {
      endIndex = chunkCount
    }
    const worker = new Worker('worker.js', { type: 'module' })
    worker.postMessage({ file, startIndex: index * count, endIndex, CHUNK_SIZE })
    worker.onmessage = (e) => {
      console.log(e, 'e')
    }
  }
}
