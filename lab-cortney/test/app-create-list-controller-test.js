'use strict';

describe('testing AppCreateListController', function() {
  beforeEach( () => {
    angular.mock.module('noteApp');
    angular.mock.inject(($controller, $httpBackend) => {
      this.$httpBackend = $httpBackend;
      this.createListCtrl = new $controller('AppCreateListController');
    });
  });

  it('should get appCreateListCtrl', () => {
    expect(typeof this.createListCtrl).toBe('object');
    expect(typeof this.createListCtrl.createList).toBe('function');
  });


  describe('testing createListCtrl.createList', () => {
    let baseUrl = 'http://localhost:3000/api';

    let headers = {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    };

    beforeEach( () => {
      this.$httpBackend.expectPOST(`${baseUrl}/list`, {name: 'example', notes: []}, headers)
      .respond(200, {});
    });

    it('should clear the list form', () => {
      this.createListCtrl.list = {name: 'example', notes: []};
      this.createListCtrl.createList('example');
      expect(this.createListCtrl.list).toEqual({name: 'example', notes: []});
      this.$httpBackend.flush();
      expect(this.createListCtrl.list).toEqual({});
    });
  });

}); // end AppCreateListController test
