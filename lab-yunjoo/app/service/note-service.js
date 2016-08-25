/*__API_URL__*/
'use strict';

const angular = require('angular');

angular.module('demoApp').factory('noteService',['$log','$q','$http',noteService]);

function noteService($log, $q, $http){
  //create service
  let service = {};
  //set private constants
  let url = `${__API_URL__}/api/note`;
  let config ={
    headers: {
      'Content-Type':'application/json',
      'Accept': 'application/json'
    }
  };

  service.createNote = function(data){
    $log.debug('noteService.createNote');
    return $q((resolve, reject)=>{
      $http.post(url, data, config)
      .then( res => {
        $log.log(`Post ${res.url}::${res.status} sucess!`);
        resolve(res.data);
      })
      .catch(err =>{
        $log.log(`POST ${err.url}::${err.status} failure!`);
        $log.error(err);
        reject(err);
      });
    });
  };
  service.deleteNote = function(noteId){
    $log.debug('noteService.deleteNote');
    return $q((resolve, reject)=>{
      $http.delete(`${url}/${noteId}`,config)
      .then( res =>{
        $log.log(`DELETE ${res.url}::${res.status} sucess!`);
        resolve(res.data);
      })
      .catch(err =>{
        $log.log(`DELETE ${err.url}::${err.status} failure!`);
        $log.error(err);
        reject(err);
      });
    });
  };
  return service;
}
