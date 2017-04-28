'use strict';

describe('Directive: dateFilter', function () {

  // load the directive's module
  beforeEach(module('wanderwagon-webapp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<date-filter></date-filter>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the dateFilter directive');
  }));
});
