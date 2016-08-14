'use strict';

const angular = require('angular');

angular.module('noteApp')
.factory('listService', ['$log', '$q', '$http', listService]);

function listService($log, $q, $http) {
  let service = {};
  let url = `${__API_URL__}/api/list`;
  let config = {
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    }
  };

  service.lists = [];

  service.createList = function(data) {
    $log.debug('listService.createList');
    return $q((resolve, reject) => {
      $http.post(url, data, config)
      .then((res) => {
        $log.log(`POST ${url}:${res.status} success`);
        this.lists.push(res.data);
        resolve(res.data);
      })
      .catch((err) => {
        $log.log(`POST ${url}:${err.status} failure`);
        reject(err);
      });
    });
  };

  service.fetchLists = function() {
    $log.debug('listService.fetchLists');
    return $q((resolve, reject) => {
      $http.get(url, config)
      .then((res) => {
        $log.log(`GET ${url}:${res.status} success`);
        this.lists = res.data;
        resolve(res.data);
      })
      .catch((err) => {
        $log.log(`GET ${url}:${err.status} failure`);
        reject(err);
      });
    });
  };

  service.updateList = function(data) {
    $log.debug('listService.updateList');
    return $q((resolve, reject) => {
      $http.put(`${url}/${data._id}`, data, config)
      .then((res) => {
        $log.log(`PUT ${url}:${res.status} success`);
        this.lists.forEach((list, index) => {
          if (list._id === res.data._id) {
            this.lists[index] = res.data;
          }
        });
        resolve(res.data);
      })
      .catch((err) => {
        $log.log(`PUT ${url}:${err.status} failure`);
        reject(err);
      });
    });
  };

  service.deleteList = function(listId) {
    $log.debug('listService.deleteList');
    return $q((resolve, reject) => {
      $http.delete(`${url}/${listId}`, config)
      .then((res) => {
        $log.log(`DELETE ${url}:${res.status} success`);
        this.lists.forEach((list, index) => {
          if (list._id === listId) {
            this.lists.splice(index, 1);
          }
        });
        resolve(res.data);
      })
      .catch((err) => {
        $log.log(`DELETE ${url}:${err.status} failure`);
        reject(err);
      });
    });
  };

  return service;

} // end listService
