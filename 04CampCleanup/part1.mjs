import fs from 'fs'
import readline from 'readline'

let numberOfOverlaps = 0

var file = readline.createInterface({
    input: fs.createReadStream('./input.txt')
  });

file.on('line', (sections) => {
    const [elf1Sections, elf2Sections] = sections.split(',')
    const [elf1start, elf1end] = elf1Sections.split('-')
    const [elf2start, elf2end] = elf2Sections.split('-')
    if ((+elf1start >= +elf2start && +elf1end <= +elf2end ) ||
        (+elf2start >= +elf1start && +elf2end <= +elf1end )) {
        numberOfOverlaps += 1
    }
})

file.on('close', () => {
    console.log('Part 1: number of overlaps =', numberOfOverlaps)
})