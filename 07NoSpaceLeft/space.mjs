import fs from 'fs'
import readline from 'readline'

const folders = {}
let currentDir = []

const getFolderObj = function(currentDir) {
  let obj = folders
  currentDir.forEach(dir => obj = obj[dir])
  console.log('setting', obj)
  return obj
}

var file = readline.createInterface({
    input: fs.createReadStream('./input.txt')
  });

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
    if (size === 'dir') {
      folderObj[name] = {}
    } else {
      folderObj[name] = parseInt(size, 10)
    }
  }
})

const getFolderSize = function(folder) {
  let size = 0;
  for (const [key, value] of Object.entries(folder)) {
    if (typeof value === 'object') {
      size += getFolderSize(folder[key])
    } else if (key !== 'SIZE') {
      size += value
    }
    folder.SIZE = size
  }
  return size;
}

let sumOfFolderSizes = 0

const sumFolderSizes = function(folder) {
  for (const [key, value] of Object.entries(folder)) {
    if (typeof value === 'object') {
      sumFolderSizes(folder[key])
    } else if (key === 'SIZE' && folder.SIZE <= 100000) {
      console.log('hello')
      sumOfFolderSizes += folder.SIZE
    }
  }
}

file.on('close', () => {
  getFolderSize(folders)
  sumFolderSizes(folders)
  console.log(JSON.stringify(folders))
    console.log('Done', sumOfFolderSizes)
})