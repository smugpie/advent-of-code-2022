export default class Monkey {
    constructor() {
        this.index = 0
        this.items = []
        this.operator = ''
        this.operand = ''
        this.divisibleBy = 0
        this.monkeyIfTrue = 0
        this.monkeyIfFalse = 0
        this.numberOfInspections = 0
    }

    performOperation(old) {
        if (this.operator === '+') {
            if (this.operand === 'old') {
                return old + old
            }
            return old + (+this.operand)
        }
        if (this.operator === '*') {
            if (this.operand === 'old') {
                return old * old
            }
            return old * (+this.operand)
        }
        this.numberOfInspections += 1
    }

    performTest(num) {
        return (num % this.divisibleBy === 0) ? this.monkeyIfTrue : this.monkeyIfFalse
    }
}