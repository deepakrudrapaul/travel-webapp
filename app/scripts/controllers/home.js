'use strict';

/**
 * @ngdoc function
 * @name wanderwagon-webapp.controller:HomeCtrl
 * @description
 * # HomeCtrl
 * Controller of the wanderwagon-webapp
 */
angular.module('wanderwagon-webapp')
  .controller('HomeCtrl', function ($scope, $timeout, mockRemoteSvc) {


    $scope.sliderViewData = [];
    var convertSliderData = function (data) {
      for (var index = 0; index < 4; index++) {
        $scope.sliderViewData.push(data[index]);
        data.splice(index, 1);
      }
    };
    
    $scope.getHomePageContent = function () {
      mockRemoteSvc.getHomePageContent().then(function (response) {
        $scope.slider = response.slider;
        convertSliderData($scope.slider);
        console.log($scope.slider);
        $scope.destinations = response.destinations;
        $scope.blog = response.homePageBlog;
        $scope.instaImages = response.instaImages;
      });
    };

    $scope.getHomePageContent();

    $scope.getTravelInspirationDetail = function (id) {
      mockRemoteSvc.getTravelInspirationDetail(id).then(function (response) {
        console.log(response);
        $scope.inspirations = response;
      });
    };







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
