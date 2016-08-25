'use strict';


describe('testing list controller', function(){
  beforeEach(() => {
    angular.mock.module('widgetApp');
    angular.mock.inject(($controller, $httpBackend) => {
      this.$httpBackend = $httpBackend;
      this.listCtrl = new $controller('ListController');
    });
  });

  afterEach(() => {
    this.$httpBackend.verifyNoOutstandingExpectation();
    this.$httpBackend.verifyNoOutstandingRequest();
  });

  describe('listCtrl.createNote()', () => {

    let baseUrl = 'http://localhost:3000/api';
    let headers = {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    };

    beforeEach(() => {
      this.listCtrl.list =  { name: 'simone', notes: [] };
      this.$httpBackend.expectPOST(`${baseUrl}/note`, { name: 'listCtrlTest-score', content: 'miss'}, headers)
      .respond(200, { _id: '345678d', name: 'listCtrlTest-score', content: 'miss',_v: 0});
    });

    it('should create a note', () => { this.listCtrl.createNote({name: 'listCtrlTest-score', content: 'miss'})
      .then(note => {
        expect(note.name).toBe('listCtrlTest-score');
        expect(note.content).toBe('miss');
        expect(typeof note).toBe('object');
        expect(this.listCtrl.list.notes[0].name).toBe('listCtrlTest-score');

      })
      .catch(err => console.log(err));
      this.$httpBackend.flush();
    });
  });

  describe('listCtrl.deleteNote()', () => {

    let baseUrl = 'http://localhost:3000/api';
    let headers = {
      'Accept': 'application/json'
    };

    beforeEach(() => {
      this.listCtrl.list =  { name: 'simone', notes: [] };
      this.$httpBackend.expectDELETE(`${baseUrl}/note/345678d`, headers)
      .respond(200, { _id: '345678d', name: 'deletednote', content: 'test2',_v: 0});
    });

    it('should delete a note', () => {
      this.listCtrl.deleteNote('345678d')
      .then(note => {
        expect(note.name).toBe('deletednote');
        expect(note.content).toBe('test2');
        expect(typeof note).toBe('object');
        expect(this.listCtrl.list.notes[0]).toBe(undefined);

      })
      .catch(err => console.log(err));
      this.$httpBackend.flush();
    });
  });

  describe('listCtrl.deleteList()', () => {

    let baseUrl = 'http://localhost:3000/api';
    let headers = {
      'Accept': 'application/json'
    };

    beforeEach(() => {
      this.listCtrl.list =  { _id: '5ka10f8653481f70fc61f71d', name: 'simone', notes: [] };
      this.$httpBackend.expectDELETE(`${baseUrl}/list/5ka10f8653481f70fc61f71d`, headers)
      .respond(200, { _id: '5ka10f8653481f70fc61f71d', name: 'todo list', notes: [],_v: 0});
    });

    it('should delete a list', () => {
      this.listCtrl.deleteList()
      .then(list => {
        expect(list.name).toBe('todo list');
        expect(list._id).toBe('5ka10f8653481f70fc61f71d');
        expect(typeof list).toBe('object');
      })
      .catch(err => console.log(err));
      this.$httpBackend.flush();
    });
  });


});
