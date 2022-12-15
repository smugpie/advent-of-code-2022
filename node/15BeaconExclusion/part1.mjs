import fs from 'fs'
import readline from 'readline'

var file = readline.createInterface({
  input: fs.createReadStream('./testInput.txt')
})

let rowToCheck = 10
const positions = new Set()

file.on('line', (beacon) => {
  console.log(beacon)
  const [, sensorX, sensorY, beaconX, beaconY] = beacon.match(
    /Sensor at x=([0-9-]+), y=([0-9-]+): closest beacon is at x=([0-9-]+), y=([0-9-]+)/i
  )
  const verticalDistance = Math.abs(+sensorY - +beaconY)
  const horizontalDistance = Math.abs(+sensorX - +beaconX)
  const distance = horizontalDistance + verticalDistance
  console.log(sensorX, sensorY, beaconX, beaconY, distance)

  const distanceFromCheck = Math.abs(+sensorY - rowToCheck)
  console.log(distanceFromCheck, 'rows away')
  if (distanceFromCheck > distance) {
    console.log('too far away to make a difference')
  } else {
    console.log('adding ', sensorX)
    positions.add(+sensorX)
    for (let i = 1; i <= Math.abs(distance - distanceFromCheck); i += 1) {
      console.log('adding ', +sensorX + i)
      console.log('adding ', +sensorX - i)
      positions.add(+sensorX + i)
      positions.add(+sensorX - i)
    }
  }
})

file.on('close', () => {
  console.log('Part 1: number of invalidated positions =', positions.size, Array.from(positions).sort((a, b) => +b - +a))
})
