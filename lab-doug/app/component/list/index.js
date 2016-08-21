'use strict';

require('./list.scss');
const angular = require('angular');
const widgetApp = angular.module('widgetApp');
widgetApp.directive('appList', function(){
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
  $log.debug('entered ListController() in list/index.js');

  this.deleteList = function(){
    $log.debug('entered deleteList() in listController() in list/index.js');
    listService.deleteList(this.list._id)
    .catch((err) => {
      console.log('ListController deleteList() in list/index.js threw error: ', err);
    });
  };

  this.createNote = function(data){
    $log.debug('entered createNote() in listController() in list/index.js');
    data.listId = this.list._id;
    noteService.createNote(data)
    .then ((res) => {
      $log.log('createNote() in list/index.js succeeded');
      this.list.notes.push(res);
    })
    .catch((err) => {
      $log.error('createNote() in list/index.js failed', err);
    });
  };
}
