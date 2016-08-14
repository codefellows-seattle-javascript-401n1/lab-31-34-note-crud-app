'use strict';

const angular = require('angular');

angular.module('noteApp').directive('appMain', function() {
  return {
    restrict: 'E',
    replace: true,
    template: require('./app-main.html'),
    controller: ['listService', MainController],
    controllerAs: 'mainCtrl',
    bindToController: true,
    scope: {}
  };
});

function MainController(listService) {
  listService.fetchLists()
  .then((lists) => {
    this.lists = lists;
  })
  .catch((err) => {
    alert('oh dear', err.message);
  });
}
