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
        console.log(data.response);
        $scope.detail = data.response;
        $scope.placesData = data.response.places;
        $scope.activitiesData = data.response.activities;
      });
    };
    $scope.getDestinationDetailById(destinationId);

    $scope.openAccordion = false;
    $scope.openAccordion1 = false;


    $scope.openOrCloseAccordion = function (param) {

      if (param === 'place') {
        console.log(param);
        if ($scope.openAccordion === true) {
          $scope.closeAccordion();
        } else if ($scope.openAccordion === false) {
          $scope.openAccordion = true;
        }
      } else if (param === 'activity') {
        console.log(param);
        if ($scope.openAccordion1 === true) {
          $scope.closeAccordion();
        } else if ($scope.openAccordion1 === false) {
          $scope.openAccordion1 = true;
        }
      }

    };

    $scope.closeAccordion = function () {
      $scope.openAccordion = false;
      var someElement = angular.element(document.getElementById('places'));
      $document.scrollToElement(someElement, 30, 800);
    };


    $scope.closeAccordion1 = function () {
      $scope.openAccordion1 = false;
      var someElement = angular.element(document.getElementById('activities'));
      $document.scrollToElement(someElement, 30, 800);
    };



    $scope.$watch('openAccordion', function (openAccordion) {
      if (openAccordion) {
        var someElement = angular.element(document.getElementById('accordion1'));
        $document.scrollToElement(someElement, 30, 800);
      }
    });

    $scope.$watch('openAccordion1', function (openAccordion1) {
      if (openAccordion1) {
        var someElement = angular.element(document.getElementById('accordion2'));
        $document.scrollToElement(someElement, 30, 800);
      }
    });

  


  });
