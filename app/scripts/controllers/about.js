'use strict';

/**
 * @ngdoc function
 * @name wanderwagon-webapp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the wanderwagon-webapp
 */
angular.module('wanderwagon-webapp')
  .controller('AboutCtrl', function ($scope, $window) {


    $scope.openSocialSite = function (url) {
      $window.open(url, ' _blank');
    }


  });
