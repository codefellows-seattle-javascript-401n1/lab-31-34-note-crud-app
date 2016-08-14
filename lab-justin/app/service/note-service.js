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

  service.createNote = function(data){
    $log.debug('noteService.createNote');
    return $q((resolve,reject) => {
      $http.post(url, data, config)
      .then( res => {
        $log.log(`POST ${url}: ${res.status} noteService.createNote: POST-success!`);
        $log.log('res.data', res.data);
        resolve(res.data);
      })
      .catch (err => {
        $log.log(`POST ${url}: ${err.status} noteService.createNote: POST-failure!`);
        $log.error(err);
        reject(err);
      });
    });
  };
  service.deleteNote = function(noteId){
    $log.debug('noteService.deleteNote');
    $log.log('noteId', noteId.noteId);
    return $q((resolve,reject) => {
      $http.delete(`${url}/${noteId}`, config)
      // $http.delete(`${url}/${noteId.noteId}`, config)
      .then( res => {
        $log.log(`DELETE ${url}: ${res.status} noteService.deleteNote: DELETE-success!`);
        resolve(res.data);
      })
      .catch (err => {
        $log.error(`DELETE ${url}: ${err.status} noteService.deleteNote: DELETE-failure!`);
        $log.error(err);
        reject(err);
      });
    });
  };
  // TODO: add properties to service
  // TODO: methods to service
  // service.fetchNotes = function(){
  //   $log.debug('noteService.fetchNotes');
  //   return $q((resolve, reject) => {
  //     $http.get(url, config)
  //     .then( res => {
  //       $log.log(`GET ${url}: ${res.status} noteService.fetchNotes: GET-success!`);
  //       resolve(res.data);
  //     })
  //     .catch( err => {
  //       $log.log(`GET ${url}: ${err.status} noteService.fetchNotes: GET-failure!`);
  //       reject(err);
  //     });
  //   });
  // };
  // service.updateNote = function(data){
  //   $log.debug('noteService.updateNote');
  //   let res;
  //   return $q((resolve, reject) => {
  //     $http.put(`${url}/${data._id}`, data, config)
  //     .then( lists => {
  //       $log.log(`PUT ${url}: ${res.status} noteService.updateNote: PUT-success!`);
  //       service.lists.forEach((list, index) => {
  //         if(list._id === res.data._id) return this.lists[index] = res.data;
  //       });
  //       resolve(res.data);
  //     })
  //     .catch( err => {
  //       $log.log(`PUT ${url}: ${err.status} noteService.updateNote: PUT-success!`);
  //       reject(err);
  //     });
  //   });
  // };
  return service;
}
