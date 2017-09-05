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

    $scope.getPostDetail = function () {
      remoteSvc.getBlogDetail(postId).then(function (response) {
        console.log(response.response);
        $scope.postDetail = response.response;
      })
    };
    $scope.getPostDetail();

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
           $scope.showLoginModal("Log In", "");
        }
    };  


    $scope.authenticate = function (provider) {
      $auth.authenticate(provider)
        .then(function (response) {
          if (provider == 'google') {
            auth.googleLogin(response.access_token)
              .then(function (data) {
                 closeLoginModal();
                 $rootScope.$emit('social-login', 'true');
                  $scope.showForm = true;                    
              })
              .catch(function (error) {
                $scope.showModal('Error', "Error While With Facebook Login. Please Try After Some Time");
              });
          } else {
            auth.facebookLogin(response.access_token)
              .then(function (data) {
                closeLoginModal();
                 $rootScope.$emit('social-login', 'true'); 
                  $scope.showForm = true;
              })
              .catch(function (error) {
                $scope.showModal('Error', "Error While With Facebook Login. Please Try After Some Time");
              });
          }
        })
        .catch(function (response) {
          console.log("Something went Wrong");
        })
    };


  });
