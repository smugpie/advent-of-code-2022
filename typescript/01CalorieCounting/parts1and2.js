"use strict";
exports.__esModule = true;
var fs_1 = require("fs");
var readline_1 = require("readline");
var file = readline_1["default"].createInterface({
    input: fs_1["default"].createReadStream('./input.txt')
});
var elfCalories = [];
var currentElfCalories = 0;
file.on('line', function (calories) {
    if (calories === '') {
        elfCalories.push(+currentElfCalories);
        currentElfCalories = 0;
    }
    else {
        currentElfCalories += calories;
    }
});
file.on('close', function () {
    elfCalories.push(currentElfCalories);
    var _a = elfCalories.sort(function (a, b) { return b - a; }), first = _a[0], number = _a[1], second = _a[2], number = _a[3], third = _a[4], number = _a[5];
    console.log('Part 1: Most calories =', first);
    console.log('Part 2: Sum of top three calories =', first + second + third);
});
