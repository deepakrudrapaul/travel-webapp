'use strict';

/**
 * @ngdoc function
 * @name wanderwagon-webapp.controller:TravelPlanCtrl
 * @description
 * # TravelPlanCtrl
 * Controller of the wanderwagon-webapp
 */
angular.module('wanderwagon-webapp')
  .controller('TravelPlanCtrl', function ($scope, mockRemoteSvc) {

     $scope.getTravelPlanContent = function() {
      mockRemoteSvc.getTravelPlanContent().then(function(response){
        $scope.slider = response.slider;
        $scope.articles = response.articles;
      });
    };

    $scope.getTravelPlanContent();

    $scope.getTravelInspirationDetail = function(id) {
        mockRemoteSvc.getTravelInspirationDetail(id).then(function(response){
          $scope.inspirations = response;
        });
    };
      
  });
