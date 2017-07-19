'use strict';

/**
 * @ngdoc function
 * @name wanderwagon-webapp.controller:WanderInfoCtrl
 * @description
 * # WanderInfoCtrl
 * Controller of the wanderwagon-webapp
 */
angular.module('wanderwagon-webapp')
  .controller('DestinationCtrl', function ($scope, remoteSvc) {

    $scope.getDestinationsList = function() {
      remoteSvc.getDestinationsList().then(function(data){
        $scope.destinations = data.response;
      });
    };

    $scope.getDestinationsList();


  });
