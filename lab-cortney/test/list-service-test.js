'use strict';

var baseUrl = 'http://localhost:3000/api/list';

var headers = {
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
    .respond(200, {status: 'success', _id: '57538738758375893', name: 'example list', notes: [], _v: 0});

    this.listService.createList({name: 'example list'})
    .then((list) => {
      expect(list._id).toBe('57538738758375893');
      expect(list.name).toBe('example list');
      expect(Array.isArray(list.notes)).toBe(true);
    })
    .catch((err) => {
      expect(err).toBe(null);
    });

    this.$httpBackend.flush();
  });
}); // end listService test module
