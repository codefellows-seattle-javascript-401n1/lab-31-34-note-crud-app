'use strict';


describe('testing list controller', function(){
  beforeEach(() => {
    angular.mock.module('widgetApp');
    angular.mock.inject(($controller, $httpBackend) => {
      this.$httpBackend = $httpBackend;
      this.listCtrl = new $controller('ListController');
    });
  });

  // afterEach(() => {
  //   this.$httpBackend.verifyNoOutstandingExpectation();
  //   this.$httpBackend.verifyNoOutstandingRequest();
  // });

  describe('listCtrl.createNote()', () => {

    let baseUrl = 'http://localhost:3000/api';
    let headers = {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    };

    beforeEach(() => {
      this.listCtrl.list =  { name: 'simone', notes: [] };
      this.$httpBackend.expectPOST(`${baseUrl}/note`, { name: 'listCtrlTest-score', content: 'miss'}, headers)
      .respond(200, { _id: '345678d', name: 'listCtrlTest-score', content: 'miss', _v: 0});
    });

    it('should create a note', () => {
      this.listCtrl.createNote({name: 'listCtrlTest-score', content: 'miss'})
      .then(note => {
        console.log('new note from createNote() in list-controller-test.js: ', note);
        expect(note.name).toBe('listCtrlTest-score');
        expect(note.content).toBe('miss');
        expect(typeof note).toBe('object');
        expect(this.listCtrl.notes[0].name).toBe('score');
      })
      .catch(err => {
        console.log('createNote() in list-conroller-test.js failed', err);
      });
      this.$httpBackend.flush();
    });
  });
});
