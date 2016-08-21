'use strict';

require('./list.scss');

const angular = require('angular');
const demoApp = angular.module('demoApp');

demoApp.directive('appList', function(){
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

demoApp.controller('ListController', ['$q', '$log', 'listService', 'noteService', ListController]);

function ListController($q, $log, listService, noteService){
  this.deleteList = function(){
    console.log(this.list);
    $log.debug('listCtrl.deleteList');
    listService.deleteList(this.list._id).catch(() => {
      alert('Somehow you did not delete me.  I must be superman');
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
        alert('Could not create note.  Make sure all fields are filled');
        reject(err);
      });
    });
  };

  this.deleteNote = function(noteId) {
    $log.debug('listCtrl.deleteNote');
    return $q((resolve, reject) => {
      noteService.deleteNote(noteId)
      .then(() => {
        this.list.notes.forEach((note, idx) => {
          if (note._id === noteId) this.list.notes.splice(idx, 1);
        });
        resolve();
      })
      .catch(() => {
        alert('could not delete');
        reject();
      });
    });
  };
}
