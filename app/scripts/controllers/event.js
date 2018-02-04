'use strict';

/**
 * @ngdoc function
 * @name wanderwagon-webapp.controller:EventCtrl
 * @description
 * # EventCtrl
 * Controller of the wanderwagon-webapp
 */
angular.module('wanderwagon-webapp')
  .controller('EventCtrl', function ($scope, $stateParams,auth, $rootScope, remoteSvc) {
   
    var event = $stateParams.eventSlug ;
    var eventId;

    $scope.mobileImageUrl;
    if(event.includes('holi')) {
      eventId = 2
      $scope.mobileImageUrl = 'https://s3-ap-southeast-1.amazonaws.com/wanderwagon/images/mobile/holi_cover.jpg';
    } else{
      eventId = 1;
      $scope.mobileImageUrl = 'https://s3-ap-southeast-1.amazonaws.com/wanderwagon/images/mobile/valentine_cover.jpg';
    }

    $scope.formSubmitted = false;
    $scope.messageType = "Query Form";

    var getEventById = function(eventId) {
      remoteSvc.getEventById(eventId).then(function(data){
        $scope.eventDetail = data.response;
      });
    };
    getEventById(eventId);

  
    var showModal = function (messageType, message) {
      angular.element(document.querySelectorAll('#tripModal')).modal('show');
      $scope.messageType = messageType;
      $scope.message = message;
    };

    
    var showImageModal = function() {
      angular.element(document.querySelectorAll('#plantripModal')).modal('show');
    };



    $scope.submitEventForm = function (form) {    
          remoteSvc.submitEventForm($scope.formObj)
          .success(function (data) {
            $scope.formObj = {};
            showModal("Success", "We will return the favour soon.");
          })
          .error(function (error) {
            $scope.formObj = {};
            $scope.showModal("Error", error.error.message);
          })
    };

  });
