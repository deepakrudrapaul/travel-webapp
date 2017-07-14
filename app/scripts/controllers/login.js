'use strict';

/**
 * @ngdoc function
 * @name wanderwagon-webapp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the wanderwagon-webapp
 */
angular.module('wanderwagon-webapp')
  .controller('LoginCtrl', function ($scope, $cookies, auth, $location, $auth) {

    $scope.showModal = function(messageType, message) {
      angular.element(document.querySelectorAll('#verificationModal')).modal('show');
      $scope.messageType = messageType;
      $scope.message = message;
    };

    $scope.authenticate = function (provider) {
      $auth.authenticate(provider)
        .then(function (response) {
               console.log(response.access_token);
          if (provider == 'google') {
            auth.googleLogin(response.access_token)
              .then(function (data) {
                    $location.path('/home');
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
                console.log(data);
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




    $scope.signUpObj = {};
    $scope.onSignUpFormSubmit = function (form) {
      if (form.$valid) {
        $scope.obj = {};
        if ($scope.signUpObj.password == $scope.signUpObj.confirmPassword) {
          $scope.obj.email = $scope.signUpObj.email;
          $scope.obj.password = $scope.signUpObj.password;
          $scope.obj.name = $scope.signUpObj.name;
          $scope.obj.phone = $scope.signUpObj.phone;
          $scope.obj.accountType = 3;

          console.log($scope.obj);

          auth.signUp($scope.obj)
            .then(function (data) {
              console.log(data);
             $scope.showModal("Confirm Your Email Address", "A confirmation email has been sent to " + $scope.signUpObj.email + ". Click on the confirmation link in the email to activate your account.");
              $scope.signUpObj = {};
            })
            .catch(function (error) {
              console.log(error);
             $scope.showModal("Error", error,message);

          });
        } else {
              $scope.showModal("Error", "Password Doesn't Match !");
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
         auth.login($scope.loginObj)
            .then(function (data) {
                  $location.path('/home');
              console.log(data);
            })
            .catch(function (error) {
              console.log(error);
             $scope.showModal("Error", error,message);

          });
      }
    };
  });
