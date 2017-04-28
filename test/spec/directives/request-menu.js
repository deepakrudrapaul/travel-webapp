'use strict';

describe('Directive: requestMenu', function () {

  // load the directive's module
  beforeEach(module('qikShipVendorApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<request-menu></request-menu>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the requestMenu directive');
  }));
});
