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
          width: '90%',
          height: '450px',
          pages: 8
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
      }
    };
  });
