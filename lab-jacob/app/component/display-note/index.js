'use strict';

require('./app-display-note.scss');

const angular = require('angular');
const app = angular.module('noteList');

app.directive('appDisplayNote', function() {
  return {
    restrict: 'E',
    replace: true,
    controller: ['$log', 'noteService', displayNoteController],
    controllerAs: 'displayNoteCtrl',
    bindToController: true,
    template: require('./app-display-note.html'),
    scope: {
      note: '=',
      deleteNote: '&'
    }
  };
});

function displayNoteController(){}
