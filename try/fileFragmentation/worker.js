import { createChunk } from './createChunk.js'

onmessage = async (e) => {
  const { file, startIndex, endIndex, CHUNK_SIZE } = e.data
  const chunks = []
  for (let index = startIndex; index < endIndex; index++) {
    const chunk = createChunk(file, index, CHUNK_SIZE)
    chunks.push(chunk)
  }
  const result = await Promise.all(chunks)
  postMessage(result)
}
