'use strict';
const noteBaseUrl = 'http://localhost:3000/api/note';
const noteHeaders = {
  'Content-Type': 'application/json',
  'Accept': 'application/json'
};

describe('testing noteService', function() {
  beforeEach(() => {
    angular.mock.module('noteApp');
    angular.mock.inject((noteService, $httpBackend) => {
      this.noteService = noteService;
      this.httpBackend = $httpBackend;
    });
  });

  afterEach(() => {
    this.httpBackend.verifyNoOutstandingRequest();
    this.httpBackend.verifyNoOutstandingExpectation();
  });

  it('createNote should create a note', () => {
    this.httpBackend.expectPOST(noteBaseUrl, {name: 'testNote', listId: '12345', content: 'testContent'}, noteHeaders)
    .respond(200, {_id: '1', name: 'testNote', listId: '12345', content: 'testContent'});

    this.noteService.createNote({name: 'testNote', listId: '12345', content: 'testContent'})
    .then(note => {
      expect(note.name).toBe('testNote');
      expect(note.listId).toBe('12345');
      expect(note.content).toBe('testContent');
    });
  });

  it('deleteNote should create a note', () => {
    this.httpBackend.expectDELETE(`${noteBaseUrl}/12345`, {'Accept': 'application/json'})
    .respond(200, {_id: '1', name: 'testNote', listId: '12345', content: 'testContent'});

    this.noteService.deleteNote('12345')
    .then(note => {
      expect(note.name).toBe('testNote');
      expect(note.listId).toBe('12345');
      expect(note.content).toBe('testContent');
    });
  });

});
