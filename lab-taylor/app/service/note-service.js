'use strict';

const angular= require('angular');
angular.module('noteApp').factory('noteService', ['$log', '$q', '$http', noteService]);

function noteService($log, $q, $http) {
  let service = {};
  let url = `${__API_URL__}/api/note`;
  let config = {
    headers: {
      'Content-Type':'application/json',
      'Accept':'application/json'
    }
  };

  service.createNote = function(data) {
    $log.debug('noteService.createNote');
    return $q((resolve, reject) => {
      $http.post(url, data, config)
      .then(res => {
        $log.log(`POST ${url}:${res.status} : success!`);
        resolve(res.data);
      })
      .catch(err => {
        $log.error(`POST ${url}:${err.status} : failure!`);
        reject(err.message);
      });
    });
  };

  service.deleteNote = function(noteId) {
    $log.debug('noteService.deleteNote');
    return $q((resolve, reject) => {
      $http.delete(`${url}/${noteId}`, config)
      .then(res => {
        $log.log(`DELETE ${url}/${noteId}:${res.status} : success!`);
        resolve(res.data);
      })
      .catch(err => {
        $log.error(`DELETE ${url}:${err.status} : failure!`);
        reject(err.message);
      });
    });
  };

  return service;
}
