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


    $scope.inspirationData = [
      {
        "id":1,
        "name":"Dharamshala",
        "imageUrl":"images/himachal.jpg",
        "description":"Dharamshala is a city in the Indian state of Himachal Pradesh. Surrounded by cedar forests on the edge of the Himalayas, this hillside city is home to the Dalai Lama and the Tibetan government-in-exile. The Thekchen Chöling Temple Complex is a spiritual center for Tibetan Buddhism, while the Library of Tibetan Works and Archives houses thousands of precious manuscripts."
      },
      {
        "id":2,
        "name":"Nainital",
        "imageUrl":"images/himachal.jpg",
        "description":"Dharamshala is a city in the Indian state of Himachal Pradesh. Surrounded by cedar forests on the edge of the Himalayas, this hillside city is home to the Dalai Lama and the Tibetan government-in-exile. The Thekchen Chöling Temple Complex is a spiritual center for Tibetan Buddhism, while the Library of Tibetan Works and Archives houses thousands of precious manuscripts."
      },
      {
        "id":3,
        "name":"Kasol",
        "imageUrl":"images/himachal.jpg",
        "description":"Dharamshala is a city in the Indian state of Himachal Pradesh. Surrounded by cedar forests on the edge of the Himalayas, this hillside city is home to the Dalai Lama and the Tibetan government-in-exile. The Thekchen Chöling Temple Complex is a spiritual center for Tibetan Buddhism, while the Library of Tibetan Works and Archives houses thousands of precious manuscripts."
      },
      {
        "id":4,
        "name":"Manali",
        "imageUrl":"images/himachal.jpg",
        "description":"Dharamshala is a city in the Indian state of Himachal Pradesh. Surrounded by cedar forests on the edge of the Himalayas, this hillside city is home to the Dalai Lama and the Tibetan government-in-exile. The Thekchen Chöling Temple Complex is a spiritual center for Tibetan Buddhism, while the Library of Tibetan Works and Archives houses thousands of precious manuscripts."
      },
      {
        "id":5,
        "name":"Dzuko Valley",
        "imageUrl":"images/himachal.jpg",
        "description":"Dharamshala is a city in the Indian state of Himachal Pradesh. Surrounded by cedar forests on the edge of the Himalayas, this hillside city is home to the Dalai Lama and the Tibetan government-in-exile. The Thekchen Chöling Temple Complex is a spiritual center for Tibetan Buddhism, while the Library of Tibetan Works and Archives houses thousands of precious manuscripts."
      },
      {
        "id":6, 
        "name":"Dharamshala",
        "imageUrl":"images/himachal.jpg",
        "description":"Dharamshala is a city in the Indian state of Himachal Pradesh. Surrounded by cedar forests on the edge of the Himalayas, this hillside city is home to the Dalai Lama and the Tibetan government-in-exile. The Thekchen Chöling Temple Complex is a spiritual center for Tibetan Buddhism, while the Library of Tibetan Works and Archives houses thousands of precious manuscripts."
      },

    ];
    

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
