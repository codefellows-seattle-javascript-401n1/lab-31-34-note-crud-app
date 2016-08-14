'use strict';

const controllerUrl = 'http://localhost:3000/api';

describe('testing ListController', () => {
  beforeEach(() => {
    angular.mock.module('noteApp');
    angular.mock.inject(($controller, $httpBackend) => {
      this.httpBackend = $httpBackend;
      this.listCtrl = new $controller('ListController');
    });
  });

  it('should have the controller', () => {
    expect(typeof this.listCtrl).toBe('object');
    expect(typeof this.listCtrl.createNote).toBe('function');
    expect(typeof this.listCtrl.deleteNote).toBe('function');
  });

  describe('testing listCtrl.createNote', () => {
    beforeEach(() => {
      this.listCtrl.list = {name: 'testList', notes: []};
      this.httpBackend.expectPOST(`${controllerUrl}/note`, {name: 'testNote', content: 'testContent'})
      .respond(200, {_id: '1234', name: 'testNote', content:'testContent'});
    });

    it('should return a list', () => {
      this.listCtrl.createNote({name:'testNote', content:'testContent'})
      .then(note => {
        expect(note.name).toBe('testNote');
        expect(note.content).toBe('testContent');
        expect(this.listCtrl.list.notes[0].name).toBe('testNote');
      });
      this.httpBackend.flush();
    });
  });

  describe('testing listCtrl.deleteNote', () => {
    beforeEach(() => {
      this.listCtrl.list = {name: 'testList', notes: []};
      this.httpBackend.expectDELETE(`${controllerUrl}/note/1234`)
    .respond(200, {_id: '1234', name: 'testNote', content:'testContent'});
    });

    it('should delete a note', () => {
      this.listCtrl.deleteNote('1234')
      .then(() => {
        expect(this.listCtrl.list.notes.length).toBe(0);
      });
      this.httpBackend.flush();
    });
  });
});
