'use strict';

require('./list.scss');
const angular = require('angular');
const noteApp = angular.module('noteApp');
noteApp.directive('appList', function() {
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

noteApp.controller('ListController', ['$q', '$log', 'listService', 'noteService', ListController]);

function ListController($log, listService, noteService) {
  this.deleteList = function() {
    $log.debug('listCtrl.deleteList');
    listService.deleteList(this.list._id)
    .catch(() => alert('We could not delete the list'));
  };

  this.createNote = function(data) {
    $log.debug('listCtrl.createNote');
    data.listId = this.list._id;
    noteService.createNote(data)
    .then(note => {
      this.list.notes.push(note);
    })
    .catch(() => alert('The note was note craeted'));
  };

  this.deleteNote = function(noteId) {
    $log.debug('listCtrl.deleteNote');
    noteService.deleteNote(noteId)
    .then(() => {
      this.list.notes.forEach((note, idx) => {
        if (note._id === noteId) this.list.notes.splice(idx, 1);
      });
    })
    .catch(() => alert('could not delete'));
  };
}
