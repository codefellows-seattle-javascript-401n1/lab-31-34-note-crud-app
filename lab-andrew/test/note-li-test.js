'use strict';

describe('testing app-li', () => {
  beforeEach(() => {
    angular.mock.module('noteApp');
    angular.mock.inject(($compile, $rootScope) => {
      let scope = $rootScope.$new();
      scope.list = {
        id: '1234',
        name: 'test list',
        notes: [{
          content:'test content',
          name: 'test name'
        }]
      };

      let elem = angular.element('<app-note-li note="list.notes[0]"></app-note-list>');
      this.noteLi = $compile(elem)(scope);
      scope.$digest();
    });

  });
  it('shoudl have a note item', () => {
    let isolateScope = this.noteLi.isolateScope();
    let heading = this.noteLi.find('h2');
    let paragraph = this.noteLi.find('p');
    expect(isolateScope.noteLiCtrl.note.name).toBe('test name');
    expect(isolateScope.noteLiCtrl.note.content).toBe('test content');
    expect(heading.text().trim()).toBe('test name');
    expect(paragraph.text().trim()).toBe('test content');
  });
});
