'use strict';

describe('Controller: ProductcategoriesCtrl', function () {

  // load the controller's module
  beforeEach(module('wanderwagon-webapp'));

  var ProductcategoriesCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ProductcategoriesCtrl = $controller('ProductcategoriesCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(ProductcategoriesCtrl.awesomeThings.length).toBe(3);
  });
});
