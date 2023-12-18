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

//const cache = new Map()

const calculatePressure = function(combo) {
    //const s = combo.join('')
    //if (cache.has(s)) return cache.get(s)
    let timeElapsed = 0
    let pressureReleased = 0
    for (let i = 1; i < combo.length; i += 1) {
        let dist = valves[combo[i - 1]].distances.get(combo[i])
        timeElapsed += dist + 1
        if (timeElapsed < TIME_AVAILABLE) {
            let pressureToAdd = (TIME_AVAILABLE - timeElapsed) * valves[combo[i]].flowRate
            pressureReleased += pressureToAdd
        } else {
            break
        }
    }
    //cache.set(s, pressureReleased)
    return pressureReleased
}

const calculateBothPressures = function(combo) {
    for (let i = 4; i < combo.length - 4; i += i) {
        const myValves = combo.slice(0, i)
        const myPressure = calculatePressure(myValves)
        const elephantValves = ['AA', ...combo.slice(i)]
        const elephantPressure = calculatePressure(elephantValves)
        const pressureReleased = myPressure + elephantPressure
        if (pressureReleased > maxPressure) {
            maxPressure = pressureReleased
            console.log(maxPressure, myValves.join(','), elephantValves.join(','))
        }
    }
}

const getCombinationOfValves = function(values, builtUpValues, timeElapsed) {
    if (values.length === 0) {
        calculateBothPressures(builtUpValues)
        return
    }

    for (let i = 0; i < values.length; i += 1) {
        let newBuiltUpValues = [...builtUpValues, values[i]]
        
        let newValues = values.filter((v, idx) => i !== idx)
        getCombinationOfValves(newValues, newBuiltUpValues, timeElapsed)
    }
}

file.on('close', () => {
    appendDistancesToValves() 
    const workingValves = Object.entries(valves).filter(([k, v])=> v.flowRate > 0).map(([k, v]) => k).sort((a, b) => valves[b].flowRate - valves[a].flowRate)
    getCombinationOfValves(workingValves, ['AA'], 0)

    console.log('Part 1 =', maxPressure)
})
