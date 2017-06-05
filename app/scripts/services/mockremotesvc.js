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
        id: 1
      },
      {
        imageUrl: 'images/roadtrip.jpg',
        text: 'Road Trip',
        id: 2
      },
      {
        imageUrl: 'images/adventure.jpg',
        text: 'Adventure',
        id: 3
      },
      {
        imageUrl: 'images/nature.jpg',
        text: 'Nature',
        id: 4
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
        id: 5
      },
      {
        imageUrl: 'images/backpacking.jpg',
        text: 'Couple',
        id: 6
      },
    ];

    var destinations = [{
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


    var homePageBlog = [
      {
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
      slider,
      destinations,
      homePageBlog,
      instaImages
    };


    // Public API here
    return {
      getHomePageContent: function () {
        var deferred = $q.defer();
        deferred.resolve(homePageContent);
        return deferred.promise;
      }
    };
  });
