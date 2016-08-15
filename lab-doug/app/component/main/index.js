'use strict';
require('./main.scss');

const angular = require('angular');

angular.module('listApp').directive('appMain', function(){
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

/**
 * MainController - populates the user page with lists
 *
 * @param  {angular service} listService is a globally available service used for list CRUD
 * @return {array of lists}             updates the main template with updated lists when changes are made in the lists
 */
function MainController(listService){
  this.lists = listService.lists;
  listService.fetchLists();
}
