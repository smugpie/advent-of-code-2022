import fs from 'fs'
import readline from 'readline'

let numberOfOverlaps = 0

var file = readline.createInterface({
    input: fs.createReadStream('./input.txt')
  });

file.on('line', (sections) => {
    if (sections !== '') {
        const [elf1Sections, elf2Sections] = sections.split(',')
        const [elf1start, elf1end] = elf1Sections.split('-')
        const [elf2start, elf2end] = elf2Sections.split('-')
        const elf1startNum = parseInt(elf1start, 10)
        const elf1endNum = parseInt(elf1end, 10)
        const elf2startNum = parseInt(elf2start, 10)
        const elf2endNum = parseInt(elf2end, 10)
        if ((elf1startNum >= elf2startNum && elf1endNum <= elf2endNum ) ||
        (elf2startNum >= elf1startNum && elf2endNum <= elf1endNum )) {
            numberOfOverlaps += 1
            console.log(sections, elf1start, elf1end, elf2start, elf2end)
        }
    }
})

file.on('close', () => {
    console.log('Done', numberOfOverlaps)
    /*const max = elfCalories.reduce((acc, cur) => Math.max(acc, cur), -10000)
    console.log('Most calories =', max)
    const [first, second, third] = elfCalories.sort((a, b) => Math.sign(b - a))
    console.log('sum of top three calories =', first + second + third)*/
})