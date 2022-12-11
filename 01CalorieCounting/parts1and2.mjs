import fs from 'fs'
import readline from 'readline'

var file = readline.createInterface({
    input: fs.createReadStream('./input.txt')
});

const elfCalories = []
let currentElfCalories = 0

file.on('line', (calories) => {
    if (calories === '') {
        elfCalories.push(currentElfCalories)
        currentElfCalories = 0
    } else {
        currentElfCalories += +calories
    }
})

file.on('close', () => {
    elfCalories.push(currentElfCalories)
    const [first, second, third] = elfCalories.sort((a, b) => b - a)
    console.log('Part 1: Most calories =', first)
    console.log('Part 2: Sum of top three calories =', first + second + third)
})
