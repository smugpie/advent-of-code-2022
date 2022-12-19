import fs from 'fs'
import readline from 'readline'

var file = readline.createInterface({
  input: fs.createReadStream('./testInput.txt')
})

const valves = {}
let largestPressure = 0
let largestPath = []
let largestLog = []

const traverseTunnels = function(
    currentMinutes,
    currentPath,
    currentPressure,
    currentOpenValves,
    currentLog,
    whatToDo
) {
    // if we've double backed on ourselves then we can return
    if (currentPath.length >= 4 && 
        currentPath.at(-3) === currentPath.at(-1) &&
        currentPath.at(-4) === currentPath.at(-2)) {
            // console.log('skipping')
            return
        }
    const label = currentPath.at(-1)
    const addOneMinute = function() {
        let addingPressure = 0
        Array.from(currentOpenValves).forEach(label => {
            addingPressure += valves[label].flowRate
        })
        currentMinutes += 1
        currentPressure += addingPressure
        //currentLog.push('at minute', currentMinutes, 'pressure added', addingPressure)
        if (currentMinutes === 30) {
            largestPressure = Math.max(largestPressure, currentPressure)

            if (largestPressure === currentPressure) {
                largestPath = currentPath
                // console.log('largest pressure is now', largestPressure, largestPath)
                largestLog = currentLog
            }
            return 'done'
        }
        return 'not done'
    }
    
    // spend time opening the valve only if it's not already open or
    // the flow rate is greater than zero
    const { flowRate, tunnelsTo } = valves[label]
    if (!currentOpenValves.has(label) && flowRate > 0 && whatToDo === 'open') {
        if (addOneMinute() === 'done') {
            return   
        }  
        currentOpenValves.add(label)     
    }

    for (const nextTunnel of tunnelsTo) {
        if (addOneMinute() === 'done') {
            return
        }

        traverseTunnels(
            currentMinutes,
            [...currentPath, nextTunnel],
            currentPressure,
            new Set(currentOpenValves),
            [...currentLog],
            'open'
        )
        traverseTunnels(
            currentMinutes,
            [...currentPath, nextTunnel],
            currentPressure,
            new Set(currentOpenValves),
            [...currentLog],
            'dontopen'
        )
    }
}

file.on('line', (valve) => {
  const matches = valve.match(
    /Valve ([A-Z]{2}) has flow rate=([0-9-]+); tunnels? leads? to valves? (.*)$/i
  ).slice(1)
  const [label, flowRate, tunnelsTo] = matches
  valves[label] = {
    flowRate: +flowRate,
    tunnelsTo: tunnelsTo.split(', ')
  }
})

file.on('close', () => {
    console.log(JSON.stringify(valves, 2))
    traverseTunnels(0, ['AA'], 0, new Set(), [])
    
  // remove location of beacons we know about  
  // beaconsAtRow.forEach(location => positions.delete(location))
  console.log('Part 1: number of non-beacon positions =', largestPressure, largestLog)
})
