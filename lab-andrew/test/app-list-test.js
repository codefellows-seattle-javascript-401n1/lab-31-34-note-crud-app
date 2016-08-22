'use strict';


describe(' test for app-list', () => {
  beforeEach(() => {
    angular.mock.module('noteApp');
    angular.mock.inject(($compile, $rootScope) => {
      let scope = $rootScope.$new();
      scope.list = {
        id: '12345',
        name: 'troll',
        notes: []
      };

      let elem = angular.element('app-list list="list"></app-list>');
      this.appList = $compile(elem)(scope);
      scope.$digest();
    });
  });

  it('should return a name', () => {
    let isolateScope = this.appList.isolateScope();
    let header = this.appList.find('h2');
    expect(isolateScope.listCtrl.list.name).toBe('troll');
    expect(header.text().trim()).toContain(isolateScope.listCtrl.list.name);
  });
});
