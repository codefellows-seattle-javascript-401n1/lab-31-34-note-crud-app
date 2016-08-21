'use strict';

// const baseUrl = 'http://localhost:3000/api';
// const headers = {
//   'Content-Type': 'application/json',
//   'Accept': 'application/json'
// };

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
//TEST: createList
  it('TEST: createList', () => {
    this.$httpBackend.expectPOST(`${baseUrl}/list`)
    // this.$httpBackend.expectPOST(`${baseUrl}/list`, {name: 'test list'}, headers)
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
//TEST: fetchLists
  it('TEST: fetchlists', () => {
    this.$httpBackend.expectGET(`${baseUrl}/list`)
    .respond(200, {_id: '12345', name: 'test list', notes: [], _v: 0});

    this.listService.fetchLists()
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
//TEST: deleteList
  it('TEST: deleteList', () => {
    this.$httpBackend.expectDELETE(`${baseUrl}/list/10000`)
    .respond(200, {_id: '10000', name: 'test list', notes: [], _v: 0});
    this.listService.deleteList('10000')
    .then( list => {
      expect(list._id).toBe('10000');
      expect(list.name).toBe('test list');
      expect(Array.isArray(list.notes)).toBe(true);
    })
    .catch ( err => {
      expect(err).toBe(null);
    });
    this.$httpBackend.flush();
  });
  // TEST: updateList
  it('TEST: updateList', () => {
    console.log('RESULT OF PUT:', this.listService.list);
    this.$httpBackend.expectPUT(`${baseUrl}/list/0000`)
    // this.$httpBackend.expectPUT(`${baseUrl}/list/12345`, {name: 'test list'}, headers)
    .respond(200, {_id: '0000', name: 'bloody moon', notes: [], _v: 0});
    this.listService.updateList({ _id: '0000' })
    .then( list => {
      // expect(res.data._id).toBe('12345');
      expect(list._id).toBe('0000');
      expect(list.name).toBe('bloody moon');
      expect(Array.isArray(list.notes)).toBe(true);
    })
    .catch ( err => {
      expect(err).toBe(null);
    });
    this.$httpBackend.flush();
  });
});
