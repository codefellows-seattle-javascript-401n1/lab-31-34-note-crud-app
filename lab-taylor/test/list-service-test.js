'use strict';

const baseUrl = 'http://localhost:3000/api/list';
const headers = {
  'Content-Type': 'application/json',
  'Accept': 'application/json'
};

describe('testing listService', function() {
  beforeEach(() => {
    angular.mock.module('noteApp');
    angular.mock.inject((listService, $httpBackend) => {
      this.listService = listService;
      this.httpBackend = $httpBackend;
    });
  });

  afterEach(() => {
    this.httpBackend.verifyNoOutstandingRequest();
    this.httpBackend.verifyNoOutstandingExpectation();
  });

  it('createList should return a list', () => {
    this.httpBackend.expectPOST(baseUrl, {name: 'testList'}, headers)
    .respond(200, {_id: '0', name: 'testList', notes:[]});

    this.listService.createList({name: 'testList'})
    .then(list => {
      expect(list._id).toBe('0');
      expect(list.name).toBe('testList');
      expect(Array.isArray(list.notes)).toBe(true);
    })
    .catch(err => console.log(err));
    this.httpBackend.flush();
  });

  it('fetchLists should return an array of lists', () => {
    this.httpBackend.expectGET(baseUrl)
    .respond(200, [{_id: '0', name: 'testList', notes: []}]);

    this.listService.fetchLists()
    .then(lists => {
      expect(Array.isArray(lists)).toBe(true);
      expect(lists.length).toBe(1);
      expect(lists[0]).toBe.an('object');
      expect(lists[0]).toEqual({_id: '0', name: 'testList', notes: []});
    });
  });

  it('deleteList should return the deleted list', () => {
    this.httpBackend.expectDELETE(`${baseUrl}/1234`)
    .respond(204, {_id:'1234', name:'testList', notes:[]});

    this.listService.deleteList('1234')
    .then(list => {
      expect(list._id).toBe('1234');
      expect(list.name).toBe('testList');
      expect(Array.isArray(list.notes)).toBe(true);
    });
  });
});
