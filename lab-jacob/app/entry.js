'use strict';

require('!!file?name=[name].[ext]!./html/index.html');
require('./scss/base.scss');

const angular = require('angular');

angular.module('noteList', []);

//services
require('./service/list-service.js');
require('./service/note-service.js');

//components
require('./component/main');
require('./component/create-list-form');
require('./component/display-list');
require('./component/create-note-form');
require('./component/display-note');
