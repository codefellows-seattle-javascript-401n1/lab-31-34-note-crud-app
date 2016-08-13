'use strict';

const angular = require('angular');
angular.module('galleryApp').factory('noteService', ['$log','$q','$http', noteService]);

function noteService($log, $q, $http){
  let service = {};
  let url = `${__API_URL__}/api/note`;
  let config = {
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    }
  };
  //lists?????????????????
  service.lists = [];
  service.createNote = function(data){
    $log.debug('noteService.createNote');
    return $q((resolve,reject) => {
      $http.post(url, data, config)
      .then( res => {
        $log.log(`POST ${res.url}: ${res.status} POST-success!`);
        resolve(res.data);
      })
      .catch (err => {
        $log.log(`POST ${err.url}: ${err.status} POST-failure!`);
        $log.error(err);
        reject(err);
      });
    });
  };
  service.deleteNote = function(noteId){
    $log.debug('noteService.deleteNote');
    return $q((resolve,reject) => {
      $http.delete(`${url}/${noteId}`, config)
      .then( res => {
        $log.log(`DELETE ${res.url}: ${res.status} DELETE-success!`);
        resolve(res.data);
      })
      .catch (err => {
        $log.error(`DELETE ${err.url}: ${err.status} DELETE-failure!`);
        $log.error(err);
        reject(err);
      });
    });
  };
  // TODO: add properties to service
  // TODO: methods to service
  service.fetchNotes = function(){
    $log.debug('noteService.fetchNotes');
    return $q((resolve, reject) => {
      $http.get(url, config)
      .then( res => {
        $log.log(`GET ${res.url}: ${res.status} GET-success!`);
        resolve(res.data);
      })
      .catch( err => {
        $log.log(`GET ${err.url}: ${err.status} GET-failure!`);
        reject(err);
      });
    });
  };
  service.updateNote = function(data){
    $log.debug('noteService.updateNote');
    let res;
    return $q((resolve, reject) => {
      $http.put(`${res.url}/${data._id}`, data, config)
      .then( lists => {
        $log.log(`PUT ${res.url}: ${res.status} PUT-success!`);
        this.lists.forEach((list, index) => {
          if(list._id === res.data._id) return this.lists[index] = res.data;
        });
        resolve(res.data);
      })
      .catch( err => {
        $log.log(`PUT ${err.url}: ${err.status} PUT-success!`);
        reject(err);
      });
    });
  };
  return service;
}
