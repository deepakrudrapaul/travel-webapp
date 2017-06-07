'use strict';

/**
 * @ngdoc function
 * @name wanderwagon-webapp.controller:WanderInfoCtrl
 * @description
 * # WanderInfoCtrl
 * Controller of the wanderwagon-webapp
 */
angular.module('wanderwagon-webapp')
  .controller('DestinationCtrl', function ($scope, mockRemoteSvc) {

    $scope.getDestinationsList = function() {
      mockRemoteSvc.getDestinationsList().then(function(response){
        console.log(response);
        $scope.destinations = response;
      });
    };

    $scope.getDestinationsList();


  });
