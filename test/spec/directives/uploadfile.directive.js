'use strict';

describe('Directive: uploadFile.directive', function () {

  // load the directive's module
  beforeEach(module('qikShipVendorApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<upload-file.directive></upload-file.directive>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the uploadFile.directive directive');
  }));
});
