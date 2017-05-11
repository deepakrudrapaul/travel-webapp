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



    // $scope.myInterval = 3000;
    // // $scope.noWrapSlides = false;
    // // $scope.active = 0;
    // var slides = $scope.slides = [];
    // // var currIndex = 0;

    // $scope.addSlide = function (imageUrl, text) {
    //   slides.push({
    //     image: imageUrl,
    //     text: text
    //   });
    // };


    $scope.images = [
      {
        imageUrl: 'http://placehold.it/380x255',
        text: 'Backpacking'
      },
      {
        imageUrl: 'http://placehold.it/380x255',
        text: 'Road Trip'
      },
      {
        imageUrl: 'http://placehold.it/380x255',
        text: 'Wild Life'
      },
      {
        imageUrl: 'http://placehold.it/380x255',
        text: 'Family'
      },
      {
        imageUrl: 'http://placehold.it/380x255',
        text: 'Adventure'
      },
      {
        imageUrl: 'http://placehold.it/380x255',
        text: 'Couple'
      }
    ];


    

    // angular.forEach($scope.images, function(value, index){
    //     $scope.addSlide(value.imageUrl, value.text);
    // })
    




  });
