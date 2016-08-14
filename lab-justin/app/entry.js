'use strict';

require('!!!file?name=[name].[ext]!./html/index.html');
require('./scss/base.scss');

const angular = require('angular');
angular.module('galleryApp', []);

require('./service/list-service');
require('./service/note-service');
require('./component/main');
require('./component/create-list-form');
require('./component/list');
require('./component/create-note-form');
require('./component/note-li');
