'use strict';

describe('Controller: WarehouseCtrl', function () {

  // load the controller's module
  beforeEach(module('wanderwagon-webapp'));

  var WarehouseCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    WarehouseCtrl = $controller('WarehouseCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(WarehouseCtrl.awesomeThings.length).toBe(3);
  });
});
