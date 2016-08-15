'use strict';
require('./main.scss');

const angular = require('angular');

angular.module('listApp').directive('appMain', function(){
  return {
    restrict: 'E',
    replace: true,
    template: require('./main.html'),
    controller: ['listService', MainController],
    controllerAs: 'mainCtrl',
    bindToController: true,
    scope: {}
  };
});


/**
 * MainController - populates the main.html template
 *
 * @param  {angular service} listService provides ability to perfrom CRUD on lists in the backend db as well as updating listService "list" array.
 * @return {reference to "lists" array in listService} creates the "lists" property on the MainController which references the "lists" array in listService object. The main html template uses angular data binding to this MainController.lists property, to populate current lists on the page.
 */
function MainController(listService){
  listService.fetchLists()
  .then((lists) => {
    this.lists = lists;
  })
  .catch((err) => {
    console.log('mainController ListService.fetchLists threw an error: ', err);
  });
}
