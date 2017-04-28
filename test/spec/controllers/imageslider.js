'use strict';

describe('Controller: ImagesliderCtrl', function () {

  // load the controller's module
  beforeEach(module('wanderwagon-webapp'));

  var ImagesliderCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ImagesliderCtrl = $controller('ImagesliderCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(ImagesliderCtrl.awesomeThings.length).toBe(3);
  });
});
