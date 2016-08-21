'use strict';

describe('testing the note service', function(){
  let baseUrl = 'http://localhost:3000/api/note';

  let headers = {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  };


  beforeEach(() => {
    angular.mock.module('noteList');
    angular.mock.inject((noteService, $httpBackend) => {
      this.noteService = noteService;
      this.$httpBackend = $httpBackend;
    });

  });

  afterEach(() => {
    this.$httpBackend.verifyNoOutstandingExpectation();
    this.$httpBackend.verifyNoOutstandingRequest();
  });

  it('should return a note with noteService', () => {
    this.$httpBackend.expectPOST(baseUrl, {name: 'a note', content: 'notes'}, headers).respond(200, {_id: '10203040', name: 'a note', content: 'notes', _v: 0});

    this.noteService.createNote({name: 'a note', content: 'notes'})
    .then( note => {
      expect(note.name).toBe('a note');
      expect(note.content).toBe('notes');
      expect(note._id).toBe('10203040');
    })
    .catch(err => {
      expect(err).toBe(undefined);
    });

    this.$httpBackend.flush();
  });

  it('should delete a note with noteService', () => {
    this.$httpBackend.expectDELETE(`${baseUrl}/10203040`, {'Accept': 'application/json'}).respond(204, { status: 'OK' });

    this.noteService.deleteNote({_id: '10203040'})
    .then(note => {
      expect(note.name).toBe(undefined);
      expect(note.content).toBe(undefined);
    })
    .catch(err => {
      expect(err).toBe(undefined);
    });

    this.$httpBackend.flush();
  });
});
