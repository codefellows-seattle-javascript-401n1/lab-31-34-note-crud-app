// 'use strict';
//
// describe('test ListController', function(){
//   beforeEach(() => {
//     angular.mock.module('galleryApp');
//     angular.mock.inject(($controller, $httpBackend) => {
//       this.$httpBackend = $httpBackend;
//       this.listCtrl = new $controller('ListController');
//     });
//   });
//   it('should get listCtrl', () => {
//     expect(typeof this.listCtrl).toBe('object');
//     expect(typeof this.listCtrl.createNote).toBe('function');
//   });
//
//   // describe('test listCtrl.createNote', () => {
//   //   let baseUrl = 'http://localhost:3000/api';
//   //   let headers = {
//   //     'Content-Type': 'application/json',
//   //     'Accept': 'application/json'
//   //   };
//   //   beforeEach(() => {
//   //     this.listCtrl.list = {name: 'minky momo', notes: []};
//   //     this.$httpBackend.expectPOST(`${baseUrl}/note`, {name:'abc', content:'ABC'}, headers)
//   //     .respond(200, {name:'abc' , content:'ABC' , _id:'123456' , _v:0});
//   //   });
//   //   it('should return a note', () => {
//   //     this.listCtrl.createNote({name:'abc', content:'ABC'})
//   //     .then( note => {
//   //       expect(note.name).toBe('abc');
//   //       expect(note.content).toBe('ABC');
//   //     })
//   //     .catch( err => {
//   //       expect(err).toBe(undefined);
//   //     });
//   //     this.$httpBackend.flush();
//   //   });
//   // });
// });
