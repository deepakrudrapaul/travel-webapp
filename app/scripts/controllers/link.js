'use strict';

/**
 * @ngdoc function
 * @name wanderwagon-webapp.controller:LinkCtrl
 * @description
 * # LinkCtrl
 * Controller of the wanderwagon-webapp
 */
angular.module('wanderwagon-webapp')
  .controller('LinkCtrl', function ($scope, $window, $location, $rootScope, $auth, auth, remoteSvc) {

    $scope.checked = true;

    if (auth.isLoggedIn()) {
      $rootScope.loggedIn = true;
    } else {
      $rootScope.loggedIn = false;
    }
    $scope.userName = auth.getUserName();


    $rootScope.$on('social-login', function (event, data) {
      $rootScope.loggedIn = data;
      $scope.userName = auth.getUserName();
    });



    $rootScope.onLogOut = function () {
      auth.logout();
      $location.path('/home');
      $rootScope.loggedIn = false;
    }

      $scope.showModal = function(messageType, message) {
      angular.element(document.querySelectorAll('#successModal')).modal('show');
      $scope.messageType = messageType;
      $scope.message = message;
    };

     $scope.showLoginModal = function(messageType, message) {
      angular.element(document.querySelectorAll('#loginModal')).modal('show');
      $scope.messageType = messageType;
      $scope.message = message;
    };

     var closeLoginModal = function () {
      angular.element(document.querySelectorAll('#loginModal')).modal('hide');
    };


    $rootScope.authenticate = function (provider) {
      $auth.authenticate(provider)
        .then(function (response) {
          if (provider == 'google') {
            auth.googleLogin(response.access_token)
              .then(function (data) {
                 closeLoginModal();
                 $rootScope.$emit('social-login', 'true');
              })
              .catch(function (error) {
                closeLoginModal();
                $scope.showModal('Error', "Error While With Google Login. Please Try After Some Time");
              });
          } else {
            auth.facebookLogin(response.access_token)
              .then(function (data) {
                closeLoginModal();
                 $rootScope.$emit('social-login', 'true'); 
              })
              .catch(function (error) {
                closeLoginModal();
                $scope.showModal('Error', "Error While With Facebook Login. Please Try After Some Time");
              });
          }
        })
        .catch(function (response) {
          closeLoginModal();
          $scope.showModal('Something went Wrong: ', "Please Try After Some Time");
        })
    };

    var showImageModal = function() {
      angular.element(document.querySelectorAll('#imageModal')).modal('show');
    };


    $scope.onSubscribeFormSubmit = function (form) {
      if (form.$valid) {
        remoteSvc.submitNewsletterEmail($scope.emailObj)
          .success(function (data) {
            $scope.emailObj = {};
            showImageModal();
          })
          .error(function (error) {
            $scope.showModal("Error", "Error while submitting your request !");
          })
      }
    };



    $scope.openSideNav = function () {
      angular.element(document.getElementById('mySidenav')).css('width', '70%');
    }

    $rootScope.closeSideNav = function () {
      angular.element(document.getElementById('mySidenav')).css('width', '0px');
    }

    $scope.openSocialSite = function (name) {
      $window.open('https://www.' + name + '.com/wanderwagon', ' _blank');
    }

  });
