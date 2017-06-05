'use strict';

describe('Service: mockRemoteSvc', function () {

  // load the service's module
  beforeEach(module('wanderwagon-webapp'));

  // instantiate service
  var mockRemoteSvc;
  beforeEach(inject(function (_mockRemoteSvc_) {
    mockRemoteSvc = _mockRemoteSvc_;
  }));

  it('should do something', function () {
    expect(!!mockRemoteSvc).toBe(true);
  });

});
