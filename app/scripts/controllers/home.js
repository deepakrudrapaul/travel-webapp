'use strict';

/**
 * @ngdoc function
 * @name wanderwagon-webapp.controller:HomeCtrl
 * @description
 * # HomeCtrl
 * Controller of the wanderwagon-webapp
 */
angular.module('wanderwagon-webapp')
  .controller('HomeCtrl', function ($scope, $location, $anchorScroll, $timeout, $interval, remoteSvc) {

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


    $scope.getHomePageContent = function() {
      remoteSvc.getHomePageContent()
        .success(function (data){
            $scope.destinations = data;
        })
        .error(function (error){

        })
    };
    $scope.getHomePageContent();


    //  $scope.destinations = [{
    //     imageUrl: 'images/himachal.jpg',
    //     name: 'Himachal',
    //     id: 1
    //   },
    //   {
    //     imageUrl: 'images/uttarakhand.jpg',
    //     name: 'Uttarakhand',
    //     id: 2
    //   },
    //   {
    //     imageUrl: 'images/kashmir.jpg',
    //     name: 'Kashmir',
    //     id: 3
    //   },
    //   {
    //     imageUrl: 'images/meghalaya.jpg',
    //     name: 'Meghalaya',
    //     id: 4
    //   },
    //   {
    //     imageUrl: 'images/arunachal.jpg',
    //     name: 'Arunachal',
    //     id: 5
    //   },
    //   {
    //     imageUrl: 'images/sikkim.jpg',
    //     name: 'Sikkim',
    //     id: 6
    //   },
    //   {
    //     imageUrl: 'images/manipur.jpg',
    //     name: 'Manipur',
    //     id: 7
    //   },
    //   {
    //     imageUrl: 'images/assam.jpg',
    //     name: 'Assam',
    //     id: 8
    //   },
    //   {
    //     imageUrl: 'images/darjeeling.jpg',
    //     name: 'Darjeeling',
    //     id: 9
    //   }
    // ];


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


    var current = 0;
    var textChangeFunc = function () {
      var time = $timeout();
      angular.forEach(textArr, function (element) {
        time = time.then(function () {
          $scope.changingText = element;
          return $timeout(3000);
        });
      });
    };




    textChangeFunc();


  });
