'use strict';
require('./create-note-form.scss');

const angular = require('angular');
const widgetApp = angular.module('widgetApp');

widgetApp.directive('appCreateNoteForm', function(){
  return {
    restrict: 'E',
    replace: true,
    template: require('./create-note-form.html'),
    scope: {
      createNote: '&'
    }
  };
});
