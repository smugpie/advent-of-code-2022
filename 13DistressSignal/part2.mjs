import fs from 'fs'
import readline from 'readline'

var file = readline.createInterface({
    input: fs.createReadStream('./input.txt')
});

const signals = []

file.on('line', (line) => {
  if (line !== '') {
    signals.push(JSON.parse(line))
  }
})

const compare = function(l, r) {
  // if left side or right side ran out of items
  if (typeof l === 'undefined') {
    return -1
  }
  if (typeof r === 'undefined') {
    return 1
  }
  // both integers
  if (!Array.isArray(l) && !Array.isArray(r)) {
    if (l < r) {
      return -1
    }
    if (l > r) {
      return 1
    }
    return 0
  }
  // convert to arrays
  const lArray = (Array.isArray(l) ? [...l] : [l])
  const rArray = (Array.isArray(r) ? [...r] : [r])
  // both arrays
  while (lArray.length > 0 || rArray.length > 0) {
    const result = compare(lArray.shift(), rArray.shift()) 
    if (result !== 0) {
      return result
    }    
  }
  return 0
}

file.on('close', () => {
  signals.push([[2]])
  signals.push([[6]])
  signals.sort(compare)
  let key = 1
  signals.forEach((signal, index) => {
    const signalString = JSON.stringify(signal)
    if (signalString === '[[2]]' || signalString === '[[6]]') {
      key *= index + 1
    }
  })

  console.log('Part 2: decoding key =', key)
})
