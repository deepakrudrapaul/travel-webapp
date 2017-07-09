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
        imageUrl: 'images/nainital-cover.jpg',
        name: 'Nainital',
        id: 1,
        data: {
          imageUrl: 'images/nainital-cover.jpg',
          name: 'Nainital',
          title: 'The Lake District Of India',
          about: "Among the reigning queens of North Indian hill stations, Nainital's crowning glory is its tranquil blue lake earning her the title of Lake District of India. What comes to mind when we talk about Nainital are images of glistening lakes, forested hills, and meandering trails.The crescent shaped lake, bustling roads of Nainital, beautified with Victorian lamp posts, radiate a vintage charm. It is Kumaon’s largest town and favorite hill resort. It is located in the enchanting state of Uttarakhand and is a peaceful destination to get away from the ho-hum of life. It has a myriad of bustling bazaars and a cobweb of walking tracks that cover the sites overlooking the distant Himalayan peaks. Apart from the sparkling blue waters and mountain ranges, one can enjoy views of nature at its full bloom.",
          overview: {
            bestTimeToVisit: 'All Seasons',
            daysRequired: '1-2 days',
            category: 'Hills/Adventure/Wildlife/Trekking/Nature'
          },
          howToReach: {
            airport: 'Pantnagar is the nearest airport which is 65 km. away from the district. Taxis are easily available from here to Nainital. There is no direct connectivity to Nainital by air. However, unless you opt for privately chartered flights, this is not the ideal arrival spot either. Dehradun is 173 km from Nainital.',
            railways: 'Kathgodam is the nearest railway station which is 35 km. away from the district.Plenty of trains connect Nainital with Delhi and Dehradun.',
            roadways: 'Nainital enjoys excellent road connectivity with several cities and small towns of North India. Daily bus service to Nainital is available from Delhi and Kathgodam. Boarding an overnight bus from Delhi is the most convenient way to reach Nainital. Visitors commuting to Nainital by road can take the National Highway 87. If driving from Delhi, take the Noida road, proceed to Muradabad and thereon to Haldwani. From Haldwani, take the road to Kathgodam and continue to Nainital.'
          },
          places: [{
              imageUrl: 'images/naini-lake.JPG',
              name: 'Naini Lake',
              id: 7
            },
            {
              imageUrl: 'images/governor.jpg',
              name: 'Governor’s House',
              id: 8
            },
            {
              imageUrl: 'images/tiffin-top.jpg',
              name: 'Tiffin Top',
              id: 9
            },
            {
              imageUrl: 'images/china-peak.jpg',
              name: 'China Peak',
              id: 9
            },
            {
              imageUrl: 'images/zoo.jpg',
              name: 'Nainital Zoo',
              id: 7
            },
            {
              imageUrl: 'images/eco-cave.jpg',
              name: 'Eco Cave Gardens',
              id: 8
            },
            {
              imageUrl: 'images/nanda-devi.jpg',
              name: 'Nanda Devi Temple',
              id: 9
            },
            {
              imageUrl: 'images/snow-view.jpg',
              name: 'Snow View',
              id: 9
            }
          ],
          activities: [
            {
              imageUrl: 'images/boating.jpg',
              name: 'Boating',
              id: 7
            },
            {
              imageUrl: 'images/cablecar.jpg',
              name: 'Cable Car',
              id: 8
            },
            {
              imageUrl: 'images/horse-riding.JPG',
              name: 'Horse Riding',
              id: 9
            },
            {
              imageUrl: 'images/rock-climbing.jpg',
              name: 'Rock Climbing',
              id: 9
            },
             {
              imageUrl: 'images/boating.jpg',
              name: 'Boating',
              id: 7
            },
            {
              imageUrl: 'images/cablecar.jpg',
              name: 'Cable Car',
              id: 8
            },
            {
              imageUrl: 'images/horse-riding.JPG',
              name: 'Horse Riding',
              id: 9
            },
            {
              imageUrl: 'images/rock-climbing.jpg',
              name: 'Rock Climbing',
              id: 9
            }
          ]
        }
      },
      {
        imageUrl: 'images/uttarakhand.jpg',
        name: 'Mussoorie',
        id: 2
      },
      {
        imageUrl: 'images/kashmir.jpg',
        name: 'Dehradun',
        id: 3
      },
      {
        imageUrl: 'images/meghalaya.jpg',
        name: 'Shimla',
        id: 4
      },
      {
        imageUrl: 'images/arunachal.jpg',
        name: 'Mcleodganj',
        id: 5
      },
      {
        imageUrl: 'images/sikkim.jpg',
        name: 'Rishikesh',
        id: 6
      },
      {
        imageUrl: 'images/manipur.jpg',
        name: 'Manali',
        id: 7
      },
      {
        imageUrl: 'images/assam.jpg',
        name: 'Kasol',
        id: 8
      },
      {
        imageUrl: 'images/darjeeling.jpg',
        name: 'Haridwar',
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
        title: 'Tips for solo travellers',
        description: 'Traveling alone may seem scary at first, But , The number of reasons why one should travel alone at least once outnumbers why one should not by a considerable margin. One reason is that after a solo adventure you wouldn’t be the same person as you were before, I can bet on that. The solitude that you get while traveling solo gives a new dimension to your thought process. ',
        dateTime: '02 Jun 2017',
        imageUrl: 'images/tips-cover.jpg',
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
