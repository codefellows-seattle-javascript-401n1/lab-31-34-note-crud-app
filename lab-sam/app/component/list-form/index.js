'use strict';

// require('./create-list.scss');
const angular = require('angular');

angular.module('listApp').directive('appListForm', function(){
  return {
    restrict: 'E',
    replace: true,
    template: require('./list-form.html'),
    controller: ['$log', 'listService', ListFormController],
    controllerAs: 'listFormCtrl',
    bindToController: true,
    scope: {},
  }
})

function ListFormController($log, listService){
  this.list = {};

  this.createList = function(){
    $log.debug('listFormCtrl.createList');
    $log.log('this.list', this.list);
    listService.createList(this.list)
    .then( () => {
      this.list = {};
    }).catch( () => {
      this.list = {};
      alert('NOT ALLOWED!');
    });
  }
}
