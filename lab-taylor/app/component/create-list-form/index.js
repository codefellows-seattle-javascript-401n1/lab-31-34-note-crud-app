'use strict';

require('./create-list-form.scss');

const angular = require('angular');

angular.module('noteApp').directive('appCreateListForm', function() {
  return {
    restrict: 'E',
    replace: true,
    template: require('./create-list-form.html'),
    controller: ['$log', 'listService', CreateListFormController],
    controllerAs: 'createListFormCtrl',
    scope: {}
  };
});

function CreateListFormController($log, listService) {
  this.createList = function() {
    $log.debug('createListFormCtrl.createList');
    listService.createList(this.list)
    .then()
    .catch();
  };
}
