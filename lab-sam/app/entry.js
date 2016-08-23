'use strict';

// webpack assets
require('!!file?name=[name].[ext]!./html/index.html');
require('./scss/base.scss');

// npm modules
const angular = require('angular');

// angular modules
angular.module('listApp', []);

// angular services
require('./service/list-service');
require('./service/note-service');


// angular components
require('./component/main');
require('./component/list');
require('./component/list-form');
require('./component/note-form');
require('./component/note-item');
