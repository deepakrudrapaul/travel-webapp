'use strict';

describe('Service: requestService', function () {

  // load the service's module
  beforeEach(module('wanderwagon-webapp'));

  // instantiate service
  var requestService;
  beforeEach(inject(function (_requestService_) {
    requestService = _requestService_;
  }));

  it('should do something', function () {
    expect(!!requestService).toBe(true);
  });

});
