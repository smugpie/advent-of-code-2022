import fs from 'fs'
import readline from 'readline'

var file = readline.createInterface({
  input: fs.createReadStream('./input.txt')
})

let priorities = 0
let currentGroup = []

const getPriority = function (character) {
  const ascii = character.charCodeAt(0)
  return ascii >= 97 && ascii <= 122 ? ascii - 96 : ascii - 38
}

const intersection = function (compartment1, compartment2) {
  const result = []
  for (let item of compartment1) {
    if (compartment2.has(item)) {
      result.push(item)
    }
  }
  return result
}

file.on('line', (contents) => {
  currentGroup.push(new Set(contents.split('')))
  if (currentGroup.length === 3) {
    const [compartment1, compartment2, compartment3] = currentGroup
    const oneAndTwo = new Set(intersection(compartment1, compartment2))
    const duplicates = intersection(oneAndTwo, compartment3)
    duplicates.forEach((dup) => {
      priorities += getPriority(dup)
    })
    currentGroup = []
  }
})

file.on('close', () => {
  console.log('Part 2: sum of priorities =', priorities)
})
