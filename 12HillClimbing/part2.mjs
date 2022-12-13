// There is probably a cleverer way to do this - I've just brute forced it

import fs from 'fs'
import readline from 'readline'

var file = readline.createInterface({
    input: fs.createReadStream('./input.txt')
});

const grid = []
let minimumRouteDistances = []
let pathsToCheck = []
let optimalRoute = []

file.on('line', (line) => {
  const startExistsInRow = line.indexOf('S')
  if (startExistsInRow !== -1) {
    pathsToCheck.push([[grid.length, startExistsInRow]])
  }
  grid.push(line.split('').map((loc) => {
    if (loc === 'S') {
      return 97
    }
    if (loc == 'E') {
      return 'E'
    }
    return loc.charCodeAt(0)
  }))
})

const checkPaths = function() {
  while (pathsToCheck.length > 0) {
    const currentPath = pathsToCheck.shift()
    addNewPaths(currentPath)
  }
  return optimalRoute
}

const addNewPaths = function(path) {
  const [y, x] = path.at(-1)
  const currentValue = grid[y][x]
    // up
    if (y > 0) {
      checkNewPath(path, y - 1, x, currentValue) 
    }
  // left
  if (x > 0) {
    checkNewPath(path, y, x - 1, currentValue)
  }
  // right
  if (x < grid[0].length - 1) {
    checkNewPath(path, y, x + 1, currentValue)
  }

 // down
  if (y < grid.length - 1) {
    checkNewPath(path, y + 1, x, currentValue) 
  }
}

const checkNewPath = function(path, newY, newX, currentValue) {
  const newValue = grid[newY][newX]

  // have we reached the end
  if (newValue === 'E' && currentValue >= 'y'.charCodeAt(0)) {
    registerOptimalRoute([...path, [newY, newX]])
    return
  }
  // have we hit a valid number?
  if (newValue - currentValue <= 1) {
    // have we found a shorter route than one we have already? great!
    const updatedPath = [...path, [newY, newX]]
    if (typeof minimumRouteDistances[newY][newX] === 'undefined' || minimumRouteDistances[newY][newX] > updatedPath.length) {
      minimumRouteDistances[newY][newX] = updatedPath.length
      pathsToCheck.push(updatedPath)
    } 
  }
}

const registerOptimalRoute = function(path) {
  if (optimalRoute.length === 0 || path.length < optimalRoute.length) {
    optimalRoute = [...path]
  }
}

file.on('close', () => {
  for (let y = 0; y < grid.length; y += 1) {
    for (let x = 0; x < grid[y].length; x += 1) {
      if (grid[y][x] === 97) {
        pathsToCheck = [[[y, x]]]
        minimumRouteDistances = []
        grid.forEach(() => minimumRouteDistances.push(new Array(grid[y].length)))
        checkPaths()
      } 
    }
  }
  console.log('Part 2: fewest number of moves =', optimalRoute.length - 1)
})
