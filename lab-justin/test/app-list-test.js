'use strict';

describe('testing app-list', function(){
  beforeEach( () => {
    angular.mock.module('galleryApp');
    angular.mock.inject(($compile, $rootScope) => {
      let scope = $rootScope.$new();//create new scope
      scope.list = {
        _id: '12345',
        name: 'app-list-test',
        notes: []
      };
      let elem = angular.element('<app-list list="list"></app-list>');
      this.appList = $compile(elem)(scope);
      scope.$digest();
    });
  });
  it('should test app-list directive', () => {
    let iScope = this.appList.isolateScope();
    expect(iScope.listCtrl.list.name).toBe('app-list-test');
    let headding = this.appList.find('h2');
    expect(headding.text().trim()).toBe('List : app-list-test');
    expect(iScope.listCtrl.list.name).toBe('app-list-test');
  });
});
