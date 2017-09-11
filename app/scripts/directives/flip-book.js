'use strict';

/**
 * @ngdoc directive
 * @name wanderwagon-webapp.directive:flipBook
 * @description
 * # flipBook
 */
angular.module('wanderwagon-webapp')
  .directive('flipBook', function () {
    return {
      templateUrl: 'views/flipbook.html',
      restrict: 'E',
      link: function postLink(scope, element, attrs) {

        $('#flipbook').turn({
          width: '100%',
          height: '700px',
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
            $("#flipbook").turn("size", '100%', 400);
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
            $("#flipbook").turn("size", '100%', 400);
            $('#flipbook').turn('peel', 'br');
          }
        });

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
