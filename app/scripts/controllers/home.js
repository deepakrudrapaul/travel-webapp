'use strict';

/**
 * @ngdoc function
 * @name wanderwagon-webapp.controller:HomeCtrl
 * @description
 * # HomeCtrl
 * Controller of the wanderwagon-webapp
 */
angular.module('wanderwagon-webapp')
  .controller('HomeCtrl', function ($scope, $location, $anchorScroll, $timeout, $interval) {

    $scope.gotoTravelInspiration = function () {
      $location.hash('content');
      $anchorScroll();
    };

    $scope.images = [{
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


    var instaImages = [{
        image: "images/backpacking.jpg"
      },
      {
        image: "images/roadtrip.jpg"
      },
      {
        image: "images/adventure.jpg"
      },
      {
        image: "images/nature.jpg"
      },
      {
        image: "images/adventure.jpg"
      },
      {
        image: "images/backpacking.jpg"
      }
    ];

    $scope.instaImages = instaImages;


    var textArr = [
      'Hassle Free',
      'Lively',
      'Comfortable',
      'Memorable',
      'Wondrous'
    ];

    $scope.changingText = {};

  
    $scope.counter = 0;
    var textChangeFunc = function () {
      let timeout = $timeout();
      angular.forEach(textArr, function (element) {
        timeout = timeout.then(function () {
          $scope.changingText = element;
          $scope.counter++;
          return $timeout(3000);
        });
      });
    };


    textChangeFunc();
  });
