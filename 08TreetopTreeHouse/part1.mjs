import fs from 'fs'
import readline from 'readline'

var file = readline.createInterface({
  input: fs.createReadStream('./input.txt')
})

const grid = []
let visibleCount = 0

file.on('line', (line) => {
  grid.push(line.split('').map((num) => +num))
})

const allSmaller = (test, arr) => test > Math.max(...arr)

const isVisible = function (grid, i, j) {
  // on perimeter
  if (i === 0 || j === 0 || i === grid[0].length - 1 || j === grid.length - 1) {
    return true
  }
  const test = grid[j][i]

  // visible from left
  if (allSmaller(test, grid[j].slice(0, i))) {
    return true
  }
  // visible from right
  if (allSmaller(test, grid[j].slice(i + 1))) {
    return true
  }

  let count
  let arr = []
  for (count = 0; count < j; count += 1) {
    arr.push(grid[count][i])
  }
  // visible from top
  if (allSmaller(test, arr)) {
    return true
  }
  arr = []
  for (count = j + 1; count < grid.length; count += 1) {
    arr.push(grid[count][i])
  }

  if (allSmaller(test, arr)) {
    return true
  }
  return false
}

file.on('close', () => {
  for (let i = 0; i < grid[0].length; i += 1) {
    for (let j = 0; j < grid.length; j += 1) {
      if (isVisible(grid, i, j)) {
        visibleCount += 1
      }
    }
  }
  console.log('Part 1: count of visible trees =', visibleCount)
})
