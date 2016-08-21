'use strict';

const angular = require('angular');

angular.module('noteApp').controller('AppCreateListController', ['$log', 'listService', AppCreateListController])
.directive('appCreateList', function() {
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
    return listService.createList(this.list)
    .then(() => {
      this.list = {}; // clears create-list form after posting list to page
    })
    .catch(() => {
      $log.error('createListForm didn\'t happen');
    });
  };
}
