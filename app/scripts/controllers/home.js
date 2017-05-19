'use strict';

/**
 * @ngdoc function
 * @name wanderwagon-webapp.controller:HomeCtrl
 * @description
 * # HomeCtrl
 * Controller of the wanderwagon-webapp
 */
angular.module('wanderwagon-webapp')
  .controller('HomeCtrl', function ($scope) {


    $scope.images = [
      {
        imageUrl: 'images/slider3.jpg',
        text: 'Backpacking'
      },
      {
        imageUrl: 'images/related2.jpg',
        text: 'Road Trip'
      },
      {
        imageUrl: 'images/related1.jpg',
        text: 'Wild Life'
      },
      {
        imageUrl: 'images/related3.jpg',
        text: 'Family'
      },
      {
        imageUrl: 'images/related4.jpg',
        text: 'Adventure'
      },
      {
        imageUrl: 'images/related2.jpg',
        text: 'Couple'
      }
    ];


  });
