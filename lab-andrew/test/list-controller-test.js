'use strict';

describe('testing ListController', function() {
  beforeEach(() => {
    angular.mock.module('noteApp');
    angular.mock.inject(($controller, $httpBackend) => {
      this.$httpBackend = $httpBackend;
      this.listCtrl = new $controller('ListController');
    });
  });

  it('should get listCtrl', () => {
    expect(typeof this.listCtrl).toBe('object');
    expect(typeof this.listCtrl.createNote).toBe('function');
  });

  describe('test listCtrl.createNote', () => {
    let baseUrl = 'http//localhost:3000/api';

    let headers = {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    };

    beforeEach(() => {
      this.listCtrl.list = {name: 'example', notes: []};
      this.$httpBackend.expectPOST(`${baseUrl}/note`, {name: 'troll', content: 'troll talk'}, headers)
      .respond(200, {name: 'troll', content: 'troll talk', _id: '2131223', _v: 0});
    });

    it('should return a note', () => {
      this.listCtrl.createNote({name: 'troll', content: 'troll talk'})
      .then(note => {
        expect(note.name).toBe('troll');
      }).catch(err => {
      });
      this.$httpBackend.flush();
    });
  });
});
