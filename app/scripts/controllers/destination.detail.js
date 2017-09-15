'use strict';

/**
 * @ngdoc function
 * @name wanderwagon-webapp.controller:DestinationDetailCtrl
 * @description
 * # DestinationDetailCtrl
 * Controller of the wanderwagon-webapp
 */
angular.module('wanderwagon-webapp')
  .controller('DestinationDetailCtrl', function ($scope, $stateParams, remoteSvc, $document, $state) {

    var destinationId = $stateParams.id;

    $scope.getDestinationDetailById = function (destinationId) {
      remoteSvc.getDestinationDetailById(destinationId).then(function (data) {
        $scope.detail = data.response;
        $scope.placesData = data.response.places;
        $scope.activitiesData = data.response.activities;
      });
    };
    $scope.getDestinationDetailById(destinationId);


    $scope.redirectToPlans = function(travelPlanId) {
      if(travelPlanId != null) {
        $state.go('travel-plan.detail', {id : travelPlanId});
      } else{
        $state.go('travel-plan.list');
      }
    }

    $scope.openAccordion = false;
    $scope.openAccordion1 = false;


    $scope.openOrCloseAccordion = function (param) {

      if (param === 'place') {
        if ($scope.openAccordion === true) {
          $scope.closeAccordion();
        } else if ($scope.openAccordion === false) {
          $scope.openAccordion = true;
        }
      } else if (param === 'activity') {
        if ($scope.openAccordion1 === true) {
          $scope.closeAccordion1();
        } else if ($scope.openAccordion1 === false) {
          $scope.openAccordion1 = true;
        }
      }

    };

    $scope.closeAccordion = function () {
      $scope.openAccordion = false;
      var someElement = angular.element(document.getElementById('places'));
      $document.scrollToElement(someElement, 30, 800);
    };


    $scope.closeAccordion1 = function () {
      $scope.openAccordion1 = false;
      var someElement = angular.element(document.getElementById('activities'));
      $document.scrollToElement(someElement, 30, 800);
    };



    $scope.$watch('openAccordion', function (openAccordion) {
      if (openAccordion) {
        var someElement = angular.element(document.getElementById('accordion1'));
        $document.scrollToElement(someElement, 30, 800);
      }
    });

    $scope.$watch('openAccordion1', function (openAccordion1) {
      if (openAccordion1) {
        var someElement = angular.element(document.getElementById('accordion2'));
        $document.scrollToElement(someElement, 30, 800);
      }
    });

    var owlAPi;
    $scope.ready = function ($api) {
      owlAPi = $api;
    };

    var placeAccordionOwlAPi;
    $scope.readyPlaceAccordion = function ($api) {
      placeAccordionOwlAPi = $api;
    };

    var activityAccordionOwlAPi;
    $scope.readyActivityAccordion = function ($api) {
      activityAccordionOwlAPi = $api;
    };


    $scope.gotoCarouselPlace = function (param) {
      placeAccordionOwlAPi.trigger('to.owl.carousel', [param, 1]);
    };

    $scope.gotoCarouselActivity = function (param) {
      activityAccordionOwlAPi.trigger('to.owl.carousel', [param, 1]);
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






  });
