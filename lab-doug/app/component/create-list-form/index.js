'use strict';
require('./create-list-form.scss');
const angular = require('angular');
angular.module('listApp').directive('createListForm', function(){
  return {
    restrict: 'E',
    replace: true,
    template: require('./create-list-form.html'),
    controller: ['$log', 'listService', CreateListFormController],
    controllerAs: 'createListFormCtrl',
    bindToController: true,
    scope: {}
  };
});

function CreateListFormController($log, listService){
  $log.debug('entered CreateListFormController');
  this.createList = function(){
    $log.debug('entered createListFormCtrl.createList');
    listService.createList(this.list)
    .then()
    .catch();
  };

}
