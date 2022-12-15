import fs from 'fs'
import readline from 'readline'

var file = readline.createInterface({
  input: fs.createReadStream('./input.txt')
})

let rowToCheck = 2000000
const positions = new Set()
const beaconsAtRow = []

file.on('line', (beacon) => {
  const matches = beacon.match(
    /Sensor at x=([0-9-]+), y=([0-9-]+): closest beacon is at x=([0-9-]+), y=([0-9-]+)/i
  ).slice(1).map(item => +item)
  const [sensorX, sensorY, beaconX, beaconY] = matches
  const distance = Math.abs(sensorY - beaconY) + Math.abs(sensorX - beaconX)

  // if our row is close enough to the sensor then start plotting
  const distanceFromCheck = Math.abs(sensorY - rowToCheck)
  if (distanceFromCheck <= distance) {
    positions.add(sensorX)
    for (let i = 1; i <= Math.abs(distance - distanceFromCheck); i += 1) {
      positions.add(sensorX + i)
      positions.add(sensorX - i)
    }
  }
  if (beaconY === rowToCheck) {
    beaconsAtRow.push(beaconX)
  }
})

file.on('close', () => {
  // remove location of beacons we know about  
  beaconsAtRow.forEach(location => positions.delete(location))
  console.log('Part 1: number of non-beacon positions =', positions.size)
})
