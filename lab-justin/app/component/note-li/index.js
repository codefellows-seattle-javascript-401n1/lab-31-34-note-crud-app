'use strict';

require('./note-li.scss');
const angular = require('angular');
angular.module('galleryApp').directive('appNoteLi', function(){
  return {
    restrict: 'E',
    replace: true,
    template: require('./note-li.html'),
    controller: ['$log', 'noteService', NoteLiController],
    controllerAs: 'noteLiCtrl',
    bindToController: true,
    scope: {
      note: '=',
      deleteNote: '&'
    }
  };
});

function NoteLiController(){

}
// function NoteLiController($log, noteService){
//   this.createNote = function(data){
//     $log.debug('noteLiCtrl.createNote')
//   };
//
//   this.deleteNote = function(noteId){
//     $log.debug('NoteLiController');
//     $log.log('noteId', this.list);
//     noteService.deleteNote(noteId)
//     .then( ()=> {
//       this.note.forEach( (note, index)=> {
//         if(note._id ===noteId) return this.list.notes.splice(index, 1);
//       });
//     })
//     .catch( ()=> {
//       alert('NoteLiController.deleteNote: failed to delete note');
//     });
//   };
// }
