'use strict';

/**
 * @ngdoc directive
 * @name wanderwagon-webapp.directive:instaPhotoStream
 * @description
 * # instaPhotoStream
 */
angular.module('wanderwagon-webapp')
  .directive('instaPhotoStream', function ($interval, remoteSvc, $window) {
    return {
      templateUrl: 'views/insta-photo-stream.html',
      restrict: 'E',
      link: function postLink(scope, element, attrs) {

        scope.getInstaPhotos = function () {
          remoteSvc.getInstaPhotos().then(function (response) {
            scope.instaData = response;
            console.log(response);
          });
        };
        scope.getInstaPhotos();

        scope.redirectToInstagram = function () {
          $window.open('https://www.instagram.com/wanderwagon', ' _blank');
        }
  
    
        window.requestAnimationFrame = (function(){
          return  window.requestAnimationFrame       ||
                  window.webkitRequestAnimationFrame ||
                  window.mozRequestAnimationFrame  
        })();

        var speed = 5000;
        (function currencySlide(){
            var currencyPairWidth = $('.slideItem:first-child').outerWidth();
            $(".slideContainer").animate({marginLeft:-currencyPairWidth},speed, 'linear', function(){
                        $(this).css({marginLeft:0}).find("li:last").after($(this).find("li:first"));
                });
                requestAnimationFrame(currencySlide);
        })();

      }
    };
  });
