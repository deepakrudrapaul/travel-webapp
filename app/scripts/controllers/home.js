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

  


    $scope.myInterval = 3000;
    $scope.noWrapSlides = false;
    $scope.active = 0;
    var slides = $scope.slides = [];
    var currIndex = 0;

    $scope.addSlide = function (imageUrl, text) {
      slides.push({
        image: imageUrl,
        text: text,
        id: currIndex++
      });
    };


    $scope.images = [
      {
        imageUrl: 'http://moonriveradventure.in/images/slider3.jpg',
        text: 'Planning a Trip'
      },
      {
        imageUrl: 'https://mrajshekhar.files.wordpress.com/2012/11/ladakh-51.jpg',
        text: 'Rent a Bike'
      },
      {
        imageUrl: 'http://arounddeglobe.com/wp-content/uploads/2014/12/Zip-lining.jpg',
        text: 'Adrenaline Junkie'
      }
    ];

    angular.forEach($scope.images, function(value, index){
        $scope.addSlide(value.imageUrl, value.text);
    })
    




  });
