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
          .post(remoteAddr + '/auth/signup', reqObj)
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
          .post(remoteAddr + '/auth/login', reqObj)
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

      facebookLogin: function (token, callback) {
        var cb = callback || angular.noop;
        var deferred = $q.defer();

        $http
          .post(remoteAddr + '/auth/facebook-login?access-token='+ token)
          .success(function (data, status) {
            $cookies.put('token', data.response.token);
            $cookies.put('tokenTime', (new Date()).getTime());
            $cookies.put('fb-token', token);
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

      googleLogin: function (token, callback) {
        var cb = callback || angular.noop;
        var deferred = $q.defer();

        $http
          .post(remoteAddr + '/auth/google-login?access-token='+token)
          .success(function (data, status) {
            $cookies.put('token', data.response.token);
            $cookies.put('tokenTime', (new Date()).getTime());
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

      verifyEmail: function (token, userId, callback) {
        var cb = callback || angular.noop;
        var deferred = $q.defer();

        $http
          .get(remoteAddr + '/auth/verify-email?token=' + token + '&userId=' + userId)
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

      forgotPassword: function (token, email, callback) {
        var cb = callback || angular.noop;
        var deferred = $q.defer();

        $http
          .get(remoteAddr + '/auth/forget-password?token=' + token + '&email=' + email)
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

      updatePassword: function (updatePassObj) {
        return $http({
          method:'PUT',
          data: updatePassObj,
          url: remoteAddr + '/auth/updatePassword'
        })
      },

      logout: function () {
        $cookies.remove('token');
        $cookies.remove('tokenTime');
        $cookies.remove('currUser');
        $cookies.remove('role');
        $cookies.remove('fb-token');
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
