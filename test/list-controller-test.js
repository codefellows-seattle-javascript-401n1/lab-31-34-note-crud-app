'use strict';

describe('testing ListController', function(){
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
      this.listCtrl.list = {name: 'example', notes: []};
      this.$httpBackend.expectPOST(`${baseUrl}/note`, {name: 'Angular', content: 'shark teeth'}, headers)
      .respond(200, {name: 'Angular', content: 'shark teeth', _id: '2131223', _v: 0});
    });

    it('should return a note', () => {
      this.listCtrl.createNote({name: 'Angular', content: 'shark teeth'})
      .then (note => {
        console.log(note);
        expect(note.name).toBe('Angular');
      }).catch(err => {
        console.error(err);
      });
      this.$httpBackend.flush();
    });
  });

  describe('testing listCtrl.deleteNote', () => {
    let baseUrl = 'http://localhost:3000/api';

    beforeEach(() =>{
      this.listCtrl.list = {};
      this.listCtrl.list.notes = [{name: 'Angular', content: 'shark teeth', _id: '2131223', _v: 0}];
      this.$httpBackend.expectDELETE(`${baseUrl}/note/2131223`)
      .respond(200, { _id: '2131223'});
    });

    it('should delete a note', () => {
      this.listCtrl.deleteNote.call(this.listCtrl,'2131223')
      .then (note => {
        console.log(note);
        expect(note._id).toBe('2131223');
        expect(this.listCtrl.list.notes.length).toBe(0);
      }).catch(err => {
        console.error(err);
      });
      this.$httpBackend.flush();
    });
  });

});
