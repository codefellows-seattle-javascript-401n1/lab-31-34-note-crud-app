/* global angular expect */
'use strict';
// var baseUrl
describe('testing ListController', function(){
  console.log('testing');
  beforeEach(()=>{
    console.log('hittinghhhhhh');
    angular.mock.module('demoApp');
    angular.mock.inject(($controller, $httpBackend) => {
      this.$httpBackend = $httpBackend;
      this.listCtrl = new $controller('ListController');
      console.log('this.httpBackend', this.httpBackend);
    });
  });
  it('should get list Ctrl', () => {
    console.log('hitting');
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
      .then (note=>{
        console.log(note);
        expect(note.name).toBe('yunjoo');
      }).catch(err=>{
        throw err;
      });
      this.$httpBackend.flush();
    });
    it('should delete a note', () => {
      this.$httpBackend.expectDELETE(`${baseUrl}/note/12345`, {'Accept': 'application/json'})
      .respond(204, {status: 'OK'});
      this.listCtrl.deleteNote({_id: '12345'})
      .then (note => {
        expect(note.name).toBe(undefined);
        expect(note.content).toBe(undefined);
      })
      .catch(err => {
        expect(err).toBe(undefined);
      });
      this.$httpBackend.flush();
    });
  });
});
