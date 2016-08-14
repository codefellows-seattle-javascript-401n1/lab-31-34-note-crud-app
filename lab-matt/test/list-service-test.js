'use strict';



describe('testing listService', function(){
  let baseUrl = 'http://localhost:3000/api/list';

  let headers = {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  };
  
  beforeEach(() => {
    angular.mock.module('demoApp');
    angular.mock.inject((listService, $httpBackend) => {
      this.listService = listService;
      this.$httpBackend  = $httpBackend;
    });
  });

  afterEach(() => {
    this.$httpBackend.verifyNoOutstandingExpectation();
    this.$httpBackend.verifyNoOutstandingRequest();
  });

  it('createList should return a new list', () => {
    this.$httpBackend.expectPOST( baseUrl, {name: 'Mellon List'}, headers)
    .respond(200, {_id: '1234567890', name: 'Mellon List', notes: [], _v:0});

    this.listService.createList({name: 'Mellon List'})
    .then( list => {
      expect(list._id).toBe('1234567890');
      expect(list.name).toBe('Mellon List');
      expect(Array.isArray(list.notes)).toBe(true);
    })
    .catch(err => {
      expect(err).toBe(undefined);
    });
    this.$httpBackend.flush();
  });
  it('fetchLists should return all lists', () => {
    this.$httpBackend.expectGET( baseUrl )
    .respond(200, [{_id: '1234567890', name: 'Mellon List', notes: [], _v:0}]);
    this.listService.fetchLists()
    .then( array => {
      expect(array[0]._id).toBe('1234567890');
      expect(array[0].name).toBe('Mellon List');
      expect(Array.isArray(array[0].notes)).toBe(true);


    })
    .catch(err => {
      expect(err).toBe(undefined);
    });
    this.$httpBackend.flush();
  });
  it('updateList should update a list', () => {
    this.$httpBackend.expectPUT( `${baseUrl}/1234567890`,{_id: '1234567890', name: 'Smellon', notes: [], _v:0}, headers)
    .respond(200, {_id: '1234567890', name: 'Smellon', notes: [], _v:0});
    this.listService.updateList({_id: '1234567890', name: 'Smellon', notes: [], _v:0})
    .then(list => {
      expect(list._id).toBe('1234567890');
      expect(list.name).toBe('Smellon');
      expect(Array.isArray(list.notes)).toBe(true);
    })
    .catch(err => {
      expect(err).toBe(undefined);
    });
    this.$httpBackend.flush();
  });
  it('deleteList should remove a list', () => {
    this.$httpBackend.expectDELETE(`${baseUrl}/1234567890`, {'Accept': 'application/json'})
    .respond(200, {_id: '1234567890', name:'Smellon', notes: [], _v:0});
    this.listService.deleteList('1234567890')
    .then(list => {
      expect(list._id).toBe('1234567890');
      expect(list.name).toBe('Smellon');
    });
    this.$httpBackend.flush();
  });
});
