import fs from 'fs'
import readline from 'readline'

var file = readline.createInterface({
    input: fs.createReadStream('./input.txt')
});

let grid = [["#"]]
let headPos = [0, 0]
let tailPos = [0, 0]

const markOnGrid = function() {
  const yLen = grid.length
  const xLen = grid[0].length
  if (tailPos[0] > yLen - 1) {
    grid.push(new Array(xLen).fill('.'))
  }
  if (tailPos[0] < 0) {
    grid.unshift(new Array(xLen).fill('.'))
    headPos[0] += 1
    tailPos[0] += 1
  }
  if (tailPos[1] > xLen - 1) {
    grid.forEach(row => row.push('.'))
  }
  if (tailPos[1] < 0) {
    grid.forEach(row => row.unshift('.'))
    headPos[1] += 1
    tailPos[1] += 1
  }
  grid[tailPos[0]][tailPos[1]] = '#'
}

const updateTailPos = function() {
  const diffY = tailPos[0] - headPos[0]
  const diffX = tailPos[1] - headPos[1]
  // just one away? do nothing
  if (Math.abs(diffY) <= 1 && Math.abs(diffX) <= 1) {
    return
  }

  tailPos[0] = tailPos[0] - Math.sign(diffY)
  tailPos[1] = tailPos[1] - Math.sign(diffX)
}

file.on('line', (line) => {
  const [direction, steps] = line.split(' ')
  for (let i = 1; i <= +steps; i += 1) {
    if (direction === 'U') {
      headPos[0] -= 1
    } else if (direction === 'D') {
      headPos[0] += 1
    } else if (direction === 'L') {
      headPos[1] -= 1
    } else if (direction === 'R') {
      headPos[1] += 1
    }

    updateTailPos()
    markOnGrid()
  }
})

file.on('close', () => {
  let tailPositionCount = 0
  grid.forEach(row => {
    row.forEach(item => {
      if (item === '#') {
        tailPositionCount += 1
      }
    })
  })
  console.log('Part 1: number of tail positions', tailPositionCount)
})
