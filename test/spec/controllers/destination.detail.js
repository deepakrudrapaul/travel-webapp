'use strict';

describe('Controller: DestinationDetailCtrl', function () {

  // load the controller's module
  beforeEach(module('wanderwagon-webapp'));

  var DestinationDetailCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    DestinationDetailCtrl = $controller('DestinationDetailCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(DestinationDetailCtrl.awesomeThings.length).toBe(3);
  });
});
