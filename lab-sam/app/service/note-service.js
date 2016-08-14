'use strict';

const angular = require('angular');

angular.module('listApp').factory('noteService', ['$log', '$q','$http', noteService]);

function noteService($log, $q, $http){
  let service = {};
  let url = `${__API_URL__}/api/note`;
  let config = {
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    }
  }
  service.createNote = function(data){
    $log.debug('noteS.createNote');
    return $q((resolve, reject) => {
      $http.post(url, data, config)
      .then( res => {
        $log.log(`POST success ${res.url}::${res.status}`);
        resolve(res.data);
      })
      .catch(err => {
        $log.log(`POST failure ${err.url}::${err.status}`);
        $log.error(err);
        reject(err);
      });
    });
  }

  service.deleteNote = function(noteId){
    $log.debug('noteS.deleteNote');
    return $q((resolve, reject) => {
      $http.delete(`${url}/${noteId}`, config)
      .then( res => {
        $log.log(`DELETE success ${res.url}::${res.status}`);
        resolve(res.data);
      })
      .catch(err => {
        $log.log(`DELETE failure ${err.url}::${err.status}`);
        $log.error(err);
        reject(err);
      });
    });
  };
  return service;
}
