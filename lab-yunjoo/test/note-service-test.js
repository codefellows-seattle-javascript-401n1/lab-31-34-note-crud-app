/*global angular expect*/
'use strict';

describe('testing noteService', function(){
  var baseUrl = 'http://localhost:3000/api/note';

  var headers = {
    'Content-Type':'application/json',
    'Accept': 'application/json'
  };

  beforeEach(()=>{
    angular.mock.module('demoApp');
    angular.mock.inject((noteService, $httpBackend)=>{
      this.noteService = noteService;
      this.$httpBackend = $httpBackend;
    });
  });
  afterEach(()=>{
    this.$httpBackend.verifyNoOutstandingExpectation();
    this.$httpBackend.verifyNoOutstandingRequest();
  });
  it('should return a note',()=>{
    this.$httpBackend.expectPOST(baseUrl, {name:'example', content:'test'}, headers)
    .respond(200,{_id: '123', name: 'example', content: 'test', _v: 0});

    this.noteService.createNote({name: 'example', content:'test'})
    .then((note) => {
      expect(true).toBe(true);
      expect(note.name).toBe('example');
      expect(note.content).toBe('test');
    })
    .catch( err =>{
      expect(err).toBe(undefined);
    });
    this.$httpBackend.flush();
  });
  it('should delete a note',()=>{
    this.$httpBackend.expectDELETE(`${baseUrl}/123`, {'Accept': 'application/json'})
    .respond(204, { status: 'OK' });
    this.noteService.deleteNote('123')
    .then( note => {
      expect(note.name).toBe(undefined);
      expect(note.content).toBe(undefined);
    })
    .catch( err => {
      expect(err).toBe(undefined);
    });
    this.$httpBackend.flush();
  });
});
