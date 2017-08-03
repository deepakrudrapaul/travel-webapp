'use strict';

/**
 * @ngdoc function
 * @name wanderwagon-webapp.controller:DestinationDetailCtrl
 * @description
 * # DestinationDetailCtrl
 * Controller of the wanderwagon-webapp
 */
angular.module('wanderwagon-webapp')
  .controller('DestinationDetailCtrl', function ($scope, $stateParams, remoteSvc, $document) {

    var destinationId = $stateParams.id;

    $scope.getDestinationDetailById = function (destinationId) {
      remoteSvc.getDestinationDetailById(destinationId).then(function (data) {
        console.log(data);
        $scope.detail = data.response;
        $scope.placesData = data.response.places;

        $scope.activitiesData = data.response.activities;
      });
    };
    $scope.getDestinationDetailById(destinationId);

    $scope.openAccordion = false;
    $scope.openAccordion1 = false;

    $scope.openOrCloseAccordion = function (param) {

      if (param === 'place') {
        console.log(param);
        if ($scope.openAccordion === true) {
          $scope.closeAccordion();
        } else if ($scope.openAccordion === false) {
          $scope.openAccordion = true;
        }
      } else if(param === 'activity'){
         console.log(param);
        if ($scope.openAccordion1 === true) {
          $scope.closeAccordion();
        } else if ($scope.openAccordion1 === false) {
          $scope.openAccordion1 = true;
        }
      }

    };

    $scope.closeAccordion = function () {
      $scope.openAccordion = false;
    };


    $scope.closeAccordion1 = function () {
      $scope.openAccordion1 = false;
    };



    $scope.$watch('openAccordion', function (openAccordion) {
      if (openAccordion) {
        var someElement = angular.element(document.getElementById('accordion1'));
        $document.scrollToElement(someElement, 30, 800);
      }
    });

    $scope.$watch('openAccordion1', function (openAccordion1) {
      if (openAccordion1) {
        var someElement = angular.element(document.getElementById('accordion2'));
        $document.scrollToElement(someElement, 30, 800);
      }
    });

    //  var data = [
    //         "http://mwmgraphics.com/REALISTIC_1060/bike_posters/MWM_Bike_Illo_4b.jpg",
    //         "http://www.woostercollective.com/mattmm2.jpg",
    //         "http://mwmgraphics.com/TYPOGRAPHY/alphafont_2/mwm_alphafont_2.jpg"
    //     ];

    // $scope.images=data;
    $scope.placeDetails = [{
        imageUrl: 'images/naini-lake.JPG',
        name: 'Naini Lake',
        id: 7,
        description: "Some random description",
        overview: "OverView",
        howToReach: "By Airport, By Train, By Car"
      },
      {
        imageUrl: 'images/governor.jpg',
        name: 'Governor’s House',
        id: 8,
        description: "Some random description",
        overview: "OverView",
        howToReach: "By Airport, By Train, By Car"
      },
      {
        imageUrl: 'images/tiffin-top.jpg',
        name: 'Tiffin Top',
        id: 9,
        description: "Some random description",
        overview: "OverView",
        howToReach: "By Airport, By Train, By Car"
      },
      {
        imageUrl: 'images/china-peak.jpg',
        name: 'China Peak',
        id: 9,
        description: "Some random description",
        overview: "OverView",
        howToReach: "By Airport, By Train, By Car"
      },
      {
        imageUrl: 'images/zoo.jpg',
        name: 'Nainital Zoo',
        id: 7,
        description: "Some random description",
        overview: "OverView",
        howToReach: "By Airport, By Train, By Car"
      },
      {
        imageUrl: 'images/eco-cave.jpg',
        name: 'Eco Cave Gardens',
        id: 8,
        description: "Some random description",
        overview: "OverView",
        howToReach: "By Airport, By Train, By Car"
      },
      {
        imageUrl: 'images/nanda-devi.jpg',
        name: 'Nanda Devi Temple',
        id: 9,
        description: "Some random description",
        overview: "OverView",
        howToReach: "By Airport, By Train, By Car"
      },
      {
        imageUrl: 'images/snow-view.jpg',
        name: 'Snow View',
        id: 9,
        description: "Some random description",
        overview: "OverView",
        howToReach: "By Airport, By Train, By Car"
      }
    ];


  });
