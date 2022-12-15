"use strict";
exports.__esModule = true;
var fs = require("fs");
var readline = require("readline");
var file = readline.createInterface({
    input: fs.createReadStream('./input.txt')
});
var elfCalories = [];
var currentElfCalories = 0;
file.on('line', function (calories) {
    if (calories === '') {
        elfCalories.push(+currentElfCalories);
        currentElfCalories = 0;
    }
    else {
        currentElfCalories += +calories;
    }
});
file.on('close', function () {
    elfCalories.push(currentElfCalories);
    var _a = elfCalories.sort(function (a, b) { return b - a; }), first = _a[0], second = _a[1], third = _a[2];
    console.log('Part 1: Most calories =', first);
    console.log('Part 2: Sum of top three calories =', first + second + third);
});
