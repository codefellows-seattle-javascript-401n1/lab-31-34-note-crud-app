// 'use strict';
//
// describe('testing app-create-note-form', function() => {
//   beforeEach(() => {
//     angular.mock.module('noteApp')
//     angular.mock.inject(($compile, $rootScope) => {
//       let scope = $rootScope.$new();
//
//       scope.createNote = (function(note) {
//         this.note = note
//       }).bind(this)
//
//       let elem = angular.element('<app-create-note-form.')
//       this.appCreateNoteForm = $compile(elem)(scope)
//       scope.$digest()
//     })
//   })
//
//   it('should run a test', () => {
//     let iScope = this.appCreateNoteForm.isolateScope()
//     iScope.note = {
//       name: 'troll',
//       content: 'troll talk'
//     }
//
//     iScope.createNote()
//     iScope.$diget()
//     expect('false').toBe('false')
//   })
// })
