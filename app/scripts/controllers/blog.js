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
        image: "http://weknowyourdreams.com/images/adventure/adventure-08.jpg",
        title: "First Blog of Wander Wagon",
        date: "01/04/2017",
        author: "Admin",
        category: "Adventure",
        description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cupiditate, asperiores quod est tenetur in. Eligendi, deserunt, blanditiis est quisquam doloribus voluptate id aperiam ea ipsum magni aut perspiciatis rem voluptatibus officia eos rerum deleniti quae nihil facilis repellat atque vitae voluptatem libero at eveniet veritatis ab facere."
      },

      {
        image: "http://weknowyourdreams.com/images/adventure/adventure-08.jpg",
        title: "Second Blog of Wander Wagon",
        date: "01/04/2017",
        author: "Admin",
        category: "Adventure",
        description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cupiditate, asperiores quod est tenetur in. Eligendi, deserunt, blanditiis est quisquam doloribus voluptate id aperiam ea ipsum magni aut perspiciatis rem voluptatibus officia eos rerum deleniti quae nihil facilis repellat atque vitae voluptatem libero at eveniet veritatis ab facere."
      },

      {
        image: "http://weknowyourdreams.com/images/adventure/adventure-08.jpg",
        title: "Third Blog of Wander Wagon",
        date: "01/04/2017",
        author: "Admin",
        category: "Adventure",
        description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cupiditate, asperiores quod est tenetur in. Eligendi, deserunt, blanditiis est quisquam doloribus voluptate id aperiam ea ipsum magni aut perspiciatis rem voluptatibus officia eos rerum deleniti quae nihil facilis repellat atque vitae voluptatem libero at eveniet veritatis ab facere."
      },

      {
        image: "http://weknowyourdreams.com/images/adventure/adventure-08.jpg",
        title: "Fourth Blog of Wander Wagon",
        date: "01/04/2017",
        author: "Admin",
        category: "Adventure",
        description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cupiditate, asperiores quod est tenetur in. Eligendi, deserunt, blanditiis est quisquam doloribus voluptate id aperiam ea ipsum magni aut perspiciatis rem voluptatibus officia eos rerum deleniti quae nihil facilis repellat atque vitae voluptatem libero at eveniet veritatis ab facere."
      }
    ];

    var instaImages = [
      {image: "http://weknowyourdreams.com/images/adventure/adventure-08.jpg"},
      {image: "http://weknowyourdreams.com/images/adventure/adventure-08.jpg"},
      {image: "http://weknowyourdreams.com/images/adventure/adventure-08.jpg"},
      {image: "http://weknowyourdreams.com/images/adventure/adventure-08.jpg"},
      {image: "http://weknowyourdreams.com/images/adventure/adventure-08.jpg"},
      {image: "http://weknowyourdreams.com/images/adventure/adventure-08.jpg"},
      {image: "http://weknowyourdreams.com/images/adventure/adventure-08.jpg"},
      {image: "http://weknowyourdreams.com/images/adventure/adventure-08.jpg"},
      {image: "http://weknowyourdreams.com/images/adventure/adventure-08.jpg"},
      {image: "http://weknowyourdreams.com/images/adventure/adventure-08.jpg"}
    ];

    $scope.instaImages = instaImages;
    $scope.posts = posts;

  
  });
