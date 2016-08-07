'use strict';
require('./app-create-list-form.scss');

const angular = require('angular');

angular.module('noteList').directive('appCreateListForm', function(){
  return {
    restrict: 'E',
    replace: true,
    controller: ['$log', 'listService', CreateListFormController],
    controllerAs: 'createListFormCtrl',
    bindToController: true,
    template: require('./app-create-list-form.html'),
    scope: {}
  };
});

function CreateListFormController($log, listService){
  this.list = [];

  this.createList = function(){
    $log.debug('createList function in createList controller');
    listService.createList(this.list)
    .then( () => {
      this.list = {};
    }).catch( () => {
      this.list = {};
      alert('failure in createListController');
    });
  };
}
