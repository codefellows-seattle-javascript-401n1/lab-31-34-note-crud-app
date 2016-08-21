'use strict';

let baseUrl = 'http://localhost:3000/api/';

let headers = {
  'Content-Type': 'application/json',
  'Accept': 'application/json'
};

describe('testing noteService', function(){
  beforeEach(() => {
    angular.mock.module('listApp');
    angular.mock.inject(( noteService, $httpBackend) => {
      this.noteS = noteService;
      this.$httpBackend = $httpBackend;
    })
  });

  afterEach(() => {
    this.$httpBackend.verifyNoOutstandingExpectation();
    this.$httpBackend.verifyNoOutstandingRequest();
  });

  it('createNote should return a note', () => {
    this.$httpBackend.expectPOST( baseUrl + 'note', {name: 'example note', content: 'i\'m a note', listId: 'e01701000'}, headers)
    .respond(200, {_id: '888788887887', name: 'example note', content: 'i\'m a note', listId: 'e01701000', _v: 0 });

    this.noteS.createNote({name: 'example note', content: 'i\'m a note', listId: 'e01701000'})
    .then( note => {
      expect(note._id).toBe('888788887887');
      expect(note.name).toBe('example note');
      expect(note.content).toBe('i\'m a note');
    })
    .catch( err => {
      expect(err).toBe(undefined);
    });

    this.$httpBackend.flush();
  });

  it('deleteNote should return a deleted note', () => {
    this.$httpBackend.expectDELETE( baseUrl+ 'note/888788887887')
    .respond(200, {_id: '888788887887', name: 'example note', content: 'i\'m a note', listId: 'e01701000', _v: 0 });

    this.noteS.deleteNote('888788887887')
    .then( note => {
      expect(note._id).toBe('888788887887');
      expect(note.name).toBe('example note');
      expect(note.content).toBe('i\'m a note');
    })
    .catch( err => {
      expect(err).toBe(undefined);
    });

    this.$httpBackend.flush();
  });
})
