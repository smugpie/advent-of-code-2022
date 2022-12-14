import fs from 'fs'
import readline from 'readline'

var file = readline.createInterface({
  input: fs.createReadStream('./input.txt')
})

let grid = [['#']]
const ropePositions = []
for (let i = 0; i < 10; i += 1) {
  ropePositions.push([0, 0])
}

const markOnGrid = function () {
  const yLen = grid.length
  const xLen = grid[0].length
  const tailPos = ropePositions[ropePositions.length - 1]
  if (tailPos[0] > yLen - 1) {
    grid.push(new Array(xLen).fill('.'))
  }
  if (tailPos[0] < 0) {
    grid.unshift(new Array(xLen).fill('.'))
    ropePositions.forEach((pos) => (pos[0] += 1))
  }
  if (tailPos[1] > xLen - 1) {
    grid.forEach((row) => row.push('.'))
  }
  if (tailPos[1] < 0) {
    grid.forEach((row) => row.unshift('.'))
    ropePositions.forEach((pos) => (pos[1] += 1))
  }
  grid[tailPos[0]][tailPos[1]] = '#'
}

const updateTailPos = function (prev, next) {
  const diffY = next[0] - prev[0]
  const diffX = next[1] - prev[1]
  // just one away? do nothing
  if (Math.abs(diffY) <= 1 && Math.abs(diffX) <= 1) {
    return
  }

  next[0] = next[0] - Math.sign(diffY)
  next[1] = next[1] - Math.sign(diffX)
}

file.on('line', (line) => {
  const [direction, steps] = line.split(' ')
  for (let i = 1; i <= +steps; i += 1) {
    if (direction === 'U') {
      ropePositions[0][0] -= 1
    } else if (direction === 'D') {
      ropePositions[0][0] += 1
    } else if (direction === 'L') {
      ropePositions[0][1] -= 1
    } else if (direction === 'R') {
      ropePositions[0][1] += 1
    }

    for (let j = 1; j < ropePositions.length; j++) {
      updateTailPos(ropePositions[j - 1], ropePositions[j])
    }
    markOnGrid()
  }
})

file.on('close', () => {
  let tailPositionCount = 0
  grid.forEach((row) => {
    row.forEach((item) => {
      if (item === '#') {
        tailPositionCount += 1
      }
    })
  })
  console.log('Part 2: number of tail positions', tailPositionCount)
})
