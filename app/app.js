'use strict'

/* global $ */

function addNumbers (a, b) {
  return (a + b)
}

function subtractNumbers (a, b) {
  return (a - b)
}

function multiplyNumbers (a, b) {
  return (a * b)
}

function divideNumbers (a, b) {
  return (a / b)
}

function parseEquation (a, b, func) {
  switch (func) {
    case '+': return addNumbers(a, b)
    case '-': return subtractNumbers(a, b)
    case '*': return multiplyNumbers(a, b)
    case '/': return divideNumbers(a, b)
    default: return a
  }
}

function scrapeString (str) {
  var eqObj = {}
  eqObj.value1 = 313
  eqObj.value2 = 323
  eqObj.function = '+'
  return eqObj
}

$('.btn--equals').on('click', function () {
  // scrapeString
  var displayTop = $('.display--top')
  var displayBot = $('.display--bottom')
  displayTop.html(displayBot.html() + ' =')
  var equation = scrapeString(displayBot.html())
  displayBot.html(parseEquation(equation.value1, equation.value2, equation.function))
})
