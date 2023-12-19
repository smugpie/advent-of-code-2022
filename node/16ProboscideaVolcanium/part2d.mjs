import fs from 'fs'
import readline from 'readline'

var file = readline.createInterface({
  input: fs.createReadStream('./input.txt')
})

const TIME_AVAILABLE = 26

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
    return pressureReleased
}

const getMyCombinationOfValves = function(values, builtUpValues, timeElapsed) {
    for (let i = 0; i < values.length; i += 1) {
        let lastValue = builtUpValues.at(-1)
        let newTimeElapsed = timeElapsed + 1 + valves[lastValue].distances.get(values[i])
        if (newTimeElapsed < TIME_AVAILABLE) {
            let newBuiltUpValues = [...builtUpValues, values[i]]
            let newValues = values.filter((v, idx) => i !== idx)
            if (newValues.length > 0) {
                getElephantCombinationOfValves(newValues, ['AA'], 0, newBuiltUpValues)
            }
            
            getMyCombinationOfValves(newValues, newBuiltUpValues, newTimeElapsed)
        } 
    }
}

const getElephantCombinationOfValves = function(values, builtUpValues, timeElapsed, myValves) {
   // console.log('calling elephant', values, builtUpValues)
    if (values.length === 0 || timeElapsed >= TIME_AVAILABLE) {
        //const totalPressure = myPressure + calculatePressure(builtUpValues)
        const totalPressure = calculatePressure(myValves) + calculatePressure(builtUpValues)
        if (totalPressure > maxPressure) {
            maxPressure = totalPressure
            console.log('Max pressure', totalPressure, myValves.join(','), '--', builtUpValues.join(','))
        }
        return
    }
    for (let i = 0; i < values.length; i += 1) {
        let newBuiltUpValues = [...builtUpValues, values[i]]
        let lastValue = builtUpValues.at(-1)
        let newValues = values.filter((v, idx) => i !== idx)
        let newTimeElapsed = timeElapsed + 1 + valves[lastValue].distances.get(values[i])
        getElephantCombinationOfValves(newValues, newBuiltUpValues, newTimeElapsed, myValves)
    }
}

file.on('close', () => {
    appendDistancesToValves() 
    const workingValves = Object.entries(valves).filter(([k, v])=> v.flowRate > 0).map(([k, v]) => k).sort((a, b) => valves[b].flowRate - valves[a].flowRate)
    getMyCombinationOfValves(workingValves, ['AA'], 0)

    console.log('Part 2 =', maxPressure)
})
