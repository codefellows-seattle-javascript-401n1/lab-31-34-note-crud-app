'use strict';

require('!!file?name=[name].[ext]!./html/index.html');
require('./scss/base.scss');

const angular = require('angular');

angular.module('noteList', []);

//services

//components
require('./component/main');
