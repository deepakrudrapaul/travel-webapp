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

    // $scope.getPostDetail = function () {
    //   remoteSvc.getBlogDetail(postId)
    //     .success(function (data) {
    //       console.log(data);
    //       $scope.postDetail = data.response.blogDetailElements[0];
    //       console.log($scope.postDetail);
    //       $scope.author = data.response.author;
    //       $scope.comments = data.response.comments;
    //     })
    //     .error(function (error) {
    //       console.log(error);
    //     })
    // };

    // $scope.getPostDetail();

    $scope.postDetail = {
      title: "First Blog of Wander Wagon",
      author: "Paul",
      description: "Duis mollis, est non commodo luctus, nisi erat porttitor ligula, eget lacinia odio sem nec elit Duis mollis, est non commodo luctus, nisi erat porttitor ligula, eget lacinia odio sem nec elit. Cras mattis",
      imageUrl: "images/related1.jpg"
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


    $scope.onImageClicked = function() {
        console.log("CLICKED");
    };


     $scope.images = [
      {
        imageUrl: 'http://placehold.it/380x255',
        text: 'Backpacking'
      },
      {
        imageUrl: 'http://placehold.it/380x255',
        text: 'Road Trip'
      },
      {
        imageUrl: 'http://placehold.it/380x255',
        text: 'Wild Life'
      },
      {
        imageUrl: 'http://placehold.it/380x255',
        text: 'Family'
      },
      {
        imageUrl: 'http://placehold.it/380x255',
        text: 'Adventure'
      },
      {
        imageUrl: 'http://placehold.it/380x255',
        text: 'Couple'
      }
    ];


  });
