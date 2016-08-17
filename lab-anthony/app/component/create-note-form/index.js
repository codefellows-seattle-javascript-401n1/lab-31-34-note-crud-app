'use strict';

const angular = require('angular');
const noteApp = angular.module('noteApp');

noteApp.directive('appCreateNoteForm', function(){
  return {
    restrict: 'E',
    replace: true,
    template: require('./create-note-form.html'),
    controller: 'CreateNoteFormController',
    controllerAs: 'createNoteFormCtrl',
    bindToController: true,
    scope: {
      list: '='
    }
  };
});

noteApp.controller('CreateNoteFormController', ['$log', 'noteService', CreateNoteFormController]);

function CreateNoteFormController($log, noteService){
  this.note = {};
  this.createNote = function(){
    this.note.listId = this.list._id;
    noteService.createNote(this.note)
    .then((note) => {
      this.list.notes.push(note);
      this.note = {};
    })
    .catch((err) => {
      console.error(err);
    });
  };

}
