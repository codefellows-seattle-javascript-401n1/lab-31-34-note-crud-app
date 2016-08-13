'use strict';

const angular = require('angular');
angular.module('noteApp').directive('appList', function() {
  return {
    restrict: 'E',
    replace: true,
    template: require('./app-list.html'),
    scope: {}
  };
});
