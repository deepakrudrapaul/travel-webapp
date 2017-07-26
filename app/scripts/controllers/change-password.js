'use strict';

/**
 * @ngdoc function
 * @name wanderwagon-webapp.controller:ChangePasswordCtrl
 * @description
 * # ChangePasswordCtrl
 * Controller of the wanderwagon-webapp
 */
angular.module('wanderwagon-webapp')
  .controller('ChangePasswordCtrl', function ($location, auth, $scope) {

    var verificationToken = $location.search().token;
    var email = $location.search().email;

    $scope.showModal = function(messageType, message) {
      angular.element(document.querySelectorAll('#changePasswordModal')).modal('show');
      $scope.messageType = messageType;
      $scope.message = message;
    };

    $scope.verified = false;

    if(verificationToken != undefined) {
      auth.forgotPassword(verificationToken, email)
        .then(function (data){
          $scope.verified = true;
          $scope.messageType = "Change Password ";
        })
        .catch(function (error){
           $scope.verified = false;
           $scope.messageType = "Error";
            $scope.errorMessage = "Password reset link is expired";
        })

    } else{
      $location.path('/home');
    }


    $scope.onSubmit = function() {

    };
   
   
  });
