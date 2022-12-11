
import fs from 'fs'
import readline from 'readline'
import Monkey from './Monkey.mjs';

var file = readline.createInterface({
    input: fs.createReadStream('./input.txt')
  });

const monkeys = []
let currentMonkey

file.on('line', (line) => {
  // monkey separator
  if (line === '') {
    monkeys.push(currentMonkey)
    return
  }
  const input = line.split(' ')
  // new monkey
  if (input[0] === 'Monkey') {
    currentMonkey = new Monkey()
    currentMonkey.index = monkeys.length
    return
  }
  if (input[2] === 'Starting') {
    currentMonkey.items = input.slice(4).map(item => parseInt(item, 10))
  }
  if (input[2] === 'Operation:') {
    currentMonkey.operator = input[6]
    currentMonkey.operand = input[7]
  }
  if (input[2] === 'Test:') {
    currentMonkey.divisibleBy = +input[5]
  }
  if (input[5] === 'true:') {
    currentMonkey.monkeyIfTrue = +input[9]
  }
  if (input[5] === 'false:') {
    currentMonkey.monkeyIfFalse = +input[9]
  }
})

file.on('close', () => {
  monkeys.push(currentMonkey)
  for (let round = 1; round <= 20; round += 1) {
    monkeys.forEach((monkey) => {
      while (monkey.items.length > 0) {
        let currentItem = monkey.items.shift()
        let inspectedItem = monkey.performOperation(currentItem)
        let reliefItem = Math.floor(inspectedItem / 3)
        let throwTo = monkey.performTest(reliefItem)
        monkeys[throwTo].items.push(reliefItem)
      }
    })
  }
  const [largest, secondLargest] = monkeys.map(monkey => monkey.numberOfInspections).sort((a, b) => Math.sign(b - a))
  console.log(largest * secondLargest)
})