'use strict';

require('./list.scss');
const angular = require('angular');
const widgetApp = angular.module('widgetApp');
widgetApp.directive('appList', function(){
  return {
    restrict: 'E',
    replace: true,
    template: require('./list.html'),
    controller: ['$log', 'listService', ListController],
    controllerAs: 'listCtrl',
    bindToController: true,
    scope: {
      list: '='
    }
  };
});

function ListController($log, listService){
  $log.debug('entered ListController() in list/index.js');
  this.deleteList = function(){
    $log.debug('entered deleteList() in listController() in list/index.js');
    listService.deleteList(this.list._id)
    .catch((err) => {
      console.log('ListController deleteList() in list/index.js threw error: ', err);
    });
  };
}
