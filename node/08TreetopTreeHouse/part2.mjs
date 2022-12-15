import fs from 'fs'
import readline from 'readline'

var file = readline.createInterface({
  input: fs.createReadStream('./input.txt')
})

const grid = []

file.on('line', (line) => {
  grid.push(line.split('').map((num) => +num))
})

const getScenicScoreInDirection = function (test, arr) {
  const firstBigTree = arr.findIndex((el) => el >= test)
  return firstBigTree === -1 ? arr.length : firstBigTree + 1
}

const getScenicScore = function (grid, i, j) {
  // on perimeter

  const test = grid[j][i]

  // visible from left
  const leftArr = grid[j].slice(0, i).reverse()
  const leftScenicScore = getScenicScoreInDirection(test, leftArr)

  const rightArr = grid[j].slice(i + 1)
  const rightScenicScore = getScenicScoreInDirection(test, rightArr)

  let count
  const topArr = []
  for (count = 0; count < j; count += 1) {
    topArr.push(grid[count][i])
  }

  topArr.reverse()
  const topScenicScore = getScenicScoreInDirection(test, topArr)
  // visible from top

  const bottomArr = []
  for (count = j + 1; count < grid.length; count += 1) {
    bottomArr.push(grid[count][i])
  }

  const bottomScenicScore = getScenicScoreInDirection(test, bottomArr)
  const totalScenicScore =
    leftScenicScore * rightScenicScore * topScenicScore * bottomScenicScore
  return totalScenicScore
}

let scenicScore = 0

file.on('close', () => {
  for (let i = 1; i < grid[0].length; i += 1) {
    for (let j = 1; j < grid.length; j += 1) {
      scenicScore = Math.max(scenicScore, getScenicScore(grid, i, j))
    }
  }
  console.log('Part 2: scenic score =', scenicScore)
})
