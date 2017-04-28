'use strict';

describe('Controller: StatusControllerCtrl', function () {

  // load the controller's module
  beforeEach(module('qikShipVendorApp'));

  var StatusControllerCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    StatusControllerCtrl = $controller('StatusControllerCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(StatusControllerCtrl.awesomeThings.length).toBe(3);
  });
});
