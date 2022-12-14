import fs from 'fs'
import readline from 'readline'
import { populateGrid, dropSand } from './utils.mjs'

var file = readline.createInterface({
  input: fs.createReadStream('../input.txt')
})

const rockLayout = []
const grid = new Set()
let unitsOfSand = 0

file.on('line', (line) => {
  rockLayout.push(
    line.split(' -> ').map((item) => item.split(',').map((num) => +num))
  )
})

file.on('close', () => {
  const yCoords = rockLayout.reduce(
    (acc, cur) => [...acc, ...cur.map(([, item]) => item)],
    []
  )
  const yMax = yCoords.sort((a, b) => +a - +b).at(-1)

  populateGrid(rockLayout, grid)

  while (dropSand(grid, 500, 0, yMax) !== 'limit') {
    unitsOfSand += 1
  }

  console.log('Part 1: units of sand that start dropping =', unitsOfSand)
})
