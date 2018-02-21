'use strict';

/**
 * @ngdoc function
 * @name wanderwagon-webapp.controller:EventCtrl
 * @description
 * # EventCtrl
 * Controller of the wanderwagon-webapp
 */
angular.module('wanderwagon-webapp')
  .controller('EventCtrl', function ($scope, $stateParams, auth, $rootScope, mockRemoteSvc, $document) {

    var event = $stateParams.eventSlug;
    var eventId;

    $scope.mobileImageUrl;
    if (event.includes('holi')) {
      eventId = 2
      $scope.mobileImageUrl = 'https://s3-ap-southeast-1.amazonaws.com/wanderwagon/images/mobile/holi_cover.jpg';
    } else {
      eventId = 1;
      $scope.mobileImageUrl = 'https://s3-ap-southeast-1.amazonaws.com/wanderwagon/images/mobile/valentine_cover.jpg';
    }

    $scope.formSubmitted = false;
    $scope.messageType = "Query Form";

    // var getEventById = function (eventId) {
    //   remoteSvc.getEventById(eventId).then(function (data) {
    //     $scope.eventDetail = data.response;
    //   });
    // };
    // getEventById(eventId);


    var showModal = function (messageType, message) {
      angular.element(document.querySelectorAll('#tripModal')).modal('show');
      $scope.messageType = messageType;
      $scope.message = message;
    };


    var showImageModal = function () {
      angular.element(document.querySelectorAll('#plantripModal')).modal('show');
    };

    var getEventTravelPlans = function() {
      mockRemoteSvc.getEventTravelPlans().then(function (data){
        $scope.travelPlans = data;
      });
    };

    getEventTravelPlans();

    var getPlanById = function(id) {
      
      mockRemoteSvc.getPlanById(id).then(function (data) {
        $scope.itineraries = data.itineraries;
        console.log(data);
      });
    }


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
          items: 4,
          nav: true
        }
      }
    };

  $scope.openAccordion = false;
    $scope.openOrCloseAccordion = function (id) {
        if ($scope.openAccordion === true) {
          $scope.closeAccordion();
        } else if ($scope.openAccordion === false) {
          getPlanById(id);
          $scope.openAccordion = true;
        }
    };

    $scope.closeAccordion = function () {
      $scope.itineraries = [];
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


    $scope.submitEventForm = function (form) {
      remoteSvc.submitEventForm($scope.formObj)
        .success(function (data) {
          $scope.formObj = {};
          showModal("Cheers", "We will return the favour soon.");
        })
        .error(function (error) {
          $scope.formObj = {};
          $scope.showModal("Error", error.error.message);
        })
    };


      // Payment


      $scope.isPaymentDone = false;

      var options = {
        "key": "rzp_live_lhuK7gjYSF90ee",
  
        "name": "Wanderwagon Pvt Ltd",
        "image": "https://s3-ap-southeast-1.amazonaws.com/wanderwagon/images/logo/logo-square.png",        
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
        showModal("Cheers", "Get ready to rock this holi.");
      };


  });
