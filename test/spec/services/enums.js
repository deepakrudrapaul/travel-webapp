'use strict';

describe('Service: enums', function () {

  // load the service's module
  beforeEach(module('wanderwagon-webapp'));

  // instantiate service
  var enums;
  beforeEach(inject(function (_enums_) {
    enums = _enums_;
  }));

  it('should do something', function () {
    expect(!!enums).toBe(true);
  });

});
