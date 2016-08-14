'use strict';

const angular = require('angular');
angular.module('noteApp')
.factory('noteService', ['$log', '$q', '$http', noteService]);

function noteService($log, $q, $http) {
  // create service
  let service = {};
  // set private constants
  let url = `${__API_URL__}/api/note`;
  let config = {
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    }
  };

  // add properties and methods to service
  service.createNote = function(data) {
    $log.log('data passing thru', data);
    $log.debug('noteService.createNote');
    return $q((resolve, reject) => {
      $http.post(url, data, config)
      .then( res => {
        $log.log(`POST ${res.url}::${res.status} succeeded hurrah`);
        resolve(res.data);
      })
      .catch(err => {
        $log.log(`POST ${err.url}::${err.status} failed :<`);
        $log.error(err);
        reject(err);
      });
    });
  };

  service.deleteNote = function(noteId) {
    $log.debug('noteService.deleteNote');
    $http.delete(`${url}/${noteId}`, config)
    .then(res => {
      $log.log(`DELETE ${res.url}::${res.status} succeeded`);
      resolve(res.data);
    })
    .catch(err => {
      $log.log(`DELETE ${err.url}::${err.status} failed :<`);
      $log.error(err);
      reject(err);
    });
  }

  return service;
}
