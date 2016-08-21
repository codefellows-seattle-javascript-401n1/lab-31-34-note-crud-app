'use strict';



describe('testing noteService', function(){
  let baseUrl = 'http://localhost:3000/api/note';

  let headers = {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  };

  beforeEach(() => {
    angular.mock.module('demoApp');
    angular.mock.inject((noteService, $httpBackend) => {
      this.noteService = noteService;
      this.$httpBackend  = $httpBackend;
    });
  });

  afterEach(() => {
    this.$httpBackend.verifyNoOutstandingExpectation();
    this.$httpBackend.verifyNoOutstandingRequest();
  });

  it('createNote should return a new note', () => {
    this.$httpBackend.expectPOST(baseUrl, {name: 'New Name', content:'New Content', listId: '0987654321'}, headers)
    .respond(200, {_id:'1234567890', name: 'New Name', content:'New Content', listId:'0987654321', _v:0});
    this.noteService.createNote({name: 'New Name', content: 'New Content', listId: '0987654321'})
    .then(note => {
      expect(note._id).toBe('1234567890');
      expect(note.name).toBe('New Name');
      expect(note.content).toBe('New Content');
      expect(note.listId).toBe('0987654321');
    });
    this.$httpBackend.flush();
  });
  it('deleteNote should delete a note', () => {
    this.$httpBackend.expectDELETE(`${baseUrl}/1234567890`, {'Accept': 'application/json'})
    .respond(200, {_id: '1234567890', name: 'Smellon', content: 'Splicky note', listId: '54321', _v: 0});
    this.noteService.deleteNote('1234567890')
    .then(note => {
      expect(note._id).toBe('1234567890');
      expect(note.name).toBe('Smellon');
    });
    this.$httpBackend.flush();
  });
});
