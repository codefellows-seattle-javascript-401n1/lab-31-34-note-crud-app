'use strict';

const angular = require('angular');
const baseUrl = `${__API_URL__}/api/note`;

angular.module('noteApp').factory('noteService', ['$q', '$log', '$http', noteService]);

function noteService($q, $log, $http){
  const service = {};

  const requestConfig = {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  };

  service.createNote = function(data){
    $log.debug('noteService.createNote');
    return $q((resolve, reject) => {
      $http(baseUrl, data, requestConfig)
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err);
      });
    });
  };

  ///// TODO: deleteNote /////
}
