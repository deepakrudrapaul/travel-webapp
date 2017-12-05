'use strict';

/**
 * @ngdoc function
 * @name wanderwagon-webapp.controller:EventCtrl
 * @description
 * # EventCtrl
 * Controller of the wanderwagon-webapp
 */
angular.module('wanderwagon-webapp')
  .controller('EventCtrl', function ($scope, $stateParams, remoteSvc) {
   
    var eventId = 1 ;

    $scope.formSubmitted = false;
    $scope.messageType = "Query Form";

    var getEventById = function(eventId) {
      remoteSvc.getEventById(eventId).then(function(data){
        $scope.eventDetail = data.response;
        console.log(data);
      });
    };
    getEventById(eventId);

    $scope.queryObj = {};


    $scope.onQueryButtonClicked = function(id) {
      $scope.queryObj.locationId = id;
      $scope.queryObj.eventId = eventId;
      $scope.formSubmitted = false;
      angular.element(document.querySelectorAll('#eventModal')).modal('show');
    };


    var showImageModal = function() {
      angular.element(document.querySelectorAll('#eventSuccessModal')).modal('show');
    };


    $scope.onFormSubmit = function(form) {
      remoteSvc.submitEventForm($scope.queryObj)
        .success(function(data){
          angular.element(document.querySelectorAll('#eventModal')).modal('hide');
          showImageModal();
          
            $scope.queryObj = {};
        })
        .error(function (error) {
          console.log(error);
        })
    }
  });
