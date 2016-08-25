'use strict';

const listBaseUrl = 'http://localhost:3000/api/list';
const listHeaders = {
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

  it('should return a list from service.createList()', () => {
    this.$httpBackend.expectPOST(listBaseUrl, {name: 'ben'}, listHeaders)
    .respond(200, {_id: '938374645f', name: 'ben', notes: [], _v: 0});
    this.listService.createList({name: 'ben'})//a promise that returns a list
    .then (list => {
      expect(list.name).toBe('ben');
      expect(list._id).toBe('938374645f');
      expect(Array.isArray(list.notes)).toBe(true);
      expect(typeof list.notes).toBe('object');
    })
    .catch();
    this.$httpBackend.flush();
  });

  it('should return all lists from service.fetchLists()', () => {
    this.$httpBackend.expectGET(listBaseUrl, {'Accept': 'application/json, text/plain, */*'})
    .respond(200, [{name: 'score'}, {name: 'competition'}, {name:'match'}]);
    this.listService.fetchLists()//a promise that returns an array of lists
    .then (lists => {
      expect(lists[0].name).toBe('score');
      expect(lists[1].name).toBe('competition');
      expect(lists[2].name).toBe('match');
    })
    .catch();
    this.$httpBackend.flush();
  });

  it('should return an updated list from service.updateList()', () => {
    this.$httpBackend.expectPUT(`${listBaseUrl}/938374645f`, {_id: '938374645f', name: 'billy', notes: [{name: 'score'}], _v: 0 }, listHeaders)
    .respond(200, {_id: '938374645f', name: 'billy', notes: [{name: 'score'}], _v: 0});
    this.listService.updateList({_id: '938374645f', name: 'billy', notes: [{name: 'score'}], _v: 0 })//a promise that returns a list
    .then (list => {
      expect(list.name).toBe('billy');
      expect(list._id).toBe('938374645f');
      expect(list.notes[0].name).toBe('score');
    })
    .catch();
    this.$httpBackend.flush();
  });

  it('should delete a specific list using service.deleteList()', () => {
    this.$httpBackend.expectDELETE(`${listBaseUrl}/938374645f`, {'Accept':'application/json'})
    .respond(200, {_id: '938374645f', name: 'billy', notes: [{name: 'score'}], _v: 0});
    this.listService.deleteList('938374645f')
    .then (list => {
      expect(list.name).toBe('billy');
      expect(list._id).toBe('938374645f');
      expect(list.notes[0].name).toBe('score');
    })
    .catch();
    this.$httpBackend.flush();
  });



});
