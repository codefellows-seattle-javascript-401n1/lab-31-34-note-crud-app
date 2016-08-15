'use strict';

require('./app-create-note-form.scss');

const angular = require('angular');
const app = angular.module('noteList');

app.directive('appCreateNoteForm', function(){
  return {
    restrict: 'E',
    replace: true,
    scope: {
      createNote: '&'
    },
    template: require('./app-create-note-form.html')
  };
});
