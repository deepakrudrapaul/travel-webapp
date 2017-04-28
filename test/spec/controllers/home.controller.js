'use strict';

describe('Controller: HomeControllerCtrl', function () {

  // load the controller's module
  beforeEach(module('wanderwagon-webapp'));

  var HomeControllerCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    HomeControllerCtrl = $controller('HomeControllerCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(HomeControllerCtrl.awesomeThings.length).toBe(3);
  });
});
