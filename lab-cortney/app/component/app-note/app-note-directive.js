'use strict';

const angular = require('angular');
angular.module('noteApp').directive('appNote', function() {
  return {
    restrict: 'E',
    replace: true,
    template: require('./app-note.html'),
    controller: ['$log', 'noteService', AppNoteController],
    controllerAs: 'appNoteCtrl',
    bindToController: true,
    scope: {
      note: '=',
      deleteNote: '&'
    }
  };
});

function AppNoteController($log, noteService) {

  // this.note = {};
  //
  // this.deleteNote = function() {
  //   $log.debug('AppNoteController.deleteNote');
  //
  // }
}
