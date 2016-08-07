'use strict';
require('./app-display-list.scss');

const angular = require('angular');

angular.module('noteList').directive('appDisplayList', function(){
  return {
    restrict: 'E',
    replace: true,
    controller: ['$log', 'listService', DisplayListController],
    controllerAs: 'displayListCtrl',
    bindToController: true,
    template: require('./app-display-list.html'),
    scope: {
      list: '='
    }
  };
});

function DisplayListController($log, listService){
  this.deleteList = function(){
    $log.debug('deleteList function in DisplayListController');
    listService.deleteList(this.list._id)
    .catch(() => {
      alert('failed to delete list');
    });
  };

  // this.createNote = function(data){
  //   $log.debug('createNote function in DisplayListController');
  //   listService.createNote(data)
  //   .then()
  //   .catch();
  // };

}
