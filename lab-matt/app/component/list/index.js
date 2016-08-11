'use strict';

require('./list.scss');

const angular = require('angular');
angular.module('demoApp').directive('appList', function() {
  return {
    restrict: 'E',
    replace: true,
    template: require('./list.html'),
    controller: ['$log', 'listService', 'noteService', ListController],
    controllerAs: 'listCtrl',
    bindToController: true,
    scope: {
      list: '='
    }
  };
});

function ListController($log, listService, noteService){
  this.deleteList = function(){
    console.log(this.list);
    $log.debug('listCtrl.deleteList');
    listService.deleteList(this.list._id).catch(() => {
      alert('Somehow you did not delete me.  I must be superman');
    });
  };

  this.createNote = function(data) {
    $log.debug('listCtrl.createNote');
    data.listId = this.list._id;
    noteService.createNote(data)
    .then(note => {
      this.list.notes.push(note);
    })
    .catch(()=> {
      alert('Could not create a new note');
    });
  };

  this.deleteNote = function(noteId){
    $log.debug('listCtrl.deleteNote');
    noteService.deleteNote(noteId)
    .then( () => {
      this.list.notes.forEach((note, index) => {
        if(note._id === noteId) this.list.notes.splice(index, 1);
      });
    })
    .catch(() => {
      ('Bip, Boop, I did not work');
    });
  };
}
