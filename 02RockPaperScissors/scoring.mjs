import fs from 'fs'
import readline from 'readline'

const opponentChoices = {
    A: 'rock',
    B: 'paper',
    C: 'scissors'
}

const elfChoices = {
    X: 'rock',
    Y: 'paper',
    Z: 'scissors'
}

let scores = 0

const getChoiceScore = function(choice) {
    const choices = ['rock', 'paper', 'scissors']
    return choices.indexOf(choice) + 1
}

const getOutcomeScore = function(opponentChoice, elfChoice) {
    if (opponentChoice === elfChoice) {
        return 3 //draw
    }
    
    if (
        (opponentChoice === 'rock' && elfChoice === 'paper') ||
        (opponentChoice === 'paper' && elfChoice === 'scissors') ||
        (opponentChoice === 'scissors' && elfChoice === 'rock')
    ) {
        return 6 //win
    }

    return 0 //loss
}

var file = readline.createInterface({
    input: fs.createReadStream('./input.txt')
  });

file.on('line', (cal) => {
    if (cal !== '') {
        const [opponentCode, elfCode] = cal.split(' ')
        const opponentChoice = opponentChoices[opponentCode]
        const elfChoice = elfChoices[elfCode]
        console.log('opponent choice:', opponentChoice, 'elf choice:', elfChoice)
        console.log('score', getChoiceScore(elfChoice), 'outcome', getOutcomeScore(opponentChoice, elfChoice))
        scores += getChoiceScore(elfChoice) + getOutcomeScore(opponentChoice, elfChoice)
    }
})

file.on('close', () => {
    console.log('Final scores', scores)
    /*const max = elfCalories.reduce((acc, cur) => Math.max(acc, cur), -10000)
    console.log('Most calories =', max)
    const [first, second, third] = elfCalories.sort((a, b) => Math.sign(b - a))
    console.log('sum of top three calories =', first + second + third)*/
})