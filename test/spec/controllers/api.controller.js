'use strict';

describe('Controller: ApiControllerCtrl', function () {

  // load the controller's module
  beforeEach(module('qikShipVendorApp'));

  var ApiControllerCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ApiControllerCtrl = $controller('ApiControllerCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(ApiControllerCtrl.awesomeThings.length).toBe(3);
  });
});
