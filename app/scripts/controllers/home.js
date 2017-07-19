'use strict';

/**
 * @ngdoc function
 * @name wanderwagon-webapp.controller:HomeCtrl
 * @description
 * # HomeCtrl
 * Controller of the wanderwagon-webapp
 */
angular.module('wanderwagon-webapp')
  .controller('HomeCtrl', function ($scope, $timeout, remoteSvc, $document, $window) {

    $window.requestAnimationFrame = (function () {
      return $window.requestAnimationFrame ||
        $window.webkitRequestAnimationFrame ||
        $window.mozRequestAnimationFrame ||
        function (callback) {
          $window.setTimeout(callback);
        };
    })();


     $scope.openInstaProfile = function () {
      $window.open('https://www.instagram.com/wanderwagon/', ' _blank');
    }


    var speed = 5000;
    (function currencySlide() {
      var currencyPairWidth = $('.slideItem:first-child').outerWidth();
      $(".slideContainer").animate({
        marginLeft: -currencyPairWidth
      }, speed, 'linear', function () {
        $(this).css({
          marginLeft: 0
        }).find("li:last").after($(this).find("li:first"));
      });
      requestAnimationFrame(currencySlide);
    })();




    $scope.getTravelInspirations = function () {
      remoteSvc.getTravelInspirations().then(function (response) {
        console.log(response);
        $scope.slider = response;
      });
    };

    $scope.getTravelInspirations();

    $scope.getTravelInspirationDetail = function (id) {
      remoteSvc.getTravelInspirationDetail(id).then(function (response) {
        console.log(response);
        $scope.inspirations = response;
      });
    };




    $scope.$watch('header.isOpen', function (isOpen) {
      if (isOpen) {
        var someElement = angular.element(document.getElementById('accordion1'));
        $document.scrollToElement(someElement, 50, 800);
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



    $scope.onFormSubmit = function (form) {
      if (form.$valid) {
        remoteSvc.quickQuery().then(function (response) {
          console.log(response);
        })
      }
    };


  });
