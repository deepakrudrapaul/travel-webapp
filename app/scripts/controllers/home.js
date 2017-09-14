'use strict';

/**
 * @ngdoc function
 * @name wanderwagon-webapp.controller:HomeCtrl
 * @description
 * # HomeCtrl
 * Controller of the wanderwagon-webapp
 */
angular.module('wanderwagon-webapp')
  .controller('HomeCtrl', function ($scope, $timeout, remoteSvc, $document, $window, $interval, $location) {

    $scope.getBlogs = function () {
      remoteSvc.getHomeBlogs().then(function (response) {
        $scope.blog = response;
      })
    };

    
    $scope.getTravelInspirations = function () {
      remoteSvc.getTravelInspirations().then(function (response) {
        console.log(response);
        $scope.sliderData = response;
      });
    };

    $scope.travelPlanData = [];
    var getTravelPlans = function (id) {
      remoteSvc.getTravelPlans(id).then(function (response){
        $scope.travelPlanData = response;
      });
    };


    $scope.getTravelInspirations();
    $scope.getBlogs();


    $scope.openAccordion = false;
    $scope.openOrCloseAccordion = function (id) {
      if ($scope.openAccordion === true) {
        $scope.closeAccordion();
      } else if ($scope.openAccordion === false) {
        $scope.openAccordion = true;
        getTravelPlans(id);
      }
    };

    $scope.closeAccordion = function () {
      $scope.travelPlanData = undefined;
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



    var textArr = [
      'To Dream and Live it',
      'To Think and See it',
      'To Want and Chase it',
      'To be There and Do that'
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

    $scope.showModal = function (messageType, message) {
      angular.element(document.querySelectorAll('#messageModal')).modal('show');
      $scope.messageType = messageType;
      $scope.message = message;
    };



    $scope.onFormSubmit = function (form) {
      if (form.$valid) {
        remoteSvc.quickQuery($scope.inquiryObj)
          .success(function (data) {
            $scope.inquiryObj = {};
            $scope.showModal('Success', "Successfully Submitted Your Inquiry !");
          })
          .error(function (error) {
            $scope.inquiryObj = {};
            $scope.showModal('Error', "Error While Submitting Your Request");
          })
      } else {
        $scope.showModal('Error', "Please Enter Correct Details");
      }
    };


   

    var owlAPi;
    $scope.ready = function ($api) {
      owlAPi = $api;
  };
   
    $scope.properties = {
      autoHeight:true,
      animateIn: 'fadeIn',
      lazyLoad: true,
      items: 3,
      margin: 0,
      mouseDrag: true,
      touchDrag: true,
      dots: false,
      nav: true,
      responsiveClass:true,
      navText : ["<i class='icon-circle-arrow-left'></i>","<i class='icon-circle-arrow-right'></i>"],
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

 

$scope.accordionProperties = {
  autoHeight:true,
  animateIn: 'fadeIn',
  lazyLoad: true,
  items: 3,
  margin: 10,
  mouseDrag: true,
  touchDrag: true,
  dots: false,
  nav: true,
  responsiveClass:true,
  navText : ["<i class='icon-circle-arrow-left'></i>","<i class='icon-circle-arrow-right'></i>"],
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
