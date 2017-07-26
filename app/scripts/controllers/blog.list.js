'use strict';

/**
 * @ngdoc function
 * @name wanderwagon-webapp.controller:BlogListCtrl
 * @description
 * # BlogListCtrl
 * Controller of the wanderwagon-webapp
 */
angular.module('wanderwagon-webapp')
  .controller('BlogListCtrl', function ($scope, remoteSvc, $location) {

    $scope.getBlogList = function () {
      remoteSvc.getBlogList().then(function (response){
        console.log(response);
        $scope.posts = response;
        // $scope.instaImages = response.instaImages;
        // $scope.popularPosts = response.popularPosts;
        // $scope.recentPosts = response.recentPosts;
      })
    };
    $scope.getBlogList();

    $scope.getBlogInstaPhotos = function() {
        remoteSvc.getInstaPhotos()
          .success(function (data){
            $scope.instaPhotos = data.response;
          })
          .error(function (error){

          })
    };
    $scope.getBlogInstaPhotos();



  });
