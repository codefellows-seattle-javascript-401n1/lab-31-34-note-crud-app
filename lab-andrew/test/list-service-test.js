'use strict';

let baseUrl = 'http://localhost:3000/api/list';

let headers = {
  'Content-Type': 'application/json',
  'Accept': 'application/json'
};

describe('testing listService', function() {
  beforeEach(() => {
    angular.mock.module('noteApp');
    angular.mock.inject((listService, $httpBackend) => {
      this.listService = listService;
      this.$httpBackend = $httpBackend;
    });
  });

  afterEach(() => {
    this.$httpBackend.verifyNoOutstandingExpectation();
    this.$httpBackend.verifyNoOutstandingRequest();
  });

  it('createList should return a note', () => {
    this.$httpBackend.expectPOST(baseUrl, {name: 'example list'}, headers)
    .respond(200, {_id: '12345', name: 'example list', notes: [], _v: 0});

    this.listService.createList({name: 'example list'})
    .then(list => {
      expect(list._id).toBe('12345');
      expect(list.name).toBe('example list');
      expect(Array.isArray(list.notes)).toBe(true);
    })
    .catch(err => {
      expect(err).toBe(undefined);
    });
    this.$httpBackend.flush();
  });


  it('should return an array of lists', () => {
    
    this.$httpBackend.expectGET(baseUrl, {'Accept': 'application/json'})
    .respond(200, [{_id: '0', name: 'example list',  notes: []}]);

    this.listService.fetchLists()
    .then(lists => {
      expect(Array.isArray(lists)).toBe(true);
      expect(lists.length).toBe(1);
      expect(lists[0]).toEqual({_id: '0', name: 'example list', notes: []});
    });
    this.$httpBackend.flush();
  });

  it('should return deleted lists', () => {
    this.$httpBackend.expectDELETE(`${baseUrl}/12345`, {'Accept':'application/json'}).respond(204, {_id: '12345', name: 'example list', notes: []});

    this.listService.deleteList('12345')
    .then(list => {
      expect(list._id).toBe('12345');
      expect(list.name).toBe('example list');
    });
    this.$httpBackend.flush();
  });
});
