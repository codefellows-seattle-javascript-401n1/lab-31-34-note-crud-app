'use strict';
require('./app-display-list.scss');

const angular = require('angular');
const app = angular.module('noteList');

app.directive('appDisplayList', function(){
  return {
    restrict: 'E',
    replace: true,
    controller: 'DisplayListController',
    controllerAs: 'displayListCtrl',
    bindToController: true,
    template: require('./app-display-list.html'),
    scope: {
      list: '='
    }
  };
});

app.controller('DisplayListController', ['$q', '$log', 'listService', 'noteService', DisplayListController]);

function DisplayListController($q, $log, listService, noteService){
  this.deleteList = function(){
    $log.debug('deleteList function in DisplayListController');
    listService.deleteList(this.list._id)
    .catch(() => {
      alert('failed to delete list');
    });
  };

  this.createNote = function(data){
    $log.debug('createNote function in displayListController');
    return $q((resolve, reject) => {
      data.listId = this.list._id;
      noteService.createNote(data)
      .then(note => {
        this.list.notes.push(note);
        resolve(note);
      }).catch(err => {
        $log.error(err);
        alert('somethings wrong in createNote');
        reject(err);
      });
    });
  };

  this.deleteNote = function(noteId){
    $log.debug('deleteNote function in displayListController');
    noteService.deleteNote(noteId)
    .then(() => {
      this.list.notes.forEach( (note, index) => {
        if(note._id === noteId) {
          this.list.notes.splice(index, 1);
        }
      });
    }).catch((err) => {
      $log.error(err);
      alert('something wrong in deleteNote');
    });
  };
}
