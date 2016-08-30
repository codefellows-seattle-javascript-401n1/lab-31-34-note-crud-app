'use stict';

describe('testing ListController', function(){
  beforeEach(() => {
    angular.mock.module('galleryApp');
    angular.mock.inject(($controller, $httpBackend) => {
      this.$httpBackend = $httpBackend;
      this.listCtrl = new $controller('ListController');
    });
  });
  it('should get listCtrl', () => {
    expect(typeof this.listCtrl).toBe('object');
    expect(typeof this.listCtrl.createNote).toBe('function');
  });
//
  describe('testing listCtrl.createNote', () => {
    let baseUrl = 'http://localhost:3000/api';
    let headers = {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    };

    beforeEach(() => {
      this.listCtrl.list = {name: 'helloKitty', notes: []};
      this.$httpBackend.expectPOST(`${baseUrl}/note`, {name: 'helloKitty', content: 'meow'}, headers)
      .respond(200, {name: 'helloKitty', content: 'meow', _id: '123456', _v: 0});
    });

    it('should return a note', () => {
      this.listCtrl.createNote({name: 'helloKitty', content: 'meow'})
      .then (note => {
        expect(note.name).toBe('helloKitty');
      }).catch(err => {
        console.log(err);
      });
      this.$httpBackend.flush();
    });
  });
//
  describe('testing listCtrl.deleteList', () => {
    let baseUrl = 'http://localhost:3000/api';

    beforeEach(() => {
      this.listCtrl.list = {_id: '666', name: 'helloKitty', notes: []};
      this.$httpBackend.expectDELETE(`${baseUrl}/list/666`)
      .respond(200, {name: 'helloKitty', _id: '666', notes:[], _v: 0});
    });

    it('should delete a list', () => {
      this.listCtrl.deleteList.call(this.listCtrl)
      .then (list => {
        expect(list.name).toBe('helloKitty');
        expect(list._id).toBe('666');
      }).catch(err => {
        console.log(err);
      });
      this.$httpBackend.flush();
    });
  });
//
  describe('testing listCtrl.deleteNote', () => {
    let baseUrl = 'http://localhost:3000/api';

    beforeEach(() => {
      this.listCtrl.list = {};
      this.listCtrl.list.notes = [{listId: '888', name: 'Sunday', content: 'icecream', _id: '123456', _v: 0}];

      this.$httpBackend.expectDELETE(`${baseUrl}/note/123456`)
      .respond(200, {listId: '888', name: 'Sunday', content: 'icecream', _id: '123456', _v: 0});
    });

    it('should delete a note', () => {
      this.listCtrl.deleteNote.call(this.listCtrl, '123456')

      .then (note => {
        expect(note.name).toBe('Sunday');
        expect(this.listCtrl.list.notes.length).toBe(0);
      }).catch(err => {
        console.log(err);
      });

      this.$httpBackend.flush();
    });
  });

});
