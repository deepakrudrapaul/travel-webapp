'use strict';

/**
 * @ngdoc service
 * @name wanderwagon-webapp.auth
 * @description
 * # auth
 * Factory in the wanderwagon-webapp.
 */
angular.module('wanderwagon-webapp')
  .factory('auth', function ($q, $cookies, $http, ENV) {

    var currentUser = {};
    if ($cookies.get('token')) {
      currentUser = $cookies.getObject('currUser');
    }

    var remoteAddr = ENV.endPoint;
    return {
      signUp: function (reqObj, callback) {

        var cb = callback || angular.noop;
        var deferred = $q.defer();

        $http
          .post(remoteAddr + '/consumer/account/signup', reqObj)
          .success(function (data, status) {
            deferred.resolve(data);
            return cb();
          })
          .error(function (error, status) {
            console.log(error, status);
            deferred.reject(error);
            return cb(error);
          }.bind(this));

        return deferred.promise;
      },

      login: function (reqObj, callback) {
        var cb = callback || angular.noop;
        var deferred = $q.defer();

        $http
          .post(remoteAddr + '/consumer/account/login', reqObj)
          .success(function (data, status) {
            $cookies.put('token', data.response.token);
            $cookies.put('tokenTime', (new Date()).getTime());
            $cookies.putObject('currUser', reqObj);
            currentUser = reqObj;
            deferred.resolve(data);
            return cb();
          })
          .error(function (error, status) {
            console.log(error, status);
            this.logout();
            deferred.reject(error);
            return cb(error);
          }.bind(this));

        return deferred.promise;
      },
      logout: function () {
        $cookies.remove('token');
        $cookies.remove('tokenTime');
        $cookies.remove('currUser');
        $cookies.remove('role');
        currentUser = {};
      },
      getCurrentUser: function () {
        if ($cookies.get('token') && !currentUser.emailAddress) {
          currentUser = $cookies.getObject('currUser');
        }

        return currentUser;
      },
      isLoggedIn: function () {
        if (this.getToken()) {
          var tokenTime = Number($cookies.get('tokenTime'));
          var currTime = (new Date()).getTime();

          if ((currTime - tokenTime) < 30 * 60 * 1000) {
            return true;
          }
        }

        this.logout();
        return false;
      },
      getToken: function () {
        return $cookies.get('token');
      }
    }
  });
