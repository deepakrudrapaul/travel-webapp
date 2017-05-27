'use strict';

/**
 * @ngdoc function
 * @name wanderwagon-webapp.controller:DestinationDetailCtrl
 * @description
 * # DestinationDetailCtrl
 * Controller of the wanderwagon-webapp
 */
angular.module('wanderwagon-webapp')
  .controller('DestinationDetailCtrl', function ($scope, $location, $anchorScroll) {



 $scope.places = [{
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

     
      $scope.activities = [{
        imageUrl: 'images/backpacking.jpg',
        text: 'Backpacking'
      },
      {
        imageUrl: 'images/roadtrip.jpg',
        text: 'Road Trip'
      },
      {
        imageUrl: 'images/adventure.jpg',
        text: 'Adventure'
      },
      {
        imageUrl: 'images/nature.jpg',
        text: 'Nature'
      },
      {
        imageUrl: 'images/adventure.jpg',
        text: 'Family'
      },
      {
        imageUrl: 'images/backpacking.jpg',
        text: 'Couple'
      },

    ];


    $scope.showPlaces = false;
    $scope.showPlaceDetails = function(){
      $scope.showPlaces = true;
      console.log($scope.showPlaces);
    };

    $scope.onClicked = function() {
      console.log("CLICKED");
    };



     $scope.gotoContent = function(name) {
      $location.hash(name);
      $anchorScroll();
    };

  });
