'use strict';

/**
 * @ngdoc function
 * @name wanderwagon-webapp.controller:EventCtrl
 * @description
 * # EventCtrl
 * Controller of the wanderwagon-webapp
 */
angular.module('wanderwagon-webapp')
  .controller('EventCtrl', function ($scope, $stateParams,auth, $rootScope, remoteSvc) {
   
    var event = $stateParams.eventSlug ;
    var eventId;

    $scope.mobileImageUrl;
    if(event.includes('holi')) {
      eventId = 2
      $scope.mobileImageUrl = 'https://s3-ap-southeast-1.amazonaws.com/wanderwagon/images/mobile/holi_cover.jpg';
    } else{
      eventId = 1;
      $scope.mobileImageUrl = 'https://s3-ap-southeast-1.amazonaws.com/wanderwagon/images/mobile/valentine_cover.jpg';
    }

    $scope.formSubmitted = false;
    $scope.messageType = "Query Form";

    var getEventById = function(eventId) {
      remoteSvc.getEventById(eventId).then(function(data){
        $scope.eventDetail = data.response;
      });
    };
    getEventById(eventId);

  
    $scope.showModal = function (messageType, message) {
      angular.element(document.querySelectorAll('#tripModal')).modal('show');
      $scope.messageType = messageType;
      $scope.message = message;
    };

    
    $scope.showLoginModal = function (messageType, message) {
      angular.element(document.querySelectorAll('#loginModal')).modal('show');
      $scope.messageType = messageType;
      $scope.message = message;
    };

    var showImageModal = function() {
      angular.element(document.querySelectorAll('#plantripModal')).modal('show');
    };

    $scope.today = function () {
      $scope.dt = new Date();
    };
    $scope.today();

    $scope.clear = function () {
      $scope.dt = null;
    };

    $scope.inlineOptions = {
      minDate: new Date(),
      showWeeks: true
    };

    $scope.dateOptions = {
      formatYear: 'yy',
      minDate: new Date(),
      startingDay: 1
    };



    $scope.toggleMin = function () {
      $scope.inlineOptions.minDate = $scope.inlineOptions.minDate ? null : new Date();
      $scope.dateOptions.minDate = $scope.inlineOptions.minDate;
    };

    $scope.toggleMin();

    $scope.open1 = function () {
      $scope.popup1.opened = true;
    };

    $scope.open2 = function () {
      $scope.popup2.opened = true;
    };

    $scope.setDate = function (year, month, day) {
      $scope.dt = new Date(year, month, day);
    };

    $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
    $scope.format = $scope.formats[0];
    $scope.altInputFormats = ['M!/d!/yyyy'];

    $scope.popup1 = {
      opened: false
    };

    $scope.popup2 = {
      opened: false
    };

    var tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    var afterTomorrow = new Date();
    afterTomorrow.setDate(tomorrow.getDate() + 1);
    $scope.events = [{
        date: tomorrow,
        status: 'full'
      },
      {
        date: afterTomorrow,
        status: 'partially'
      }
    ];

    $rootScope.$on('social-login', function (event, data) {
      if($scope.formObj != undefined) {
        remoteSvc.submitPlanMyTripForm($scope.formObj)
      .success(function (data) {
        $scope.formObj = {};
        showImageModal();
      })
      .error(function (error) {
        $scope.showModal("Error", error.error.message);
      })
      }
    });

    $scope.submitTravelPlanForm = function (form) {    
      if (auth.isLoggedIn()) {
          remoteSvc.submitPlanMyTripForm($scope.formObj)
          .success(function (data) {
            $scope.formObj = {};
            showImageModal();
          })
          .error(function (error) {
            $scope.formObj = {};
            $scope.showModal("Error", error.error.message);
          })
      } else{
        $scope.showLoginModal("Log In", "");
      }
    };
  });
