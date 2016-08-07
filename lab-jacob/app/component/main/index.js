'use strict';
require('./app-main.scss');

const angular = require('angular');

angular.module('noteList').directive('appMain', function(){
  return {
    restrict: 'E',
    replace: true,
    controller: ['listService', AppMainController],
    controllerAs: 'appMainCtrl',
    bindToController: true,
    template: require('./app-main.html'),
    scope: {}
  };
});

function AppMainController(listService){
  listService.fetchLists()
  .then((lists) => {
    this.lists = lists;
  })
  .catch((err) => {
    alert(err.status);
  });
}
