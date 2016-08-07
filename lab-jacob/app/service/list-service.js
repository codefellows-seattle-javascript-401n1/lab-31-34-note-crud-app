'use strict';

const angular = require('angular');

angular.module('noteList').factory('listService', ['$log', '$q', '$http', listService]);

function listService($log, $q, $http){
  let service = {};
  let url = `${__API_URL__}/api/list`;
  let config = {
    header: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    }
  };

  service.lists = [];

  service.createList = function(data){
    $log.debug('createList in listService');
    return $q((resolve, reject) => {
      $http.post( url, data, config)
      .then( res => {
        this.lists.push(res.data);
        resolve(res.data);
      })
      .catch( err => {
        reject(err);
      });
    });
  };

  service.fetchLists = function(){
    $log.debug('fetchList in listService');
    return $q((resolve, reject) => {
      $http.get(url, config)
      .then(res => {
        $log.log(`GET ${url}:${status} success!!`);
        this.lists = res.data;
        resolve(res.data);
      })
      .catch(err => {
        $log.error(`GET ${url}:${err.status} failure!`);
        reject(err);
      });
    });
  };

  service.updateList = function(data){
    $log.debug('updateList in listService');
    return $q((resolve, reject) => {
      $http.put(`${url}/${data._id}`, data, config)
      .then(res => {
        $log.log(`GET ${url}:${res.status} success!!`);
        this.lists.forEach((list, index) => {
          if (list._id === res.data._id) {
            this.lists[index] = res.data;
          }
        });
        resolve(res.data);
      })
      .catch(err => {
        $log.error(`GET ${url}:${err.status} failure!!`);
        reject(err);
      });
    });
  };

  service.deleteList = function(listId){
    $log.debug('deleteList in listService');
    return $q((resolve, reject) => {
      $http.delete(`${url}/${listId}, config`)
      .then(res => {
        $log.log(`DELETE ${url}:${res.status} success!!`);
        this.lists.forEach((list, index) => {
          if (list._id === listId){
            this.lists.splice(index, 1);
          }
        });
        resolve(res.data);
      })
      .catch(err => {
        $log.log(`DELETE ${url}:${err.status} failure!!`);
        reject(err);
      });
    });
  };


  return service;
}
