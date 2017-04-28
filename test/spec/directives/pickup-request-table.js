'use strict';

describe('Directive: pickupRequestTable', function () {

  // load the directive's module
  beforeEach(module('qikShipVendorApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<pickup-request-table></pickup-request-table>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the pickupRequestTable directive');
  }));
});
