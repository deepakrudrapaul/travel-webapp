'use strict';

describe('Directive: modifyProductRequest', function () {

  // load the directive's module
  beforeEach(module('wanderwagon-webapp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<modify-product-request></modify-product-request>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the modifyProductRequest directive');
  }));
});
