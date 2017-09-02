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



    $scope.instaPhotos = [];
    $scope.initInstaPhotos = function () {
      remoteSvc.getInstaPhotos()
        .success(function (data) {
          $scope.instaPhotos = data.response;
          // $interval($scope.insta_move ,50);
        })
        .error(function (error) {

        })
    };
    $scope.initInstaPhotos();






    $scope.openInstagram = function () {
      $window.open('https://www.instagram.com/wanderwagon', ' _blank');
    };


    $scope.getBlogs = function () {
      remoteSvc.getHomeBlogs()
        .success(function (data) {
          console.log(data.response);
          $scope.blog = data.response;
        })
        .error(function (error) {

        })
    };
    $scope.getBlogs();



    $scope.openInstaProfile = function () {
      console.log("CLICKED");
      $window.open('https://www.instagram.com/wanderwagon/', ' _blank');
    }

    $scope.getTravelInspirations = function () {
      remoteSvc.getTravelInspirations().then(function (response) {
        console.log(response);
        $scope.sliderData = response;
      });
    };

    $scope.getTravelInspirations();

   

    $scope.getTravelInspirationDetail = function (id) {
      remoteSvc.getTravelInspirationDetail(id).then(function (response) {
        console.log(response);
        $scope.inspirations = response;
      });
    };

    $scope.ready = function ($api) {
      owlAPi = $api;
  };

    $scope.inspirationData = [
      {
        "id":1,
        "name":"Road Trip",
        "imageUrl":"images/himachal.jpg",
        "description":"Dharamshala is a city in the Indian state of Himachal Pradesh. Surrounded by cedar forests on the edge of the Himalayas, this hillside city is home to the Dalai Lama and the Tibetan government-in-exile. The Thekchen Chöling Temple Complex is a spiritual center for Tibetan Buddhism, while the Library of Tibetan Works and Archives houses thousands of precious manuscripts."
      },
      {
        "id":2,
        "name":"Backpacking",
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

    $scope.getInstaPhotos = function () {
      remoteSvc.getInstaPhotos()
        .success(function (data) {
          $scope.news = data.response;
          $interval($scope.news_move, 50);
        })
        .error(function (error) {

        })
    };
    $scope.getInstaPhotos();

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



    var owlAPi;
   
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
