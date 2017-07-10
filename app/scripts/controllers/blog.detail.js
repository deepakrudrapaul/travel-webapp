'use strict';

/**
 * @ngdoc function
 * @name wanderwagon-webapp.controller:BlogDetailCtrl
 * @description
 * # BlogDetailCtrl
 * Controller of the wanderwagon-webapp
 */
angular.module('wanderwagon-webapp')
  .controller('BlogDetailCtrl', function ($scope, $stateParams, remoteSvc, $window) {

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
      dateTime: "10th July 2014",
      author: {
        name: "Deepak Paul",
        socialUrl: "some url",
        info: "Sone description"
      },
      comments: 6,
      title: "Tips for solo travellers",
      coverImageUrl: "images/tips-cover.jpg",
      paragraphArray: [{
          para: "Traveling alone may seem scary at first, But , The number of reasons why one should travel alone at least once outnumbers why one should not by a considerable margin. One reason is that after a solo adventure you wouldn’t be the same person as you were before, I can bet on that. The solitude that you get while traveling solo gives a new dimension to your thought process."
        },
        {
          para: "Also, It's good to be around uncertainty sometimes, It's good to be out of your comfort zone sometimes, It's good to be in your own company sometimes. Solo travel is more about you rather than anyone else. Solo traveling is often confused with loneliness, but there is a subtle difference. While solo traveling, you are not alone, you are just on your own, in your own company and that’s all what makes the difference.  Although, there is no denying that some perils accompany solo traveling but with some precautions and measures, one can easily dodge them and have an enthralling life adventure on the go. "
        },
        {
          para: "Here are some tips for solo traveling, the right way."
        }
      ],
      points: [{
          title: "1) Do your homework",
          paragraphArray: [{
            para: "Do your comprehensive research before heading towards any destination for solo-travelling. It is so because things can turn upside down in an instant at an unfamiliar place. So, it is advised to do your homework beforehand. "
          }],
          imageUrl: "images/1.jpg",
          bulletsTitle: "Some of the preparations include:",
          bulletsData: [{
              bullet: "If you are traveling to a foreign location, then do learn some local phrases so that it can be handy while communicating."
            },
            {
              bullet: "Maintain a list of all the items with which you are traveling."
            },
            {
              bullet: "Always have a VPN installed on your smart device and enable it while using any public WiFi networks."
            },
            {
              bullet: "Have a hard-copy of all the transportation schedules."
            }
          ]
        },

        {
          title: "2) Sleep with open eyes!",
          paragraphArray: [{
            para: "Stat alert and be proactive. Keep your eyes and ears open. Traveling solo can make you vulnerable. Keep a close watch on your valuables. It is advised not to flaunt your expensive gears.Trust your instincts and stay safe."
          }],
          imageUrl: "images/2.jpg",
          bulletsTitle: "",
          bulletsData: []
        },

        {
          title: "3) Be a minimalist.",
          paragraphArray: [{
              para: "Traveling alone and carrying all your home with you is not a thing that a solo-travelling book recommends.  Pack light and be a minimalist. Carry a bare minimum."
            },
            {
              para: "This will also help you manage and carry your luggage with much ease. Do not forget to take the guidebook, paperwork, resealable plastic, small first-aid kit, pen, diary, credit/debit cards and clothes."
            }
          ],
          imageUrl: "images/3.jpg",
          bulletsTitle: "Some of the preparations include:",
          bulletsData: [{
              bullet: "If you are traveling to a foreign location, then do learn some local phrases so that it can be handy while communicating."
            },
            {
              bullet: "If you are traveling to a foreign location, then do learn some local phrases so that it can be handy while communicating."
            },
            {
              bullet: "If you are traveling to a foreign location, then do learn some local phrases so that it can be handy while communicating."
            }
          ]
        }
      ]
    };

    $scope.openSocialProfile = function () {
      $window.open('https://www.facebook.com/deepak.rudra.paul', ' _blank');
    }


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
