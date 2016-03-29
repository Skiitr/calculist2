'use strict'
/* globals angular */

angular
  .module('calculist2')
  .controller('listController', list)

function list ($scope, dataService) {
  $scope.dataService = dataService

  $scope.cardUp = function () {
    console.log('Card Up')
  }

  $scope.cardDown = function () {
    console.log('Card Down')
  }

  $scope.cardDel = function () {
    console.log('Card Delete')
  }
}
