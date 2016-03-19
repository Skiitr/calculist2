'use strict'
angular
  .module('calculist2')
  .controller('databaseController', database)

function database ($scope, $firebaseObject) {
  var ref = new Firebase('https://intense-heat-7100.firebaseio.com/')

  // download the data into a local object
  $scope.data = $firebaseObject(ref)
}
