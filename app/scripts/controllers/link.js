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

    $scope.checked = true;

    if (auth.isLoggedIn()) {
      $rootScope.loggedIn = true;
    } else {
      $rootScope.loggedIn = false;
    }


    // $scope.openNav = function() {
    //     console.log("CLICKED");
    //     angular.element(document.getElementById('mySidenav')).css('width','250px');
    // }
    // $scope.closeNav = function() {
    //     angular.element(document.getElementById('mySidenav')).css('width','0px');
    // }

    $rootScope.$on('social-login', function (event, data) {
      $rootScope.loggedIn = data;
    });


    $rootScope.onLogOut = function () {
      auth.logout();
      $location.path('/home');
      $rootScope.loggedIn = false;
    }

      $scope.showModal = function(messageType, message) {
      angular.element(document.querySelectorAll('#messageModal')).modal('show');
      $scope.messageType = messageType;
      $scope.message = message;
    };


    $scope.onSubscribeFormSubmit = function (form) {
      if (form.$valid) {
        remoteSvc.submitNewsletterEmail($scope.emailObj)
          .success(function (data) {
            $scope.showModal("Success", "You have successfully subscribed to our newsletter !");
          })
          .error(function (error) {
            $scope.showModal("Error", "Error while submitting your request !");
          })
      }
    };



    $scope.openSideNav = function () {
      angular.element(document.getElementById('mySidenav')).css('width', '250px');
    }

    $scope.closeSideNav = function () {
      angular.element(document.getElementById('mySidenav')).css('width', '0px');
    }

    $scope.openSocialSite = function (name) {
      $window.open('https://www.' + name + '.com/wanderwagon', ' _blank');
    }

  });
