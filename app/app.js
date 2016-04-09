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
var calcArray = ['2', '^', '3', '*', '4']
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
  var fnIndex = '?'
  var fnAnswer = '?'
  // Check to see if solution has been found
  if (equationArray.length === 1) { return equationArray[0] }

  // First check to see if a sqrt exists
  if (equationArray.includes('√')) {
    fnIndex = equationArray.indexOf('√')
    fnAnswer = Math.sqrt(equationArray[fnIndex + 1])
    equationArray.splice(fnIndex, 2, fnAnswer)
    return solveArray(equationArray)
  }
  // Second check to see if an exponent exists
  if (equationArray.includes('^')) {
    fnIndex = equationArray.indexOf('^')
    fnAnswer = Math.pow(parseFloat(equationArray[fnIndex - 1]), parseFloat(equationArray[fnIndex + 1]))
    equationArray.splice(fnIndex - 1, 3, fnAnswer)
    return solveArray(equationArray)
  }
  // Third check to see if a multiplacation exists
  if (equationArray.includes('x')) {
    fnIndex = equationArray.indexOf('x')
    fnAnswer = equationArray[fnIndex - 1] * equationArray[fnIndex + 1]
    equationArray.splice(fnIndex - 1, 3, fnAnswer)
    return solveArray(equationArray)
  }
  // Fourth check to see if a division exists
  if (equationArray.includes('÷')) {
    fnIndex = equationArray.indexOf('÷')
    fnAnswer = equationArray[fnIndex - 1] / equationArray[fnIndex + 1]
    equationArray.splice(fnIndex - 1, 3, fnAnswer)
    return solveArray(equationArray)
  }
  // Fifth check to see if a addition exists
  if (equationArray.includes('+')) {
    fnIndex = equationArray.indexOf('+')
    fnAnswer = equationArray[fnIndex - 1] + equationArray[fnIndex + 1]
    equationArray.splice(fnIndex - 1, 3, fnAnswer)
    return solveArray(equationArray)
  }
  // Sixth check to see if a subtraction exists
  if (equationArray.includes('-')) {
    fnIndex = equationArray.indexOf('-')
    fnAnswer = equationArray[fnIndex - 1] - equationArray[fnIndex + 1]
    equationArray.splice(fnIndex - 1, 3, fnAnswer)
    return solveArray(equationArray)
  }
}
