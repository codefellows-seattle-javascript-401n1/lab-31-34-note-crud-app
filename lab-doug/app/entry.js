'use strict';

// webpack assets
require('!!file?name=[name].[ext]!./html/index.html');
require('./scss/base.scss');

// npm modules
const angular = require('angular');

// angular modules
angular.module('widgetApp', [])
.config(['$logProvider', function($logProvider){
  $logProvider.debugEnabled(__DEBUG__);
}]);
//a provider is used to configure services in our app
//the value of DEBUG is a boolean set in webpack.config file
//it's value is true if we are not in production

// angular services
require('./service/list-service');
require('./service/note-service');
// angular components
require('./component/main');
require('./component/create-list-form');
require('./component/list');
require('./component/create-note-form');
require('./component/note-item');
