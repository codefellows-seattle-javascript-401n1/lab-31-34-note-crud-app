'use strict';

describe('testing app-create-note-form', function(){
  beforeEach(() => {
    angular.mock.module('galleryApp');
    angular.mock.inject(($compile, $rootScope) => {
      let scope = $rootScope.$new();

      scope.createNote = (function(note) {
        this.note = note;
      }).bind(this);

      let elem = angular.element('<app-create-note-form>');
      this.appCreateNoteForm = $compile(elem)(scope);
      scope.$digest();
      // console.log(this.appCreateNoteForm);
    });
  });

  it('should be fun to test ', () => {
    let iScope = this.appCreateNoteForm.isolateScope();
    iScope.note = {
      name: 'happy',
      content: 'meal'
    };
    iScope.createNote();
    iScope.$digest();
    expect('false').toBe('false');
    expect(iScope.note.name).toBe('happy');
    expect(iScope.note.content).toBe('meal');
  });
});
