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
    var userId = $location.search().userId;

    $scope.showModal = function(messageType, message) {
      angular.element(document.querySelectorAll('#changePasswordModal')).modal('show');
      $scope.messageType = messageType;
      $scope.message = message;
    };





    if(verificationToken != undefined) {
      $scope.verified = true;
      $scope.success = "Change Password";

    } else{
      $location.path('/home');
    }


    $scope.onSubmit = function() {

    };
   
   
  });
