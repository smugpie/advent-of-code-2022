import fs from 'fs'
import readline from 'readline'

var file = readline.createInterface({
  input: fs.createReadStream('./input.txt')
})

let x = 1
let currentCycle = 0
let display = []
let currentLine = []

const incrementCycle = function () {
  if (currentCycle % 40 === 0) {
    display.push(currentLine)
    currentLine = []
  }
  const currentPosition = currentCycle % 40
  currentLine.push(Math.abs(x - currentPosition) <= 1 ? '#' : ' ')
  currentCycle += 1
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
  display.push(currentLine)
  console.log('Part 2: solution')
  display.forEach((row) => console.log(row.join('')))
})
