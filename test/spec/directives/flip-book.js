'use strict';

describe('Directive: flipBook', function () {

  // load the directive's module
  beforeEach(module('wanderwagon-webapp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<flip-book></flip-book>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the flipBook directive');
  }));
});
