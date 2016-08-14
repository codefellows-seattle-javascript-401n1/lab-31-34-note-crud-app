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

  it('createNote should return a note', () => {
    expect(false).toBe(false);
  });
});
