'use strict';

const angular = require('angular');

angular.module('noteApp').directive('appList', function() {
  return {
    restrict: 'E',
    replace: true,
    template: require('./app-list.html'),
    controller: ['$log', 'listService', 'noteService', AppListController],
    controllerAs: 'appListCtrl',
    bindToController: true,
    scope: {
      list: '='
    }
  };
});

function AppListController($log, listService, noteService) {

  this.deleteList = function() {
    $log.debug('appListController.deleteList');
    listService.deleteList(this.list._id)
    .then(() => {
      $log.log('hooray list deletion worked');
    })
    .catch(() => {
      alert('list deletion didn\'t work for some reason');
    });
  };

  this.createNote = function(data) {
    $log.debug('appListCtrl.createNote');
    data.listId = this.list._id;

    noteService.createNote(data)
    .then((note) => {
      this.list.notes.push(note);
    })
    .catch(() => {
      alert('couldn\'t create a note?!?');
    });
  };

  this.deleteNote = function(noteId) {
    $log.debug('appListCtrl.deleteNote');
    noteService.deleteNote(noteId)
    .then(() => {
      this.list.notes.forEach((note, index) => {
        if (note._id === noteId) {
          this.list.notes.splice(index, 1);
        }
      })
      .catch(() => {
        alert('well that didn\'t delete');
      });
    });
  };
}
