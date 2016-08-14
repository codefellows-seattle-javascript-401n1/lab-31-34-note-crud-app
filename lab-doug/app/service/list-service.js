'use strict';
const angular = require('angular');

angular.module('noteApp').factory('listService',['$q', '$http', listService] );

/**
 * listService - factory/singleton function that returns service object
 *
 * @return {service object}  an object that has the built in functionality of creating lists.
 */
function listService($q, $http){


  /**
   * anyone who accesses our service will be accessing this object, which we return at the end of this factory function
   */
  let service = {};
  service.createList = function(data){
    return $q((resolve, reject) => {
      $http.post(`${__API_URL__}/api/list`, data, {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      })
      .then(res => {
        resolve(res.data);
      })
      .catch(err => {
        reject(err);
      });
    });
  };

  return service;
}
