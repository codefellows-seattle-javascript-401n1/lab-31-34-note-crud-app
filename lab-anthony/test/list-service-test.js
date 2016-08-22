'use strict';

//set baseUrl
var baseUrl = 'http://localhost:3000/api/list';

//set headers
var headers = {
  'Content-Type': 'application/json',
  'Accept': 'application/json'
};

describe('Testing the listService', function(){
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

  it('createList should return a list', () => {
    this.$httpBackend.expectPOST(baseUrl, {name: 'test list'}, headers)
    .respond(200, {_id: '12345', name: 'test list', notes: [], _v: 0});

    this.listService.createList({name: 'test list'})
    .then((list) => {
      expect(list._id).toBe('12345');
      expect(list.name).toBe('test list');
      expect(Array.isArray(list.notes)).toBe(true);
    })
    .catch((err) => {
      expect(err).toBe(undefined);
    });

    this.$httpBackend.flush();
  });

  it('getLists should return a list', () => {
    this.$httpBackend.expectGET(baseUrl)
    .respond(200, [{test: true}]);

    this.listService.getLists()
    .then((lists) => {
      expect(lists).toEqual([{test: true}]);
      expect(lists[0].test).toEqual(true);
    })
    .catch((err) => {
      expect(err).toBe(undefined);
    });

    this.$httpBackend.flush();
  });

  it('deleteList should remove a list', () => {
    this.listService.lists = [{_id: '12345'}, {_id: '54321'}];

    this.$httpBackend.expectDELETE(`${baseUrl}/12345`)
    .respond(200, [{_id: '54321'}]);

    this.listService.deleteList('12345')
    .then((lists) => {
      expect(lists).toEqual([{_id: '54321'}]);
      expect(this.listService.lists).toEqual([{_id: '54321'}]);
    })
    .catch((err) => {
      expect(err).toBe(undefined);
    });

    this.$httpBackend.flush();
  });

});
