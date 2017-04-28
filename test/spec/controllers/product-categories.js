'use strict';

describe('Controller: ProductCategoriesCtrl', function () {

  // load the controller's module
  beforeEach(module('wanderwagon-webapp'));

  var ProductCategoriesCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ProductCategoriesCtrl = $controller('ProductCategoriesCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(ProductCategoriesCtrl.awesomeThings.length).toBe(3);
  });
});
