import SparkMD5 from './SparkMD5.js'

export function createChunk(file, i, chunkCount) {
  return new Promise((resolve, reject) => {
    const start = i * chunkCount
    const end = start + chunkCount
    const fileRenderer = new FileReader()
    // const sparkMD5 = new SparkMD5.ArrayBuffer()
    const blob = file.slice(start, end)
    fileRenderer.onload = (e) => {
      // sparkMD5.append(e.target.result)
      // TODO: 根据result 生成hash
      resolve({
        start,
        end,
        index: i,
        // hash: sparkMD5.end(),
        blob,
        type: 'success'
      })
    }
    fileRenderer.onerror = (e) => {
      reject({ start, end, index: i, hash: e, blob, type: 'error' })
    }
    fileRenderer.readAsArrayBuffer(blob)
  })
}
