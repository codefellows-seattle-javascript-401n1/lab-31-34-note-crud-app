'use strict';

require('./note-item.scss');

const angular = require('angular');
const widgetApp = angular.module('widgetApp');
widgetApp.directive('appNoteItem', function(){
  return {
    restrict: 'E',
    replace: true,
    template: require('./note-item.html'),
    controller: 'NoteItemController',
    controllerAs: 'noteItemCtrl',
    bindToController: true,
    scope: {
      note: '=',
      deleteNote: '&'
    }
  };
});

widgetApp.controller('NoteItemController',['$log', 'noteService', NoteItemController] );

function NoteItemController(){

}
