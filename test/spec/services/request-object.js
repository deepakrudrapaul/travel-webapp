'use strict';

describe('Service: requestObject', function () {

  // load the service's module
  beforeEach(module('qikShipVendorApp'));

  // instantiate service
  var requestObject;
  beforeEach(inject(function (_requestObject_) {
    requestObject = _requestObject_;
  }));

  it('should do something', function () {
    expect(!!requestObject).toBe(true);
  });

});
