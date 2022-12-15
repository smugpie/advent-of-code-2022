import fs from 'fs'
import readline from 'readline'

var file = readline.createInterface({
  input: fs.createReadStream('./input.txt')
})

const beacons = []

file.on('line', (beacon) => {
  beacons.push(beacon)
})

const plotSignals = function(positions, rowToCheck) {
  const addToSet = function(item) {
    if (item >= 0 && item <= 4000000) {
      positions.add(item)
    }
  }  

  beacons.forEach(beacon => {
    const matches = beacon.match(
      /Sensor at x=([0-9-]+), y=([0-9-]+): closest beacon is at x=([0-9-]+), y=([0-9-]+)/i
    ).slice(1).map(item => +item)
    const [sensorX, sensorY, beaconX, beaconY] = matches
    const verticalDistance = Math.abs(sensorY - beaconY)
    const horizontalDistance = Math.abs(sensorX - beaconX)
    const distance = horizontalDistance + verticalDistance
    
    // if our row is close enough to the sensor then start plotting
    const distanceFromCheck = Math.abs(sensorY - rowToCheck)
    if (distanceFromCheck <= distance) {
      addToSet(sensorX)
      const plotDistance = Math.abs(distance - distanceFromCheck)
      const start = Math.max(0, sensorX - plotDistance)
      const end = Math.min(4000000, sensorX + plotDistance)
      console.log('end - start', end - start)
      for (let i = start; i <= end; i += 1) {
        addToSet(i)
      }
    }
    //if (beaconY === rowToCheck) {
    //  beaconsAtRow.push(beaconX)
    //}  
  })
}

file.on('close', () => {
  for (let row = 0; row <= 4000000; row++) {
    const positions = new Set()
    // const beaconsAtRow = []
    plotSignals(positions, row)
    console.log('row', row, positions.size)
  }
  // remove location of beacons we know about  
  // beaconsAtRow.forEach(location => positions.delete(location))
  console.log('Part 1: number of non-beacon positions =', positions.size)
})
