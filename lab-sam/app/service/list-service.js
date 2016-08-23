'use strict';

const angular = require('angular');

angular.module('listApp').factory('listService', ['$log', '$q', '$http', listService]);

function listService($log, $q, $http){
  let service = {};
  let url = `${__API_URL__}/api/list`;
  let config = {
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    }
  };

  service.lists = [];

  service.createList = function(data){
    $log.debug('listS.newList');
    return $q((resolve, reject) => {
      $http.post( url, data, config)
      .then( res => {
        $log.log(`POST success ${url}:${res.status}`);

        this.lists.push(res.data);
        resolve(res.data);
      })
      .catch( err => {
        $log.error(`POST failure ${url}:${err.status}`);
        reject(err);
      });
    });
  };

  service.fetchLists = function(){
    $log.debug('listS.fetchLists');
    return $q((resolve, reject) => {
      $http.get( url, config)
      .then( res => {
        $log.log(`GET success ${url}:${res.status}`);
        this.lists = res.data;
        resolve(this.lists);
      })
      .catch( err => {
        $log.error(`GET failure ${url}:${err.status}`);
        reject(err);
      });
    });
  };

  service.updateList = function(data){
    $log.debug('listS.update');
    return $q((resolve, reject) => {
      $http.put(`${url}/${data._id}`, data, config)
        .then( res => {
          $log.log(`PUT success ${url}:${res.status}`);
          this.lists.forEach((list, index) => {
            if (list._id === res.data._id) this.list[index] = res.data;
          });
          resolve(res.data);
        })
        .catch( err => {
          $log.console.error(`PUT failure ${url}:${err.status}`);
          reject(err);
        });
    });
  };

  service.deleteList = function(listId){
    $log.debug('listS.deletelist, ID:', listId );
    return $q((resolve, reject) => {
      $http.delete(`${url}/${listId}`, config)
      .then( res => {
        $log.log(`DELETE success ${res.url}:${res.status}`);
        this.lists.forEach((list, index) => {
          if (list._id === listId) this.lists.splice(index, 1);
        });
        resolve(res.data);
      })
      .catch((err) => {
        $log.log(`DELETE failure ${err.url}::${err.status}`);
        $log.error(err);
        reject(err);
      });
    });
  };

  return service;
};
