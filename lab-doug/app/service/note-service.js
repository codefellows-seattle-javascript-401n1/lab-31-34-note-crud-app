'use strict';

const angular = require('angular');
const widgetApp = angular.module('widgetApp');
widgetApp.factory(['$log', '$q', '$http', noteService]);

function noteService($log, $q, $http){
  let service = {};
  let url = `${__API_URL__}/api/note`;
  let config = {
    headers: {
      'Content-Type': 'application/json',
      Accpet: 'application/json'
    }
  };
  service.createNote = function(data) {
    $log.debug('entered createNote() in note-service.js');
    return $q((resolve, reject) => {
      $http.post(url, data, config)
      .then((res) => {
        $log.log('post of new note is successful');
        resolve(res.data);
      })
      .catch((err) => {
        $log.log('post of new note failed');
        reject(err);
      });
    });
  };
  return service;
}
