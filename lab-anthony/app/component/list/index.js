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

noteApp.controller('ListController', ['$log', 'listService', 'noteService', ListController]);

function ListController($log, listService, noteService){
  this.deleteList = function(noteId){
    $log.debug('listCtrl.deleteList');
    listService.deleteList(noteId)
    .then(() => {})
    .catch((err) => {
      $log.error(err);
    });
  };

  this.deleteNote = function(noteId){
    $log.debug('listCtrl.deleteNote');
    noteService.deleteNote(noteId)
    .then((note) => {
      this.list.notes.forEach((note, index) => {
        if (note._id === noteId) {
          this.list.notes.splice(index, 1);
        }
      });
    })
    .catch((err) => {
      $log.error(err);
    });
  };

}
