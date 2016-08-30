'use strict';

require('./list.scss');
const angular = require('angular');
const galleryApp = angular.module('galleryApp');

galleryApp
.directive('appList', function(){
  return {
    restrict: 'E',
    // replace: true,
    template: require('./list.html'),
    controller: 'ListController',
    controllerAs: 'listCtrl',
    bindToController: true,
    scope: {
      list: '='
    }
  };
})
.controller('ListController', ['$q', '$log', 'listService', 'noteService', ListController]);

function ListController($q, $log, listService, noteService){

  this.deleteList = function(){
    $log.debug('listCtrl.deleteList');
    return listService.deleteList(this.list._id)
    .catch(() => {
      alert('listCtrl.deleteList: failed to delete list');
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
        alert('listCtrl.createNote: failed to create');
        reject(err);
      });
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
        reject ('listCtrl.deleteNote: failed to delete note');
        alert('listCtrl.deleteNote: failed to delete note');

      });
    });
  };

}
