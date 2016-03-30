'use strict'
/* globals angular */

angular
  .module('calculist2')
  .service('dataService', dataObject)

function dataObject () {
  this.cards = [
    {
      'id': '999',
      'title': 'Sample Card',
      'equation': '34 + 10 =',
      'solution': '44'
    }
  ]
}
