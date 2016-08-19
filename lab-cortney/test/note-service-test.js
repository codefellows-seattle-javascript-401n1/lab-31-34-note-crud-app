'use strict';

let baseUrl = 'http://localhost:3000/api/note';

let headers = {
  'Content-Type': 'application/json',
  'Accept': 'application/json'
};

describe('testing noteService', function() {

  beforeEach( () => {
    angular.mock.module('noteApp');
    angular.mock.inject((noteService, $httpBackend) => {
      this.noteService = noteService;
      this.$httpBackend = $httpBackend;
    });
  });

  afterEach( () => {
    this.$httpBackend.verifyNoOutstandingExpectation();
    this.$httpBackend.verifyNoOutstandingRequest();
  });

  it('createNote should return a note', () => {
    // stuff and things
  })

}); // end noteService testing module
