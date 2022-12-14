export function populateGrid(rockLayout, grid) {
  rockLayout.forEach((row) => {
    const currentLocation = row[0]
    let [x, y] = currentLocation
    grid[y][x] = '#'
    const rest = row.slice(1)
    rest.forEach(([nextX, nextY]) => {
      if (y == nextY) {
        const direction = Math.sign(nextX - x)
        for (let j = x + direction; j !== nextX + direction; j += direction) {
          grid[y][j] = '#'
        }
      } else {
        const direction = Math.sign(nextY - y)
        for (let j = y + direction; j !== nextY + direction; j += direction) {
          grid[j][x] = '#'
        }
      }
      x = nextX
      y = nextY
    })
  })
}

export function dropSand(grid, x, y) {
  if (grid[y][x] === 'o') {
    return 'limit'
  }
  while (y < grid.length - 1) {
    // space below? drop one space further
    if (grid[y + 1][x] === ' ') {
      y += 1
      // rock or sand below? drop either to the left or right
    } else if (grid[y + 1][x - 1] === ' ') {
      y += 1
      x -= 1
    } else if (grid[y + 1][x + 1] === ' ') {
      y += 1
      x += 1
    } else {
      grid[y][x] = 'o'
      return
    }
  }
  return 'limit'
}
