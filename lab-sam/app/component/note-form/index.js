'use strict';

require('./note-form.scss');
const angular = require('angular');
angular.module('listApp').directive('appNoteForm', function(){
  return {
    restrict: 'E',
    replace: true,
    template: require('./note-form.html'),
    scope: {
      createNote: '&',
    },
  }
});
