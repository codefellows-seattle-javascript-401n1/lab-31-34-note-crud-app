'use strict';

const angular = require('angular');
const widgetApp = angular.module('widgetApp');
widgetApp.factory('noteService', ['$log', '$q', '$http', noteService]);

function noteService($log, $q, $http){
  let service = {};
  let url = `${__API_URL__}/api/note`;
  let config = {
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    }
  };
  service.createNote = function(data) {
    console.log('data in createNote: ', data);
    $log.debug('entered createNote() in note-service.js');
    return $q((resolve, reject) => {
      $http.post(url, data, config)
      .then((res) => {
        $log.log('post of new note is successful');
        console.log('res.data in createNote: ', res.data);
        resolve(res.data);
      })
      .catch((err) => {
        $log.log('post of new note failed');
        reject(err);
      });
    });
  };

  service.deleteNote = function(noteId) {
    $log.debug('entered deleteNote() in note-service.js');
    return $q((resolve, reject) => {
      $http.delete(`${url}/${noteId}`, config)
      .then((res) => {
        $log.log('delete of note is successful');
        resolve(res.data);
      })
      .catch((err) => {
        $log.log('delete of note failed');
        reject(err);
      });
    });
  };

  return service;
}
