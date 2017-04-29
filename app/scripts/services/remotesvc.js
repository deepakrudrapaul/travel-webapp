'use strict';

/**
 * @ngdoc service
 * @name wanderwagon-webapp.remoteSvc
 * @description
 * # remoteSvc
 * Factory in the wanderwagon-webapp.
 */
angular.module('wanderwagon-webapp')
  .factory('remoteSvc', function (auth, $http, ENV, $location) {

    var remoteAddr = ENV.endPoint;

    return {
      getConsumerProfile: function () {
        return $http({
          method: 'GET',
          headers: {
            'auth-token': auth.getToken()
          },
          url: remoteAddr + '/consumer/account/profile'
        })
      }, 

      updateConsumerProfile: function(profileObj) {
        return $http({
				 method: 'POST',
				 data: profileObj,
				 headers: {
					 'auth-token' : auth.getToken()
				 },
				 url: remoteAddr + 'consumer/account/editprofile'
			 })
      },

      getCurrentUri : function() {
          return $location.path();
      },


      getAllPosts : function() {
        return $http({
          method: 'GET',
          url: remoteAddr + '/blogs/all'
        })
      }
    };
  });
