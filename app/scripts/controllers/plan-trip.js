'use strict';

/**
 * @ngdoc function
 * @name wanderwagon-webapp.controller:PlanTripCtrl
 * @description
 * # PlanTripCtrl
 * Controller of the wanderwagon-webapp
 */
angular.module('wanderwagon-webapp')
  .controller('PlanTripCtrl', function ($scope) {

      $scope.showInput = true;

      $scope.onKeyDown = function() {
        console.log("PRESSED");
        $scope.showInput = true;
      };





  });
