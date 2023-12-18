import fs from 'fs'
import readline from 'readline'

var file = readline.createInterface({
    input: fs.createReadStream('./testinput.txt')
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
    const [, label, flowRate, tunnelsTo] = matches
    valves[label] = {
        flowRate: +flowRate,
        tunnelsTo: tunnelsTo.split(', ')
    }
    valveCount += 1
})

const appendDistancesToValves = function () {
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

const cache = {}

const calculatePressure = function (combo) {
    
    let pressureReleased = 0
    let timeElapsed = 0
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


    return pressureReleased
}

const calculateBothPressures = function (myCombo, elephantCombo) {
    const pressureReleased = calculatePressure(myCombo) + calculatePressure(elephantCombo)

    if (pressureReleased > maxPressure) {
        maxPressure = pressureReleased
        console.log('max pressure reached', maxPressure, JSON.stringify(myCombo), JSON.stringify(elephantCombo))
    }
}

const getCombinationOfValves = function (values, myBuiltUpValues, elephantBuiltUpValues, myTimeElapsed, elephantTimeElapsed) {
    if (values.length === 0 || (myTimeElapsed >= TIME_AVAILABLE && elephantTimeElapsed >= TIME_AVAILABLE)) {
        calculateBothPressures(myBuiltUpValues, elephantBuiltUpValues)
        return
    }

    values.forEach((val, i) => {
        let newValues = [...values]
        newValues.splice(i, 1)
        if (myTimeElapsed < TIME_AVAILABLE) {
            const myDistance = valves[myBuiltUpValues.at(-1)].distances.get(val)
            const iCanGetThere = myTimeElapsed + myDistance + 1
            getCombinationOfValves(newValues, [...myBuiltUpValues, val], elephantBuiltUpValues, iCanGetThere, elephantTimeElapsed)
        }        

        let elephantValues = newValues.filter((v) => myBuiltUpValues.indexOf(v) < 0)

        if (elephantTimeElapsed < TIME_AVAILABLE) {
            const elephantDistance = valves[elephantBuiltUpValues.at(-1)].distances.get(val)
            const elephantCanGetThere = elephantTimeElapsed + elephantDistance + 1
            getCombinationOfValves(newValues, myBuiltUpValues, [...elephantBuiltUpValues, val], myTimeElapsed, elephantCanGetThere)
        }

    })
}

file.on('close', () => {
    appendDistancesToValves()
    const workingValves = Object.entries(valves).filter(([k, v]) => v.flowRate > 0).map(([k, v]) => k).sort((a, b) => valves[b].flowRate - valves[a].flowRate)
    getCombinationOfValves(workingValves, ['AA'], ['AA'], 0, 0)

    console.log('Part 1 =', maxPressure)
})
