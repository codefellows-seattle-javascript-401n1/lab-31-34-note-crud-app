'use strict';
require('./main.scss');

const angular = require('angular');

angular.module('noteApp').directive('appMain', function(){
  return {
    restrict: 'E',
    replace: true,
    template: require('./main.html'),
    controller: ['listService', MainController],
    controllerAs: 'mainCtrl',
    bindToController: true,
    scope: {}
  };
});

function MainController(listService){
  listService.createList({name: 'repairs'})
    .then(list => this.list = list)
    .catch(console.error);
}
