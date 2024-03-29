import fs from 'fs'
import readline from 'readline'

var file = readline.createInterface({
  input: fs.createReadStream('./input.txt')
})

const TIME_AVAILABLE = 30

const valves = {}
let valveCount = 0
let maxPressure = 0

file.on('line', (valve) => {
  const matches = valve
    .match(
      /Valve ([A-Z]{2}) has flow rate=([0-9-]+); tunnels? leads? to valves? (.*)$/i
    )
  const [,label, flowRate, tunnelsTo] = matches
  valves[label] = {
    flowRate: +flowRate,
    tunnelsTo: tunnelsTo.split(', ')
  }
  valveCount += 1
})

const appendDistancesToValves = function() {
    Object.entries(valves).forEach(([k, v]) => {
        const distances = new Map()       
        let ct = 0;
        let curr = [k]
        distances.set(k, 0)
        while (distances.size < valveCount) {
            ct += 1
            let newCurr = []
            curr.forEach((valve) => {
                valves[valve].tunnelsTo.forEach((toValve) => {
                    if (!distances.has(toValve)) {
                        newCurr = [...newCurr, toValve]
                        distances.set(toValve, ct)
                    }                    
                })
            })
            curr = [...newCurr]
        }
        valves[k].distances = distances
    })
}

const calculatePressure = function(combo) {
    let timeElapsed = 0
    let pressureReleased = 0
    for (let i = 1; i < combo.length; i += 1) {
        let dist = valves[combo[i - 1]].distances.get(combo[i])
        timeElapsed += dist + 1
        if (timeElapsed < TIME_AVAILABLE) {
            let pressureToAdd = (TIME_AVAILABLE - timeElapsed) * valves[combo[i]].flowRate
            pressureReleased += pressureToAdd
        }
    }

    if (pressureReleased > maxPressure) {
        maxPressure = pressureReleased
        console.log(maxPressure, combo.join(','))
    }
}

const getCombinationOfValves = function(values, builtUpValues, timeElapsed) {
    if (values.length === 0 || timeElapsed >= TIME_AVAILABLE) {
        calculatePressure(builtUpValues)
        return
    }
    for (let i = 0; i < values.length; i += 1) {
        let newBuiltUpValues = [...builtUpValues, values[i]]
        let lastValue = builtUpValues.at(-1)
        let newValues = values.filter((v, idx) => i !== idx)
        getCombinationOfValves(newValues, newBuiltUpValues, timeElapsed + 1 + valves[lastValue].distances.get(values[i]))
    }
}

file.on('close', () => {
    appendDistancesToValves() 
    const workingValves = Object.entries(valves).filter(([k, v])=> v.flowRate > 0).map(([k, v]) => k).sort((a, b) => valves[b].flowRate - valves[a].flowRate)
    getCombinationOfValves(workingValves, ['AA'], 0)

    console.log('Part 1 =', maxPressure)
})
