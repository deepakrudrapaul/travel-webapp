'use strict';

/**
 * @ngdoc function
 * @name wanderwagon-webapp.controller:EventCtrl
 * @description
 * # EventCtrl
 * Controller of the wanderwagon-webapp
 */
angular.module('wanderwagon-webapp')
  .controller('EventCtrl', function ($scope, $stateParams, remoteSvc, mockRemoteSvc) {
   
    var eventId = $stateParams.id;

    $scope.formSubmitted = false;
    $scope.messageType = "Query Form";

    var getEventById = function(eventId) {
      mockRemoteSvc.getEventById(eventId).then(function(data){
        $scope.eventDetail = data;
      });
    };
    getEventById(eventId);

    $scope.queryObj = {};


    $scope.onQueryButtonClicked = function(id) {
      $scope.queryObj.locationId = id;
      $scope.formSubmitted = false;
      angular.element(document.querySelectorAll('#eventModal')).modal('show');
    };



    $scope.onFormSubmit = function(form) {
      $scope.formSubmitted = true;
      $scope.messageType = "Success";
        console.log($scope.queryObj);
        $scope.queryObj = {};
    }




  });
