'use strict';

/**
 * @ngdoc function
 * @name wanderwagon-webapp.controller:TravelPlanCtrl
 * @description
 * # TravelPlanCtrl
 * Controller of the wanderwagon-webapp
 */
angular.module('wanderwagon-webapp')
  .controller('TravelPlanCtrl', function ($scope, mockRemoteSvc, $document) {

    $scope.getTravelPlanContent = function () {
      mockRemoteSvc.getTravelPlanContent().then(function (response) {
        $scope.slider = response.slider;
        $scope.articles = response.articles;
      });
    };


    $scope.getTravelPlanContent();

    $scope.getTravelInspirationDetail = function (id) {
      mockRemoteSvc.getTravelInspirationDetail(id).then(function (response) {
        $scope.inspirations = response;
      });
    };

    $scope.$watch('heading1.isOpen', function (isOpen) {
      if (isOpen) {
        var someElement = angular.element(document.getElementById('accordion1'));
        $document.scrollToElement(someElement, 50, 800);
      }
    });




  });
