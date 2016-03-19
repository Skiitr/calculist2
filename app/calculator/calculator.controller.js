'use strict'
angular
  .module('calculist2')
  .controller('calculatorController', calculator)

function calculator ($scope, databaseController) {
  console.log($scope.data)
}
