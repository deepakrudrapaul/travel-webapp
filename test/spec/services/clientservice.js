'use strict';

describe('Service: clientService', function () {

  // load the service's module
  beforeEach(module('wanderwagon-webapp'));

  // instantiate service
  var clientService;
  beforeEach(inject(function (_clientService_) {
    clientService = _clientService_;
  }));

  it('should do something', function () {
    expect(!!clientService).toBe(true);
  });

});
