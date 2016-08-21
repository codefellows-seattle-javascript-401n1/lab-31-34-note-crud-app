'use strict';

require('./list.scss');
const angular = require('angular');
angular.module('demoApp')
.controller('ListController', ['$q', '$log', 'listService', 'noteService', ListController
])
.directive('appList', function(){
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

function ListController($q, $log, listService, noteService){
  this.deleteList = function(){
    $log.debug('listCtrl.deleteList');
    listService.deleteList(this.list._id)
    .catch(() => {
      alert('deletion sucks');
    });
  };

  this.createNote = function(data){
    $log.debug('listCtrl.createNote');
    data.listId = this.list._id;

    return noteService.createNote(data)
    .then( note => {
      this.list.notes.push(note);
      return note;
    })
    .catch( () => {
      alert('NoNo');
    });
  };

  this.deleteNote = function(noteId){
    $log.debug('listCtrl.deleteNote');
    return $q((resolve, reject) => {
      return noteService.deleteNote(noteId)
      .then( (note) => {
        this.list.notes.forEach( (note, index) => {
          if (note._id === noteId) this.list.notes.splice(index, 1);
        });
        resolve(note);
      })
      .catch(() => {
        reject('rejected this stuff');
        alert('NADA');
      });
    });
  };

}
