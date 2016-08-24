'use strict';

const noteBaseUrl = 'http://localhost:3000/api/note';
const noteHeaders = {
  'Content-Type': 'application/json',
  'Accept': 'application/json'
};



describe('testing note service', function(){
  beforeEach(() => {
    angular.mock.module('widgetApp');
    angular.mock.inject((noteService, $httpBackend) => {
      this.noteService = noteService;
      this.$httpBackend = $httpBackend;
    });
  });

  afterEach(() => {
    this.$httpBackend.verifyNoOutstandingExpectation();
    this.$httpBackend.verifyNoOutstandingRequest();
  });

  it('should return a note from service.createNote()', () => {
    this.$httpBackend.expectPOST(noteBaseUrl, {name: 'tasks', content: 'more to do', listId: '12345678f'}, noteHeaders)
    .respond(200, {_id: '12345678f',name: 'tasks', content: 'more to do', listId: '12345678f', _v: 0});
    this.noteService.createNote({name: 'tasks', content: 'more to do', listId: '12345678f' })//a promise that returns a note
    .then (note => {
      expect(note.name).toBe('tasks');
      expect(note.content).toBe('more to do');
      expect(note._id).toBe('12345678f');
    })
    .catch();
    this.$httpBackend.flush();
  });

  it('should delete a specific note using service.deleteNote()', () => {
    this.$httpBackend.expectDELETE(`${noteBaseUrl}/938374645f`, {'Accept':'application/json'})
    .respond(200, {_id: '938374645f', name: 'score', content: 'more to do', _v: 0});
    this.noteService.deleteNote('938374645f')
    .then (note => {
      console.log('deleted note: ', note);
      expect(note.name).toBe('score');
      expect(note._id).toBe('938374645f');
      expect(note.content).toBe('more to do');
    })
    .catch();
    this.$httpBackend.flush();
  });

});
