'use strict';

/**
 * @ngdoc function
 * @name wanderwagon-webapp.controller:ContactCtrl
 * @description
 * # ContactCtrl
 * Controller of the wanderwagon-webapp
 */
angular.module('wanderwagon-webapp')
  .controller('ContactCtrl', function ($scope, $window) {


    $scope.openFacebook = function () {
            $window.open('https://www.facebook.com/wanderwagon', ' _blank');
        }

  

  });
