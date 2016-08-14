'use strict';

require('./list.scss');
const angular = require('angular');
const noteApp = angular.module('noteApp');

noteApp.directive('appList', function(){
  return {
    restrict: 'E',
    replace: true,
    template: require('./list.html'),
    controller: 'ListController',
    controllerAs: 'listCtrl',
    bindToController: true,
    scope: {
      list: '=',
    },
  };
});

noteApp.controller('ListController', ['$q', '$log', 'listService', 'noteService', ListController]);

function ListController($q, $log, listService, noteService){
  this.deleteList = function(){
    $log.debug('listCtrl.deleteList');
    listService.deleteList(this.list._id)
    .catch(() => {
      alert('missed out on that one');
    });
  };

  this.createNote = function(data){
    $log.debug('listCtrl.createNote');
    return $q((resolve, reject) => {
      data.listId = this.list._id;


      noteService.createNote(data)
      .then( note => {
        this.list.notes.push(note);
        resolve(note);

      })
    .catch( (err) => {
      alert('still not working');
      reject(err);
    });
    });
  };

  this.deleteNote = function(noteId){
    $log.debug('listCtrl.deleteNote');
    noteService.deleteNote(noteId)
    .then( () => {
      this.list.notes.forEach( (note, index) => {
        if (note._id === noteId) this.list.notes.splice(index, 1);
      });
    })
    .catch(() => {
      alert('missed that one two');
    });
  };

}
