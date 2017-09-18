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

    var showImageModal = function() {
      angular.element(document.querySelectorAll('#contactImageModal')).modal('show');
    };

    $scope.submitContactForm = function (form) {
      if (form.$valid) {
        remoteSvc.submitContactForm($scope.contactObj)
          .success(function (data) { 
            $scope.contactObj = {};
            showImageModal();
          })
          .error(function (error) {
            console.log(error);
            $scope.contactObj = {};
            $scope.showModal("Error", error.error.message);
          });
      }
    };

   


    $scope.submitTravelEnquiryForm = function(form) {
      if (form.$valid) {
        remoteSvc.submitTravelEnquiryForm($scope.travelEnqObj)
          .success(function (data) { 
            showImageModal();
          })
          .error(function (error) {
            console.log(error);
            $scope.showModal("Error", error.error.message);
          });
      }
    };

    $scope.openFacebook = function () {
      $window.open('https://www.facebook.com/wanderwagon', ' _blank');
    };

    $scope.openInstagram = function () {
      $window.open('https://www.instagram.com/wanderwagon', ' _blank');
    };



  });
