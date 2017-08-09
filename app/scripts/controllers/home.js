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

    $scope.getInstaPhotos = function() {
        remoteSvc.getInstaPhotos()
          .success(function (data){
            $scope.instaPhotos = data.response;
          })
          .error(function (error){

          })
    };
    $scope.getInstaPhotos();

      $scope.openInstagram = function () {
            $window.open('https://www.instagram.com/wanderwagon', ' _blank');
        };

  
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

   


     $scope.openInstaProfile = function () {
       console.log("CLICKED");
      $window.open('https://www.instagram.com/wanderwagon/', ' _blank');
    }

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

     $scope.showModal = function(messageType, message) {
      angular.element(document.querySelectorAll('#messageModal')).modal('show');
      $scope.messageType = messageType;
      $scope.message = message;
    };



    $scope.onFormSubmit = function (form) {
      if (form.$valid) {
        console.log($scope.inquiryObj);
        remoteSvc.quickQuery($scope.inquiryObj)
          .success(function (data){
               $scope.showModal('Success', "Successfully Submitted Your Request");
          })
          .error(function (error){
               $scope.showModal('Error', "Error While Submitting Your Request");
          })
      }
    };

  });
