'use strict';

describe('testing displayList', function(){
  beforeEach(() => {
    angular.mock.module('noteList');
    angular.mock.inject(($compile, $rootScope) => {
      let scope = $rootScope.$new();
      scope.list = {
        _id: '098765',
        name: 'example list',
        notes: []
      };

      let elem = angular.element('<app-display-list list="list"></app-list>');
      this.appDisplayList = $compile(elem)(scope);
      scope.$digest();
    });
  });

  it('should return a list', () => {
    let iScope = this.appDisplayList.isolateScope();
    expect(iScope.displayListCtrl.list.name).toBe('example list');
    let heading = this.appDisplayList.find('h2');
    expect(heading.text().trim()).toBe(iScope.displayListCtrl.list.name);
  });
});
