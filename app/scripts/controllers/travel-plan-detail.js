'use strict';

/**
 * @ngdoc function
 * @name wanderwagon-webapp.controller:TravelPlanDetailCtrl
 * @description
 * # TravelPlanDetailCtrl
 * Controller of the wanderwagon-webapp
 */
angular.module('wanderwagon-webapp')
  .controller('TravelPlanDetailCtrl', function ($scope, $document) {

    $scope.openAccordion = false;
    $scope.openOrCloseAccordion = function () {
      if ($scope.openAccordion === true) {
        $scope.closeAccordion();
      } else if ($scope.openAccordion === false) {
        $scope.openAccordion = true;
      }
    };

     $scope.closeAccordion = function () {
      $scope.openAccordion = false;
      var someElement = angular.element(document.getElementById('places'));
        $document.scrollToElement(someElement, 30, 800);
    };

    $scope.$watch('openAccordion', function (openAccordion) {
      if (openAccordion) {
        var someElement = angular.element(document.getElementById('accordion1'));
        $document.scrollToElement(someElement, 30, 800);
      } 
    });



      $scope.inspirationData = [
      {
        "id":1,
        "name":"Dharamshala",
        "imageUrl":"images/himachal.jpg",
        "description":"Dharamshala is a city in the Indian state of Himachal Pradesh. Surrounded by cedar forests on the edge of the Himalayas, this hillside city is home to the Dalai Lama and the Tibetan government-in-exile. The Thekchen Chöling Temple Complex is a spiritual center for Tibetan Buddhism, while the Library of Tibetan Works and Archives houses thousands of precious manuscripts."
      },
      {
        "id":2,
        "name":"Nainital",
        "imageUrl":"images/himachal.jpg",
        "description":"Dharamshala is a city in the Indian state of Himachal Pradesh. Surrounded by cedar forests on the edge of the Himalayas, this hillside city is home to the Dalai Lama and the Tibetan government-in-exile. The Thekchen Chöling Temple Complex is a spiritual center for Tibetan Buddhism, while the Library of Tibetan Works and Archives houses thousands of precious manuscripts."
      },
      {
        "id":3,
        "name":"Kasol",
        "imageUrl":"images/himachal.jpg",
        "description":"Dharamshala is a city in the Indian state of Himachal Pradesh. Surrounded by cedar forests on the edge of the Himalayas, this hillside city is home to the Dalai Lama and the Tibetan government-in-exile. The Thekchen Chöling Temple Complex is a spiritual center for Tibetan Buddhism, while the Library of Tibetan Works and Archives houses thousands of precious manuscripts."
      },
      {
        "id":4,
        "name":"Manali",
        "imageUrl":"images/himachal.jpg",
        "description":"Dharamshala is a city in the Indian state of Himachal Pradesh. Surrounded by cedar forests on the edge of the Himalayas, this hillside city is home to the Dalai Lama and the Tibetan government-in-exile. The Thekchen Chöling Temple Complex is a spiritual center for Tibetan Buddhism, while the Library of Tibetan Works and Archives houses thousands of precious manuscripts."
      },
      {
        "id":5,
        "name":"Dzuko Valley",
        "imageUrl":"images/himachal.jpg",
        "description":"Dharamshala is a city in the Indian state of Himachal Pradesh. Surrounded by cedar forests on the edge of the Himalayas, this hillside city is home to the Dalai Lama and the Tibetan government-in-exile. The Thekchen Chöling Temple Complex is a spiritual center for Tibetan Buddhism, while the Library of Tibetan Works and Archives houses thousands of precious manuscripts."
      },
      {
        "id":6, 
        "name":"Dharamshala",
        "imageUrl":"images/himachal.jpg",
        "description":"Dharamshala is a city in the Indian state of Himachal Pradesh. Surrounded by cedar forests on the edge of the Himalayas, this hillside city is home to the Dalai Lama and the Tibetan government-in-exile. The Thekchen Chöling Temple Complex is a spiritual center for Tibetan Buddhism, while the Library of Tibetan Works and Archives houses thousands of precious manuscripts."
      },

    ];


    $scope.tips = [
      {tip : 'Make sure you carry warm clothes irrespective of the fact that what season you are travelling in. '},
      {tip : 'Carry your own trekking gear and equipments and be always prepared.'},
      {tip : 'Carry a medical aid kit and your usual medicines for the way.'},
      {tip : 'A good pair of trekking shoes is a must.'},
      {tip : 'Carry raingear no matter if you are travelling during monsoon season.'}
    ];
      




  });
