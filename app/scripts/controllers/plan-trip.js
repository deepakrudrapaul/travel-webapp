'use strict';

/**
 * @ngdoc function
 * @name wanderwagon-webapp.controller:PlanTripCtrl
 * @description
 * # PlanTripCtrl
 * Controller of the wanderwagon-webapp
 */
angular.module('wanderwagon-webapp')
  .controller('PlanTripCtrl', function ($scope, remoteSvc, auth, $rootScope) {

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
      remoteSvc.submitPlanMyTripForm($scope.formObj)
      .success(function (data) {
        console.log(data);
        $scope.showModal("Success !", "Your query has been submitted successfully ! Will get back to you within 24 Hours.");
      })
      .error(function (error) {
        console.log(error);
        $scope.showModal("Error", error.error.message);
      })
    });

    $scope.submitTravelPlanForm = function (form) {
      
      if (auth.isLoggedIn()) {
        if(form.$valid) {
          remoteSvc.submitPlanMyTripForm($scope.formObj)
          .success(function (data) {
            console.log(data);
            $scope.showModal("Success !", "Your query has been submitted successfully ! Will get back to you within 24 Hours.");
          })
          .error(function (error) {
            console.log(error);
            $scope.showModal("Error", error.error.message);
          })
        } else{
          $scope.showModal("Error", "Please enter details correctly !");
        }
      } else{
        $scope.showLoginModal("Log In", "");
      }
    };
  });
