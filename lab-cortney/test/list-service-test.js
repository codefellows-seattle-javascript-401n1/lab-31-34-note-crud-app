'use strict';

var baseUrlList = 'http://localhost:3000/api/list';

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
    this.$httpBackend.expectPOST(baseUrlList, {name: 'example list'}, headers)
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

  it('fetchLists should fetch a list', () => {

    beforeEach( () => { // create list to fetch
      this.listService.createList({name: 'example list 2'})
      .then( (list) => {
        resolve(list);
      })
      .catch( (err) => {
        reject(err);
      });
    });

    this.$httpBackend.expectGET(baseUrlList, {'Accept': 'application/json'})
    .respond(200, {status: 'success', _id: '12345678', name: 'example list 2', notes: [], _v: 0});

    this.listService.fetchLists()
    .then( (list) => {
      expect(list._id).toBe('12345678');
      expect(list.name).toBe('example list 2');
    })
    .catch( (err) => {
      expect(err).toBe(null);
    });
    this.$httpBackend.flush();
  });

  it('updateList should update a list', () => {

    beforeEach( () => { // create list to update
      this.listService.createList({name: 'example list 3'})
      .then( (list) => {
        resolve(list);
      })
      .catch( (err) => {
        reject(err);
      });
    });

    this.$httpBackend.expectPUT(`${baseUrlList}/12345678`, {_id: '12345678', name: 'updated example list 3'}, headers)
    .respond(200, {status: 'success', _id: '12345678', name: 'updated example list 3', notes: [], _v: 0});

    this.listService.updateList({_id: '12345678',name: 'updated example list 3'})
    .then( (list) => {
      expect(list._id).toBe('12345678');
      expect(list.name).toBe('updated example list 3');
    })
    .catch( (err) => {
      expect(err).toBe(null);
    });
    this.$httpBackend.flush();
  });

  it('deleteList should delete a list', () => {

    beforeEach( () => { // create list to baleet
      this.listService.createList({name: 'example list 4'})
      .then( (list) => {
        resolve(list);
      })
      .catch( (err) => {
        reject(err);
      });
    });

    this.$httpBackend.expectDELETE(`${baseUrlList}/2345`)
    .respond({status: 'success'});

    this.listService.deleteList(2345)
    .then( (res) => {
      expect(res.status).toBe('success');
    })
    .catch( (err) => {
      expect(err).toBe(null);
    });
    this.$httpBackend.flush();
  });

}); // end listService test module
