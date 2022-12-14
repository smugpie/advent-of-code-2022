export function populateGrid(rockLayout, grid) {
  rockLayout.forEach((row) => {
    const [first, ...rest] = row
    let [x, y] = first
    grid.add(`${y},${x}`)
    rest.forEach(([nextX, nextY]) => {
      if (y == nextY) {
        const direction = Math.sign(nextX - x)
        for (let j = x + direction; j !== nextX + direction; j += direction) {
          grid.add(`${y},${j}`)
        }
      } else {
        const direction = Math.sign(nextY - y)
        for (let j = y + direction; j !== nextY + direction; j += direction) {
          grid.add(`${j},${x}`)
        }
      }
      x = nextX
      y = nextY
    })
  })
}

export function dropSand(grid, x, y, yMax) {
  if (grid.has(`${y},${x}`)) {
    return 'limit'
  }
  while (y < yMax) {
    // space below? drop one space further
    if (!grid.has(`${y + 1},${x}`) ) {
      y += 1
      // rock or sand below? drop either to the left or right
    } else if (!grid.has(`${y + 1},${x - 1}`)) {
      y += 1
      x -= 1
    } else if (!grid.has(`${y + 1},${x + 1}`)) {
      y += 1
      x += 1
    } else {
      // and if that's not possible, come to a halt
      grid.add(`${y},${x}`)
      return
    }
  }
  return 'limit'
}

