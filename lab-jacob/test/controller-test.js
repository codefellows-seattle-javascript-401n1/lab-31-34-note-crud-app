'use strict';

describe('testing the DisplayListcontroller', function() {
  let url = 'http://localhost:3000/api/';

  beforeEach(() => {
    angular.mock.module('noteList');
    angular.mock.inject(($controller, $httpBackend) => {
      this.$httpBackend = $httpBackend;
      this.DisplayListCtrl = new $controller('DisplayListController');
    });
  });

  it('should get the DisplayListController', () => {
    expect(typeof this.DisplayListCtrl).toBe('object');
  });
});
