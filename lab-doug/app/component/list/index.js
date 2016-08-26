'use strict';

require('./list.scss');
const angular = require('angular');
const widgetApp = angular.module('widgetApp');
widgetApp.directive('appList', function(){
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

/**
 *registering the controller, directly on the module below, allows for testing the controller directly.   If we had registered on the directive "controller" property above, we would have to go through the directve first when testing.
 */
widgetApp.controller('ListController', ['$log', 'listService', 'noteService', ListController]);

function ListController($log, listService, noteService){
  $log.debug('entered ListController() in list/index.js');

  this.deleteList = function(){
    $log.debug('entered deleteList() in listController() in list/index.js');
    return listService.deleteList(this.list._id)
    .catch((err) => {
      console.log('ListController deleteList() in list/index.js threw error: ', err);
    });
  };

  this.createNote = function(data){
    $log.debug('entered createNote() in listController() in list/index.js');
    data.listId = this.list._id;
    return noteService.createNote(data)
    .then ((res) => {
      $log.log('createNote() in list/index.js succeeded');
      this.list.notes.push(res);
      return res;
    })
    .catch((err) => {
      $log.error('createNote() in list/index.js failed', err);
    });
  };

  this.deleteNote = function(noteId){
    $log.debug('entered deleteNote() in listController() in list/index.js');
    return noteService.deleteNote(noteId)
    .then((note) => {
      $log.log('deleteNote() in list/index.js succeeded');
      this.list.notes.forEach((note, index) => {
        if(note._id === noteId) this.list.notes.splice(index, 1);
      });
      return note;
    })
    .catch((err) => {
      $log.error('deleteNote() in list/index.js failed', err);
    });
  };

}
