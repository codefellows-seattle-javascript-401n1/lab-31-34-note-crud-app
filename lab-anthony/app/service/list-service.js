'use strict';

const angular = require('angular');
const baseUrl = `${__API_URL__}/api/list`;

angular.module('noteApp').factory('listService', ['$q', '$log', '$http', listService]);

function listService($q, $log, $http){
  const service = {};
  service.lists = [];

  const requestConfig = {
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    }
  };

  service.getLists = function(){
    $log.debug('listService.getLists');

    return $q((resolve, reject) => {
      $http.get(baseUrl, requestConfig)
      .then((res) => {
        this.lists = res.data;
        resolve(this.lists);
      })
      .catch((err) => {
        reject(err);
      });
    });
  };

  service.createList = function(data){
    $log.debug('listService.createList', data);
    if (!data || !data.name) {
      return $q.reject(new Error('The list requires a name'));
    }
    return $q((resolve, reject) => {
      $http.post(baseUrl, data, requestConfig)
      .then((res) => {
        this.lists.push(res.data);
        resolve(res.data);
      })
      .catch((err) => {
        reject(err);
      });
    });
  };

  service.deleteList = function(listId){
    $log.debug('listService.deleteList');
    return $q((resolve, reject) => {
      $http.delete(`${baseUrl}/${listId}`)
      .then((res) => {
        service.lists.forEach((list, index) => {
          if (list._id === listId) {
            service.lists.splice(index, 1);
          }
        });
        resolve(res.data);
      })
      .catch((err) => {
        reject(err);
      });
    });
  };

  return service;

}
