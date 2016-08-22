'use strict';

const noteBaseUrl = 'http://localhost:3000/api/note';
const noteHeaders = {
  'Content-Type' :'applicaiton/json',
  'Accept':'application/json'
};

describe('testing create note service', function() {
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

  it('should create a note', () => {
    this.httpBackend.expectPOST(noteBaseUrl, {name: 'test troll', listId: '1234', content: 'test content'}, noteHeaders)
    .respond(200, {_id: '1234', name: 'test troll', listId: '1234', content: 'test content'});

    this.noteService.createNote({name: 'test troll', listId: '1234', content: 'test content'})
    .then(note => {
      expect(note.name).toBe('test troll');
      expect(note.listId).toBe('1234');
      expect(note.content).toBe('test content');
    });
  });


  it('deleteNote should create a note', () => {
    this.httpBackend.expectDELETE(`${noteBaseUrl}/1234`,{'Accept': 'application/json'})
    .respond(200, {_id: '1', name: 'test troll', content: 'test content'});
    this.noteService.deleteNote('1234')
    .then(note => {
      expect(note.name).toBe('test troll');
      expect(note.listId).toBe('1234');
      expect(note.content).toBe('test content');
    });
  });
});
