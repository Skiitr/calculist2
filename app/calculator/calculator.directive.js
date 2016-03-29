'use strict'
/* globals angular */

angular
  .module('calculist2')
  .directive('myCalculator', calcObject)

function calcObject ($scope) {
  return {
    restrict: 'E',
    templateUrl: 'calculator/calculator.directive.html'
  }
}
