import fs from 'fs'
import readline from 'readline'

var file = readline.createInterface({
  input: fs.createReadStream('./testInput.txt')
})

file.on('line', (line) => {
  if (line === '') {
  }
})

file.on('close', () => {
  console.log('Part 1: units of sand =')
})
