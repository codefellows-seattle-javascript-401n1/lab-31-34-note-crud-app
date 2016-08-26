'use strict';
require('./create-list-form.scss');
const angular = require('angular');
const widgetApp = angular.module('widgetApp');

widgetApp.directive('createListForm', function(){
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


widgetApp.controller('CreateListFormController', ['$log', 'listService', CreateListFormController]);

function CreateListFormController($log, listService){

  $log.debug('entered CreateListFormController');
  this.list = {};
  this.createList = function(){
    $log.debug('entered createListFormCtrl.createList');
    listService.createList(this.list)
    .then(() => {
      this.list = {};
    })
    .catch(() => {
      this.list = {};
    });
  };

}
