'use strict';

const angular = require('angular');

angular.module('listApp').factory('listService', ['$log', '$q', '$http', listService]);

function listService($log, $q, $http){
  let service = {};

  let url = `${__API_URL__}/api/list`;
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
        $log.log(`POST ${url}:${res.status} success`);

        this.lists.push(res.data);
        resolve(res.data);
      })
      .catch( err => {
        $log.error(`POST failure ${url}:${err.status}`);
        reject(err);
      })
    });
  };

  service.fetchList = function(data){
    $log.debug('listService.fetchList');
    return $q((resolve, reject) => {
      $http.get( url, config)
      .then( res => {
        $log.log(`GET ${url}:${res.status} success`);
        this.lists = res.data;
        resolve(this.lists);
      })
      .catch( err => {
        $log.error(`GET failure ${url}:${err.status}`);
        reject(err);
      })
    });
  };

  service.updateList = function(data){
    $log.debug('listService.update');
    return $q((resolve, reject) => {
      $http.put(`${url}/${data._id}, data, config`)
        .then( lists => {
          $log.log(`PUT ${url}:${err.status} success`);
          this.lists.forEach((list, index) => {
            if (list._id === res.data._id) this.list[index] = res.data;
          });
          resolve(res.data);
        })
        .catch( err => {
          $log.console.error(`PUT failure ${url}:${err.status}`);
        });
    });
  };

  return service;
};
