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
});
