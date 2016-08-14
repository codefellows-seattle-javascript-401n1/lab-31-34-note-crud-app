'use strict';

describe('testing app-list', () => {
  beforeEach(() => {
    angular.mock.module('noteApp');
    angular.mock.inject(($compile, $rootScope) => {
      let scope = $rootScope.$new();
      scope.list = {
        id: '12345',
        name: 'test list',
        notes: []
      };

      let elem = angular.element('<app-list list="list"></app-list>');
      this.appList = $compile(elem)(scope);
      scope.$digest();
    });
  });
  it('should return have a name', () => {
    let isolateScope = this.appList.isolateScope();
    let heading = this.appList.find('h2');
    expect(isolateScope.listCtrl.list.name).toBe('test list');
    expect(heading.text().trim()).toContain(isolateScope.listCtrl.list.name);
  });
});
