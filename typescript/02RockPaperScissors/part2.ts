import * as fs from 'fs'
import * as readline from 'readline'

const opponentChoices: { [key: string]: string } = {
  A: 'rock',
  B: 'paper',
  C: 'scissors'
}

const outcomes: { [key: string]: number } = {
  X: 0, // lose
  Y: 3, // draw
  Z: 6  // win
}

let scores = 0

const getChoiceScore = function (choice: string): number {
  const choices = ['rock', 'paper', 'scissors']
  return choices.indexOf(choice) + 1
}

const getElfChoice = function (opponentChoice: string, outcome: number): string | undefined {
  if (outcome === 3) {
    //draw
    return opponentChoice
  }
  if (opponentChoice === 'rock') {
    return outcome === 6 ? 'paper' : 'scissors'
  }
  if (opponentChoice === 'paper') {
    return outcome === 6 ? 'scissors' : 'rock'
  }
  if (opponentChoice === 'scissors') {
    return outcome === 6 ? 'rock' : 'paper'
  }
}

var file = readline.createInterface({
  input: fs.createReadStream('./input.txt')
})

file.on('line', (game) => {
  const [opponentCode, elfCode] = game.split(' ')
  const opponentChoice = opponentChoices[opponentCode]
  const outcome = outcomes[elfCode]
  scores += getChoiceScore(getElfChoice(opponentChoice, outcome)!) + outcome
})

file.on('close', () => {
  console.log('Part 2: final scores =', scores)
})
