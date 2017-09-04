'use strict';

/**
 * @ngdoc function
 * @name wanderwagon-webapp.controller:AccountCtrl
 * @description
 * # AccountCtrl
 * Controller of the wanderwagon-webapp
 */
angular.module('wanderwagon-webapp')
  .controller('AccountCtrl', function ($scope) {

    $scope.favouriteActivities = [
      {name : 'Adventure'},
      {name : 'Arts & Events'},
      {name : 'BackPacking'},
      {name : 'Beach Holidays'},
      {name : 'Budget Travel'},
      {name : 'City Travels'},
      {name : 'Days Trips'},
      {name : 'Family Trips'},
      {name : 'Food & Drinks'},
      {name : 'Nature'},
      {name : 'Road Trips'}
    ];

    

    
   
  });
