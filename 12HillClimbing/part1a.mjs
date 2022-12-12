import fs from 'fs'
import readline from 'readline'

var file = readline.createInterface({
    input: fs.createReadStream('./input.txt')
});

const grid = []
let startLocation
let optimalRoute = []
const pathsToCheck = []

file.on('line', (line) => {
  const startExistsInRow = line.indexOf('S')
  if (startExistsInRow !== -1) {
    startLocation = [grid.length, startExistsInRow]
  }
  grid.push(line.split('').map((loc) => {
    if (loc === 'S') {
      return 96
    }
    if (loc == 'E') {
      return 123
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
  const exploreNewRoute = function(newY, newX, currentValue) {
    // firstly, have we reached here before
    const newValue = grid[newY][newX]
    pathsToCheck.push([...path, [newY, newX]])
    if (newValue - currentValue <= 1) {
        if (previouslyVisited(path, newY, newX)) {
          return ''
        }
        if (newValue === 123) { // reached the end
          registerOptimalRoute([...path, [newY, newX]])
          return 'explored'
        }
        findOptimalRoute([...path, [newY, newX]])
    }
    return ''
  }

  const [y, x] = path.at(-1)
  const currentValue = grid[y][x]
  // up
  if (y > 0) {
    if(exploreNewRoute(y - 1, x, currentValue) === 'explored') {
      return
    }
  }

  // down
  if (y < grid.length - 1) {
    if(exploreNewRoute(y + 1, x, currentValue) === 'explored') {
      return
    }
  }

  // left
  if (x > 0) {
    if(exploreNewRoute(y, x - 1, currentValue) === 'explored') {
      return
    }
  }

  // right
  if (x < grid[0].length - 1) {
    if(exploreNewRoute(y, x + 1, currentValue) === 'explored') {
      return
    }
  }
}

const registerOptimalRoute = function(path) {
  if (optimalRoute.length === 0 || path.length < optimalRoute.length) {
    optimalRoute = [...path]
    console.log('optimal route found', optimalRoute.length - 1, 'steps')
  }
  
}

file.on('close', () => {
  // console.log(grid, startLocation)
  findOptimalRoute([startLocation])
  console.log('Optimal route: ', optimalRoute)
  console.log('Part 1: fewest number of moves =', optimalRoute.length - 1)
})
