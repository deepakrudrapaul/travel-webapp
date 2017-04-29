'use strict';

/**
 * @ngdoc function
 * @name wanderwagon-webapp.controller:BlogCtrl
 * @description
 * # BlogCtrl
 * Controller of the wanderwagon-webapp
 */
angular.module('wanderwagon-webapp')
  .controller('BlogCtrl', function ($scope) {

    var posts = [
      {
        image: "http://lorempixel.com/800/400/nature/",
        title: "First Blog of Wander Wagon",
        date: "01/04/2017",
        author: "Admin",
        category: "Adventure",
        description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cupiditate, asperiores quod est tenetur in. Eligendi, deserunt, blanditiis est quisquam doloribus voluptate id aperiam ea ipsum magni aut perspiciatis rem voluptatibus officia eos rerum deleniti quae nihil facilis repellat atque vitae voluptatem libero at eveniet veritatis ab facere."
      },

      {
        image: "http://lorempixel.com/800/400/nature/",
        title: "Second Blog of Wander Wagon",
        date: "01/04/2017",
        author: "Admin",
        category: "Adventure",
        description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cupiditate, asperiores quod est tenetur in. Eligendi, deserunt, blanditiis est quisquam doloribus voluptate id aperiam ea ipsum magni aut perspiciatis rem voluptatibus officia eos rerum deleniti quae nihil facilis repellat atque vitae voluptatem libero at eveniet veritatis ab facere."
      },

      {
        image: "http://lorempixel.com/800/400/nature/",
        title: "Third Blog of Wander Wagon",
        date: "01/04/2017",
        author: "Admin",
        category: "Adventure",
        description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cupiditate, asperiores quod est tenetur in. Eligendi, deserunt, blanditiis est quisquam doloribus voluptate id aperiam ea ipsum magni aut perspiciatis rem voluptatibus officia eos rerum deleniti quae nihil facilis repellat atque vitae voluptatem libero at eveniet veritatis ab facere."
      },

      {
        image: "http://lorempixel.com/800/400/nature/",
        title: "Fourth Blog of Wander Wagon",
        date: "01/04/2017",
        author: "Admin",
        category: "Adventure",
        description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cupiditate, asperiores quod est tenetur in. Eligendi, deserunt, blanditiis est quisquam doloribus voluptate id aperiam ea ipsum magni aut perspiciatis rem voluptatibus officia eos rerum deleniti quae nihil facilis repellat atque vitae voluptatem libero at eveniet veritatis ab facere."
      }
    ];

    var instaImages = [
      {image: "http://lorempixel.com/800/400/nature/"},
      {image: "http://lorempixel.com/800/400/people/"},
      {image: "http://lorempixel.com/800/400/sports/"},
      {image: "http://lorempixel.com/800/400/nature/"},
      {image: "http://lorempixel.com/800/400/nature/"},
      {image: "http://lorempixel.com/800/400/nature/"},
      {image: "http://lorempixel.com/800/400/nature/"},
      {image: "http://lorempixel.com/800/400/nature/"},
      {image: "http://lorempixel.com/800/400/nature/"},
      {image: "http://lorempixel.com/800/400/nature/"}
    ];

    var popularPosts = [
      {authorImage: "http://lorempixel.com/100/100/people/",
        postTitle: "This is the most popular post of this month",
        numberOfComments: 29
      },
      {authorImage: "http://lorempixel.com/100/100/people/",
        postTitle: "This is the most popular post of this month",
        numberOfComments: 10
      },
      {authorImage: "http://lorempixel.com/100/100/people/",
        postTitle: "This is the most popular post of this month",
        numberOfComments: 9
      }
    ];

    var recentPosts = [
      {authorImage: "http://lorempixel.com/100/100/people/",
        postTitle: "This is the most recent post of this month",
        date: "19th April 2017"
      },
      {authorImage: "http://lorempixel.com/100/100/people/",
        postTitle: "This is the most recent post of this month",
        date: "9th April 2017"
      },
      {authorImage: "http://lorempixel.com/100/100/people/",
        postTitle: "This is the most recent post of this month",
        date: "7th April 2017"
      }
    ];

    $scope.recentPosts = recentPosts;
    $scope.popularPosts = popularPosts;
    $scope.instaImages = instaImages;
    $scope.posts = posts;

  
  });
