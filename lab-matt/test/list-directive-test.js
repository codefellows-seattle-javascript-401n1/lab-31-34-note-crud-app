'use strict';


describe('testing app-list directive', () => {
  beforeEach(() => {
    angular.mock.module('demoApp');
    angular.mock.inject(($compile, $rootScope) => {
      let scope = $rootScope.$new();
      scope.list = {
        id: '1234567890',
        name: 'New List',
        notes: []
      };
      let elem = angular.element('<app-list list="list"></app-list>');
      this.appList = $compile(elem)(scope);
      scope.$digest();
    });
  });
  it('Directive should have a list', () => {
    let iScope = this.appList.isolateScope();
    expect(iScope.listCtrl.list.name).toBe('New List');
    let heading = this.appList.find('h2');
    expect(heading.text().trim()).toBe(iScope.listCtrl.list.name);
  });
});
