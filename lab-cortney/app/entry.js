'use strict';

require('!!file?name=[name].[ext]!./html/index.html');
require('./scss/base.scss');

const angular = require('angular');

angular.module('noteApp', []);

require('./component/app-main');
require('./component/app-note');
require('./component/app-list');
require('./component/app-create-note');
require('./component/app-create-list');
