angular
  .module('calculist2')
  .controller('listController', list)

function list ($scope, dataService) {
  $scope.dataService = dataService

// Move card ('up' or 'down')
  $scope.moveCard = function (direction) {
    var cardID = this.card.id
    var arrayLoc = findArrayLocation(cardID)
    // if up swap current card with one above
    // else if down swap current card with one below
    var swapHolder = ''
    if (direction === 'up') {
      console.log('Up, Up, Up!')
      swapHolder = dataService.cards[arrayLoc - 1]
      dataService.cards[arrayLoc - 1] = dataService.cards[arrayLoc]
      dataService.cards[arrayLoc] = swapHolder
    } else if (direction === 'down') {
      console.log('Down, Down, Down!')
      swapHolder = dataService.cards[arrayLoc + 1]
      dataService.cards[arrayLoc + 1] = dataService.cards[arrayLoc]
      dataService.cards[arrayLoc] = swapHolder
    } else {
      console.log('No direction found')
    }
  }
  // Delete Card
  $scope.delCard = function () {
    var cardID = this.card.id
    var arrayLoc = findArrayLocation(cardID)
    dataService.cards.splice(arrayLoc, 1)
    console.log('See Ya!')
  }

  function findArrayLocation (id) {
    for (var i = 0; i < dataService.cards.length; i++) {
      if (dataService.cards[i].id === id) {
        return i
      }
    }
  }



}
