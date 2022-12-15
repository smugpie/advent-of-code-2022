import fs from 'fs'
import readline from 'readline'
import { populateGrid, dropSand } from './utils.mjs'

var file = readline.createInterface({
  input: fs.createReadStream('../input.txt')
})

const rockLayout = []
const grid = []
let unitsOfSand = 0

file.on('line', (line) => {
  rockLayout.push(
    line.split(' -> ').map((item) => item.split(',').map((num) => +num))
  )
})

file.on('close', () => {
  const xCoords = rockLayout.reduce(
    (acc, cur) => [...acc, ...cur.map(([item]) => item)],
    []
  )
  const yCoords = rockLayout.reduce(
    (acc, cur) => [...acc, ...cur.map(([, item]) => item)],
    []
  )
  const xMax = xCoords.sort((a, b) => +a - +b).at(-1)
  const yMax = yCoords.sort((a, b) => +a - +b).at(-1)

  // not happy with creating an array 500 units long but anyway
  for (let i = 0; i <= yMax + 1; i += 1) {
    grid.push(new Array(xMax + 200).fill(' '))
  }

  populateGrid(rockLayout, grid)
  grid[yMax + 2] = new Array(xMax + 200).fill('#')

  while (dropSand(grid, 500, 0)) {
    unitsOfSand += 1
  }

  console.log('Part 2: units of sand that reach the top =', unitsOfSand)
})
