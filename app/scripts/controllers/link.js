'use strict';

/**
 * @ngdoc function
 * @name wanderwagon-webapp.controller:LinkCtrl
 * @description
 * # LinkCtrl
 * Controller of the wanderwagon-webapp
 */
angular.module('wanderwagon-webapp')
    .controller('LinkCtrl', function ($scope, $window, $location, $rootScope, auth, remoteSvc) {

        if (auth.isLoggedIn()) {
            $rootScope.loggedIn = true;
            console.log($rootScope.loggedIn);
        } else {
            $rootScope.loggedIn = false;
            console.log($rootScope.loggedIn);
        }
      
      $rootScope.$on('social-login', function (event, data){
        $rootScope.loggedIn = data;
            console.log($rootScope.loggedIn);
      });
    

        $rootScope.onLogOut = function () {

            auth.logout();
            $location.path('/home');
            $rootScope.loggedIn = false;
        }



        $scope.openFacebook = function () {
            $window.open('https://www.facebook.com/wanderwagon', ' _blank');
        }

        $scope.openTwitter = function () {
            $window.open('https://www.twitter.com', ' _blank');
        }

        $scope.openInstagram = function () {
            $window.open('https://www.instagram.com/wanderwagon', ' _blank');
        }

        $scope.openYoutube = function () {
            $window.open('https://www.youtube.com', ' _blank');
        }

    });
