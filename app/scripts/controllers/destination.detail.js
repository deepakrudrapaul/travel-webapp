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
        $scope.detail = response;
        $scope.placesData = response.places;
        $scope.activitiesData = response.activities;
      });
    };


    $scope.placeDetails = [
      {name : 'Name 1',
      description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cupiditate, asperiores quod est tenetur in. Eligendi, deserunt, blanditiis est quisquam doloribus voluptate id aperiam ea ipsum magni aut perspiciatis rem voluptatibus officia eos rerum.',
      overview: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cupiditate, asperiores quod est tenetur in. Eligendi, deserunt.',
      howToReach: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cupiditate, asperiores quod est tenetur in. Eligendi, deserunt.',
      timings: '8am - 6pm',
      price: '999',
      imgUrl: 'images/blog3.jpg'},

      {name : 'Name 2',
      description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cupiditate, asperiores quod est tenetur in. Eligendi, deserunt, blanditiis est quisquam doloribus voluptate id aperiam ea ipsum magni aut perspiciatis rem voluptatibus officia eos rerum.',
      overview: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cupiditate, asperiores quod est tenetur in. Eligendi, deserunt.',
      howToReach: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cupiditate, asperiores quod est tenetur in. Eligendi, deserunt.',
      timings: '8am - 6pm',
      price: '999',
      imgUrl: 'images/blog3.jpg'},

      {name : 'Name 3',
      description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cupiditate, asperiores quod est tenetur in. Eligendi, deserunt, blanditiis est quisquam doloribus voluptate id aperiam ea ipsum magni aut perspiciatis rem voluptatibus officia eos rerum.',
      overview: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cupiditate, asperiores quod est tenetur in. Eligendi, deserunt.',
      howToReach: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cupiditate, asperiores quod est tenetur in. Eligendi, deserunt.',
      timings: '8am - 6pm',
      price: '999',
      imgUrl: 'images/blog3.jpg'},

      {name : 'Name 4',
      description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cupiditate, asperiores quod est tenetur in. Eligendi, deserunt, blanditiis est quisquam doloribus voluptate id aperiam ea ipsum magni aut perspiciatis rem voluptatibus officia eos rerum.',
      overview: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cupiditate, asperiores quod est tenetur in. Eligendi, deserunt.',
      howToReach: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cupiditate, asperiores quod est tenetur in. Eligendi, deserunt.',
      timings: '8am - 6pm',
      price: '999',
      imgUrl: 'images/blog3.jpg'},

      {name : 'Name 5',
      description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cupiditate, asperiores quod est tenetur in. Eligendi, deserunt, blanditiis est quisquam doloribus voluptate id aperiam ea ipsum magni aut perspiciatis rem voluptatibus officia eos rerum.',
      overview: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cupiditate, asperiores quod est tenetur in. Eligendi, deserunt.',
      howToReach: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cupiditate, asperiores quod est tenetur in. Eligendi, deserunt.',
      timings: '8am - 6pm',
      price: '999',
      imgUrl: 'images/blog3.jpg'},

      {name : 'Name 6',
      description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cupiditate, asperiores quod est tenetur in. Eligendi, deserunt, blanditiis est quisquam doloribus voluptate id aperiam ea ipsum magni aut perspiciatis rem voluptatibus officia eos rerum.',
      overview: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cupiditate, asperiores quod est tenetur in. Eligendi, deserunt.',
      howToReach: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cupiditate, asperiores quod est tenetur in. Eligendi, deserunt.',
      timings: '8am - 6pm',
      price: '999',
      imgUrl: 'images/blog3.jpg'},

      {name : 'Name 7',
      description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cupiditate, asperiores quod est tenetur in. Eligendi, deserunt, blanditiis est quisquam doloribus voluptate id aperiam ea ipsum magni aut perspiciatis rem voluptatibus officia eos rerum.',
      overview: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cupiditate, asperiores quod est tenetur in. Eligendi, deserunt.',
      howToReach: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cupiditate, asperiores quod est tenetur in. Eligendi, deserunt.',
      timings: '8am - 6pm',
      price: '999',
      imgUrl: 'images/blog3.jpg'},

      {name : 'Name 8',
      description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cupiditate, asperiores quod est tenetur in. Eligendi, deserunt, blanditiis est quisquam doloribus voluptate id aperiam ea ipsum magni aut perspiciatis rem voluptatibus officia eos rerum.',
      overview: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cupiditate, asperiores quod est tenetur in. Eligendi, deserunt.',
      howToReach: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cupiditate, asperiores quod est tenetur in. Eligendi, deserunt.',
      timings: '8am - 6pm',
      price: '999',
      imgUrl: 'images/blog3.jpg'},
    
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
