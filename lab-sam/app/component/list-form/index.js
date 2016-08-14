'use strict';

// require('./create-list.scss');
const angular = require('angular');

angular module('listApp').directive('appCreateList', function(){
  return {
    restrict: 'E',
    replace: true,
    template: require('./list-form.html'),
    controller: ['$log', 'listService', CreateListController],
    controllerAs: 'createListCtrl',
    bindToController: true,
    scope: {},
  }
})

function CreateListController($log, listService){
  this.list = {};

  this.createList = function(){
    $log.debug('createListCtrl.createList');
    $log.log('this.list', this.list);
    listService.createList(this.list)
      .then().catch();
  }
}
