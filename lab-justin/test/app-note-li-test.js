'use strict';

describe('testing app-note-li', function(){
  beforeEach( () => {
    angular.mock.module('galleryApp');
    angular.mock.inject(($compile, $rootScope) => {
      let scope = $rootScope.$new();
      scope.note = {
        _id: '888',
        name: 'app-note-li-test',
        content: 'st-ring',
        listId: '888'//???????????
      };
      let elm = angular.element('<app-note-li note="note"></app-note-li');
      this.appNoteLi = $compile(elm)(scope);
      scope.$digest();
    });
  });
  it('should test app-note-li', () => {
    let iScope = this.appNoteLi.isolateScope();
    expect(iScope.noteLiCtrl.note.name).toBe('app-note-li-test');
    let heading = this.appNoteLi.find('h2');//
    expect(heading.text()).toBe(' name: app-note-li-test ');
  });
});
