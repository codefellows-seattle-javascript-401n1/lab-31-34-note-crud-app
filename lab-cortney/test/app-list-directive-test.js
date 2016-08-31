'use strict';

describe('testing app-list directive', function() {
  beforeEach( () => {
    angular.mock.module('noteApp');
    angular.mock.inject(($compile, $rootScope) => {
      let scope = $rootScope.$new();
      scope.list = {
        _id: '7890',
        name: 'example list',
        notes: []
      };
      let elem = angular.element('<app-list list="list"></app-list>');
      this.appList = $compile(elem)(scope);
      scope.$digest();
    });
  });

  it('should display a list', () => {
    let iScope = this.appList.isolateScope();
    expect(iScope.appListCtrl.list.name).toBe('example list');
    let heading = this.appList.find('h2');
    expect(heading.text().trim()).toBe(iScope.appListCtrl.list.name);
  });
}); // end app-list directive testing
