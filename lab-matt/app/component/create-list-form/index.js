'use strict';

require('./create-list-form.scss');
const angular = require('angular');

angular.module('demoApp').directive('appCreateListForm', function() {
  return {
    restrict: 'E',
    replace: true,
    template: require('./create-list-form.html'),
    controller: ['$log', 'listService', CreateListFormController],
    controllerAs: 'createListFormCtrl',
    bindToController: true,
    scope:{}
  };
});

function CreateListFormController($log, listService){
  this.lists = {};

  this.createList = function(){
    $log.debug('createListFormCtrl.createList');
    $log.log('this.list', this.list);
    listService.createList(this.list).then(()=> {
      this.list = {};
    }).catch(() => {
      this.list = {};
      alert('I aint even gunna try dat');
    });
  };
}
