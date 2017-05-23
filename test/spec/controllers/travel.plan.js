'use strict';

describe('Controller: TravelPlanCtrl', function () {

  // load the controller's module
  beforeEach(module('wanderwagon-webapp'));

  var TravelPlanCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    TravelPlanCtrl = $controller('TravelPlanCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(TravelPlanCtrl.awesomeThings.length).toBe(3);
  });
});
