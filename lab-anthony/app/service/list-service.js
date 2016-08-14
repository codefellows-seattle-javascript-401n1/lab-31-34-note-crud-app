'use strict';

const angular = require('angular');

angular.module('noteApp').factory('listService', ['q', '$log', '$http', listService]);

function listService($q, $log, $http){
  const service = {};
  service.lists = [];

  const requestConfig = {
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    }
  };

  service.createList = function(data){
    $log.debug('listService.createList');
    if (!data || !data.name) {
      return $q.reject(new Error('The list requires a name'));
    }
    return $q((resolve, reject) => {
      $http.post(`${__API_URL__}/api/list`, data, requestConfig)
      .then((res) => {
        this.lists.push(res.data);
        resolve(res.body);
      })
      .catch((err) => {
        reject(err);
      });
    });
  };

}
