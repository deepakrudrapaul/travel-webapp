'use strict';

/**
 * @ngdoc function
 * @name wanderwagon-webapp.controller:TravelPlanCtrl
 * @description
 * # TravelPlanCtrl
 * Controller of the wanderwagon-webapp
 */
angular.module('wanderwagon-webapp')
  .controller('TravelPlanCtrl', function ($scope, remoteSvc, $document) {

     $scope.getTravelInspirations = function () {
      remoteSvc.getTravelInspirations().then(function (response) {
        console.log(response);
        $scope.slider = response;
      });
    };

    $scope.getTravelInspirations();

    $scope.getBlogs = function() {
      remoteSvc.getHomeBlogs()
        .success(function (data){
          console.log(data.response);
          $scope.blog = data.response;
        })
        .error(function (error){

        })
    };
    $scope.getBlogs();


    $scope.getTravelInspirationDetail = function (id) {
      mockRemoteSvc.getTravelInspirationDetail(id).then(function (response) {
        $scope.inspirations = response;
      });
    };

    $scope.$watch('heading1.isOpen', function (isOpen) {
      if (isOpen) {
        var someElement = angular.element(document.getElementById('accordion1'));
        $document.scrollToElement(someElement, 50, 800);
      }
    });




  });
