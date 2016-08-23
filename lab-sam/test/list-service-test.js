'use strict';

// let baseUrl = 'http://localhost:3000/api/';
//
// let headers = {
//   'Content-Type': 'application/json',
//   'Accept': 'application/json'
// };

describe('testing listService', function(){
  beforeEach(() => {
    angular.mock.module('listApp');
    angular.mock.inject(( listService, $httpBackend) => {
      this.listS = listService;
      this.$httpBackend = $httpBackend;
    })
  });

  afterEach(() => {
    this.$httpBackend.verifyNoOutstandingExpectation();
    this.$httpBackend.verifyNoOutstandingRequest();
  });

  it('createNote should return a list', () => {
    this.$httpBackend.expectPOST( baseUrl + 'list', {name: 'example list'}, headers)
    .respond(200, {_id: '888788887887', name: 'example note', notes: [], _v: 0 });

    this.listS.createList({name: 'example list'})
    .then( list => {
      expect(list._id).toBe('888788887887');
      expect(list.name).toBe('example note');
      expect(Array.isArray(list.notes)).toBe(true);
    })
    .catch( err => {
      expect(err).toBe(undefined);
    });

    this.$httpBackend.flush();
  });

  it('fetchLists should return an array of lists', () => {
    this.$httpBackend.expectGET( baseUrl + 'list')
    .respond(200, [{_id: '888788887887', name: 'example note', notes: [], _v: 0 }, {_id: '888188889889', name: 'example note2', notes: [], _v: 0 }]);

    this.listS.fetchLists()
    .then( lists => {
      expect(Array.isArray(lists)).toBe(true);
    })
    .catch( err => {
      expect(err).toBe(undefined);
    });

    this.$httpBackend.flush();
  });

  it('updateList should return a list', () => {
    this.$httpBackend.expectPUT( baseUrl + 'list/888788887887', {_id: '888788887887', name: 'example list', notes: []},  headers)
    .respond(200, {_id: '888788887887', name: 'example note', notes: [], _v: 0 });

    this.listS.updateList({_id: '888788887887', name: 'example list', notes: []})
    .then( list => {
      expect(list._id).toBe('888788887887');
      expect(list.name).toBe('example note');
      expect(Array.isArray(list.notes)).toBe(true);
    })
    .catch( err => {
      expect(err).toBe(undefined);
    });

    this.$httpBackend.flush();
  });

  it('deleteList should return a deleted list', () => {
    this.$httpBackend.expectDELETE( baseUrl + 'list/888788887887')
    .respond(200, {_id: '888788887887', name: 'example doom', notes: [], _v: 0 });

    this.listS.deleteList('888788887887')
    .then( list => {
      expect(list._id).toBe('888788887887');
      expect(list.name).toBe('example doom');
      expect(Array.isArray(list.notes)).toBe(true);
    })
    .catch( err => {
      expect(err).toBe(undefined);
    });

    this.$httpBackend.flush();
  });
})
