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

  it('createList should return a list', () => {
    this.$httpBackend.expectPOST(baseUrl, {name: 'example list'}, headers)
    .respond(200, {_id: '57538738758375893', name: 'example list', notes: [], _v: 0});

    this.listService.createList(baseUrl, {name: 'example list'}, headers)
    .then((list) => {
      expect(list._id).toBe('57538738758375893');
      expect(list.name).toBe('example list');
      expect(Array.isArray(list.notes)).toBe(true);
    })
    .catch((err) => {
      expect(err).toBe(undefined);
    });

    this.$httpBackend.flush();
  });
}); // end listService test module
