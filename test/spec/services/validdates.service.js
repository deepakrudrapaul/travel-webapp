'use strict';

describe('Service: ValidDates.service', function () {

  // load the service's module
  beforeEach(module('qikShipVendorApp'));

  // instantiate service
  var ValidDates.service;
  beforeEach(inject(function (_ValidDates.service_) {
    ValidDates.service = _ValidDates.service_;
  }));

  it('should do something', function () {
    expect(!!ValidDates.service).toBe(true);
  });

});
