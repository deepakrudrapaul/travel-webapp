'use strict';

/**
 * @ngdoc function
 * @name wanderwagon-webapp.controller:DestinationDetailCtrl
 * @description
 * # DestinationDetailCtrl
 * Controller of the wanderwagon-webapp
 */
angular.module('wanderwagon-webapp')
  .controller('DestinationDetailCtrl', function ($scope, $stateParams, mockRemoteSvc) {

    var destinationId = $stateParams.id;

    $scope.placesViewData = [];
    var convertPlacesData = function (data) {
      for (var index = 0; index < 4; index++) {
        $scope.placesViewData.push(data[index]);
        data.splice(index, 1);
      }
    };

    $scope.activitiesViewData = [];
    var convertActivitiesData = function (data) {
      for (var index = 0; index < 4; index++) {
        $scope.activitiesViewData.push(data[index]);
        data.splice(index, 1);
      }
    };

    $scope.getDestinationDetailById = function (destinationId) {
      mockRemoteSvc.getDestinationDetailById(destinationId).then(function (response) {
        $scope.detail = response;
        $scope.placesData = angular.copy(response.places);
        if($scope.placesData.length > 4){
          convertPlacesData($scope.placesData);
        }
        $scope.activitiesData = angular.copy(response.activities);
        if($scope.activitiesData.length > 4){
          convertActivitiesData($scope.activitiesData);
        }
      });
    };



    $scope.getDestinationDetailById(destinationId);



  });
