'use strict';

describe('Service: uploadObject', function () {

  // load the service's module
  beforeEach(module('wanderwagon-webapp'));

  // instantiate service
  var uploadObject;
  beforeEach(inject(function (_uploadObject_) {
    uploadObject = _uploadObject_;
  }));

  it('should do something', function () {
    expect(!!uploadObject).toBe(true);
  });

});
