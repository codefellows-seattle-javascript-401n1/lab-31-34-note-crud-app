'use strict';

const angular = require('angular');
angular.module('noteApp').directive('appCreateNote', function() {
  return {
    restrict: 'E',
    replace: true,
    template: require('./app-create-note.html'),
    scope: {}
  };
});
