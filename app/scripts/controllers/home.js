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

    // $window.requestAnimationFrame = (function () {
    //   return $window.requestAnimationFrame ||
    //    window.webkitRequestAnimationFrame ||
    //       window.mozRequestAnimationFrame    ||
    //       function( callback ){
    //         window.setTimeout(callback, 1000 / 60);
    //       };
    // })();

    // var speed = 5000;
    // (function currencySlide() {
    //   var currencyPairWidth = $('.slideItem:first-child').outerWidth();
    //   $(".slideContainer").animate({
    //     marginLeft: -currencyPairWidth
    //   }, speed, 'linear', function () {
    //     $(this).css({
    //       marginLeft: 0
    //     }).find("li:last").after($(this).find("li:first"));
    //   });
    //   requestAnimationFrame(currencySlide);
    // })();

    $scope.instaPhotos = [];
    $scope.initInstaPhotos = function () {
      remoteSvc.getInstaPhotos()
        .success(function (data) {
          $scope.instaPhotos = data.response;
          // $interval($scope.insta_move ,50);
        })
        .error(function (error) {

        })
    };
    $scope.initInstaPhotos();






    $scope.openInstagram = function () {
      $window.open('https://www.instagram.com/wanderwagon', ' _blank');
    };


    $scope.getBlogs = function () {
      remoteSvc.getHomeBlogs()
        .success(function (data) {
          console.log(data.response);
          $scope.blog = data.response;
        })
        .error(function (error) {

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

    $scope.showModal = function (messageType, message) {
      angular.element(document.querySelectorAll('#messageModal')).modal('show');
      $scope.messageType = messageType;
      $scope.message = message;
    };



    $scope.onFormSubmit = function (form) {
      if (form.$valid) {
        console.log($scope.inquiryObj);
        remoteSvc.quickQuery($scope.inquiryObj)
          .success(function (data) {
            $scope.showModal('Success', "Successfully Submitted Your Inquiry !");
          })
          .error(function (error) {
            $scope.showModal('Error', "Error While Submitting Your Request");
          })
      }
    };




    $scope.news = [];
    $scope.conf = {
      news_length: false,
      news_pos: 200, // the starting position from the right in the news container
      news_margin: 20,
      news_move_flag: true
    };

    $scope.getInstaPhotos = function () {
      remoteSvc.getInstaPhotos()
        .success(function (data) {
          $scope.news = data.response;
          $interval($scope.news_move, 50);
        })
        .error(function (error) {

        })
    };
    $scope.getInstaPhotos();

    $scope.get_news_right = function (idx) {
      var $right = $scope.conf.news_pos;
      for (var ri = 0; ri < idx; ri++) {
        if (document.getElementById('news_' + ri)) {
          $right += $scope.conf.news_margin + angular.element(document.getElementById('news_' + ri))[0].offsetWidth;
        }
      }
      return $right + 'px';
    };


      $scope.news_move = function () {
        if ($scope.conf.news_move_flag) {
          $scope.conf.news_pos--;
          if (angular.element(document.getElementById('news_0'))[0].offsetLeft > angular.element(document.getElementById('news_strip'))[0].offsetWidth + $scope.conf.news_margin) {
            var first_new = $scope.news[0];
            $scope.news.push(first_new);
            $scope.news.shift();
            $scope.conf.news_pos += angular.element(document.getElementById('news_0'))[0].offsetWidth + $scope.conf.news_margin;
          }
        }
      };
    

  });
