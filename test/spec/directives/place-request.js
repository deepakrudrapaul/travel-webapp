'use strict';

describe('Directive: placeRequest', function () {

  // load the directive's module
  beforeEach(module('wanderwagon-webapp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<place-request></place-request>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the placeRequest directive');
  }));
});
