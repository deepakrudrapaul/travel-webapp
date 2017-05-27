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
        imageUrl: 'images/himachal.jpg',
        name: 'Himachal',
        id: 1
      },
      {
        imageUrl: 'images/uttarakhand.jpg',
        name: 'Uttarakhand',
        id: 2
      },
      {
        imageUrl: 'images/kashmir.jpg',
        name: 'Kashmir',
        id: 3
      },
      {
        imageUrl: 'images/meghalaya.jpg',
        name: 'Meghalaya',
        id: 4
      },
      {
        imageUrl: 'images/arunachal.jpg',
        name: 'Arunachal',
        id: 5
      },
      {
        imageUrl: 'images/sikkim.jpg',
        name: 'Sikkim',
        id: 6
      },
      {
        imageUrl: 'images/manipur.jpg',
        name: 'Manipur',
        id: 7
      },
      {
        imageUrl: 'images/assam.jpg',
        name: 'Assam',
        id: 8
      },
      {
        imageUrl: 'images/darjeeling.jpg',
        name: 'Darjeeling',
        id: 9
      }
    ];

  });
