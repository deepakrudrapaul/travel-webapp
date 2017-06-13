'use strict';

/**
 * @ngdoc function
 * @name wanderwagon-webapp.controller:DestinationDetailCtrl
 * @description
 * # DestinationDetailCtrl
 * Controller of the wanderwagon-webapp
 */
angular.module('wanderwagon-webapp')
  .controller('DestinationDetailCtrl', function ($scope, $stateParams, mockRemoteSvc, $document) {

    var destinationId = $stateParams.id;

    $scope.getDestinationDetailById = function (destinationId) {
      mockRemoteSvc.getDestinationDetailById(destinationId).then(function (response) {
        $scope.detail = response;
        $scope.placesData = response.places;
        $scope.activitiesData = response.activities;
      });
    };


     $scope.$watch('header1.isOpen', function (isOpen) {
      if (isOpen) {
        var someElement = angular.element(document.getElementById('accordion'));
        $document.scrollToElement(someElement, 40, 800);
      }
    });

    $scope.$watch('header2.isOpen', function (isOpen) {
      if (isOpen) {
        var someElement = angular.element(document.getElementById('accordion1'));
        $document.scrollToElement(someElement, 40, 800);
      }
    });


    $scope.getDestinationDetailById(destinationId);



  });
