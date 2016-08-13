'use strict';

const angular = require('angular');
angular.module('noteApp').directive('appNote', function() {
  return {
    restrict: 'E',
    replace: true,
    template: require('./app-note.html'),
    scope: {}
  };
});
