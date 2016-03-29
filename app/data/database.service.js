'use strict'
/* globals angular */

angular
  .module('calculist2')
  .service('dataService', dataObject)

function dataObject () {
  this.cards = [
    {
      'id': '00',
      'title': 'Card title...',
      'equation': '34 + 10 =',
      'solution': '44'
    },
    {
      'id': '01',
      'title': 'Card title...',
      'equation': '55 / 11 =',
      'solution': '5'
    },
    {
      'id': '02',
      'title': 'Card title...',
      'equation': '78 * 23 =',
      'solution': '1794'
    }
  ]
}
