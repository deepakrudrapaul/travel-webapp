'use strict';

/**
 * @ngdoc function
 * @name wanderwagon-webapp.controller:HomeCtrl
 * @description
 * # HomeCtrl
 * Controller of the wanderwagon-webapp
 */
angular.module('wanderwagon-webapp')
  .controller('HomeCtrl', function ($scope, $timeout, remoteSvc, $document, $window, $interval, $location) {

    $scope.getBlogs = function () {
      remoteSvc.getHomeBlogs().then(function (response) {
        console.log(response);
        $scope.blog = response;
      })
    };

    
    $scope.getTravelInspirations = function () {
      remoteSvc.getTravelInspirations().then(function (response) {
        console.log(response);
        $scope.sliderData = response;
      });
    };

    $scope.travelPlanData = [];
    $scope.getTravelPlans = function (id) {
      remoteSvc.getTravelPlans(id).then(function (response){
        $scope.travelPlanData = response;
      });
    };

   

    $scope.getTravelInspirations();
    $scope.getBlogs();

  



    $scope.openAccordion = false;
    $scope.openOrCloseAccordion = function () {
      if ($scope.openAccordion === true) {
        $scope.closeAccordion();
      } else if ($scope.openAccordion === false) {
        $scope.openAccordion = true;
      }
    };

    $scope.closeAccordion = function () {
      $scope.travelPlanData = [];
      $scope.openAccordion = false;
      var someElement = angular.element(document.getElementById('travel'));
      $document.scrollToElement(someElement, 30, 800);
    };

 $scope.$watch('openAccordion', function (openAccordion) {
      if (openAccordion) {
        var someElement = angular.element(document.getElementById('accordion'));
        $document.scrollToElement(someElement, 30, 800);
      }
    });



    var textArr = [
      'To Dream and Live it',
      'To Think and See it',
      'To Want and Chase it',
      'To be There and Do that'
    ];

    $scope.changingText = {};
    var current = 0;
    var textChangeFunc = function () {
      var time = $timeout();
      angular.forEach(textArr, function (element) {
        time = time.then(function () {
          $scope.changingText = element;
          return $timeout(3000);
        });
      });
    };
    textChangeFunc();

    $scope.showModal = function (messageType, message) {
      angular.element(document.querySelectorAll('#messageModal')).modal('show');
      $scope.messageType = messageType;
      $scope.message = message;
    };



    $scope.onFormSubmit = function (form) {
      if (form.$valid) {
        console.log($scope.inquiryObj);
        remoteSvc.quickQuery($scope.inquiryObj)
          .success(function (data) {
            $scope.showModal('Success', "Successfully Submitted Your Inquiry !");
          })
          .error(function (error) {
            $scope.showModal('Error', "Error While Submitting Your Request");
          })
      }
    };




    $scope.news = [];
    $scope.conf = {
      news_length: false,
      news_pos: 200, // the starting position from the right in the news container
      news_margin: 20,
      news_move_flag: true
    };

    $scope.get_news_right = function (idx) {
      var $right = $scope.conf.news_pos;
      for (var ri = 0; ri < idx; ri++) {
        if (document.getElementById('news_' + ri)) {
          $right += $scope.conf.news_margin + angular.element(document.getElementById('news_' + ri))[0].offsetWidth;
        }
      }
      return $right + 'px';
    };


    $scope.news_move = function () {
      if ($scope.conf.news_move_flag) {
        $scope.conf.news_pos--;
        if (angular.element(document.getElementById('news_0'))[0].offsetLeft > angular.element(document.getElementById('news_strip'))[0].offsetWidth + $scope.conf.news_margin) {
          var first_new = $scope.news[0];
          $scope.news.push(first_new);
          $scope.news.shift();
          $scope.conf.news_pos += angular.element(document.getElementById('news_0'))[0].offsetWidth + $scope.conf.news_margin;
        }
      }
    };


    $scope.getInstaPhotos = function () {
      remoteSvc.getInstaPhotos().then(function (response) {
        $scope.news = response;
        $interval($scope.news_move, 50);
      });
    };
    $scope.getInstaPhotos();



    var owlAPi;
    $scope.ready = function ($api) {
      owlAPi = $api;
  };
   
    $scope.properties = {
      // autoHeight:true,

      animateIn: 'fadeIn',
      lazyLoad: true,
      items: 4,
      margin: 0,
      mouseDrag: true,
      touchDrag: true,
      dots: false,
      nav: true,
      responsiveClass:true,
      navText : ["<i class='fa fa-chevron-left'></i>","<i class='fa fa-chevron-right'></i>"],
      responsive:{
          0:{
              items:1,
              nav:true
          },
          600:{
              items:3,
              nav:true
          },
          1000:{
            items:4,
            nav:true
        }
        }
  };

 

$scope.nestedCarouselproperties = {
  // autoHeight:true,
  animateIn: 'fadeIn',
  lazyLoad: true,
  items: 3,
  margin: 10,
  mouseDrag: true,
  touchDrag: true,
  dots: false,
  nav: true,
  responsiveClass:true,
  navText : ["<i class='fa fa-chevron-left'></i>","<i class='fa fa-chevron-right'></i>"],
  responsive:{
      0:{
          items:1,
          nav:true
      },
      600:{
          items:2,
          nav:true
      },
      1000:{
        items:3,
        nav:true
    }
    }
};



  });
