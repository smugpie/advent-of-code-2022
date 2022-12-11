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

file.on('line', (game) => {
    const [opponentCode, elfCode] = game.split(' ')
    const opponentChoice = opponentChoices[opponentCode]
    const elfChoice = elfChoices[elfCode]
    scores += getChoiceScore(elfChoice) + getOutcomeScore(opponentChoice, elfChoice)
})

file.on('close', () => {
    console.log('Part 1: final scores =', scores)
})
