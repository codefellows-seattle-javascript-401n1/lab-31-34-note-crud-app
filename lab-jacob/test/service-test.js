'use strict';

describe('testing the list and note services', function(){
  let baseUrl = 'http://localhost:3000/api/list';

  let headers = {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  };

  beforeEach(() => {
    angular.mock.module('noteList');
    angular.mock.inject(( listService, $httpBackend ) => {
      this.listService = listService;
      this.$httpBackend = $httpBackend;
    });
  });

  afterEach(() => {
    this.$httpBackend.verifyNoOutstandingExpectation();
    this.$httpBackend.verifyNoOutstandingRequest();
  });

  it('should return a note from listService', () => {
    this.$httpBackend.expectPOST(baseUrl, {name: 'example list name'}, headers)
    .respond(200, {_id:'123456789', name: 'example list name', notes: [], _v: 0});

    this.listService.createList({name: 'example list name'})
    .then( list => {
      expect(list._id).toBe('123456789');
      expect(list.name).toBe('example list name');
    }).catch( err => {
      expect(err).toBe(undefined);
    });

    this.$httpBackend.flush();
  });
});
