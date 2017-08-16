'use strict';

describe('Controller: TravelPlanDetailCtrl', function () {

  // load the controller's module
  beforeEach(module('wanderwagon-webapp'));

  var TravelPlanDetailCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    TravelPlanDetailCtrl = $controller('TravelPlanDetailCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(TravelPlanDetailCtrl.awesomeThings.length).toBe(3);
  });
});
