'use strict'

/* global $ */

// Assign functions for all the calculator fucntions
var calc = {}
calc.addNumbers = function (a, b) { return (a + b) }
calc.subtractNumbers = function (a, b) { return (a - b) }
calc.multiplyNumbers = function (a, b) { return (a * b) }
calc.divideNumbers = function (a, b) { return (a / b) }
calc.powNumbers = function (a, b) { return Math.pow(a, b) }
calc.sqrtNumber = function (a) { return Math.sqrt(a) }

// Route the equation to the proper method
function parseEquation (a, b, func) {
  switch (func) {
    case '+': return calc.addNumbers(a, b)
    case '-': return calc.subtractNumbers(a, b)
    case '*': return calc.multiplyNumbers(a, b)
    case '/': return calc.divideNumbers(a, b)
    case '^': return calc.powNumbers(a, b)
    case '#': return calc.sqrtNumber(a)
    default: return '??'
  }
}

// Decode the string into values and a function
function scrapeString (str) {
  var eqObj = {}
  eqObj.valueA = 313
  eqObj.valueB = 32
  eqObj.function = '^'
  return eqObj
}

$('.btn--equals').on('click', function () {
  // scrapeString
  var displayTop = $('.display--top')
  var displayBot = $('.display--bottom')
  displayTop.html(displayBot.html() + ' =')
  var equation = scrapeString(displayBot.html())
  displayBot.html(parseEquation(equation.valueA, equation.valueB, equation.function))
})

// When number array.length = 1
// Return array[0]
// If A exists in functions array then solve()
// solve() + replace + remove
// Restart function
// If B exists in functions array then solve()
// solve() + replace + remove
// Restart function
// If C exists in functions array then solve()
// solve() + replace + remove
// Restart function
var calcArray = ['-', '1', '+', '2', '-', '3', '*', '4', '/', '5', '=']
cleanArray(calcArray)
solveArray(calcArray)

// function buildArray (array, start, increment) {
//   var newArray = []
//   for (var i = start; i < array.length; i += increment) {
//     newArray.push(array[i])
//   }
//   return newArray
// }

// Clean array, Clip leading and trailing functions
function cleanArray (array) {
  if (isNaN(array[0])) {
    array.shift()
  }
  if (isNaN(array[array.length - 1])) {
    array.pop()
  }
  return array
}

// solve the input string and return a value
function solveArray (equationArray) {
  if (equationArray.length === 1) {
    return equationArray[0]
  }
  if (equationArray.includes('^')) {
    var fnIndex = equationArray.indexOf('^')
    var fnAnswer = Math.pow(equationArray[fnIndex - 1], equationArray[fnIndex + 1])
    equationArray.splice(fnIndex - 1, 3, fnAnswer)
    solveArray(equationArray)
  }
}
