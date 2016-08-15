'use strict';
const angular = require('angular');

angular.module('listApp').factory('listService',['$log','$q', '$http', listService] );

/**
 * listService - factory/singleton function that returns service object
 *
 * @return {service object}  an object that has the built in functionality of creating lists.
 */
function listService($log, $q, $http){
  $log.debug('entered listService function');
  /**
   * anyone who accesses our service will be accessing this object, which we return at the end of this factory function
   */
  let service = {};
  let config = {
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    }
  };

  service.createList = function(data){
    $log.debug('entered listService.createList');
    return $q((resolve, reject) => {
      $http.post(`${__API_URL__}/api/list`, data, config)
      .then(res => {
        $log.log('listService.createList succeeded');
        resolve(res.data);
      })
      .catch(err => {
        $log.error('listService.createList failed');
        reject(err);
      });
    });
  };
  service.fetchLists = function(){
    $log.debug('entered listService.fetchLists');
    return $q((resolve, reject) => {
      $http({
        method: 'GET',
        url: `${__API_URL__}/api/list`
      })
      .then(res => {
        $log.log('listService.fetchLists succeeded');
        resolve(res.data);
      })
      .catch( err => {
        $log.error('listService.fetchLists failed');
        reject(err);
      });
    });
  };

  service.updateList = function(data){
    $log.debug('listService.updateList');
    return $q((resolve, reject) => {
      $http.put(`${__API_URL__}/api/list/${data.id}`, data, config)
      .then(res => {
        $log.log('listService.updateList succeeded');
        resolve(res.data);
      })
      .catch(err => {
        $log.error('listService.updateList failed');
        reject(err);
      });
    });
  };

  service.deleteList = function(data){
    $log.debug('listService.deleteList');
    return $q((resolve, reject) => {
      $http.delete(`${__API_URL__}/api/list/${data.id}`, config)
      .then(res => {
        $log.log('listService.deleteList suceeded');
        resolve(res.data)
      .catch(err => {
        $log.error('listService.deleteList failed');
        reject(err);
      });
      });
    });
  };

  return service;
}
