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

    $scope.getAllPosts = function () {
      remoteSvc.getAllPosts()
        .success(function (data) {
          console.log(data.response);
          $scope.posts = data.response;
        })
        .error(function (error) {

        })
    };
   

    $scope.getAllPosts();

    var instaImages = [{
        image: "http://lorempixel.com/800/400/nature/"
      },
      {
        image: "http://lorempixel.com/800/400/people/"
      },
      {
        image: "http://lorempixel.com/800/400/sports/"
      },
      {
        image: "http://lorempixel.com/800/400/nature/"
      },
      {
        image: "http://lorempixel.com/800/400/nature/"
      },
      {
        image: "http://lorempixel.com/800/400/nature/"
      },
      {
        image: "http://lorempixel.com/800/400/nature/"
      },
      {
        image: "http://lorempixel.com/800/400/nature/"
      },
      {
        image: "http://lorempixel.com/800/400/nature/"
      },
      {
        image: "http://lorempixel.com/800/400/nature/"
      }
    ];

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

    var recentPosts = [{
        authorImage: "http://lorempixel.com/100/100/people/",
        postTitle: "This is the most recent post of this month",
        date: "19th April 2017"
      },
      {
        authorImage: "http://lorempixel.com/100/100/people/",
        postTitle: "This is the most recent post of this month",
        date: "9th April 2017"
      },
      {
        authorImage: "http://lorempixel.com/100/100/people/",
        postTitle: "This is the most recent post of this month",
        date: "7th April 2017"
      }
    ];

    $scope.recentPosts = recentPosts;
    $scope.popularPosts = popularPosts;
    $scope.instaImages = instaImages;



  });
