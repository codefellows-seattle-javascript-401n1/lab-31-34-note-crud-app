'use strict';

require('./list.scss');
const angular = require('angular');
const noteApp = angular.module('noteApp');

noteApp.directive('appList', function(){
  return {
    restrict: 'E',
    replace: true,
    template: require('./list.html'),
    controller: 'ListController',
    controllerAs: 'listCtrl',
    bindToController: true,
    scope: {
      list: '='
    }
  };
});

noteApp.controller('ListController', ['$log', 'listService', ListController]);

function ListController($log, listService){
  this.hello = function(){
    console.log('Hello world!');
  };
}
