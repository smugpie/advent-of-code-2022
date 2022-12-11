import fs from 'fs'
import readline from 'readline'

var file = readline.createInterface({
    input: fs.createReadStream('./input.txt')
  });

let priorities = 0;
let currentGroup = [];

const getPriority = function(character) {
    const ascii = character.charCodeAt(0)
    if (ascii >= 97 && ascii <= 122) {
        console.log('character', character, ascii-96);
        return ascii - 96;
    }
    console.log('character', character, ascii-38);
    return ascii - 38;
}

const intersection = function(c1, c2) {
    const result = []
    for (let item of c1) {
        if (c2.has(item)) {
            result.push(item)
        }
    }
    return result
}

file.on('line', (contents) => {
    if (contents !== '') {
        currentGroup.push(new Set(contents.split('')))
        if (currentGroup.length === 3) {
            const [compartment1, compartment2, compartment3] = currentGroup
            console.log(compartment1, compartment2)
            const oneAndTwo = new Set(intersection(compartment1, compartment2))
            const duplicates = intersection(oneAndTwo, compartment3) 
            console.log(currentGroup, duplicates)
            duplicates.forEach((dup) => {
                priorities += getPriority(dup)
            })
            currentGroup = []
            //process.exit()
        } 
    }
})

file.on('close', () => {
    console.log('Done', priorities)
})