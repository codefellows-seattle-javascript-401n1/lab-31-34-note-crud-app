'use strict';

require('!!file?name=[name].[ext]!./html/index.html');
require('./scss/base.scss');

const angular = require('angular');
angular.module('noteApp', []);

require('./service/list-service');
require('./service/note-service');

require('./component/main');
require('./component/list');
require('./component/note-li');
require('./component/create-list-form');
require('./component/create-note-form');
