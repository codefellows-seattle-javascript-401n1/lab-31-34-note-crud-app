'use strict';

describe('testing the app-list directive', function(){
  beforeEach(() => {
    angular.mock.module('widgetApp');
    /**
     * NOTE: The 'inject' function is declared ONLY when running tests with jasmine or mocha.  The inject function wraps a function into an injectable function. The inject() creates new instance of $injector per test, which is then used for resolving references.If a function has an $inject property and its value is an array of strings, then the strings represent names of services to be injected into the function.
     * Every application has a single root scope. Scopes provide separation between the model and the view, via a mechanism for watching the model for changes.
     */
    angular.mock.inject(($compile, $rootScope) => {
      var scope = $rootScope.$new();
      scope.list = {
        _id: '57a10f8653481f70fc61f71d',
        name: 'todo list',
        notes: []
      };
      /**
       * 'element' wraps a raw DOM element or HTML string as a jQuery element.  If jQuery is available, angular.element is an alias for the jQuery function. If jQuery is not available, angular.element delegates to Angular's built-in jqLite
       */
      var elem = angular.element('<app-list list="list"></app-list>');
      /**
       * The elem object is {0: <app-list list="list"></app-list>, length: 1}.
       * $compile, compiles an HTML string or DOM into a template and produces a template function, which can then be used to link scope and the template together.The jqLite object(elem) is passed into the $compile function as a parameter.  'elem' is the template.  The $compile(elem) will execute and return a function and we will pass in the scope as the parameter to that new function.  We then evaluate that function, LINKING the SCOPE to the TEMPLATE and applying that value to 'this.appList'.
       */
      this.appList = $compile(elem)(scope);

      /**
       * calling $digest, APPLIES the current scope to the template and makes any changes based on properties/values listed in the scope.
       */
      scope.$digest();

    /**
     * the updated value of 'this.appList' is the template object below:
     *
     * ', Object{0: <div class="app-list ng-scope ng-isolate-scope" list="list">
  <i class="fa fa-minus-circle" ng-click="listCtrl.deleteList()"></i>
  <h2 class="ng-binding">todo list</h2>
  <ul>
      <!-- ngRepeat: item in listCtrl.list.notes -->
      <form class="app-create-note-form form-horizontal ng-pristine ng-valid ng-isolate-scope" novalidate="" ng-submit="createNote({note:note})" create-note="listCtrl.createNote(note)">
  <div class="form-group">
    <label for="name" class="col-sm-2 control-label">Note Name:</label>
    <input type="text" name="name" ng-model="note.name" class="form-control ng-pristine ng-untouched ng-valid ng-empty">
  </div>
  <div class="form-group">
    <label for="content" class="col-sm-2 control-label">Content:</label>
    <input type="text" name="content" ng-model="note.content" class="form-control ng-pristine ng-untouched ng-valid ng-empty">
  </div>
  <button class="btn btn-default" type="submit">submit</button>
</form>
  </ul>
</div>, length: 1}
     */
    });
  });

  it('should update app-list portion of template', () => {

    /**
     * the 'isolateScope' method is provided by angular for jqlite/jquery. It retrieves an isolate scope if one is attached directly to the current element. This getter should be used only on elements that contain a directive which starts a new isolate scope.
     */
    var iScope = this.appList.isolateScope();
    var h2Binding = this.appList.find('h2');
    expect(iScope.listCtrl.list.name).toBe('todo list');
    expect(iScope.listCtrl.list._id).toBe('57a10f8653481f70fc61f71d');

    /**
     * verifying that the template is actually changed (APPLY)
     */
    expect(h2Binding.text()).toBe(iScope.listCtrl.list.name);
  });
});
