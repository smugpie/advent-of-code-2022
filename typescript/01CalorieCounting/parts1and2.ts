import * as fs from 'fs'
import * as readline from 'readline'

var file = readline.createInterface({
  input: fs.createReadStream('./input.txt')
})

const elfCalories: number[] = []
let currentElfCalories: number = 0

file.on('line', (calories: string) => {
  if (calories === '') {
    elfCalories.push(+currentElfCalories)
    currentElfCalories = 0
  } else {
    currentElfCalories += +calories
  }
})

file.on('close', () => {
  elfCalories.push(currentElfCalories)
  const [first, second, third] = elfCalories.sort((a: number, b: number): number => b - a)
  console.log('Part 1: Most calories =', first)
  console.log('Part 2: Sum of top three calories =', first + second + third)
})
