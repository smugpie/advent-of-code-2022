import fs from 'fs'
import readline from 'readline'

var file = readline.createInterface({
  input: fs.createReadStream('./input.txt')
})

const beacons = []

file.on('line', (beacon) => {
  beacons.push(beacon)
})

const checkForGaps = function (positions) {
  for (const [, endOfFirst] of positions) {
    for (const [startOfSecond] of positions) {
      // might be a one unit gap here
      if (endOfFirst + 2 === startOfSecond) {
        const potentialPosition = endOfFirst + 1
        const isMatch = positions.reduce((acc, [start, end]) => {
          return start <= potentialPosition && end >= potentialPosition
            ? false
            : acc
        }, true)
        if (isMatch) {
          return potentialPosition
        }
      }
    }
  }
  return null
}

const plotSignals = function (positions, rowToCheck) {
  beacons.forEach((beacon) => {
    const matches = beacon
      .match(
        /Sensor at x=([0-9-]+), y=([0-9-]+): closest beacon is at x=([0-9-]+), y=([0-9-]+)/i
      )
      .slice(1)
      .map((item) => +item)
    const [sensorX, sensorY, beaconX, beaconY] = matches
    const distance = Math.abs(sensorX - beaconX) + Math.abs(sensorY - beaconY)

    // if our row is close enough to the sensor then start plotting
    const distanceFromCheck = Math.abs(sensorY - rowToCheck)
    if (distanceFromCheck <= distance) {
      const plotDistance = Math.abs(distance - distanceFromCheck)
      const start = Math.max(0, sensorX - plotDistance)
      const end = Math.min(4000000, sensorX + plotDistance)
      // log the start and end points of the radius
      positions.push([start, end])
    }
  })
}

file.on('close', () => {
  // yes this is a bit brute force-y
  for (let row = 0; row <= 4000000; row++) {
    const positions = []
    plotSignals(positions, row)
    const gapExists = checkForGaps(positions)
    if (gapExists) {
      console.log('Part 2: tuning frequency =', gapExists * 4000000 + row)
      break
    }
  }
})
