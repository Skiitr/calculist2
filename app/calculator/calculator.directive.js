'use strict'
angular
  .module('calculist2')
  .directive('calculator', calculate)

function calculate () {
  var directive = {
    templateUrl: '/calculator/calculator.directive.html',
    restrict: 'E',
    replace: true,
    controller: '/calculator/calculator.controller.js'
  }
  return directive
}
