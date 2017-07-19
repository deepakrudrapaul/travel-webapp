'use strict';

/**
 * @ngdoc function
 * @name wanderwagon-webapp.controller:DestinationDetailCtrl
 * @description
 * # DestinationDetailCtrl
 * Controller of the wanderwagon-webapp
 */
angular.module('wanderwagon-webapp')
  .controller('DestinationDetailCtrl', function ($scope, $stateParams, remoteSvc, $document) {

    var destinationId = $stateParams.id;

    $scope.getDestinationDetailById = function (destinationId) {
      remoteSvc.getDestinationDetailById(destinationId).then(function (data) {
        console.log(data);
        $scope.detail = data.response;
        $scope.placesData = data.response.places;
        $scope.activitiesData = data.response.activities;
      });
    };
    $scope.getDestinationDetailById(destinationId);



    $scope.$watch('header1.isOpen', function (isOpen) {
      if (isOpen) {
        var someElement = angular.element(document.getElementById('accordion1'));
        $document.scrollToElement(someElement, 40, 800);
      }
    });

    $scope.$watch('accordion2.isOpen', function (isOpen) {
      if (isOpen) {
        var someElement = angular.element(document.getElementById('accordion2'));
        $document.scrollToElement(someElement, 40, 800);
      }
    });


  });
