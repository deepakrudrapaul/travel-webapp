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
   
    var eventId = $stateParams.id;

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



    $scope.onFormSubmit = function(form) {
      remoteSvc.submitEventForm($scope.queryObj)
        .success(function(data){
          $scope.formSubmitted = true;
          $scope.messageType = "Success";
            $scope.queryObj = {};
        })
        .error(function (error) {
          console.log(error);
        })
    }
  });
