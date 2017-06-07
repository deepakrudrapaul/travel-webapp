'use strict';

/**
 * @ngdoc function
 * @name wanderwagon-webapp.controller:BlogListCtrl
 * @description
 * # BlogListCtrl
 * Controller of the wanderwagon-webapp
 */
angular.module('wanderwagon-webapp')
  .controller('BlogListCtrl', function ($scope, mockRemoteSvc, $location) {

    $scope.getBlogList = function () {
      mockRemoteSvc.getBlogList().then(function (response){
        $scope.posts = response.blogs;
        $scope.instaImages = response.instaImages;
        $scope.popularPosts = response.popularPosts;
        $scope.recentPosts = response.recentPosts;
      })
    };
   

    $scope.getBlogList();




  });
