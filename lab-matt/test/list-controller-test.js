'use strict';

describe('testing ListController', function() {
  beforeEach(() => {
    angular.mock.module('demoApp');
    angular.mock.inject(($controller, $httpBackend) => {
      this.$httpBackend = $httpBackend;
      this.listCtrl = new $controller('ListController');
    });
  });

  it('should have the controller', () => {
    expect(typeof this.listCtrl).toBe('object');
    expect(typeof this.listCtrl.createNote).toBe('function');
    expect(typeof this.listCtrl.deleteNote).toBe('function');
  });


  describe('testing listCtrl.createNote', () => {
    let baseUrl = 'http://localhost:3000/api';

    let headers = {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    };

    beforeEach(() => {
      this.listCtrl.list = {name: 'Mellon', notes: [{_id: '1234567890', name: 'New Name', content: 'New Content', listId: '0987654321', _v: 0}]};
      this.$httpBackend.expectPOST(`${baseUrl}/note`, {name: 'Apple', content: 'Orange'}, headers)
      .respond(200, {name: 'Apple', content: 'Orange', _id: '0987654321', _v: 0});
    });

    it('should return a note', () => {
      this.listCtrl.createNote({name: 'Apple', content: 'Orange'}).then(note => {
        console.log('Note: ', note);
        expect(note.name).toBe('Apple');
      }).catch(err => {
        expect(err).toBe(undefined);
      });
      this.$httpBackend.flush();
    });

  });
  describe('testing listCtrl.deleteNote', () => {
    beforeEach(() => {
      let baseUrl = 'http://localhost:3000/api';

      this.listCtrl.list = {name: 'New List', notes: []};
      this.$httpBackend.expectDELETE(`${baseUrl}/note/0987654321`).respond(200, {_id: '0987654321', name: 'New Note', content: 'New Content'});
    });
    it('should delete a note', () => {
      this.listCtrl.deleteNote('0987654321')
      .then(() => {
        expect(this.listCtrl.list.notes.length).toBe(0);
      });
      this.$httpBackend.flush();
    });
  });
});
