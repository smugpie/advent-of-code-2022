import fs from 'fs'
import readline from 'readline'

let text = ''

var file = readline.createInterface({
    input: fs.createReadStream('./input.txt')
  });

file.on('line', (line) => {
    if (line !== '') {
        text += line
        return
    }
})

file.on('close', () => {
    const len = text.length
    for (let i = 0; i < text.length - 4; i += 1) {
        const charsToCheck = text.substr(i, 4).split('')
        const charSet = new Set(charsToCheck)
        console.log('checking', charSet.size)
        if (charSet.size === 4) {
            console.log('found differing characters', i + 4)
            break
        }
    }
    console.log('Done')
})