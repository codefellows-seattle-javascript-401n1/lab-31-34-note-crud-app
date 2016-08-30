'use strict';

require('!!!file?name=[name].[ext]!./html/index.html');
require('./scss/base.scss');

const angular = require('angular');
angular.module('galleryApp', [])
.config(['$httpProvider', '$logProvider', function($httpProvider, $logProvider){
  $logProvider.debugEnabled(__DEBUG__);
  $httpProvider.defaults.headers.post = {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  };
}]);

require('./service/list-service');
require('./service/note-service');
require('./component/main');
require('./component/create-list-form');
require('./component/list');
require('./component/create-note-form');
require('./component/note-li');
