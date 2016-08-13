'use strict';

const angular = require('angular');
angular.module('galleryApp').factory('listService', ['$log', '$q', '$http', listService]);

function listService($log, $q, $http){
  let service = {};
  let url = `${__API_URL__}/api/list`;
  let config = {
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    }
  };
  service.lists = [];  // add functionality to the service
  service.createList = function(data){
    $log.debug('listService.createList');
    return $q((resolve, reject) => {
      $http.post(url , data, config)
      .then( res  => {
        $log.log(`POST ${url}:${res.status} POST-success!`);
        this.lists.push(res.data);
        resolve(res.data);
      })
      .catch( err => {
        $log.error(`POST ${url}:${err.status} POST-failure!`);
        reject(err);
      });
    });
  };
  service.fetchLists = function(){
    $log.debug('listService.fetchLists');
    return $q((resolve, reject) => {
      $http.get(url, config)
        .then( res => {
          $log.log(`GET ${url}:${res.status} GET-success!`);
          this.lists = res.data;
          resolve(this.lists);
        })
        .catch( err => {
          $log.error(`GET ${url}:${err.status} GET-failure!`);
          reject(err);
        });
    });
  };
  service.updateList = function(data){
    $log.debug('listService.updateList');
    let res;
    return $q((resolve, reject) => {
      $http.put(`${url}/${data._id}`, data, config)
        .then( lists => {
          $log.log(`PUT ${url}:${res.status} PUT-success!`);
          this.lists.forEach((list, index) => {
            if (list._id === res.data._id) return this.lists[index] = res.data;
          });
          resolve(res.data);
        })
        .catch( err => {
          $log.error(`PUT ${url}:${err.status} PUT-failure!`);
          reject(err);
        });
    });
  };

  service.deleteList = function(listId){
    $log.debug('listService.deleteList');
    let res;
    return $q((resolve, reject) => {
      $http.delete(`${url}/${listId}`, config)
      .then((res) =>{
        $log.log(`DELETE ${url}:${res.status} DELETE-success!`);
        this.lists.forEach((list, index) => {
          if(list._id===listId) return this.lists.splice(index, 1);
        });
        resolve(res.data);
      })
      .catch((err) => {
        $log.log(`DELETE ${url}:${res.status} DELETE-failure!`);
        reject(err);
      });
    });
  };
  return service;
}
