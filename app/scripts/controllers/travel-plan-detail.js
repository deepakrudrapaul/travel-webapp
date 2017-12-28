'use strict';

/**
 * @ngdoc function
 * @name wanderwagon-webapp.controller:TravelPlanDetailCtrl
 * @description
 * # TravelPlanDetailCtrl
 * Controller of the wanderwagon-webapp
 */
angular.module('wanderwagon-webapp')
  .controller('TravelPlanDetailCtrl', function ($scope, $document, $stateParams, remoteSvc) {

    var id = $stateParams.id; 


    var getTravelInspirationDetail = function () {
      remoteSvc.getTravelInspirationDetail(id).then(function (response) {
        $scope.planDetail = response.response;
        $scope.itineraries = response.response.itineraries;
      });
    };
    getTravelInspirationDetail();

    var owlAPi;
    $scope.ready = function ($api) {
      owlAPi = $api;
    };


    $scope.sliderProperties = {
      // autoHeight:true,
      animateIn: 'fadeIn',
      lazyLoad: true,
      items: 4,
      margin: 0,
      mouseDrag: true,
      touchDrag: true,
      dots: false,
      nav: true,
      responsiveClass: true,
      navText : ["<i class='icon-circle-arrow-left'></i>","<i class='icon-circle-arrow-right'></i>"],
      responsive: {
        0: {
          items: 1,
          nav: true
        },
        600: {
          items: 3,
          nav: true
        },
        1000: {
          items: 3,
          nav: true
        }
      }
    };
    $scope.accordionProperties = {
      // autoHeight:true,
      animateIn: 'fadeIn',
      lazyLoad: true,
      items: 1,
      margin: 10,
      mouseDrag: true,
      touchDrag: true,
      dots: false,
      nav: true,
      responsiveClass: true,
      navText : ["<i class='icon-circle-arrow-left'></i>","<i class='icon-circle-arrow-right'></i>"],
    };

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
      var someElement = angular.element(document.getElementById('places'));
        $document.scrollToElement(someElement, 30, 800);
    };

    $scope.$watch('openAccordion', function (openAccordion) {
      if (openAccordion) {
        var someElement = angular.element(document.getElementById('accordion1'));
        $document.scrollToElement(someElement, 30, 800);
      } 
    });



    // Payment


    $scope.isPaymentDone = false;

    var options = {
      "key": "rzp_live_lhuK7gjYSF90ee",

      "name": "Wanderwagon Pvt Ltd",
      "image": "https://s3-ap-southeast-1.amazonaws.com/wanderwagon/images/logo/logo-short.png",        
      "description": "Kheerganga Trek Booking",
      "prefill": {
        
      },
      "notes": {
          "address": "Hello World"
      },
      "theme": {
          "color": "blue"
      },
      handler: function(response) {
        showPaymentModal();
      }
    };

    $scope.pay = function(amt, desc) {
      options.amount = amt * 100;
      options.description = desc;
      var rzp = new Razorpay(options);
      rzp.open();
    };

    var onSuccess = function() {
      
    };

    var showPaymentModal = function() {
      angular.element(document.querySelectorAll('#paymentModal')).modal('show');
    };
  });
