'use strict';

/**
 * @ngdoc directive
 * @name wanderwagon-webapp.directive:flipBook
 * @description
 * # flipBook
 */
angular.module('wanderwagon-webapp')
  .directive('flipBook', function ($timeout, remoteSvc) {
    return {
      templateUrl: 'views/flipbook.html',
      restrict: 'E',
      scope: {
        data: '='
      },
      link: function postLink(scope, element, attrs) {


          $timeout(function(){
          $('#flipbook').turn({
            width: '100%',
            height: '650px',
            autoCenter: true,
            duration: 1000,
            gradients: true,
            elevation: 100,
            next: true
          });


          $('#flipbook').turn('peel', 'br');

          $("#prev").click(function (e) {
            e.preventDefault();
            $('#flipbook').turn("previous");
          });

          $("#next").click(function (e) {
            e.preventDefault();
            $('#flipbook').turn("next");
          });


          $(window).width(function () {
            var win = $(this); //this = window
            if (win.width() >= 768) {
              $('#flipbook').turn('display', 'double');
              $('#flipbook').turn('peel', 'br');
            } else {
              $('#flipbook').turn('display', 'single');
              $("#flipbook").turn("size", '100%', 500);
              $('#flipbook').turn('peel', 'br');
            }
          });
          $(window).resize(function () {
            var win = $(this); //this = window
            if (win.width() >= 768) {
              $('#flipbook').turn('display', 'double');
              $('#flipbook').turn('peel', 'br');
            } else {
              $('#flipbook').turn('display', 'single');
              $("#flipbook").turn("resize");
              $("#flipbook").turn("size", '100%', 500);
              $('#flipbook').turn('peel', 'br');
            }
          });
         }, 1000);



        // $("#prev").click(function (e) {
        //   e.preventDefault();
        //   $('#flipbook').turn("previous");
        // });

        // $("#next").click(function (e) {
        //   e.preventDefault();
        //    $('#flipbook').turn("next");
        // });
      }
    };
  });
