// // [1.0.1, 1.1.0, 1.0.2, 2.0.0]

const versions = ['1.0.1', '1.1.0', '1.0.2', '2.0.0', '3', '9', '5.6', '1.2', '1.2.4']

function sortVersions(versions) {
  return versions.sort((a, b) => {
    const left = a.split('.')
    const right = b.split('.')
    const max = Math.max(left.length, right.length)
    let i = 0
    while (i < max) {
      const l = left[i]
      const r = right[i]
      i++
      if (l === undefined || r === undefined) {
        return left.length - right.length
      }
      if (l === r) {
        continue
      }
      return l - r
    }
  })
}

const res = sortVersions(versions)

console.log(res)
