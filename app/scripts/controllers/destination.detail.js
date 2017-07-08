'use strict';

/**
 * @ngdoc function
 * @name wanderwagon-webapp.controller:DestinationDetailCtrl
 * @description
 * # DestinationDetailCtrl
 * Controller of the wanderwagon-webapp
 */
angular.module('wanderwagon-webapp')
  .controller('DestinationDetailCtrl', function ($scope, $stateParams, mockRemoteSvc, $document) {

    var destinationId = $stateParams.id;

    $scope.getDestinationDetailById = function (destinationId) {
      mockRemoteSvc.getDestinationDetailById(destinationId).then(function (response) {
        console.log(response);
        $scope.detail = response;
        $scope.placesData = response.places;
        $scope.activitiesData = response.activities;
      });
    };


    $scope.placeDetails = [
      {name : 'Naini Lake',
      description: 'A pretty lake that once a European man fell in love with, Naini Lake today serves as a major tourist spot for people from all over the country. Encompassed by seven majestic mountains and cuddled in the lap of nature is the beautiful lake of Nainital. This lake is one of the prime places to visit in Nainital town. The lake offers a breathtaking view of sunrise and sunset.',
      overview: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cupiditate, asperiores quod est tenetur in. Eligendi, deserunt.',
      howToReach: 'It is 1.5 km from Tallital Bus Stand and it takes about 5 minutes to reach here.',
      timings: '6 AM to 6 PM',
      price: '999',
      imageUrl: 'images/naini-lake.JPG'},

      {name : 'Naini Lake',
      description: 'A pretty lake that once a European man fell in love with, Naini Lake today serves as a major tourist spot for people from all over the country. Encompassed by seven majestic mountains and cuddled in the lap of nature is the beautiful lake of Nainital. This lake is one of the prime places to visit in Nainital town. The lake offers a breathtaking view of sunrise and sunset.',
      overview: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cupiditate, asperiores quod est tenetur in. Eligendi, deserunt.',
      howToReach: 'It is 1.5 km from Tallital Bus Stand and it takes about 5 minutes to reach here.',
      timings: '6 AM to 6 PM',
      price: '999',
      imageUrl: 'images/naini-lake.JPG'},

      {name : 'Naini Lake',
      description: 'A pretty lake that once a European man fell in love with, Naini Lake today serves as a major tourist spot for people from all over the country. Encompassed by seven majestic mountains and cuddled in the lap of nature is the beautiful lake of Nainital. This lake is one of the prime places to visit in Nainital town. The lake offers a breathtaking view of sunrise and sunset.',
      overview: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cupiditate, asperiores quod est tenetur in. Eligendi, deserunt.',
      howToReach: 'It is 1.5 km from Tallital Bus Stand and it takes about 5 minutes to reach here.',
      timings: '6 AM to 6 PM',
      price: '999',
      imageUrl: 'images/naini-lake.JPG'},

      {name : 'Naini Lake',
      description: 'A pretty lake that once a European man fell in love with, Naini Lake today serves as a major tourist spot for people from all over the country. Encompassed by seven majestic mountains and cuddled in the lap of nature is the beautiful lake of Nainital. This lake is one of the prime places to visit in Nainital town. The lake offers a breathtaking view of sunrise and sunset.',
      overview: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cupiditate, asperiores quod est tenetur in. Eligendi, deserunt.',
      howToReach: 'It is 1.5 km from Tallital Bus Stand and it takes about 5 minutes to reach here.',
      timings: '6 AM to 6 PM',
      price: '999',
      imageUrl: 'images/naini-lake.JPG'},

      {name : 'Naini Lake',
      description: 'A pretty lake that once a European man fell in love with, Naini Lake today serves as a major tourist spot for people from all over the country. Encompassed by seven majestic mountains and cuddled in the lap of nature is the beautiful lake of Nainital. This lake is one of the prime places to visit in Nainital town. The lake offers a breathtaking view of sunrise and sunset.',
      overview: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cupiditate, asperiores quod est tenetur in. Eligendi, deserunt.',
      howToReach: 'It is 1.5 km from Tallital Bus Stand and it takes about 5 minutes to reach here.',
      timings: '6 AM to 6 PM',
      price: '999',
      imageUrl: 'images/naini-lake.JPG'},

      {name : 'Naini Lake',
      description: 'A pretty lake that once a European man fell in love with, Naini Lake today serves as a major tourist spot for people from all over the country. Encompassed by seven majestic mountains and cuddled in the lap of nature is the beautiful lake of Nainital. This lake is one of the prime places to visit in Nainital town. The lake offers a breathtaking view of sunrise and sunset.',
      overview: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cupiditate, asperiores quod est tenetur in. Eligendi, deserunt.',
      howToReach: 'It is 1.5 km from Tallital Bus Stand and it takes about 5 minutes to reach here.',
      timings: '6 AM to 6 PM',
      price: '999',
      imageUrl: 'images/naini-lake.JPG'},

      {name : 'Naini Lake',
      description: 'A pretty lake that once a European man fell in love with, Naini Lake today serves as a major tourist spot for people from all over the country. Encompassed by seven majestic mountains and cuddled in the lap of nature is the beautiful lake of Nainital. This lake is one of the prime places to visit in Nainital town. The lake offers a breathtaking view of sunrise and sunset.',
      overview: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cupiditate, asperiores quod est tenetur in. Eligendi, deserunt.',
      howToReach: 'It is 1.5 km from Tallital Bus Stand and it takes about 5 minutes to reach here.',
      timings: '6 AM to 6 PM',
      price: '999',
      imageUrl: 'images/naini-lake.JPG'},

      {name : 'Naini Lake',
      description: 'A pretty lake that once a European man fell in love with, Naini Lake today serves as a major tourist spot for people from all over the country. Encompassed by seven majestic mountains and cuddled in the lap of nature is the beautiful lake of Nainital. This lake is one of the prime places to visit in Nainital town. The lake offers a breathtaking view of sunrise and sunset.',
      overview: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cupiditate, asperiores quod est tenetur in. Eligendi, deserunt.',
      howToReach: 'It is 1.5 km from Tallital Bus Stand and it takes about 5 minutes to reach here.',
      timings: '6 AM to 6 PM',
      price: '999',
      imageUrl: 'images/naini-lake.JPG'},

      {name : 'Naini Lake',
      description: 'A pretty lake that once a European man fell in love with, Naini Lake today serves as a major tourist spot for people from all over the country. Encompassed by seven majestic mountains and cuddled in the lap of nature is the beautiful lake of Nainital. This lake is one of the prime places to visit in Nainital town. The lake offers a breathtaking view of sunrise and sunset.',
      overview: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cupiditate, asperiores quod est tenetur in. Eligendi, deserunt.',
      howToReach: 'It is 1.5 km from Tallital Bus Stand and it takes about 5 minutes to reach here.',
      timings: '6 AM to 6 PM',
      price: '999',
      imageUrl: 'images/naini-lake.JPG'}
    
    ];

     $scope.$watch('header1.isOpen', function (isOpen) {
      if (isOpen) {
        var someElement = angular.element(document.getElementById('accordion1'));
        $document.scrollToElement(someElement, 40, 800);
      }
    });

    $scope.$watch('accordion2.isOpen', function (isOpen) {
      if (isOpen) {
        var someElement = angular.element(document.getElementById('accordion2'));
        $document.scrollToElement(someElement, 40, 800);
      }
    });


    $scope.getDestinationDetailById(destinationId);



  });
