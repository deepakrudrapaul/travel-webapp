'use strict';

/**
 * @ngdoc function
 * @name wanderwagon-webapp.controller:BlogDetailCtrl
 * @description
 * # BlogDetailCtrl
 * Controller of the wanderwagon-webapp
 */
angular.module('wanderwagon-webapp')
  .controller('BlogDetailCtrl', function ($q, $scope, $rootScope, $cookies, $stateParams, remoteSvc, $window, $auth, $location, auth) {

    var postId = $stateParams.postId;

    $scope.showModal = function (messageType, message) {
      angular.element(document.querySelectorAll('#shareModal')).modal('show');
      $scope.messageType = messageType;
      $scope.message = message;
    };

     $scope.showLoginModal = function (messageType, message) {
      angular.element(document.querySelectorAll('#loginModal')).modal('show');
      $scope.messageType = messageType;
      $scope.message = message;
    };

    var closeLoginModal = function () {
      angular.element(document.querySelectorAll('#loginModal')).modal('hide');
    };

    $scope.getBlogDetail = function () {
      remoteSvc.getBlogDetail(postId).then(function (response) {
        $scope.postDetail = response.response;
      }); 
    };
    $scope.getBlogDetail();

    var getComments = function(postId) {
      remoteSvc.getCommentsByBlogId(postId).then(function (response){
        $scope.comments = response;
      })
    };
    getComments(postId);

    $scope.commentObj = {};
    $scope.postComment = function (blogId) {
      $scope.commentObj.blogId = blogId;
      remoteSvc.postComment($scope.commentObj)
        .success(function (data){
          $scope.commentObj = {};
          getComments(postId);
        })
        .error(function (error){
          console.log(error);
        });
    };


    
    $scope.showForm = false;
    $scope.showCommentForm = function() {
        if (auth.isLoggedIn()) {
           $scope.showForm = true;
        } else {
           $scope.showLoginModal("Log In", "");
        }
    };  

    $rootScope.$on('social-login', function (event, data) {
      $scope.showForm = true;
    });

  });
