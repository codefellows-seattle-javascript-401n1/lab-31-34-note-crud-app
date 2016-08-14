'use strict';

const angular = require('angular');

angular.module('noteApp').directive('appCreateList', function() {
  return {
    restrict: 'E',
    replace: true,
    template: require('./app-create-list.html'),
    controller: ['$log', 'listService', AppCreateListController],
    controllerAs: 'appCreateListCtrl',
    bindToController: true,
    scope: {}
  };
});

function AppCreateListController($log, listService) {
  this.list = {};

  this.createList = function() {
    $log.debug('appCreateListCtrl.createList');
    listService.createList(this.list)
    .then(() => {
      this.list = {};
    })
    .catch(() => {
      $log.error('createListForm didn\'t happen');
    });
  };
}
