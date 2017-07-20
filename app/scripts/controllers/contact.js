'use strict';

/**
 * @ngdoc function
 * @name wanderwagon-webapp.controller:ContactCtrl
 * @description
 * # ContactCtrl
 * Controller of the wanderwagon-webapp
 */
angular.module('wanderwagon-webapp')
  .controller('ContactCtrl', function ($scope, $window, remoteSvc) {

    $scope.showModal = function (messageType, message) {
      angular.element(document.querySelectorAll('#contactModal')).modal('show');
      $scope.messageType = messageType;
      $scope.message = message;
    };

    $scope.submitContactForm = function (form) {
      if (form.$valid) {
        remoteSvc.submitContactForm($scope.contactObj)
          .success(function (data) { 
              console.log(data);
              $scope.showModal("Success", "Your message has been successfully sent !");
          })
          .error(function (error) {
            console.log(error);
            $scope.showModal("Error", error.error.message);
          })
      }
    };


    $scope.submitTravelEnquiryForm = function(form) {
      if (form.$valid) {
        remoteSvc.submitTravelEnquiryForm($scope.travelEnqObj)
          .success(function (data) { 
              console.log(data);
              $scope.showModal("Success", "Your message has been successfully sent !");
          })
          .error(function (error) {
            console.log(error);
            $scope.showModal("Error", error.error.message);
          })
      }
    };

    $scope.openFacebook = function () {
      $window.open('https://www.facebook.com/wanderwagon', ' _blank');
    }



  });
