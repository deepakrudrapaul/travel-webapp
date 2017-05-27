'use strict';

/**
 * @ngdoc function
 * @name wanderwagon-webapp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the wanderwagon-webapp
 */
angular.module('wanderwagon-webapp')
  .controller('AboutCtrl', function ($scope) {

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
      }
    ];


  });
