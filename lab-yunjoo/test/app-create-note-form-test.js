/*global angular expect*/
'use stict';

describe('testing app-create-note-form', function(){
  beforeEach(() => {
    angular.mock.module('demoApp');
    angular.mock.inject(($compile, $rootScope) => {
      let scope = $rootScope.$new();

      scope.createNote = (function(note) {
        this.note = note;
      }).bind(this);

      let elem = angular.element('<app-create-note-form>');
      console.log(scope.createNote);
      this.appCreateNoteForm = $compile(elem)(scope);
      scope.$digest();
    });
  });

  it('should be fun to test ', () => {
    let iScope = this.appCreateNoteForm.isolateScope();
    iScope.note = {
      name: 'yunjoo',
      content: 'love corns'
    };

    iScope.createNote();
    iScope.$digest();
    expect(iScope.note.name).toBe('yunjoo');
    expect('false').toBe('false');
    console.log(iScope.note);
    let heading = iScope.note.find('h3');
    expect(heading.text().trim()).toBe(iScope.note.name);
    let paragraph = this.appNoteLi.find('p');
    expect(paragraph.text().trim()).toBe(iScope.note.content);
  });
});
