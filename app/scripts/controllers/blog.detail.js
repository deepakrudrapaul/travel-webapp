'use strict';

/**
 * @ngdoc function
 * @name wanderwagon-webapp.controller:BlogDetailCtrl
 * @description
 * # BlogDetailCtrl
 * Controller of the wanderwagon-webapp
 */
angular.module('wanderwagon-webapp')
  .controller('BlogDetailCtrl', function ($q, $scope, $cookies, $stateParams, remoteSvc, $window, $auth, $location, auth) {

    var postId = $stateParams.postId;

    $scope.showModal = function (messageType, message) {
      angular.element(document.querySelectorAll('#shareModal')).modal('show');
      $scope.messageType = messageType;
      $scope.message = message;
    };

    $scope.getPostDetail = function () {
      remoteSvc.getBlogDetail(postId).then(function (response) {
        console.log(response.response);
        $scope.postDetail = response.response;
      })
    };
    $scope.getPostDetail();


    var getSimilarPosts = function(blogId) {
      remoteSvc.getSimilarBlogs(blogId)
          .success(function (data){
            $scope.instaPhotos = data.response;
          })
          .error(function (error){

          })
    };

    getSimilarPosts(postId);

    $scope.onShareButtonClicked = function (blogId) {
      $scope.shareObj = {};
      $scope.shareObj.blogUrl = $location.absUrl();
      $scope.shareObj.blogId = blogId;
      $scope.shareObj.socialMediaType = 1;

      $auth.authenticate(provider)
        .then(function (response) {
          $scope.shareObj.accessToken = response.access_token;
          if (provider == 'google') {
            shareOnGooglePlus($scope.shareObj);
          } else {
            shareOnFacebook($scope.shareObj);
          }
        })
        .catch(function (response) {
          console.log("Something went Wrong");
        })
    };

    var shareOnFacebook = function (shareObj) {
      remoteSvc.shareOnFacebook(shareObj)
        .success(function (data) {
          $scope.showModal("Success", "You have successfully shared this post");
        })
        .error(function (error) {
          console.log(error);
        })
    };

    var shareOnGooglePlus = function (shareObj) {
      remoteSvc.shareOnGoglePlus(shareObj)
        .success(function (data) {
          $scope.showModal("Success", "You have successfully shared this post");
        })
        .error(function (error) {
          console.log(error);
        })
    };

    $scope.commentObj = {};
    $scope.postComment = function (blogId) {
      $scope.commentObj.blodId = blogId;

      remoteSvc.postComment($scope.commentObj)
        .success(function (data){
          console.log(data);
        })
        .error(function (error){
          console.log(error);
        })
    };


    $scope.showForm = false;
    $scope.showCommentForm = function() {
        if (auth.isLoggedIn()) {
           $scope.showForm = true;
        } else {
           $scope.showForm = false;
            $scope.showModal("Log In", "Please Login to comment on this post");
        }
    };  
   


  


   


  });
