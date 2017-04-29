'use strict';

describe('Controller: BlogDetailCtrl', function () {

  // load the controller's module
  beforeEach(module('wanderwagon-webapp'));

  var BlogDetailCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    BlogDetailCtrl = $controller('BlogDetailCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(BlogDetailCtrl.awesomeThings.length).toBe(3);
  });
});
