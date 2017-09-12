'use strict';

/**
 * @ngdoc function
 * @name wanderwagon-webapp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the wanderwagon-webapp
 */
angular.module('wanderwagon-webapp')
  .controller('LoginCtrl', function ($scope, $rootScope, $window, $cookies, auth, $location, $auth) {

    $scope.showModal = function(messageType, message) {
      angular.element(document.querySelectorAll('#loginModal')).modal('show');
      $scope.messageType = messageType;
      $scope.message = message;
    };

    $rootScope.$on('show-login', function (event, data) {
      $scope.showModal('Error', "Error While With Facebook Login. Please Try After Some Time");
    });


    $scope.authenticate = function (provider) {
      $auth.authenticate(provider)
        .then(function (response) {
          if (provider == 'google') {
            auth.googleLogin(response.access_token)
              .then(function (data) {
                    $location.path('/home');
                    $rootScope.$emit('social-login', 'true');                    
              })
              .catch(function (error) {
                $scope.showModal('Error', "Error While With Facebook Login. Please Try After Some Time");
              });
          } else {
            auth.facebookLogin(response.access_token)
              .then(function (data) {
                $location.path('/home');
                 $rootScope.$emit('social-login', 'true'); 
              })
              .catch(function (error) {
                $scope.showModal('Error', "Error While With Facebook Login. Please Try After Some Time");
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


          auth.signUp($scope.obj)
            .then(function (data) {
             $scope.showModal("Confirm Your Email Address", "A confirmation email has been sent to " + $scope.signUpObj.email + ". Click on the confirmation link in the email to verify your email address.");
              $scope.signUpObj = {};
            })
            .catch(function (data) {
              console.log(data.error.message);
             $scope.showModal("Error", data.error.message);

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
    };

    $scope.onLoginFormSubmit = function (form) {
      if (form.$valid) {
        $scope.loginObj.accountType = 3;
         auth.login($scope.loginObj)
            .then(function (data) {
                  $location.path('/home');
                  $rootScope.$emit('social-login', 'true'); 
            })
            .catch(function (error) {
             $scope.showModal("Error", error.error.message);

          });
      }
    };



    $scope.showPasswordModal = function () {
       angular.element(document.querySelectorAll('#passwordModal')).modal('show');
    };


    $scope.emailSubmit = false;

    $scope.onEmailFormSubmit = function () {
      var email = $scope.emailObj.email;

      auth.forgotPassword(email)
        .success(function (data) {
  
          $scope.emailSubmit = true;
          $scope.message = "Password reset link has been sent to email " + email ;
        })
        .error(function (error){
          console.log(error);
        })
    };



  });
