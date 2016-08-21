'use strict';

describe('testing the list service', function(){
  let baseUrl = 'http://localhost:3000/api/list';

  let headers = {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  };

  beforeEach(() => {
    angular.mock.module('noteList');
    angular.mock.inject(( listService, $httpBackend ) => {
      this.listService = listService;
      this.$httpBackend = $httpBackend;
    });
  });

  afterEach(() => {
    this.$httpBackend.verifyNoOutstandingExpectation();
    this.$httpBackend.verifyNoOutstandingRequest();
  });

  it('should return a list from listService', () => {
    this.$httpBackend.expectPOST(baseUrl, {name: 'example list name'}, headers)
    .respond(200, {_id:'123456789', name: 'example list name', notes: [], _v: 0});

    this.listService.createList({name: 'example list name'})
    .then( list => {
      expect(list._id).toBe('123456789');
      expect(list.name).toBe('example list name');
    }).catch( err => {
      expect(err).toBe(undefined);
    });

    this.$httpBackend.flush();
  });

  it('should fetch the lists', () => {
    this.$httpBackend.expectGET(baseUrl, {'Accept': 'application/json'}).respond(200, this.listService.lists);

    this.listService.fetchLists()
    .then(list => {
      expect(list).toBe(this.listService.lists);
    })
    .catch(err => {
      expect(err).toBe(undefined);
    });

    this.$httpBackend.flush();
  });

  it('should update the list', () => {
    this.$httpBackend.expectPUT(`${baseUrl}/123456789`, {name: 'new list name', _id: '123456789'}, headers).respond(200, {_id: '123456789',name: 'new list name', notes: []});

    this.listService.updateList({name: 'new list name', _id: '123456789'})
    .then(list => {
      expect(list.name).toBe('new list name');
      expect(list._id).toBe('123456789');
    })
    .catch(err => {
      expect(err).toBe(undefined);
    });

    this.$httpBackend.flush();
  });

  it('should delete a list', () => {
    this.$httpBackend.expectDELETE(`${baseUrl}/123456789`, {'Accept': 'application/json'}).respond(204, {});

    this.listService.deleteList('123456789')
    .then(list => {
      expect(list.name).toBe(undefined);
      expect(list.notes).toBe(undefined);
    })
    .catch(err => {
      expect(err).toBe(undefined);
    });

    this.$httpBackend.flush();
  });
});
