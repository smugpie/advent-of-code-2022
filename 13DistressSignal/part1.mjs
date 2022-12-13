import fs from 'fs'
import readline from 'readline'

var file = readline.createInterface({
    input: fs.createReadStream('./input.txt')
});

const pairs = {
  leftPairs: [],
  rightPairs: []
}

let currentPair = 'leftPairs'

file.on('line', (line) => {
  if (line === '') {
    currentPair = 'leftPairs'
    return
  }
  pairs[currentPair].push(JSON.parse(line))
  currentPair = currentPair === 'leftPairs' ? 'rightPairs' : 'leftPairs'
})


file.on('close', () => {
  console.log(pairs)
  console.log('Part 1: pairs in order =')
})
