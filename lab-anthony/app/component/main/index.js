'use strict';
require('./main.scss');

const angular = require('angular');

angular.module('noteApp').directive('appMain', function(){
  return {
    restrict: 'E',
    replace: true,
    template: require('./main.html'),
    controller: ['$log', 'listService', MainController],
    controllerAs: 'mainCtrl',
    bindToController: true,
    scope: {}
  };
});

function MainController($log, listService){
  this.apiURL = __API_URL__;

  listService.getLists()
    .then((lists) => {
      this.lists = listService.lists;
    })
    .catch((err) => $log.error(err));
}
