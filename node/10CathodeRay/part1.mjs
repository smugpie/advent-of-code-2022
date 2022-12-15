import fs from 'fs'
import readline from 'readline'

var file = readline.createInterface({
  input: fs.createReadStream('./input.txt')
})

let x = 1
let currentCycle = 0
let total = 0

const incrementCycle = function () {
  currentCycle += 1
  if (currentCycle % 40 === 20) {
    total += x * currentCycle
  }
}

file.on('line', (line) => {
  const [instruction, value] = line.split(' ')
  incrementCycle()
  if (instruction === 'addx') {
    incrementCycle()
    x += +value
  }
})

file.on('close', () => {
  console.log('Part 1: cycle score =', total)
})
