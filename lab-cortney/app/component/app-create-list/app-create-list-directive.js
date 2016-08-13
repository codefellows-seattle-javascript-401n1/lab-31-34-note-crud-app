'use strict';

const angular = require('angular');
angular.module('noteApp').directive('appCreateList', function() {
  return {
    restrict: 'E',
    replace: true,
    template: require('./app-create-list.html'),
    scope: {}
  };
});
