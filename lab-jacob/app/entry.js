'use strict';

require('!!file?name=[name].[ext]!./html/index.html');
require('./scss/base.scss');

const angular = require('angular');

angular.module('noteList', []);

//services
require('./service/list-service.js');

//components
require('./component/main');
require('./component/create-list-form');
require('./component/display-list');
