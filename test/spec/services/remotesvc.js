'use strict';

describe('Service: remoteSvc', function () {

  // load the service's module
  beforeEach(module('qikShipVendorApp'));

  // instantiate service
  var remoteSvc;
  beforeEach(inject(function (_remoteSvc_) {
    remoteSvc = _remoteSvc_;
  }));

  it('should do something', function () {
    expect(!!remoteSvc).toBe(true);
  });

});
