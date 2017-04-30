'use strict';

/**
 * @ngdoc function
 * @name wanderwagon-webapp.controller:BlogDetailCtrl
 * @description
 * # BlogDetailCtrl
 * Controller of the wanderwagon-webapp
 */
angular.module('wanderwagon-webapp')
  .controller('BlogDetailCtrl', function ($scope, $stateParams, remoteSvc) {

    var postId = $stateParams.postId;
 
    $scope.getPostDetail = function() {
      remoteSvc.getBlogDetail(postId)
        .success(function (data){
          console.log(data);
          $scope.postDetail = data.response.blogDetailElements[0];
          console.log($scope.postDetail);
          $scope.author = data.response.author;
          $scope.comments = data.response.comments;
        })
        .error(function (error){
            console.log(error);
        })
    };

    $scope.getPostDetail();
    
  });
