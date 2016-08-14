'use strict';

describe('testing ListController', function() {
  beforeEach(() => {
    angular.mock.module('demoApp');
    angular.mock.inject(($controller, $httpBackend) => {
      this.$httpBackend = $httpBackend;
      this.listCtrl = new $controller('ListController');
    });
  });

  it('should get listCtrl', () => {
    expect(typeof this.listCtrl).toBe('object');
    expect(typeof this.listCtrl.createNote).toBe('function');
  });


  describe('testing listCtrl.createNote', () => {
    let baseUrl = 'http://localhost:3000/api';

    let headers = {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    };

    beforeEach(() => {
      this.listCtrl.list = {name: 'Mellon', notes: []};
      this.$httpBackend.expectPOST(`${baseUrl}/note`, {name: 'Apple', content: 'Orange'}, headers)
      .respond(200, {name: 'Apple', content: 'Orange', _id: '0987654321', _v: 0});
    });

    it('should return a note', () => {
      this.listCtrl.createNote({name: 'Apple', content: 'Orange'}).then(note => {
        console.log(note);
        expect(note.name).toBe('Apple');
      }).catch(err => {
        expect(err).toBe(undefined);
      });
      this.$httpBackend.flush();
    });
  });
});
