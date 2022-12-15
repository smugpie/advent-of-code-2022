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

const getFolderSize = function (folder) {
  let size = 0
  for (const [key, value] of Object.entries(folder)) {
    if (typeof value === 'object') {
      size += getFolderSize(folder[key])
    } else if (key !== 'SIZE') {
      size += value
    }
    folder.SIZE = size
  }
  return size
}

let closestFolderSize = 99999999

const getClosestFolderSize = function (folder) {
  const freeSpaceNeeded = 30000000 - (70000000 - folders.SIZE)
  for (const [key, value] of Object.entries(folder)) {
    if (typeof value === 'object') {
      getClosestFolderSize(folder[key])
    } else if (key === 'SIZE' && folder.SIZE >= freeSpaceNeeded) {
      closestFolderSize = Math.min(folder.SIZE, closestFolderSize)
    }
  }
}

file.on('close', () => {
  getFolderSize(folders)
  getClosestFolderSize(folders)
  console.log('Part 2: closest folder size =', closestFolderSize)
})
