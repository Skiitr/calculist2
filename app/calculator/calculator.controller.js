'use strict'
/* globals angular */

angular
  .module('calculist2')
  .controller('calculatorController', calculator)

function calculator ($scope, dataService) {
  $scope.dataService = dataService

  // create containers for top and bottom line elements
  $scope.displayBot = ''
  $scope.displayTop = ''

  // create container for current equation
  $scope.calc = []

  // Handle the equals click to evaluate expression and return result
  $scope.equate = function () {
    // check to see if equation has been solved
    if ($scope.calc[$scope.calc.length - 1] === '=') {
      return
    }
    $scope.calc.push($scope.displayBot, '=')
    $scope.displayBot = ''
    // clean equation
    $scope.calc = cleanArray($scope.calc)
    displayEquation($scope.calc)
    $scope.displayBot = solveArray($scope.calc)
  }

  // Add clicked button to the display
  $scope.inputNumberClick = function (btn) {
      $scope.displayBot += (btn)
  }

  // Add clicked button to the display
  $scope.inputFunctionClick = function (fn) {
    if (fn === '+/-') {
      $scope.displayBot = toggleLeadingChar($scope.displayBot, '-')
    } else if (fn === '√') {
      $scope.displayBot = toggleLeadingChar($scope.displayBot, '√')
    } else if ($scope.displayBot === '') {
      return
    } else {
      $scope.calc.push($scope.displayBot)
      $scope.calc.push(fn)
      $scope.displayBot = ''
    }
    displayEquation($scope.calc)
  }

  // Toggle a charater on or off from a string
  function toggleLeadingChar (str, char) {
    str.includes(char) ? str = str.slice(1) : str = char + str
    return str
  }

  // Convert calc array to a string and display it
  function displayEquation (inputArray) {
    $scope.displayTop = inputArray.join(' ')
  }

  // Clean array, Clip leading and trailing functions
  function cleanArray (array) {
    if (isNaN(array[0]) && !array[0].startsWith('√')) {
      array.shift()
    }
    if (isNaN(array[array.length - 1]) && !array[array.length - 1].startsWith('√')) {
      array.pop()
    }
    return array
  }

  // solve the input string and return a value
  function solveArray (equationArray) {
    var fnIndex = '?'
    var fnAnswer = '?'
    // First check to see if a sqrt string exists
    if (equationArray.join(' ').indexOf('√') > -1) {
      fnIndex = equationArray.map(function (currVal, i, array) {
        if (currVal.startsWith('√')) { return i }
      }).join('')
      fnAnswer = Math.sqrt(parseFloat(equationArray[fnIndex].slice(1)))
      equationArray.splice(fnIndex, 1, fnAnswer)
    }

    // Check to see if solution has been found
    if (equationArray.length === 1) { return equationArray[0] }

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
      fnAnswer = parseFloat(equationArray[fnIndex - 1]) * parseFloat(equationArray[fnIndex + 1])
      equationArray.splice(fnIndex - 1, 3, fnAnswer)
      return solveArray(equationArray)
    }
    // Fourth check to see if a division exists
    if (equationArray.includes('÷')) {
      fnIndex = equationArray.indexOf('÷')
      fnAnswer = parseFloat(equationArray[fnIndex - 1]) / parseFloat(equationArray[fnIndex + 1])
      equationArray.splice(fnIndex - 1, 3, fnAnswer)
      return solveArray(equationArray)
    }
    // Fifth check to see if a addition exists
    if (equationArray.includes('+')) {
      fnIndex = equationArray.indexOf('+')
      fnAnswer = parseFloat(equationArray[fnIndex - 1]) + parseFloat(equationArray[fnIndex + 1])
      equationArray.splice(fnIndex - 1, 3, fnAnswer)
      return solveArray(equationArray)
    }
    // Sixth check to see if a subtraction exists
    if (equationArray.includes('-')) {
      fnIndex = equationArray.indexOf('-')
      fnAnswer = parseFloat(equationArray[fnIndex - 1]) - parseFloat(equationArray[fnIndex + 1])
      equationArray.splice(fnIndex - 1, 3, fnAnswer)
      return solveArray(equationArray)
    }
  }

  // $scope.keyPress = function (keycode) {
  //   console.log(keycode)
  //   var validKeyCodes = {
  //     '48': 0, '49': 1, '50': 2, '51': 3, '52': 4, // 0-4
  //     '53': 5, '54': 6, '55': 7, '56': 8, '57': 9, // 5-9
  //     '42': ' x ', '43': ' + ', '45': ' - ', '47': ' ÷ ', // *,+,-,/
  //     '13': 'Enter' // Enter
  //   }
  //   if (validKeyCodes[keycode]) {
  //     if (validKeyCodes[keycode] === 'Enter') {
  //       $scope.equate()
  //     } else {
  //       $scope.inputBtnClick(validKeyCodes[keycode])
  //     }
  //   } else {
  //     console.log('Key not valid')
  //   }
  // }

  // Create New Card
  $scope.createCard = function () {
    // Check if data is valid for card creation
    if ($scope.displayTop && $scope.displayBot) {
      var newCard = {}
      newCard.title = 'Card Title'
      newCard.id = Date.now() * Math.ceil(Math.random() * 10)
      newCard.equation = $scope.displayTop
      newCard.solution = $scope.displayBot
      dataService.cards.unshift(newCard)
    } else {
      // Else throw error
      console.log('Data not vailid for new card')
    }
  }

/* New plan for calculator function
keypad will except numbers only for screen to not change
functions will shift the number on the lower display up and add the function
  to the upper line such as "36 +"
+/- function will change the number on screen to its negative
sqrt will evaluate automaticly
once = is hit the array will be parsed and the equation solved
drop last function added to evaluate such as "36 + 73 +"
default for the list button is disabled
after an evaluate the list button is enabled
after a clear function the list button is disabled

new functions
solveArray
  if = is at the end of the array return null
  map functions to js operators
  create equation from the array
  add = to the end of the array
  return results
functionClick
  add number entered to calc array
  add function symbol to array
  run display array
displayArray
  pasre array into a string to display on the upper line

--before eval--
if ^
  split ' '
  search for index of ^
  set base to index - 1
  set exp to index + 1
  set index of ^ = Math.POW(base,pow)
  splice index -1
  splice index +1
  join ' '
--then eval--
*/
}
