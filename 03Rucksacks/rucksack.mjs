import fs from 'fs'
import readline from 'readline'

var file = readline.createInterface({
    input: fs.createReadStream('./input.txt')
  });

let priorities = 0;

const getPriority = function(character) {
    const ascii = character.charCodeAt(0)
    if (ascii >= 97 && ascii <= 122) {
        console.log('character', character, ascii-96);
        return ascii - 96;
    }
    console.log('character', character, ascii-38);
    return ascii - 38;
}

const intersection = function(compartment1, compartment2) {
    const result = []
    for (let item of compartment1) {
        if (compartment2.has(item)) {
            result.push(item)
        }
    }
    return result
}

file.on('line', (contents) => {
    if (contents !== '') {
        const split = contents.length / 2
        const compartment1 = new Set(contents.slice(0, split).split(''))
        const compartment2 = new Set(contents.slice(split).split(''))
        const duplicates = intersection(compartment1, compartment2)

        duplicates.forEach((dup) => {
            priorities += getPriority(dup)
        })
    }
})

file.on('close', () => {
    console.log('Done', priorities)
})