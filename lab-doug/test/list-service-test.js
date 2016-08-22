'use strict';
const baseUrl = 'http://localhost:3000/api/list';
const headers = {
  'Content-Type': 'application/json',
  'Accept': 'application/json'
};

describe('testing list service', function(){
  beforeEach(() => {
    angular.mock.module('widgetApp');
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
    this.$httpBackend.expectPOST(baseUrl, {name: 'ben'}, headers)
    .respond(200, {_id: '938374645f', name: 'ben', notes: [], _v: 0});
    this.listService.createList({name: 'ben'})//a promise that returns a list
    .then (list => {
      //'list: ', [Object{_id: '938374645f', name: 'ben', notes: [], _v: 0}]
      console.log('list[0]: ', list[0]);
      console.log('list[0].name', list[0].name);
      expect(list[0].name).toBe('ben');
      expect(list[0]._id).toBe('938374645f');
      expect(Array.isArray(list[0].notes)).toBe(true);
    })
    .catch();
    this.$httpBackend.flush();
  });
});
