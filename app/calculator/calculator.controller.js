'use strict'
/* globals angular */

angular
  .module('calculist2')
  .controller('calculatorController', calculator)

function calculator ($scope) {
  // create containers for top and bottom line elements
  $scope.displayBot = ''
  $scope.displayTop = ''

  // Handle the equuals click to evaluate expression and return result
  $scope.equate = function () {
    var equation = scrapeString($scope.displayBot)
    $scope.displayTop = (equation.valueA + ' ' + equation.function + ' ' + equation.valueB + ' =')
    $scope.displayBot = parseEquation(equation.valueA, equation.valueB, equation.function)
  }

  // Add clicked button to the display
  $scope.inputBtnClick = function (btn) {
    $scope.displayBot += (btn)
  }

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
    var numbers = str.match(/\d+/g)
    var functions = str.match(/[^\d\s]/)
    var eqObj = {}
    eqObj.valueA = parseInt(numbers[0], 10)
    eqObj.valueB = parseInt(numbers[1], 10)
    eqObj.function = functions[0]
    return eqObj
  }
}
