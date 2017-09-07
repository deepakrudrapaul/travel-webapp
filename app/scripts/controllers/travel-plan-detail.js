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
        console.log(response.response);
        $scope.planDetail = response.response;
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
      navText : ["<span class='glyphicons glyphicons-chevron-right'></span>","<span class='glyphicons glyphicons-chevron-right'></span>"],
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
      navText: ["<i class='fa fa-chevron-left'></i>", "<i class='fa fa-chevron-right'></i>"]
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



    $scope.tips = [
      {tip : 'Make sure you carry warm clothes irrespective of the fact that what season you are travelling in. '},
      {tip : 'Carry your own trekking gear and equipments and be always prepared.'},
      {tip : 'Carry a medical aid kit and your usual medicines for the way.'},
      {tip : 'A good pair of trekking shoes is a must.'},
      {tip : 'Carry raingear no matter if you are travelling during monsoon season.'}
    ];
      




  });
