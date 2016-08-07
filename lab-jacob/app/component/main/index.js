'use strict';
require('./app-main.scss');

const angular = require('angular');

angular.module('noteList').directive('appMain', function(){
  return {
    restrict: 'E',
    replace: true,
    controller: AppMainController,
    controllerAs: 'appMainCtrl',
    bindToController: true,
    template: require('./app-main.html'),
    scope: {}
  };
});

function AppMainController(){

}
