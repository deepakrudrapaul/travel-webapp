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
        $scope.sliderData = response;
      });
    };

    $scope.travelPlanData = [];
    $scope.getTravelPlans = function (id) {
      remoteSvc.getTravelPlans(id)
        .success(function (data){
          $scope.travelPlanData = data.response;
          console.log($scope.travelPlanData);
        })
        .error(function(error){

        })
    };

    $scope.getBlogs = function () {
      remoteSvc.getHomeBlogs().then(function (response) {
        console.log(response);
        $scope.blog = response;
      })
    };

    $scope.getTravelInspirations();
    $scope.getBlogs();

    

    $scope.openAccordion = false;
    $scope.openOrCloseAccordion = function () {
      if ($scope.openAccordion === true) {
        $scope.closeAccordion();
      } else if ($scope.openAccordion === false) {
        $scope.openAccordion = true;
      }
    };

    $scope.closeAccordion = function () {
      $scope.openAccordion = false;
      var someElement = angular.element(document.getElementById('travel'));
      $document.scrollToElement(someElement, 30, 800);
    };

 $scope.$watch('openAccordion', function (openAccordion) {
      if (openAccordion) {
        var someElement = angular.element(document.getElementById('accordion'));
        $document.scrollToElement(someElement, 30, 800);
      }
    });


    var owlAPi;
    
     $scope.properties = {
       // autoHeight:true,
       animateIn: 'fadeIn',
       lazyLoad: true,
       items: 4,
       margin: 0,
       mouseDrag: true,
       touchDrag: true,
       dots: false,
       nav: true,
       responsiveClass:true,
       navText : ["<i class='fa fa-chevron-left'></i>","<i class='fa fa-chevron-right'></i>"],
       responsive:{
           0:{
               items:1,
               nav:true
           },
           600:{
               items:3,
               nav:true
           },
           1000:{
             items:4,
             nav:true
         }
         }
   };
 
   $scope.ready = function ($api) {
     owlAPi = $api;
 };
 
 $scope.nestedCarouselproperties = {
   // autoHeight:true,
   animateIn: 'fadeIn',
   lazyLoad: true,
   items: 3,
   margin: 10,
   mouseDrag: true,
   touchDrag: true,
   dots: false,
   nav: true,
   responsiveClass:true,
   navText : ["<i class='fa fa-chevron-left'></i>","<i class='fa fa-chevron-right'></i>"],
   responsive:{
       0:{
           items:1,
           nav:true
       },
       600:{
           items:2,
           nav:true
       },
       1000:{
         items:3,
         nav:true
     }
     }
 };



  });
