'use strict';

/**
 * @ngdoc function
 * @name wanderwagon-webapp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the wanderwagon-webapp
 */
angular.module('wanderwagon-webapp')
  .controller('LoginCtrl', function ($scope, $cookies, auth, $location, ngProgressFactory, $auth) {


    $scope.authenticate = function (provider) {
      $auth.authenticate(provider)
        .then(function (response) {
          if (provider == 'google') {
            console.log(response);
            auth.googleLogin(response.access_token)
              .then(function (data) {
                console.log(data);
              })
              .catch(function (error) {
                console.log(error);
                $scope.error = error;
              });
          } else {
            auth.facebookLogin(response.access_token)
              .then(function (data) {
                $location.path('/home');
              })
              .catch(function (error) {
                console.log(error);
                $scope.error = error;
              });
          }
        })
        .catch(function (response) {
          console.log("Something went Wrong");
        })
    };



    $scope.progressbar = ngProgressFactory.createInstance();

    $scope.signUpObj = {};
    $scope.onSignUpFormSubmit = function (form) {
      $scope.progressbar.start();
      if (form.$valid) {
        $scope.obj = {};
        if ($scope.signUpObj.password == $scope.signUpObj.confirmPassword) {
          $scope.obj.emailId = $scope.signUpObj.email;
          $scope.obj.password = $scope.signUpObj.password;
          $scope.obj.name = $scope.signUpObj.name;
          $scope.obj.phone = $scope.signUpObj.phone;
          $scope.obj.accountType = 3;

          console.log($scope.obj);

          // auth.signUp($scope.obj)
          //   .then(function (data) {
          //     console.log(data);
          //     $scope.signUpObj = {};
          //     $scope.progressbar.complete();

          //     $scope.message = {
          //       type: 'Success',
          //       msg: 'Sucessfully Signed Up ! Login Now'
          //     };
          //   })
          //   .catch(function (error) {
          //     console.log(error);
          //     $scope.progressbar.complete();
          //     $scope.message = {
          //       type: 'Error',
          //       msg: error
          //     };

          // });
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





    $scope.redirected = $cookies.getObject('redirected');
    $scope.loginObj = {};
    $scope.pwdObj = {};
    $scope.resendObj = {};


    var login = function (loginObj) {
      console.log(loginObj);
    };

    $scope.onLoginFormSubmit = function (form) {
      if (form.$valid) {
        $scope.loginObj.accountType = 3;
        login($scope.loginObj);
      }
    };
  });
