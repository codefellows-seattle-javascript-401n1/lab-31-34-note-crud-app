/* global angular expect */
'use strict';
// var baseUrl
describe('testing ListController', function(){
  beforeEach(()=>{
    angular.mock.module('demoApp');
    angular.mock.inject(($controller, $httpBackend) => {
      this.$httpBackend = $httpBackend;
      this.listCtrl = new $controller('ListController');
    });
  });

  it('should get list Ctrl', () => {
    expect(typeof this.listCtrl).toBe('object');
    expect(typeof this.listCtrl.createNote).toBe('function');
  });

  describe('testing listCtrl.createNote',()=>{
    let baseUrl = 'http://localhost:3000/api';
    let headers = {
      'Content-Type':'application/json',
      'Accept': 'application/json'
    };
    beforeEach(()=>{
      this.listCtrl.list = { name:'example', notes: []};
      this.$httpBackend.expectPOST(`${baseUrl}/note`, {name:'yunjoo', content:'melong'},headers)
      .respond(200, {name:'yunjoo', content:'melong',_id:'12345',_v:0});
    });

    it('should return a note', () =>{
      this.listCtrl.createNote({name:'yunjoo', content:'melong'})
      .then(note=>{
        expect(note.name).toBe('yunjoo');
      }).catch(err=>{
        throw err;
      });
      this.$httpBackend.flush();
    });
  });
  describe('testing listCtrl.deleteNote',()=>{
    beforeEach(()=>{
      let baseUrl = 'http://localhost:3000/api';
      this.listCtrl.list = {name:'exapmle', notes:[]};
      this.$httpBackend.expectDELETE(`${baseUrl}/note/12345`, {'Accept': 'application/json'})
      .respond(204, {status: 'OK'});
    });

    it('should delete a note', () => {
      this.listCtrl.deleteNote('12345')
      .then(()=> {
        expect(this.listCtrl.list.notes.length).toBe(0);
      })
      .catch(err => {
        throw err;
      });
      this.$httpBackend.flush();
    });
  });
});
