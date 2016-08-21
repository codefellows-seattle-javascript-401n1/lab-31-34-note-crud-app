'use strict';

const angular = require('angular');

angular.module('noteList').factory('noteService', ['$log', '$q', '$http', noteService]);

function noteService($log, $q, $http){
  let service = {};

  let url = `${__API_URL__}/api/note`;
  let config = {
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    }
  };

  service.createNote = function(data){
    $log.debug('createNote in noteService');
    return $q((resolve, reject) => {
      $http.post(url, data, config)
      .then(res => {
        $log.log(`POST ${res.url}:${res.status} success!!`);
        resolve(res.data);
      }).catch(err => {
        $log.log(`POST ${err.url}:${err.status} failure`);
        $log.error(err);
        reject(err);
      });
    });
  };

  service.deleteNote = function(noteObject){
    $log.debug('deleteNote in noteService');
    return $q((resolve, reject) => {
      $http.delete(`${url}/${noteObject._id}`, config)
      .then(res => {
        $log.log(`DELETE ${res.url}:${res.status} success!!`);
        resolve(res.data);
      }).catch(err => {
        $log.log(`DELETE ${err.url}:${err.status} failure`);
        $log.error(err);
        reject(err);
      });
    });
  };

  return service;
}
