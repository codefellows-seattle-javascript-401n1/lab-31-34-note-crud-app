'use strict';

// require('./create-list-form.scss');
const angular = require('angular');
const noteApp = angular.module('noteApp');

noteApp.directive('appCreateListForm', function(){
  return {
    restrict: 'E',
    replace: true,
    template: require('./create-list-form.html'),
    controller: 'CreateListFormController',
    controllerAs: 'createListFormCtrl',
    bindToController: true,
    scope: {}
  };
});

noteApp.controller('CreateListFormController', ['$log', 'listService', CreateListFormController]);

function CreateListFormController($log, listService){
  this.list = {};

  this.createList = function(){
    $log.debug('createListFormCtrl.createList');
    listService.createList(this.list)
    .then((list) => {
      this.list = {};
      this.err = null;
    })
    .catch((err) => {
      $log.error(err);
    });
  };
}
