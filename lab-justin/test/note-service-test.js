'use strict';

const baseUrl = 'http://localhost:3000/api';
const headers = {
  'Content-Type': 'application/json',
  'Accept': 'application/json'
};

describe('testing noteservice', function(){
  beforeEach(() => {
    angular.mock.module('galleryApp');
    angular.mock.inject((noteService, $httpBackend) => {
      this.noteService = noteService;
      this.$httpBackend = $httpBackend;
    });
  });

  afterEach(() => {
    this.$httpBackend.verifyNoOutstandingExpectation();
    this.$httpBackend.verifyNoOutstandingRequest();
  });

  it('TEST: noteService-createNote', () => {
    this.$httpBackend.expectPOST(`${baseUrl}/note`, {name: 'test note'}, headers)
    .respond(200, {_id: '12345', name: 'test note', notes: [], _v: 0});
    this.noteService.createNote({name: 'test note'})
    .then ( list => {
      expect(true).toBe(true);
      expect(list.name).toBe('test note');
    })
    .catch( err => {
      expect(err).toBe(undefined);
    });
    this.$httpBackend.flush();
  });

  it('TEST: noteService-deleteNote', () => {
    this.$httpBackend.expectDELETE(`${baseUrl}/note/[object Object]`)
    .respond(204, {_id: '12345', name: 'test note', notes: [], _v: 0});
    this.noteService.deleteNote({name: 'test note'})
    .then ( list => {
      expect(true).toBe(true);
    })
    .catch( err => {
      expect(err).toBe(undefined);
    });
    this.$httpBackend.flush();
  });
});
