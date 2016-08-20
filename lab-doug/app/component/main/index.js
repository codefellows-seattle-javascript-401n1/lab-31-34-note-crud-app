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
 * @param  {object} "listService" provides ability to perfrom CRUD on lists in the backend db as well as updating listService "list" array. The "listService" object is passed by reference as this parameter.
 * @return {promise} creates the "lists" property on the MainController which references the "lists" array in listService object. If the promise "resolve" sucessfully, then a populated "lists" array is returned.   The main html template uses angular data binding to this MainController.lists property, to populate current lists on the page.
 */
function MainController(listService){

  /**
   * return promise when fetchLists() is called from listService Object property.  If the promise succeeds , it returns a "lists" array.
   */
  listService.fetchLists()
  .then((lists) => {

    /**
     * assign the "lists" property to the MainController and populate it.  When it is populated, the mian.html template is updated via angular data binding
     */
    this.lists = lists;
  })
  .catch((err) => {
    console.log('mainController ListService.fetchLists threw an error: ', err);
  });
}
