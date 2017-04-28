'use strict';

describe('Controller: TrackingCtrl', function () {

  // load the controller's module
  beforeEach(module('wanderwagon-webapp'));

  var TrackingCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    TrackingCtrl = $controller('TrackingCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(TrackingCtrl.awesomeThings.length).toBe(3);
  });
});
