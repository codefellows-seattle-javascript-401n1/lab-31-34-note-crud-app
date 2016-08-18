'use strict';

require('./note.scss');
const angular = require('angular');
const noteApp = angular.module('noteApp');

noteApp.directive('appNote', function(){
  return {
    restrict: 'E',
    replace: true,
    template: require('./note.html'),
    controller: 'NoteController',
    controllerAs: 'noteCtrl',
    bindToController: true,
    scope: {
      note: '=',
      deleteNote: '&'
    }
  };
});

noteApp.controller('NoteController', ['$log', 'listService', 'noteService', NoteController]);

function NoteController($log, listService, noteService){
  console.log('Hello world');
  ///// TODO: ALL ACTIONS /////
}
