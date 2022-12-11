import fs from 'fs'
import readline from 'readline'

var file = readline.createInterface({
    input: fs.createReadStream('./input.txt')
});

const KNOTS = 10

const tailPositions = new Set()
const ropePositions = []
for (let i = 0; i < KNOTS; i += 1) {
  ropePositions.push([0, 0])
}

const updateTailPos = function(prev, next) {
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
    tailPositions.add(JSON.stringify(ropePositions.at(-1)))
  }
})

file.on('close', () => {
  console.log('Number of tail positions =', tailPositions.size)
})
