'use strict';

describe('testing the DisplayListcontroller', function() {

  beforeEach(() => {
    angular.mock.module('noteList');
    angular.mock.inject(($controller, $httpBackend) => {
      this.$httpBackend = $httpBackend;
      this.displayListCtrl = new $controller('DisplayListController');
    });
  });

  // afterEach(() => {
  //   this.$httpBackend.verifyNoOutstandingExpectation();
  //   this.$httpBackend.verifyNoOutstandingRequest();
  // });

  it('should get the DisplayListController', () => {
    expect(typeof this.displayListCtrl).toBe('object');
  });

  describe('testing the listController', () => {
    let url = 'http://localhost:3000/api';

    let headers = {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    };

    beforeEach(() => {
      this.displayListCtrl.list = {name: 'example list name', note: []};
      this.$httpBackend.expectPOST(`${url}/note`, {name: 'notey', content: 'notey\'s note'}, headers).respond(200, {name:'notey', content: 'notey\'s note', _id: '12345678', _v: 0});
    });

    it('should create a note', () => {
      this.displayListCtrl.createNote({name: 'notey', content: 'notey\'s note'})
      .then(note => {
        expect(note.name).toBe('notey');
      })
      .catch(err => {
        expect(err).toBe(undefined);
      });

      // this.$httpBackend.flush();
    });

    it('should delete a note', () => {
      this.$httpBackend.expectDELETE(`${url}/note`, {_id: '12345678'}, headers).respond(204, {});
      this.displayListCtrl.createNote({name: 'notey', content: 'notey\'s note'});
      this.displayListCtrl.deleteNote({_id: '12345678'})
      .then(note => {
        expect(note.name).toBe(undefined);
        expect(note.content).toBe(undefined);
      })
      .catch(err => {
        expect(err).toBe(undefined);
      });

      // this.$httpBackend.flush();
    });
  });
});
