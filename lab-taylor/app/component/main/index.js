'use strict';
require('./app-main.scss');

const angular = require('angular');
angular.module('noteApp').directive('appMain', function() {
  return {
    restrict: 'E',
    replace: true,
    template: require('./app-main.html'),
    controller: ['listService', MainController],
    controllerAs: 'mainCtrl',
    bindtoController: true,
    scope: {}
  };
});

function MainController(listService) {
  listService.fetchLists()
  .then(lists => {
    this.lists = lists;
  });
}
