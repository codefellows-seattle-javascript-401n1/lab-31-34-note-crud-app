'use strict';

describe('testing the displayNote directive', function(){
  beforeEach(() => {
    angular.mock.module('noteList');
    angular.mock.inject(($compile, $rootScope) => {
      let scope = $rootScope.$new();
      scope.note = {
        _id: '246810',
        name: 'example note',
        content: 'example content'
      };

      let elem = angular.element('<app-display-note note="note"></app-display-note');
      this.appDisplayNote = $compile(elem)(scope);
      scope.$digest();
    });
  });

  it('should return a note', () => {
    let iScope = this.appDisplayNote.isolateScope();
    expect(iScope.displayNoteCtrl.note.name).toBe('example note');
    let heading = this.appDisplayNote.find('p');
    expect(heading.text().trim()).toBe(iScope.displayNoteCtrl.note.content);
  });
});
