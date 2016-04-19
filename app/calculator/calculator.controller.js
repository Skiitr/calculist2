'use strict'
/* globals angular */

angular
  .module('calculist2')
  .controller('calculatorController', calculator)

function calculator ($scope, dataService) {
  // Route the dataService to a local object
  $scope.dataService = dataService
  // create containers for top and bottom line elements
  $scope.displayBot = ''
  $scope.displayTop = ''
  // create container for current equation
  $scope.calc = []
  // create state vaiable for equation solution
  $scope.equationSolved = false

  // Add clicked button to the display
  $scope.inputNumberClick = function (btn) {
    if ($scope.equationSolved) { return }
    $scope.displayBot += (btn)
  }

  // Add value and clicked function to the display
  $scope.inputFunctionClick = function (fn) {
    $scope.displayBot = $scope.displayBot.toString()
    // Toggle '-' number
    if (fn === '+/-') {
      $scope.displayBot = toggleLeadingChar($scope.displayBot.toString(), '-')
      $scope.equationSolved = false
      return
    // Toggle '√' number
    }
    if (fn === '√') {
      $scope.displayBot = toggleLeadingChar($scope.displayBot.toString(), '√')
      $scope.equationSolved = false
      return
    }
    // Check if blank or isNaN
    if ($scope.displayBot === '') {
      return
    }
    $scope.calc.push($scope.displayBot)
    $scope.calc.push(fn)
    displayEquation($scope.calc)
    $scope.clear('bottom')
    $scope.equationSolved = false
  }

  // Add a clear function
  $scope.clear = function (what) {
    switch (what) {
      case 'all':
        $scope.calc = []
        $scope.displayTop = ''
        $scope.displayBot = ''
        $scope.equationSolved = false
        break
      case 'top':
        $scope.displayTop = ''
        break
      case 'bottom':
        $scope.displayBot = ''
        break
      case 'array':
        $scope.calc = []
        break
    }
  }

  // Handle the equals click to evaluate expression and return result
  $scope.equate = function () {
    // check to see if equation has been solved
    if (($scope.equationSolved ||
      isNaN($scope.displayBot)) &&
      !$scope.displayBot.startsWith('√')) { return }
    // Add last number entered and '=' to the calc array
    $scope.calc.push($scope.displayBot, '=')
    // Clear the display bottom
    $scope.clear('bottom')
    displayEquation($scope.calc)
    // Clean the calc array equation
    // Solve the array equation and display answer on display bottom
    $scope.displayBot = solveArray(cleanArray($scope.calc))
    $scope.clear('array')
    $scope.equationSolved = true
  }

  // Create function to walk backwards through the numbers
  $scope.backspace = function () {
    if ($scope.equationSolved) {
      $scope.clear('top')
      $scope.equationSolved = false
    } else if ($scope.displayBot === '' && $scope.displayTop === '') {
      return
    } else if ($scope.displayBot === '') {
      $scope.calc.pop()
      $scope.displayBot = $scope.calc.pop()
      displayEquation($scope.calc)
    } else {
      $scope.displayBot = $scope.displayBot.toString()
      $scope.displayBot = $scope.displayBot.slice(0, $scope.displayBot.length - 1)
    }
  }

  // Toggle a charater on or off from a string
  function toggleLeadingChar (str, char) {
    str.includes(char) ? str = str.slice(1) : str = char + str
    return str
  }

  // Convert calc array to a string and display it
  function displayEquation (inputArray, addItem) {
    if (addItem) {
      inputArray.push(addItem)
    }
    $scope.displayTop = inputArray.join(' ')
  }

  // Clean array, Clip leading and trailing functions
  function cleanArray (array) {
    while ((isNaN(array[0]) && !array[0].startsWith('√')) || array[0] === '') {
      array.shift()
    }
    while ((isNaN(array[array.length - 1]) && !array[array.length - 1].startsWith('√')) || array[array.length - 1] === '') {
      array.pop()
    }
    // Convert √numbers to floats
    array = array.map(function (currVal, i, array) {
      return currVal.startsWith('√') ? Math.sqrt(parseFloat(currVal.slice(1))) : currVal
    })
    return array
  }

  // solve the input string and return a value
  function solveArray (equationArray) {
    var fnIndex = '?'
    var fnAnswer = '?'

    // First check to see if solution has been found
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
}
