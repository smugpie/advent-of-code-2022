import * as fs from 'fs'
import * as readline from 'readline'

type Choice = 'rock' | 'paper' | 'scissors'

const opponentChoices: { [key in 'A' | 'B' | "C"] : Choice } = {
  A: 'rock',
  B: 'paper',
  C: 'scissors'
}

const elfChoices: { [key in 'X' | 'Y' | 'Z']: Choice } = {
  X: 'rock',
  Y: 'paper',
  Z: 'scissors'
}

let scores = 0

const getChoiceScore = function (choice: string): number {
  const choices = ['rock', 'paper', 'scissors']
  return choices.indexOf(choice) + 1
}

const getOutcomeScore = function (opponentChoice: string, elfChoice: string): number {
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
})

file.on('line', (game) => {
  const [opponentCode, elfCode] = game.split(' ')
  const opponentChoice: Choice = opponentChoices[opponentCode]
  const elfChoice: Choice = elfChoices[elfCode]
  scores +=
    getChoiceScore(elfChoice) + getOutcomeScore(opponentChoice, elfChoice)
})

file.on('close', () => {
  console.log('Part 1: final scores =', scores)
})
