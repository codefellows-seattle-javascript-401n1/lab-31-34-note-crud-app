'use strict';

var baseUrlNote = 'http://localhost:3000/api/note';

var headers = {
  'Content-Type': 'application/json',
  'Accept': 'application/json'
};

describe('testing noteService', function() {

  beforeEach( () => {
    angular.mock.module('noteApp');
    angular.mock.inject((listService, noteService, $httpBackend) => {
      this.listService = listService;
      this.noteService = noteService;
      this.$httpBackend = $httpBackend;
    });
  });

  afterEach( () => {
    this.$httpBackend.verifyNoOutstandingExpectation();
    this.$httpBackend.verifyNoOutstandingRequest();
  });

  it('createNote should return a note', () => {
    this.$httpBackend.expectPOST(baseUrlNote, {name: 'test note', listId: '1234', content: 'test content'})
    .respond(200, {_id: '5678', name: 'test note', listId: '1234', content: 'test content'});

    this.noteService.createNote({name: 'test note', listId: '1234', content: 'test content'})
    .then( (note) => {
      expect(note._id).toBe('5678');
      expect(note.name).toBe('test note');
      expect(note.listId).toBe('1234');
    })
    .catch( (err) => {
      expect(err).toBe(null);
    });
    this.$httpBackend.flush();
  });

  it('deleteNote should delete a note', () => {
    this.$httpBackend.expectDELETE(`${baseUrlNote}/5678`)
    .respond({status: 'success'});

    this.noteService.deleteNote('5678')
    .then( (res) => {
      expect(res.status).toBe('success');
    }).catch( (err) => {
      expect(err).toBe(null);
    });
    this.$httpBackend.flush();
  });

});
// end noteService testing module
