'use strict';

// require('./note-li.scss');
const angular = require('angular')
angular.module('listApp').directive('appNoteItem', function(){
  return {
    restrict: 'E',
    replace: true,
    template: require('./note-item.html'),
    controller: ['$log', 'noteService', NoteItemController],
    controllerAs: 'noteItemCtrl',
    bindToController: true,
    scope: {
      note: '=',
      deleteNote: '&',
    }
  }
});

function NoteItemController(){
}
