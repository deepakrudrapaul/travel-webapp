'use strict';

/**
 * @ngdoc function
 * @name wanderwagon-webapp.controller:DestinationDetailCtrl
 * @description
 * # DestinationDetailCtrl
 * Controller of the wanderwagon-webapp
 */
angular.module('wanderwagon-webapp')
  .controller('DestinationDetailCtrl', function ($scope) {

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


    $scope.showPlaces = false;
    $scope.showPlaceDetails = function(){
      $scope.showPlaces = true;
      console.log($scope.showPlaces);
    };

    $scope.onClicked = function() {
      console.log("CLICKED");
    };

  });
