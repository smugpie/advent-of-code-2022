import fs from 'fs'
import readline from 'readline'

let text = ''

var file = readline.createInterface({
  input: fs.createReadStream('./input.txt')
})

const getUniqueCharacterSet = function (testLength) {
  const len = text.length
  for (let i = 0; i < len - testLength; i += 1) {
    const charsToCheck = text.substr(i, testLength).split('')
    const charSet = new Set(charsToCheck)
    if (charSet.size === testLength) {
      return i + testLength
    }
  }
}

file.on('line', (line) => {
  text += line
})

file.on('close', () => {
  console.log(
    'Part 1: position having 4 unique characters =',
    getUniqueCharacterSet(4)
  )
  console.log(
    'Part 2: position having 14 unique characters =',
    getUniqueCharacterSet(14)
  )
})
