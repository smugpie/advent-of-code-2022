import fs from 'fs'
import readline from 'readline'

const folders = {}
let currentDir = []

const getFolderObj = function (currentDir) {
  return currentDir.reduce((acc, cur) => acc[cur], folders)
}

var file = readline.createInterface({
  input: fs.createReadStream('./input.txt')
})

file.on('line', (line) => {
  if (line.charAt(0) === '$') {
    const [, command, arg] = line.split(' ')
    if (command === 'cd') {
      if (arg === '/') {
        currentDir = []
      } else if (arg === '..') {
        currentDir.pop()
      } else {
        currentDir.push(arg)
      }
    }
  } else {
    const [size, name] = line.split(' ')
    const folderObj = getFolderObj(currentDir)
    folderObj[name] = size === 'dir' ? {} : +size
  }
})

const calculateFolderSize = function (folder) {
  let size = 0
  for (const [key, value] of Object.entries(folder)) {
    if (typeof value === 'object') {
      size += calculateFolderSize(folder[key])
    } else if (key !== 'SIZE') {
      size += value
    }
    folder.SIZE = size
  }
  return size
}

let sumOfFolderSizes = 0

const sumFolderSizes = function (folder) {
  for (const [key, value] of Object.entries(folder)) {
    if (typeof value === 'object') {
      sumFolderSizes(folder[key])
    } else if (key === 'SIZE' && folder.SIZE <= 100000) {
      sumOfFolderSizes += folder.SIZE
    }
  }
}

file.on('close', () => {
  calculateFolderSize(folders)
  sumFolderSizes(folders)
  console.log('Part 1: sum of folder sizes =', sumOfFolderSizes)
})
