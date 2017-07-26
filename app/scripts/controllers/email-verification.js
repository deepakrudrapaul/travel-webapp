'use strict';

/**
 * @ngdoc function
 * @name wanderwagon-webapp.controller:EmailVerificationCtrl
 * @description
 * # EmailVerificationCtrl
 * Controller of the wanderwagon-webapp
 */
angular.module('wanderwagon-webapp')
  .controller('EmailVerificationCtrl', function ($location, auth, $scope) {

    var verificationToken = $location.search().token;
    var userId = $location.search().userId;
    $scope.verified;

     $scope.showModal = function(messageType, message) {
      angular.element(document.querySelectorAll('#verificationModal')).modal('show');
      $scope.messageType = messageType;
      $scope.message = message;
    };


    $scope.showEmailModal = function(messageType, message) {
      angular.element(document.querySelectorAll('#emailModal')).modal('show');
    };

 

    if(verificationToken != undefined) {
     
      auth.verifyEmail(verificationToken, userId)
        .then(function (data){
          $scope.showModal("Success", "Email verified successfully. Login Now");
        })
        .catch(function (error){
           $scope.verified = false;
          $scope.showModal("Error", "Email verification link is expired !");
        })
    } else{
      $location.path('/home');
    }


    $scope.sendVerificationLink = function() {
      $scope.showModal("Sent", "Verification link has been sent to your email address and it will be valid for 10 minutes only.");
    };

    $scope.changeEmailAddress = function() {
      $scope.showEmailModal();
    };
    

  });
