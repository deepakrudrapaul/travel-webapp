'use strict';

/**
 * @ngdoc function
 * @name wanderwagon-webapp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the wanderwagon-webapp
 */
angular.module('wanderwagon-webapp')
  .controller('LoginCtrl', function ($scope, $timeout, auth, $location, ngProgressFactory, $auth) {

     $scope.authenticate = function(provider) {
      $auth.authenticate(provider);
    };

    $scope.progressbar = ngProgressFactory.createInstance();


    $scope.onSignUp = function (form) {
      $scope.progressbar.start();
      if (form.$valid) {
        $scope.obj = {};
        if ($scope.signUpObj.password == $scope.signUpObj.confirmPassword) {
          $scope.obj.emailId = $scope.signUpObj.email;
          $scope.obj.password = $scope.signUpObj.password;
          $scope.obj.accountType = 3;

          console.log($scope.obj);

          auth.signUp($scope.obj)
            .then(function (data) {
              console.log(data);
              $scope.signUpObj = {};
              $scope.progressbar.complete();

              $scope.message = {
                type: 'Success',
                msg: 'Sucessfully Signed Up ! Login Now'
              };
              angular.element(document.querySelectorAll('#signUpModel')).modal('show');


            })
            .catch(function (error) {
              console.log(error);
              $scope.progressbar.complete();
              $scope.message = {
                type: 'Error',
                msg: error
              };
              angular.element(document.querySelectorAll('#signUpModel')).modal('show');
            });
        } else {
          $scope.message = {
            type: 'Error',
            msg: 'Password does not match'
          };
          angular.element(document.querySelectorAll('#signUpModel')).modal('show');
          $scope.progressbar.complete();
        }
      }
    };





    $scope.onLogin = function (form) {
      $scope.progressbar.start();
      if (form.$valid) {
        $scope.loginObj.accountType = 3;
        auth.login($scope.loginObj)
          .then(function (data) {
            $location.path('/home');
            $scope.progressbar.complete();
            $rootScope.loggedIn = true;
          })
          .catch(function (error) {
            console.log(error);
            $scope.progressbar.complete();
            $scope.message = {
              type: 'Error',
              msg: error.error.message
            };
            angular.element(document.querySelectorAll('#loginModel')).modal('show');
          });
      }
    };





    $scope.format = 'dd-MMMM-yyyy';

    $scope.dateOptions = {
      formatYear: 'yy',
      maxDate: new Date(),
      minDate: new Date(1905, 1, 1),
      startingDay: 1
    };

    $scope.open1 = function () {
      $scope.popup1.opened = true;
    };

    $scope.popup1 = {
      opened: false
    };
  });
