import fs from 'fs'
import readline from 'readline'

var file = readline.createInterface({
  input: fs.createReadStream('./input.txt')
})

const signals = []

let currentPair = []
let sumOfIndices = 0

file.on('line', (line) => {
  if (line === '') {
    signals.push(currentPair)
    currentPair = []
    return
  }
  currentPair.push(JSON.parse(line))
})

const compare = function (l, r) {
  // if left side or right side ran out of items
  if (typeof l === 'undefined') {
    return true
  }
  if (typeof r === 'undefined') {
    return false
  }
  // both integers
  if (!Array.isArray(l) && !Array.isArray(r)) {
    if (l < r) {
      return true
    }
    if (l > r) {
      return false
    }
    return null
  }
  // otherwise convert to arrays
  const lArray = Array.isArray(l) ? [...l] : [l]
  const rArray = Array.isArray(r) ? [...r] : [r]

  while (lArray.length > 0 || rArray.length > 0) {
    const result = compare(lArray.shift(), rArray.shift())
    if (result !== null) {
      return result
    }
  }
  return null
}

file.on('close', () => {
  signals.push(currentPair)
  signals.forEach(([leftPair, rightPair], index) => {
    if (compare(leftPair, rightPair)) {
      sumOfIndices += index + 1
    }
  })
  console.log('Part 1: pairs in order =', sumOfIndices)
})
