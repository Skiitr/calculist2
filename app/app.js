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
