'use strict';
require('./main.scss');

const angular = require('angular');
const widgetApp = angular.module('widgetApp')
widgetApp.directive('appMain', function(){
  return {
    restrict: 'E',
    replace: true,
    template: require('./main.html'),
    controller: 'MainController',
    controllerAs: 'mainCtrl',
    bindToController: true,
    scope: {}
  };
});

widgetApp.controller('MainController', ['listService', MainController]);
/**
 * MainController - populates the main.html template
 *
 * @param  {object} "listService" provides ability to perform CRUD on lists in the backend db as well as updating listService "list" array. The "listService" object is passed by reference as this parameter.
 * @return {array} creates the "lists" property on the MainController which references the "lists" array in listService object. If the promise "resolve" sucessfully, then a populated "lists" array is returned.   The main.html template uses angular data binding to this MainController.lists property, to populate current lists on the page.
 */
function MainController(listService){

  /**
   * return promise when fetchLists() is called from listService Object property.  If the promise succeeds , it returns a "lists" array.
   */
  listService.fetchLists()
  .then((lists) => {

    /**
     * assign the "lists" property to the MainController and populate it.  When it is populated, the main.html template is updated via angular directives.  Currently <app-list ng-repeat> directive iterates over the lists array and populates individual lists on the page
     */
    this.lists = lists;
  })
  .catch((err) => {
    console.log('mainController ListService.fetchLists threw an error: ', err);
  });
}
