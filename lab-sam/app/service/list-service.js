'use strict';

const angular = require('angular');

angular.module('listApp').factory('listService', ['$log', '$q', '$http', listService]);

function listService($log, $q, $http){
  let service = {};

  let url = '${__API_URL__}/api/list';
  let config = {
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
  };

  service.createList = function(data){
    $log.debug('listService.newList');
    return $q((resolve, reject) => {
      $http.post( url, data, config)
      .then( res => {
        $log.log('POST ${url}:${res.status} success!');

        this.lists.push
      })
    })
  }
}
