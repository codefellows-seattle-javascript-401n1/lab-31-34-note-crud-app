'use strict';

describe('testing app-note directive', function() {

  beforeEach( () => {
    angular.mock.module('noteApp');
    angular.mock.inject(($compile, $rootScope) => {
      let scope = $rootScope.$new();
      scope.note = {
        _id: '8765',
        name: 'test note',
        listId: '4321',
        content: 'test content'
      };
      let elem = angular.element('<app-note note="note"></app-note');
      this.appNote = $compile(elem)(scope);
      scope.$digest();
    });
  });

  it('should display a note', () => {
    let iScope = this.appNote.isolateScope();
    expect(iScope.note.name).toBe('test note');
    let heading = this.appNote.find('h2');
    expect(heading.text().trim()).toBe(iScope.note.name);
    let paragraph = this.appNote.find('p');
    expect(paragraph.text().trim()).toBe(iScope.note.content);
  });

}); //end app-note directive test
