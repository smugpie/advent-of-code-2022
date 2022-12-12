import fs from 'fs'
import readline from 'readline'
import { PassThrough } from 'stream';

var file = readline.createInterface({
    input: fs.createReadStream('./input.txt')
});

const grid = []
let startLocation
let optimalRoute = []

file.on('line', (line) => {
  const startExistsInRow = line.indexOf('S')
  if (startExistsInRow !== -1) {
    startLocation = [grid.length, startExistsInRow]
  }
  grid.push(line.split('').map((loc) => {
    if (loc === 'S' || loc === 'E') {
      return loc
    }
    return loc.charCodeAt(0)
  }))
})

const previouslyVisited = function(path, y, x) {
  for (let i = 0; i < path.length; i += 1) {
    const [previousY, previousX] = path[i]
    if (previousY === y && previousX === x) {
      return true
    }
  }
  return false
}

const findOptimalRoute = function(path) {
  const [y, x] = path.at(-1)
  const currentValue = grid[y][x] === 'S' ? 96 : grid[y][x]
  console.log('hello', currentValue, path)
  // up
  if (y > 0) {
    if (grid[y - 1][x] === 'E') {
      registerOptimalRoute([...path, [y - 1, x]])
    }
    if (
      !previouslyVisited(path, y - 1, x)
      && grid[y - 1][x] - currentValue <= 1) {
        findOptimalRoute([...path, [y - 1, x]])
    }
  }

  // down
  if (y < grid.length - 1) {
    if (grid[y + 1][x] === 'E') {
      registerOptimalRoute([...path, [y + 1, x]])
    }
    if (
      !previouslyVisited(path, y + 1, x)
      && grid[y + 1][x] - currentValue <= 1) {
        findOptimalRoute([...path, [y + 1, x]])
    }
  }

    // left
    if (x < 0) {
      if (grid[y][x - 1] === 'E') {
        registerOptimalRoute([...path, [y, x - 1]])
      }
      if (
        !previouslyVisited(path, y, x)
        && grid[y, x - 1] - currentValue <= 1) {
          findOptimalRoute([...path, [y, x - 1]])
      }
    }

    // right
    if (x < grid.length - 1) {
      if (grid[y][x + 1] === 'E') {
        registerOptimalRoute([...path, [y, x + 1]])
      }
      if (
        !previouslyVisited(path, y, x)
        && grid[y, x + 1] - currentValue <= 1) {
          findOptimalRoute([...path, [y, x + 1]])
      }
    }
}

const registerOptimalRoute = function(path) {
  if (optimalRoute.length === 0 || path.length < optimalRoute.length) {
    optimalRoute = path
  }
}

file.on('close', () => {
  // console.log(grid, startLocation)
  findOptimalRoute([startLocation])
  console.log(optimalRoute)
  console.log('Part 1: fewest number of moves =')
})
