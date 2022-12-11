import fs from 'fs'
import readline from 'readline'

let mode = 'createStacks'
let stacks = []

var file = readline.createInterface({
    input: fs.createReadStream('./input.txt')
  });

file.on('line', (line) => {
    if (line === '') {
        mode = 'moveStacks'
        return
    }
        
    if (mode === 'createStacks') {
        let i = 1;
        let pos = 1;
        while (i < line.length) {
            const crate = line.charAt(i)
            if (crate.match(/[A-Z]/g)) {
                if (!stacks[pos]) {
                    stacks[pos] = []
                }
                stacks[pos].unshift(crate)
            }
            pos += 1;
            i += 4;
        }
        return
    }

    if (mode === 'moveStacks') {
        const [ , num, , from, , to] = line.split(' ')
        const holding = []
        for (let i = 1; i <= num; i += 1) {
            const item = stacks[from].pop()
            holding.push(item)
        }
        for (let i = 1; i <= num; i += 1) {
            const item = holding.pop()
            stacks[to].push(item)
        }
        
    }
})

file.on('close', () => {
    let finalString = [];
    stacks.forEach(item => {
        finalString.push(item.pop())
    })
    console.log(finalString.join(''))
})