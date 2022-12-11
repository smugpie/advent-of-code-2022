import fs from 'fs'
import readline from 'readline'

const elfCalories = []
let currentElfCalories = 0

var file = readline.createInterface({
    input: fs.createReadStream('./input.txt')
  });

file.on('line', (cal) => {
    if (cal === '') {
        elfCalories.push(currentElfCalories)
        currentElfCalories = 0
    } else {
        currentElfCalories += parseInt(cal, 10)
    }
})

file.on('close', () => {
    const max = elfCalories.reduce((acc, cur) => Math.max(acc, cur), -10000)
    console.log('Most calories =', max)
    const [first, second, third] = elfCalories.sort((a, b) => Math.sign(b - a))
    console.log('sum of top three calories =', first + second + third)
})