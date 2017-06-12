'use strict';

/**
 * @ngdoc service
 * @name wanderwagon-webapp.mockRemoteSvc
 * @description
 * # mockRemoteSvc
 * Factory in the wanderwagon-webapp.
 */
angular.module('wanderwagon-webapp')
  .factory('mockRemoteSvc', function ($q) {


    var slider = [{
        imageUrl: 'images/backpacking.jpg',
        text: 'Backpacking',
        id: 1,
        data: [{
            imageUrl: 'images/himachal.jpg',
            name: 'Himachal',
            id: 1
          },
          {
            imageUrl: 'images/uttarakhand.jpg',
            name: 'Uttarakhand',
            id: 2
          },
          {
            imageUrl: 'images/arunachal.jpg',
            name: 'Arunachal',
            id: 5
          }
        ]
      },
      {
        imageUrl: 'images/roadtrip.jpg',
        text: 'Road Trip',
        id: 2,
        data: [{
            imageUrl: 'images/manipur.jpg',
            name: 'Manipur',
            id: 7
          },
          {
            imageUrl: 'images/assam.jpg',
            name: 'Assam',
            id: 8
          },
          {
            imageUrl: 'images/darjeeling.jpg',
            name: 'Darjeeling',
            id: 9
          }
        ]
      },
      {
        imageUrl: 'images/adventure.jpg',
        text: 'Adventure',
        id: 3,
        data: [{
            imageUrl: 'images/meghalaya.jpg',
            name: 'Meghalaya',
            id: 4
          },
          {
            imageUrl: 'images/arunachal.jpg',
            name: 'Arunachal',
            id: 5
          },
          {
            imageUrl: 'images/sikkim.jpg',
            name: 'Sikkim',
            id: 6
          }
        ]
      },
      {
        imageUrl: 'images/nature.jpg',
        text: 'Nature',
        id: 4,
        data: [{
            imageUrl: 'images/manipur.jpg',
            name: 'Manipur',
            id: 7
          },
          {
            imageUrl: 'images/assam.jpg',
            name: 'Assam',
            id: 8
          },
          {
            imageUrl: 'images/darjeeling.jpg',
            name: 'Darjeeling',
            id: 9
          }
        ]
      },
      {
        imageUrl: 'images/adventure.jpg',
        text: 'Family',
        id: 5
      },
      {
        imageUrl: 'images/backpacking.jpg',
        text: 'Couple',
        id: 6
      },
      {
        imageUrl: 'images/adventure.jpg',
        text: 'Family',
        id: 7
      },
      {
        imageUrl: 'images/backpacking.jpg',
        text: 'Couple',
        id: 8
      },
    ];

    var destinations = [{
        imageUrl: 'images/himachal.jpg',
        name: 'Himachal',
        id: 1,
        data: {
          name: 'Himachal',
          title: 'is a stunning tapestry',
          about: "Nullam id dolor id nibh ultricies vehicula ut id elit. Curabitur blandit tempus porttitor. Integer posuere erat a ante venenatis dapibus posuere velit aliquet. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Vestibulum id ligula porta felis euismod semper. Donec id elit non mi porta gravida at eget metus. Vestibulum id ligula porta felis euismod semper.",
          overview: {
            bestTimeToVisit: 'All Seasons',
            daysRequired: '4-5 Days',
            category: 'Hills'
          },
          howToReach: {
            airport: 'Not Available',
            railways: 'An overnight train journey is a good option to reach Dharamshala. The nearest major railway station is at Pathankot, 85 kilometres away. There are numerous trains that go to Jammu and Kashmir that stop by in Pathankot.',
            roadways: 'You can take a taxi or bus from Pathankot to reach Dharamshala.'
          },
          places: [{
              imageUrl: 'images/home-bg.jpg',
              name: 'Dharamshala',
              id: 7
            },
            {
              imageUrl: 'images/destination-bg.jpg',
              name: 'Shimla',
              id: 8
            },
            {
              imageUrl: 'images/destination-bg.jpg',
              name: 'Manali',
              id: 9
            },
            {
              imageUrl: 'images/home-bg.jpg',
              name: 'Kasol',
              id: 9
            },
            {
              imageUrl: 'images/home-bg.jpg',
              name: 'Dharamshala',
              id: 7
            },
            {
              imageUrl: 'images/destination-bg.jpg',
              name: 'Shimla',
              id: 8
            },
            {
              imageUrl: 'images/destination-bg.jpg',
              name: 'Manali',
              id: 9
            },
            {
              imageUrl: 'images/home-bg.jpg',
              name: 'Kasol',
              id: 9
            }
          ],
          activities: [{
              imageUrl: 'images/home-bg.jpg',
              name: 'Rafting',
              id: 7
            },
            {
              imageUrl: 'images/destination-bg.jpg',
              name: 'Kayaking',
              id: 8
            },
            {
              imageUrl: 'images/destination-bg.jpg',
              name: 'Trekking',
              id: 9
            },
            {
              imageUrl: 'images/home-bg.jpg',
              name: 'Rafting',
              id: 9
            },
            {
              imageUrl: 'images/home-bg.jpg',
              name: 'Mountaineering',
              id: 7
            },
            {
              imageUrl: 'images/destination-bg.jpg',
              name: 'Bungee Jumping',
              id: 8
            },
            {
              imageUrl: 'images/destination-bg.jpg',
              name: 'Sky Diving',
              id: 9
            },
            {
              imageUrl: 'images/home-bg.jpg',
              name: 'Trekking',
              id: 9
            }
          ]
        }
      },
      {
        imageUrl: 'images/uttarakhand.jpg',
        name: 'Uttarakhand',
        id: 2
      },
      {
        imageUrl: 'images/kashmir.jpg',
        name: 'Kashmir',
        id: 3
      },
      {
        imageUrl: 'images/meghalaya.jpg',
        name: 'Meghalaya',
        id: 4
      },
      {
        imageUrl: 'images/arunachal.jpg',
        name: 'Arunachal',
        id: 5
      },
      {
        imageUrl: 'images/sikkim.jpg',
        name: 'Sikkim',
        id: 6
      },
      {
        imageUrl: 'images/manipur.jpg',
        name: 'Manipur',
        id: 7
      },
      {
        imageUrl: 'images/assam.jpg',
        name: 'Assam',
        id: 8
      },
      {
        imageUrl: 'images/darjeeling.jpg',
        name: 'Darjeeling',
        id: 9
      }
    ];


    var homePageBlog = [{
        title: 'For rivers, seas and slopes at their most inviting',
        description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cupiditate, asperiores quod est tenetur in. Eligendi, deserunt, blanditiis est quisquam doloribus voluptate id aperiam ea ipsum magni aut perspiciatis rem voluptatibus',
        dateTime: '02 Jun 2017',
        imageUrl: 'images/manipur.jpg',
        author: 'Zoe Bennett',
        id: 1
      },

      {
        title: 'For rivers, seas and slopes at their most inviting',
        description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cupiditate, asperiores quod est tenetur in. Eligendi, deserunt, blanditiis est quisquam doloribus voluptate id aperiam ea ipsum magni aut perspiciatis rem voluptatibus',
        dateTime: '02 Jun 2017',
        imageUrl: 'images/himachal.jpg',
        author: 'Zoe Bennett',
        id: 2
      }
    ];

    var instaImages = [{
        image: "images/backpacking.jpg"
      },
      {
        image: "images/roadtrip.jpg"
      },
      {
        image: "images/adventure.jpg"
      },
      {
        image: "images/nature.jpg"
      },
      {
        image: "images/adventure.jpg"
      },
      {
        image: "images/backpacking.jpg"
      }
    ];


    var homePageContent = {
      slider: slider,
      destinations: destinations,
      homePageBlog: homePageBlog,
      instaImages: instaImages
    };

    var articles = [{
        title: 'For rivers, seas and slopes at their most inviting',
        description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cupiditate, asperiores quod est tenetur in. Eligendi, deserunt, blanditiis est quisquam doloribus voluptate id aperiam ea ipsum magni aut perspiciatis rem voluptatibus',
        dateTime: '02 Jun 2017',
        imageUrl: 'images/manipur.jpg',
        author: 'Zoe Bennett',
        id: 1
      },

      {
        title: 'For rivers, seas and slopes at their most inviting',
        description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cupiditate, asperiores quod est tenetur in. Eligendi, deserunt, blanditiis est quisquam doloribus voluptate id aperiam ea ipsum magni aut perspiciatis rem voluptatibus',
        dateTime: '02 Jun 2017',
        imageUrl: 'images/himachal.jpg',
        author: 'Zoe Bennett',
        id: 2
      }
    ];

    var travelPlanContent = {
      slider: slider,
      articles: articles
    };


    var blogs = [
      {
        title: 'For rivers, seas and slopes at their most inviting',
        description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cupiditate, asperiores quod est tenetur in. Eligendi, deserunt, blanditiis est quisquam doloribus voluptate id aperiam ea ipsum magni aut perspiciatis rem voluptatibus',
        dateTime: '02 Jun 2017',
        imageUrl: 'images/manipur.jpg',
        author: 'Zoe Bennett',
        id: 1,
        comments: 2
      },

      {
        title: 'For rivers, seas and slopes at their most inviting',
        description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cupiditate, asperiores quod est tenetur in. Eligendi, deserunt, blanditiis est quisquam doloribus voluptate id aperiam ea ipsum magni aut perspiciatis rem voluptatibus',
        dateTime: '02 Jun 2017',
        imageUrl: 'images/himachal.jpg',
        author: 'Zoe Bennett',
        id: 2,
        comments: 5
      },
      {
        title: 'For rivers, seas and slopes at their most inviting',
        description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cupiditate, asperiores quod est tenetur in. Eligendi, deserunt, blanditiis est quisquam doloribus voluptate id aperiam ea ipsum magni aut perspiciatis rem voluptatibus',
        dateTime: '02 Jun 2017',
        imageUrl: 'images/himachal.jpg',
        author: 'Zoe Bennett',
        id: 3,
        comments: 5
      },
      {
        title: 'For rivers, seas and slopes at their most inviting',
        description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cupiditate, asperiores quod est tenetur in. Eligendi, deserunt, blanditiis est quisquam doloribus voluptate id aperiam ea ipsum magni aut perspiciatis rem voluptatibus',
        dateTime: '02 Jun 2017',
        imageUrl: 'images/himachal.jpg',
        author: 'Zoe Bennett',
        id: 4,
        comments: 5
      },
      {
        title: 'For rivers, seas and slopes at their most inviting',
        description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cupiditate, asperiores quod est tenetur in. Eligendi, deserunt, blanditiis est quisquam doloribus voluptate id aperiam ea ipsum magni aut perspiciatis rem voluptatibus',
        dateTime: '02 Jun 2017',
        imageUrl: 'images/himachal.jpg',
        author: 'Zoe Bennett',
        id: 5,
        comments: 5
      },
      {
        title: 'For rivers, seas and slopes at their most inviting',
        description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cupiditate, asperiores quod est tenetur in. Eligendi, deserunt, blanditiis est quisquam doloribus voluptate id aperiam ea ipsum magni aut perspiciatis rem voluptatibus',
        dateTime: '02 Jun 2017',
        imageUrl: 'images/himachal.jpg',
        author: 'Zoe Bennett',
        id: 6,
        comments: 5
      },
    ];


    var instaImages = [{
        image: "images/meghalaya.jpg"
      },
      {
        image: "images/arunachal.jpg"
      },
      {
        image: "images/sikkim.jpg"
      },
      {
        image: "images/uttarakhand.jpg"
      },
      {
        image: "images/manipur.jpg"
      },
      {
        image: "images/assam.jpg"
      },
      {
        image: "images/sikkim.jpg"
      },
      {
        image: "images/uttarakhand.jpg"
      },
      {
        image: "images/manipur.jpg"
      },
      {
        image: "images/assam.jpg"
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

    var blogPageData = {
      blogs: blogs,
      instaImages: instaImages,
      popularPosts: popularPosts,
      recentPosts: recentPosts
    };


    // Public API here
    return {
      getHomePageContent: function () {
        var deferred = $q.defer();
        deferred.resolve(homePageContent);
        return deferred.promise;
      },


      getTravelInspirationDetail: function (id) {
        var deferred = $q.defer();
        angular.forEach(slider, function (value, key) {
          if (value.id == id) {
            deferred.resolve(value.data);
          }
        });
        return deferred.promise;
      },

      getTravelPlanContent: function () {
        var deferred = $q.defer();
        deferred.resolve(travelPlanContent);
        return deferred.promise;
      },


      getDestinationsList: function () {
        var deferred = $q.defer();
        deferred.resolve(destinations);
        return deferred.promise;
      },

      getDestinationDetailById: function (id) {
        var deferred = $q.defer();
        angular.forEach(destinations, function (value, key) {
          if (value.id == id) {
            deferred.resolve(value.data);
          }
        });
        return deferred.promise;
      },

      getBlogList: function() {
        var deferred = $q.defer();
        deferred.resolve(blogPageData);
        return deferred.promise;
      },


      getBlogDetail: function(id) {
        var deferred = $q.defer();
        angular.forEach(blogs, function (value, key) {
          if (value.id == id) {
            deferred.resolve(value);
          }
        });
        return deferred.promise;
      }
    }
  });
