'use strict';
const angular = require('angular');

angular.module('widgetApp').factory('listService',['$log','$q', '$http', listService] );

/**
 * listService - factory/singleton function that returns service object
 *
 * @return {service object}  an object that has the properties (values/functions) used to perform CRUD on lists.
 */
function listService($log, $q, $http){
  $log.debug('entered listService()');
  /**
   * anyone who accesses our service will be accessing by reference the "service" object, which we return at the end of this factory function.  The "service" object will contain the properties that are defined in this function "service.somepropertyname".
   */
  let service = {};
  service.lists = [];

  /**
   * private variable "config" in listService function that is not included in the "service" object that is returned by reference to those using the listService.
   */
  let config = {
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    }
  };

  service.createList = function(data){
    $log.debug('entered listService.createList()');
    return $q((resolve, reject) => {
      $http.post(`${__API_URL__}/api/list`, data, config)
      .then(res => {
        $log.log('listService.createList succeeded');
        this.lists.push(res.data);
        resolve(this.lists);
      })
      .catch(err => {
        $log.error('listService.createList failed');
        reject(err);
      });
    });
  };
  service.fetchLists = function(){
    $log.debug('entered listService.fetchLists()');
    return $q((resolve, reject) => {
      $http({
        method: 'GET',
        url: `${__API_URL__}/api/list`
      })
      .then(res => {
        $log.log('listService.fetchLists succeeded');
        this.lists = res.data;
        resolve(this.lists);
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
      $http.put(`${__API_URL__}/api/list/${data._id}`, data, config)
      .then(res => {
        $log.log('listService.updateList() succeeded');
        this.list.forEach((list, index) => {
          if(list._id === res.data._id){
            this.lists[index] = res.data;
          }
        });
        resolve(res.data);
      })
      .catch(err => {
        $log.error('listService.updateList() failed');
        reject(err);
      });
    });
  };

  service.deleteList = function(listId){
    $log.debug('listService.deleteList()');
    return $q((resolve, reject) => {
      $http.delete(`${__API_URL__}/api/list/${listId}`, config)
      .then(res => {
        console.log('res.data in deleteList: ', res.data);
        this.lists.forEach((list, index) => {
          if(list._id === listId){
            this.lists.splice(index, 1);
          }
        });
        $log.log('listService.deleteList() succeeded');
        resolve(res.data)
      .catch(err => {
        $log.error('listService.deleteList() failed');
        reject(err);
      });
      });
    });
  };

  return service;
}
