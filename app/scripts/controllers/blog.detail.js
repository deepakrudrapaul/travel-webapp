'use strict';

/**
 * @ngdoc function
 * @name wanderwagon-webapp.controller:BlogDetailCtrl
 * @description
 * # BlogDetailCtrl
 * Controller of the wanderwagon-webapp
 */
angular.module('wanderwagon-webapp')
  .controller('BlogDetailCtrl', function ($q, $scope, $cookies, $stateParams, remoteSvc, $window, $auth, $location) {

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



   


    var popularPosts = [{
        authorImage: "http://lorempixel.com/100/100/people/",
        postTitle: "This is the most popular post of this month",
        numberOfComments: 29
      },
      {
        authorImage: "http://lorempixel.com/100/100/people/",
        postTitle: "This is the most popular post of this month",
        numberOfComments: 10
      },
      {
        authorImage: "http://lorempixel.com/100/100/people/",
        postTitle: "This is the most popular post of this month",
        numberOfComments: 9
      }
    ];

    $scope.popularPosts = popularPosts;


    $scope.onImageClicked = function () {
      console.log("CLICKED");
    };


    $scope.images = [{
        imageUrl: 'images/backpacking.jpg',
        text: 'Backpacking'
      },
      {
        imageUrl: 'images/roadtrip.jpg',
        text: 'Road Trip'
      },
      {
        imageUrl: 'images/adventure.jpg',
        text: 'Adventure'
      },
      {
        imageUrl: 'images/nature.jpg',
        text: 'Nature'
      },
      {
        imageUrl: 'images/adventure.jpg',
        text: 'Family'
      },
      {
        imageUrl: 'images/backpacking.jpg',
        text: 'Couple'
      },

    ];


  });
