'use strict';

const baseUrl = 'http://localhost:3000/api/list';
const headers = {
  'Content-Type': 'application/json',
  'Accept': 'application/json'
};

describe('testing listservice', function(){
  beforeEach(() => {
    angular.mock.module('galleryApp');
    angular.mock.inject((listService, $httpBackend) => {
      this.listService = listService;
      this.$httpBackend = $httpBackend;
    });
  });

  afterEach(() => {
    this.$httpBackend.verifyNoOutstandingExpectation();
    this.$httpBackend.verifyNoOutstandingRequest();
  });
  
  it('createList and should return note', () => {
    this.$httpBackend.expectPOST(baseUrl, {name: 'test list'}, headers)
    .respond(200, {_id: '12345', name: 'test list', notes: [], _v: 0});

    this.listService.createList({name: 'test list'})
    .then( list => {
      expect(list._id).toBe('12345');
      expect(list.name).toBe('test list');
      expect(Array.isArray(list.notes)).toBe(true);
    })
    .catch ( err => {
      expect(err).toBe(undefined);
    });
    this.$httpBackend.flush();
  });
});
