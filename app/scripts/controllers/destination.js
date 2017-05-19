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


    $scope.slides = [{
        imageUrl: 'images/slider/1.jpg',
        text: 'Backpacking'
      },
      {
        imageUrl: 'images/slider/2.jpg',
        text: 'Road Trip'
      },
      {
        imageUrl: 'images/slider/3.jpg',
        text: 'Wild Life'
      }
    ];

    $scope.destinations = [{
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
      },
      {
        imageUrl: 'http://placehold.it/380x255',
        name: 'Manipur',
        id: 7
      },
      {
        imageUrl: 'http://placehold.it/380x255',
        name: 'Assam',
        id: 8
      },
      {
        imageUrl: 'http://placehold.it/380x255',
        name: 'Darjeeling',
        id: 9
      },
      {
        imageUrl: 'http://placehold.it/380x255',
        name: 'Kolkata',
        id: 10
      },
      {
        imageUrl: 'http://placehold.it/380x255',
        name: 'Delhi',
        id: 11
      },
      {
        imageUrl: 'http://placehold.it/380x255',
        name: 'Agra',
        id: 12
      }
    ];

  });
