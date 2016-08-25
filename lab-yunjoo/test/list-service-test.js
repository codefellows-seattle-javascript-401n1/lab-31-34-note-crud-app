/* global angular expect resolve reject*/
'use strict';

let baseUrl = 'http://localhost:3000/api/list';

let headers ={
  'Content-Type':'application/json',
  'Accept':'application/json'
};

describe('testing listService', function(){
  beforeEach(()=>{
    angular.mock.module('demoApp');
    angular.mock.inject((listService,$httpBackend) =>{
      this.listService = listService;
      this.$httpBackend = $httpBackend;
    });
  });
  afterEach(()=>{
    this.$httpBackend.verifyNoOutstandingExpectation();
    this.$httpBackend.verifyNoOutstandingRequest();
  });
  it('createList should return a note', ()=>{
    this.$httpBackend.expectPOST(baseUrl, {name:'example list'}, headers)
    .respond(200, {_id:'9283487593878',name: 'example list', notes: [], _v: 0 });
    this.listService.createList({name: 'example list'})
    .then( list =>{
      expect(list._id).toBe('9283487593878');
      expect(list.name).toBe('example list');
      expect(Array.isArray(list.notes)).toBe(true);
    })
    .catch( err=>{
      expect(err).toBe(undefined);
    });
    this.$httpBackend.flush();
  });
  it('createList should return a list', ()=>{
    this.$httpBackend.expectPOST(baseUrl, {name: 'example list'}, headers)
    .respond(200, {status: 'success', _id:'5749834923', name: 'example list', notes: [], _v: 0});

    this.listService.createList({name: 'example list'})
    .then((list)=>{
      expect(list._id).toBe('5749834923');
      expect(list.name).toB('example list');
      expect(Array.isArray(list.notes)).toBe(true);
    })
    .catch((err)=>{
      expect(err).toBe(null);
    });
    this.$httpBackend.flush();
  });
  it('fetchList should fetch a list', ()=>{
    beforeEach(()=>{
      this.listService.createList({name:'example list 2'})
      .then((list)=>{
        resolve(list);
      });
    });
    this.$httpBackend.expectGET(baseUrl,{'Accept':'application/json'})
    .respond(200,{status:'success', _id:'1234567', name:'example list 2', notes:[],_v:0});
    this.listService.fetchList()
    .then((list)=>{
      expect(list._id).toBe('1234567');
      expect(list.name).toBe('example list 2');
    })
    .catch((err)=>{
      expect(err).toBe(null);
    });
    this.$httpBackend.flush();
  });
  it('updateList should update a list', () =>{
    beforeEach(()=>{
      this.listService.createList({name:'example list 3'})
      .then((list)=>{
        resolve(list);
      })
      .catch((err)=>{
        reject(err);
      });
    });
    this.$httpBackend.expectPUT(`${baseUrl}/123456`, {_id:'123456', name:'updated example list 3', headers})
    .respond(200, {status: 'success', _id: '123456', name: 'updated example list 3', notes: [], _v: 0});
    this.listService.updateList({_id:'123456', name: 'updated example list 3'})
    .then((list)=>{
      expect(list._id).toBe('123456');
      expect(list.name).toBe('updated example list 3');
    })
    .catch((err)=>{
      expect(err).toBe(null);
    });
    it('deleteList should delete a list',()=>{
      beforeEach(()=>{
        this.listService.createList({name:'example list 4'})
        .then((list)=>{
          resolve(list);
        })
        .catch((err)=>{
          reject(err);
        });
      });
      this.$httpBackend.expectDELETE(`${baseUrl}/12345`)
      .respond({status:'success'});
      this.listService.deleteList(2345)
      .then((res)=>{
        expect(res.status).toBe('success');
      })
      .catch((err)=>{
        expect(err).toBe(null);
      });
      this.$httpBackend.flush();
    });
  });
});
