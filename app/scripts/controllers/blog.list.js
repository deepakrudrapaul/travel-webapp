'use strict';

/**
 * @ngdoc function
 * @name wanderwagon-webapp.controller:BlogListCtrl
 * @description
 * # BlogListCtrl
 * Controller of the wanderwagon-webapp
 */
angular.module('wanderwagon-webapp')
  .controller('BlogListCtrl', function ($scope, remoteSvc) {

    $scope.getBlogList = function () {
      remoteSvc.getBlogList().then(function (response){
        $scope.posts = response;
      });
    };
    $scope.getBlogList();


  });
