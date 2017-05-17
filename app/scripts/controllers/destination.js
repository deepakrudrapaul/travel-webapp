'use strict';

/**
 * @ngdoc function
 * @name wanderwagon-webapp.controller:WanderInfoCtrl
 * @description
 * # WanderInfoCtrl
 * Controller of the wanderwagon-webapp
 */
angular.module('wanderwagon-webapp')
  .controller('DestinationCtrl', function ($scope) {

     $scope.destinations = [
      {
        imageUrl: 'http://placehold.it/380x255',
        name: 'Himachal',
        id: 1
      },
      {
        imageUrl: 'http://placehold.it/380x255',
        name: 'Uttarakhand',
        id: 2
      },
      {
        imageUrl: 'http://placehold.it/380x255',
        name: 'Kashmir',
        id: 3
      },
      {
        imageUrl: 'http://placehold.it/380x255',
        name: 'Meghalaya',
        id: 4
      },
      {
        imageUrl: 'http://placehold.it/380x255',
        name: 'Arunachal',
        id: 5
      },
      {
        imageUrl: 'http://placehold.it/380x255',
        name: 'Sikkim',
        id: 6
      }
    ];
     
  });
