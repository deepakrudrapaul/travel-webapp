'use strict';

/**
 * @ngdoc overview
 * @name wanderwagon-webapp
 * @description
 * # wanderwagon-webapp
 *
 * Main module of the application.
 */
angular
  .module('wanderwagon-webapp', [
    'ngAnimate',
    'ngCookies',
    'ngMessages',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ui.bootstrap',
    'ngCsv',
    'ui.router',
    'config',
    'ngProgress',
    'ae-datetimepicker',
    'ngMap',
    'sticky',
    'satellizer'
  ])
  .config(['$routeProvider', '$urlRouterProvider', '$stateProvider', '$locationProvider','$authProvider',  function ($routeProvider, $urlRouterProvider, $stateProvider, $locationProvider, $authProvider ) {

    // $locationProvider.html5Mode(true);

    $authProvider.facebook({
      clientId: '1872872876259517'
    });

    
    $authProvider.google({
      clientId: '1074764438873-vr5covic1s763fvrccpa6g29hirsnrpf.apps.googleusercontent.com'
    });

    $urlRouterProvider.otherwise('/home');

    $stateProvider
      .state('home', {
        url: '/home',
        templateUrl: 'views/home.html',
        controller: 'HomeCtrl'
      })
      .state('login', {
        url: '/login',
        templateUrl: 'views/login.html',
        controller: 'LoginCtrl',
      })
      .state('signUp', {
        url: '/signUp',
        templateUrl: 'views/signUp.html',
        controller: 'LoginCtrl',
      })
      .state('account', {
        url: '/account',
        templateUrl: 'views/account.html',
        controller: 'AccountCtrl'
      })
      .state('plan-trip', {
        url: '/plan-trip',
        templateUrl: 'views/plan-trip.html',
        controller: 'PlanTripCtrl'
      })

      .state('destination', {
        url: '/destination',
        abstract: true,
        template: "<ui-view></ui-view>"
      })
      .state('destination.list', {
        url: '/list',
        templateUrl: 'views/destination.html',
        controller: 'DestinationCtrl'
      })
      .state('destination.detail', {
        url: '/list/:id',
        templateUrl: 'views/destination-detail.html',
        controller: 'DestinationDetailCtrl'
      })
      .state('blog', {
        url: '/blog',
        abstract: true,
        template: "<ui-view></ui-view>"
      })
      .state('blog.list', {
        url: '/list',
        templateUrl: 'views/blog-list.html',
        controller: 'BlogListCtrl'
      })
      .state('blog.detail', {
        url: '/list/:postId',
        templateUrl: 'views/blog-detail.html',
        controller: 'BlogDetailCtrl'
      })
      .state('about', {
        url: '/about',
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl'
      })
      .state('contact', {
        url: '/contact',
        templateUrl: 'views/contact.html',
        controller: 'ContactCtrl'
      })
      .state('form', {
        url: '/contact/plan-trip-form',
        templateUrl: 'views/plan-trip-form.html',
        controller: 'ContactCtrl'
      })
      .state('travel-plan', {
        url: '/travel-plan',
        templateUrl: 'views/travel-plan.html',
        controller: 'TravelPlanCtrl'
      })
      .state('cancellation', {
        url: '/cancellation',
        templateUrl: 'views/cancellation-policy.html',
        controller: 'ContactCtrl'
      })
      .state('faq', {
        url: '/faq',
        templateUrl: 'views/faq.html',
        controller: 'ContactCtrl'
      })
       .state('tnc', {
        url: '/tnc',
        templateUrl: 'views/tnc.html',
        controller: 'ContactCtrl'
      })
      .state('testimonials', {
        url: '/testimonials',
        templateUrl: 'views/testimonials.html',
        controller: 'ContactCtrl'
      })

  }])
  .run(["$rootScope", "$location", "auth", "$anchorScroll", function ($rootScope, $location, auth, $anchorScroll) {

    $rootScope.changeLocation = function (path) {
      $rootScope.$evalAsync(function () {
        $location.path(path);
      });
    };

    $rootScope.$on("$locationChangeSuccess", function () {
       $anchorScroll();
    });


  }]);

'use strict';

/**
 * @ngdoc function
 * @name wanderwagon-webapp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the wanderwagon-webapp
 */
angular.module('wanderwagon-webapp')
  .controller('MainCtrl', function () {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });

'use strict';

/**
 * @ngdoc function
 * @name wanderwagon-webapp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the wanderwagon-webapp
 */
angular.module('wanderwagon-webapp')
  .controller('LoginCtrl', ["$scope", "$timeout", "auth", "$location", "ngProgressFactory", "$auth", function ($scope, $timeout, auth, $location, ngProgressFactory, $auth) {

     $scope.authenticate = function(provider) {
      $auth.authenticate(provider);
    };

    $scope.progressbar = ngProgressFactory.createInstance();


    $scope.onSignUp = function (form) {
      $scope.progressbar.start();
      if (form.$valid) {
        $scope.obj = {};
        if ($scope.signUpObj.password == $scope.signUpObj.confirmPassword) {
          $scope.obj.emailId = $scope.signUpObj.email;
          $scope.obj.password = $scope.signUpObj.password;
          $scope.obj.accountType = 3;

          console.log($scope.obj);

          auth.signUp($scope.obj)
            .then(function (data) {
              console.log(data);
              $scope.signUpObj = {};
              $scope.progressbar.complete();

              $scope.message = {
                type: 'Success',
                msg: 'Sucessfully Signed Up ! Login Now'
              };
              angular.element(document.querySelectorAll('#signUpModel')).modal('show');


            })
            .catch(function (error) {
              console.log(error);
              $scope.progressbar.complete();
              $scope.message = {
                type: 'Error',
                msg: error
              };
              angular.element(document.querySelectorAll('#signUpModel')).modal('show');
            });
        } else {
          $scope.message = {
            type: 'Error',
            msg: 'Password does not match'
          };
          angular.element(document.querySelectorAll('#signUpModel')).modal('show');
          $scope.progressbar.complete();
        }
      }
    };





    $scope.onLogin = function (form) {
      $scope.progressbar.start();
      if (form.$valid) {
        $scope.loginObj.accountType = 3;
        auth.login($scope.loginObj)
          .then(function (data) {
            $location.path('/home');
            $scope.progressbar.complete();
            $rootScope.loggedIn = true;
          })
          .catch(function (error) {
            console.log(error);
            $scope.progressbar.complete();
            $scope.message = {
              type: 'Error',
              msg: error.error.message
            };
            angular.element(document.querySelectorAll('#loginModel')).modal('show');
          });
      }
    };





    $scope.format = 'dd-MMMM-yyyy';

    $scope.dateOptions = {
      formatYear: 'yy',
      maxDate: new Date(),
      minDate: new Date(1905, 1, 1),
      startingDay: 1
    };

    $scope.open1 = function () {
      $scope.popup1.opened = true;
    };

    $scope.popup1 = {
      opened: false
    };
  }]);

'use strict';

/**
 * @ngdoc function
 * @name wanderwagon-webapp.controller:HomeCtrl
 * @description
 * # HomeCtrl
 * Controller of the wanderwagon-webapp
 */
angular.module('wanderwagon-webapp')
  .controller('HomeCtrl', ["$scope", "$location", "$anchorScroll", "$timeout", "$interval", function ($scope, $location, $anchorScroll, $timeout, $interval) {

    $scope.gotoTravelInspiration = function () {
      $location.hash('content');
      $anchorScroll();
    };

    $scope.images = [{
        imageUrl: 'images/backpacking.jpg',
        text: 'Backpacking'
      },
      {
        imageUrl: 'images/roadtrip.jpg',
        text: 'Road Trip'
      },
      {
        imageUrl: 'images/adventure.jpg',
        text: 'Adventure'
      },
      {
        imageUrl: 'images/nature.jpg',
        text: 'Nature'
      },
      {
        imageUrl: 'images/adventure.jpg',
        text: 'Family'
      },
      {
        imageUrl: 'images/backpacking.jpg',
        text: 'Couple'
      },

    ];


    $scope.destinations = [{
        imageUrl: 'http://placehold.it/380x255',
        name: 'Himachal',
        id: 1
      },
      {
        imageUrl: 'http://placehold.it/380x255',
        name: 'Uttarakhand',
        id: 2
      },
      {
        imageUrl: 'http://placehold.it/380x255',
        name: 'Kashmir',
        id: 3
      },
      {
        imageUrl: 'http://placehold.it/380x255',
        name: 'Meghalaya',
        id: 4
      },
      {
        imageUrl: 'http://placehold.it/380x255',
        name: 'Arunachal',
        id: 5
      },
      {
        imageUrl: 'http://placehold.it/380x255',
        name: 'Sikkim',
        id: 6
      },
      {
        imageUrl: 'http://placehold.it/380x255',
        name: 'Manipur',
        id: 7
      },
      {
        imageUrl: 'http://placehold.it/380x255',
        name: 'Assam',
        id: 8
      },
      {
        imageUrl: 'http://placehold.it/380x255',
        name: 'Darjeeling',
        id: 9
      },
      {
        imageUrl: 'http://placehold.it/380x255',
        name: 'Kolkata',
        id: 10
      },
      {
        imageUrl: 'http://placehold.it/380x255',
        name: 'Delhi',
        id: 11
      },
      {
        imageUrl: 'http://placehold.it/380x255',
        name: 'Agra',
        id: 12
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

    $scope.instaImages = instaImages;


    var textArr = [
      'Hassle Free',
      'Lively',
      'Comfortable',
      'Memorable',
      'Wondrous'
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


    $('.carousel[data-type="multi"] .item').each(function () {
      var next = $(this).next();
      if (!next.length) {
        next = $(this).siblings(':first');
      }
      next.children(':first-child').clone().appendTo($(this));

      for (var i = 0; i < 4; i++) {
        next = next.next();
        if (!next.length) {
          next = $(this).siblings(':first');
        }

        next.children(':first-child').clone().appendTo($(this));
      }
    });


  }]);

'use strict';

/**
 * @ngdoc function
 * @name wanderwagon-webapp.controller:LinkCtrl
 * @description
 * # LinkCtrl
 * Controller of the wanderwagon-webapp
 */
angular.module('wanderwagon-webapp')
    .controller('LinkCtrl', ["$scope", "$window", "$location", "$rootScope", "auth", "remoteSvc", function ($scope, $window, $location, $rootScope, auth, remoteSvc) {

        if (auth.isLoggedIn()) {
            $rootScope.loggedIn = true;
        } else {
            $rootScope.loggedIn = false;
        }
      
        $scope.checkHomePage = function() {
            if($location.path() === '/home'){
                return true;
            } else{
                return false;
            }
        };
        console.log(remoteSvc.getCurrentUri());

        $rootScope.onLogOut = function () {

            auth.logout();
            $location.path('/home');
            $rootScope.loggedIn = false;
        }



        $scope.openFacebook = function () {
            $window.open('https://www.facebook.com/wanderwagon', ' _blank');
        }

        $scope.openTwitter = function () {
            $window.open('https://www.twitter.com', ' _blank');
        }

        $scope.openInstagram = function () {
            $window.open('https://www.instagram.com/wanderwagon', ' _blank');
        }

        $scope.openYoutube = function () {
            $window.open('https://www.youtube.com', ' _blank');
        }

    }]);

'use strict';

/**
 * @ngdoc function
 * @name wanderwagon-webapp.controller:PlanTripCtrl
 * @description
 * # PlanTripCtrl
 * Controller of the wanderwagon-webapp
 */
angular.module('wanderwagon-webapp')
  .controller('PlanTripCtrl', ["$scope", function ($scope) {

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
  }]);

'use strict';

/**
 * @ngdoc function
 * @name wanderwagon-webapp.controller:BlogListCtrl
 * @description
 * # BlogListCtrl
 * Controller of the wanderwagon-webapp
 */
angular.module('wanderwagon-webapp')
  .controller('BlogListCtrl', ["$scope", "remoteSvc", "$location", function ($scope, remoteSvc, $location) {

    // $scope.getAllPosts = function () {
    //   remoteSvc.getAllPosts()
    //     .success(function (data) {
    //       $scope.posts = [];
    //       for (var i = 0; i < data.response.length; i++) {
    //         var post = data.response[i];
    //         $scope.posts[i] = {};
    //         $scope.posts[i].title = post.title;
    //         $scope.posts[i].author = post.user.name;
    //         $scope.posts[i].description = post.description;
    //         $scope.posts[i].imageUrl = post.imageUrl;
    //         $scope.posts[i].id = post.id;
    //         $scope.posts[i].comments = post.comments;
    //         $scope.posts[i].date = new Date(new Date("2017-12-09").getTime());
    //       }
    //       console.log($scope.posts);  
    //     })
    //     .error(function (error) {

    //     })
    // };
   

    // $scope.getAllPosts();

    $scope.posts = [
      {
        "image": "images/manipur.jpg",
        "title": "First Blog of Wander Wagon",
        "date": "01/04/2017",
        "author": "Admin",
        "category": "Adventure",
        "description": "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cupiditate, asperiores quod est tenetur in. Eligendi, deserunt, blanditiis est quisquam doloribus voluptate id aperiam ea ipsum magni aut perspiciatis rem voluptatibus officia eos rerum deleniti quae nihil facilis repellat atque vitae voluptatem libero at eveniet veritatis ab facere."
      },

      {
        "image": "images/himachal.jpg",
        "title": "First Blog of Wander Wagon",
        "date": "01/04/2017",
        "author": "Admin",
        "category": "Adventure",
        "description": "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cupiditate, asperiores quod est tenetur in. Eligendi, deserunt, blanditiis est quisquam doloribus voluptate id aperiam ea ipsum magni aut perspiciatis rem voluptatibus officia eos rerum deleniti quae nihil facilis repellat atque vitae voluptatem libero at eveniet veritatis ab facere."
      },

      {
        "image": "images/meghalaya.jpg",
        "title": "First Blog of Wander Wagon",
        "date": "01/04/2017",
        "author": "Admin",
        "category": "Adventure",
        "description": "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cupiditate, asperiores quod est tenetur in. Eligendi, deserunt, blanditiis est quisquam doloribus voluptate id aperiam ea ipsum magni aut perspiciatis rem voluptatibus officia eos rerum deleniti quae nihil facilis repellat atque vitae voluptatem libero at eveniet veritatis ab facere."
      },
      {
        "image": "images/sikkim.jpg",
        "title": "First Blog of Wander Wagon",
        "date": "01/04/2017",
        "author": "Admin",
        "category": "Adventure",
        "description": "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cupiditate, asperiores quod est tenetur in. Eligendi, deserunt, blanditiis est quisquam doloribus voluptate id aperiam ea ipsum magni aut perspiciatis rem voluptatibus officia eos rerum deleniti quae nihil facilis repellat atque vitae voluptatem libero at eveniet veritatis ab facere."
      }
];

    var instaImages = [{
        image: "images/meghalaya.jpg"
      },
      {
        image: "images/arunachal.jpg"
      },
      {
        image: "images/sikkim.jpg"
      },
      {
        image: "images/uttarakhand.jpg"
      },
      {
        image: "images/manipur.jpg"
      },
      {
        image: "images/assam.jpg"
      },
      {
        image: "images/sikkim.jpg"
      },
      {
        image: "images/uttarakhand.jpg"
      },
      {
        image: "images/manipur.jpg"
      },
      {
        image: "images/assam.jpg"
      }
      
    ];

    var popularPosts = [{
        authorImage: "http://lorempixel.com/100/100/people/",
        postTitle: "This is the most popular post of this month",
        numberOfComments: 29
      },
      {
        authorImage: "http://lorempixel.com/100/100/people/",
        postTitle: "This is the most popular post of this month",
        numberOfComments: 10
      },
      {
        authorImage: "http://lorempixel.com/100/100/people/",
        postTitle: "This is the most popular post of this month",
        numberOfComments: 9
      }
    ];

    var recentPosts = [{
        authorImage: "http://lorempixel.com/100/100/people/",
        postTitle: "This is the most recent post of this month",
        date: "19th April 2017"
      },
      {
        authorImage: "http://lorempixel.com/100/100/people/",
        postTitle: "This is the most recent post of this month",
        date: "9th April 2017"
      },
      {
        authorImage: "http://lorempixel.com/100/100/people/",
        postTitle: "This is the most recent post of this month",
        date: "7th April 2017"
      }
    ];

    $scope.recentPosts = recentPosts;
    $scope.popularPosts = popularPosts;
    $scope.instaImages = instaImages;



  }]);

'use strict';

/**
 * @ngdoc function
 * @name wanderwagon-webapp.controller:BlogDetailCtrl
 * @description
 * # BlogDetailCtrl
 * Controller of the wanderwagon-webapp
 */
angular.module('wanderwagon-webapp')
  .controller('BlogDetailCtrl', ["$scope", "$stateParams", "remoteSvc", function ($scope, $stateParams, remoteSvc) {

    var postId = $stateParams.postId;

    // $scope.getPostDetail = function () {
    //   remoteSvc.getBlogDetail(postId)
    //     .success(function (data) {
    //       console.log(data);
    //       $scope.postDetail = data.response.blogDetailElements[0];
    //       console.log($scope.postDetail);
    //       $scope.author = data.response.author;
    //       $scope.comments = data.response.comments;
    //     })
    //     .error(function (error) {
    //       console.log(error);
    //     })
    // };

    // $scope.getPostDetail();

    $scope.postDetail = {
      title: "First Blog of Wander Wagon",
      author: "Paul",
      description: "Duis mollis, est non commodo luctus, nisi erat porttitor ligula, eget lacinia odio sem nec elit Duis mollis, est non commodo luctus, nisi erat porttitor ligula, eget lacinia odio sem nec elit. Cras mattis",
      imageUrl: "images/manipur.jpg"
    };


    var popularPosts = [{
        authorImage: "http://lorempixel.com/100/100/people/",
        postTitle: "This is the most popular post of this month",
        numberOfComments: 29
      },
      {
        authorImage: "http://lorempixel.com/100/100/people/",
        postTitle: "This is the most popular post of this month",
        numberOfComments: 10
      },
      {
        authorImage: "http://lorempixel.com/100/100/people/",
        postTitle: "This is the most popular post of this month",
        numberOfComments: 9
      }
    ];

    $scope.popularPosts = popularPosts;


    $scope.onImageClicked = function() {
        console.log("CLICKED");
    };


     $scope.images = [{
        imageUrl: 'images/backpacking.jpg',
        text: 'Backpacking'
      },
      {
        imageUrl: 'images/roadtrip.jpg',
        text: 'Road Trip'
      },
      {
        imageUrl: 'images/adventure.jpg',
        text: 'Adventure'
      },
      {
        imageUrl: 'images/nature.jpg',
        text: 'Nature'
      },
      {
        imageUrl: 'images/adventure.jpg',
        text: 'Family'
      },
      {
        imageUrl: 'images/backpacking.jpg',
        text: 'Couple'
      },

    ];


  }]);

'use strict';

/**
 * @ngdoc function
 * @name wanderwagon-webapp.controller:WanderInfoCtrl
 * @description
 * # WanderInfoCtrl
 * Controller of the wanderwagon-webapp
 */
angular.module('wanderwagon-webapp')
  .controller('DestinationCtrl', ["$scope", function ($scope) {


    $scope.slides = [{
        imageUrl: 'images/slider/1.jpg',
        text: 'Backpacking'
      },
      {
        imageUrl: 'images/slider/2.jpg',
        text: 'Road Trip'
      },
      {
        imageUrl: 'images/slider/3.jpg',
        text: 'Wild Life'
      }
    ];

    $scope.destinations = [{
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

  }]);

'use strict';

/**
 * @ngdoc function
 * @name wanderwagon-webapp.controller:ContactCtrl
 * @description
 * # ContactCtrl
 * Controller of the wanderwagon-webapp
 */
angular.module('wanderwagon-webapp')
  .controller('ContactCtrl', ["$scope", "$window", function ($scope, $window) {


    $scope.openFacebook = function () {
            $window.open('https://www.facebook.com/wanderwagon', ' _blank');
        }

  

  }]);

'use strict';

/**
 * @ngdoc service
 * @name wanderwagon-webapp.auth
 * @description
 * # auth
 * Factory in the wanderwagon-webapp.
 */
angular.module('wanderwagon-webapp')
  .factory('auth', ["$q", "$cookies", "$http", "ENV", function ($q, $cookies, $http, ENV) {

    var currentUser = {};
    if ($cookies.get('token')) {
      currentUser = $cookies.getObject('currUser');
    }

    var remoteAddr = ENV.endPoint;
    return {
      signUp: function (reqObj, callback) {

        var cb = callback || angular.noop;
        var deferred = $q.defer();

        $http
          .post(remoteAddr + '/consumer/account/signup', reqObj)
          .success(function (data, status) {
            deferred.resolve(data);
            return cb();
          })
          .error(function (error, status) {
            console.log(error, status);
            deferred.reject(error);
            return cb(error);
          }.bind(this));

        return deferred.promise;
      },

      login: function (reqObj, callback) {
        var cb = callback || angular.noop;
        var deferred = $q.defer();

        $http
          .post(remoteAddr + '/consumer/account/login', reqObj)
          .success(function (data, status) {
            $cookies.put('token', data.response.token);
            $cookies.put('tokenTime', (new Date()).getTime());
            $cookies.putObject('currUser', reqObj);
            currentUser = reqObj;
            deferred.resolve(data);
            return cb();
          })
          .error(function (error, status) {
            console.log(error, status);
            this.logout();
            deferred.reject(error);
            return cb(error);
          }.bind(this));

        return deferred.promise;
      },
      logout: function () {
        $cookies.remove('token');
        $cookies.remove('tokenTime');
        $cookies.remove('currUser');
        $cookies.remove('role');
        currentUser = {};
      },
      getCurrentUser: function () {
        if ($cookies.get('token') && !currentUser.emailAddress) {
          currentUser = $cookies.getObject('currUser');
        }

        return currentUser;
      },
      isLoggedIn: function () {
        if (this.getToken()) {
          var tokenTime = Number($cookies.get('tokenTime'));
          var currTime = (new Date()).getTime();

          if ((currTime - tokenTime) < 30 * 60 * 1000) {
            return true;
          }
        }

        this.logout();
        return false;
      },
      getToken: function () {
        return $cookies.get('token');
      }
    }
  }]);

'use strict';

/**
 * @ngdoc service
 * @name wanderwagon-webapp.remoteSvc
 * @description
 * # remoteSvc
 * Factory in the wanderwagon-webapp.
 */
angular.module('wanderwagon-webapp')
  .factory('remoteSvc', ["auth", "$http", "ENV", "$location", function (auth, $http, ENV, $location) {

    var remoteAddr = ENV.endPoint;

    return {
      getConsumerProfile: function () {
        return $http({
          method: 'GET',
          headers: {
            'auth-token': auth.getToken()
          },
          url: remoteAddr + '/consumer/account/profile'
        })
      },

      updateConsumerProfile: function(profileObj) {
        return $http({
				 method: 'POST',
				 data: profileObj,
				 headers: {
					 'auth-token' : auth.getToken()
				 },
				 url: remoteAddr + 'consumer/account/editprofile'
			 })
      },

      getCurrentUri : function() {
          return $location.path();
      },


      getAllPosts : function() {
        return $http({
          method: 'GET',
          url: remoteAddr + '/blogs/all'
        })
      },

      getBlogDetail : function(postId) {
        return $http({
          method: 'GET',
          url: remoteAddr + '/blogs/blogdetail/' + postId
        })
      }
    };
  }]);

angular.module('config', [])

.constant('ENV', {name:'production',endPoint:'http://52.221.240.74:8080/api/v1'})

;
'use strict';

/**
 * @ngdoc function
 * @name wanderwagon-webapp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the wanderwagon-webapp
 */
angular.module('wanderwagon-webapp')
  .controller('AboutCtrl', ["$scope", function ($scope) {

     $scope.destinations = [{
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
      }
    ];


  }]);

'use strict';

/**
 * @ngdoc function
 * @name wanderwagon-webapp.controller:AccountCtrl
 * @description
 * # AccountCtrl
 * Controller of the wanderwagon-webapp
 */
angular.module('wanderwagon-webapp')
  .controller('AccountCtrl', ["$scope", function ($scope) {

    
   
  }]);

'use strict';

/**
 * @ngdoc function
 * @name wanderwagon-webapp.controller:DestinationDetailCtrl
 * @description
 * # DestinationDetailCtrl
 * Controller of the wanderwagon-webapp
 */
angular.module('wanderwagon-webapp')
  .controller('DestinationDetailCtrl', ["$scope", "$location", "$anchorScroll", function ($scope, $location, $anchorScroll) {



 $scope.places = [{
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

     
      $scope.activities = [{
        imageUrl: 'images/backpacking.jpg',
        text: 'Backpacking'
      },
      {
        imageUrl: 'images/roadtrip.jpg',
        text: 'Road Trip'
      },
      {
        imageUrl: 'images/adventure.jpg',
        text: 'Adventure'
      },
      {
        imageUrl: 'images/nature.jpg',
        text: 'Nature'
      },
      {
        imageUrl: 'images/adventure.jpg',
        text: 'Family'
      },
      {
        imageUrl: 'images/backpacking.jpg',
        text: 'Couple'
      },

    ];


    $scope.showPlaces = false;
    $scope.showPlaceDetails = function(){
      $scope.showPlaces = true;
      console.log($scope.showPlaces);
    };

    $scope.onClicked = function() {
      console.log("CLICKED");
    };



     $scope.gotoContent = function(name) {
      $location.hash(name);
      $anchorScroll();
    };

  }]);

'use strict';

/**
 * @ngdoc function
 * @name wanderwagon-webapp.controller:TravelPlanCtrl
 * @description
 * # TravelPlanCtrl
 * Controller of the wanderwagon-webapp
 */
angular.module('wanderwagon-webapp')
  .controller('TravelPlanCtrl', ["$scope", function ($scope) {
      $scope.images = [{
        imageUrl: 'images/backpacking.jpg',
        text: 'Backpacking'
      },
      {
        imageUrl: 'images/roadtrip.jpg',
        text: 'Road Trip'
      },
      {
        imageUrl: 'images/adventure.jpg',
        text: 'Adventure'
      },
      {
        imageUrl: 'images/nature.jpg',
        text: 'Nature'
      },
      {
        imageUrl: 'images/adventure.jpg',
        text: 'Family'
      },
      {
        imageUrl: 'images/backpacking.jpg',
        text: 'Couple'
      },

    ];

     $scope.destinations = [{
        imageUrl: 'http://placehold.it/380x255',
        name: 'Himachal',
        id: 1
      },
      {
        imageUrl: 'http://placehold.it/380x255',
        name: 'Uttarakhand',
        id: 2
      },
      {
        imageUrl: 'http://placehold.it/380x255',
        name: 'Kashmir',
        id: 3
      },
      {
        imageUrl: 'http://placehold.it/380x255',
        name: 'Meghalaya',
        id: 4
      },
      {
        imageUrl: 'http://placehold.it/380x255',
        name: 'Arunachal',
        id: 5
      },
      {
        imageUrl: 'http://placehold.it/380x255',
        name: 'Sikkim',
        id: 6
      },
      {
        imageUrl: 'http://placehold.it/380x255',
        name: 'Manipur',
        id: 7
      },
      {
        imageUrl: 'http://placehold.it/380x255',
        name: 'Assam',
        id: 8
      },
      {
        imageUrl: 'http://placehold.it/380x255',
        name: 'Darjeeling',
        id: 9
      },
      {
        imageUrl: 'http://placehold.it/380x255',
        name: 'Kolkata',
        id: 10
      },
      {
        imageUrl: 'http://placehold.it/380x255',
        name: 'Delhi',
        id: 11
      },
      {
        imageUrl: 'http://placehold.it/380x255',
        name: 'Agra',
        id: 12
      }
    ];
  }]);

angular.module('wanderwagon-webapp').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('views/about.html',
    "<section style=\"height:680px\" id=\"slider\" class=\"swiper_wrapper full-screen clearfix\"> <div class=\"slider-parallax-inner\"> <div class=\"swiper-container swiper-parent\"> <div class=\"swiper-wrapper\"> <div class=\"swiper-slide dark\" style=\"background-color:#000;background-image: url('images/destination-detail-bg.jpg');  height:680px\"> <div class=\"container clearfix\"> <div class=\"center-block\"> <h2 class=\"text-center\" style=\"font-size:48px;letter-spacing:0px;font-weight:600;color:#fff;margin-top:200px\" data-caption-animate=\"fadeInUp\"> Our Story </h2> <!--<p style=\"font-size:3rem; font-style:italic;\" class=\"text-center\"> is a stunning tapestry</p>--> </div> </div> <div style=\"width:100%;height:150px;background-color: rgba(0,0,0,.66);position:absolute;bottom:0\"> <div class=\"center-block\"> <h2 class=\"text-center\" style=\"font-size:32px;letter-spacing:0px;font-weight:200;color:#fff; margin-top:30px\" data-caption-animate=\"fadeInUp\"> ENRICHING LIVES THROUGH GREAT EXPERIENCES </h2> </div> </div> </div> </div> </div> </div> </section> <!-- Content\n" +
    "		============================================= --> <section id=\"content\"> <div class=\"content-wrap\"> <div class=\"clearfix center-block\" style=\"width:70%\"> <div style=\"height:150px; padding:3%; background-color:#EEE\"> <div class=\"pull-left\"> <div class=\"feature-box fbox-large\"> <div class=\"fbox-icon\"> <a><i class=\"icon-rocket i-alt\"></i></a> </div> <h3>FOUNDED</h3> <h1>2016</h1> </div> </div> <div class=\"pull-right\"> <div class=\"feature-box fbox-large\"> <div class=\"fbox-icon\"> <i class=\"icon-home2 i-alt\"></i> </div> <h3>HOMEBASE</h3> <h1>Delhi</h1> </div> </div> </div> <div style=\"margin-top:50px\" class=\"clearfix\"> <div class=\"pull-right\" style=\"width:40%\"> <a href=\"images/blog1.jpg\" data-lightbox=\"image\"><img height=\"300px;\" src=\"images/blog1.jpg\" alt=\"Standard Post with Image\"></a> </div> <div class=\"pull-left\" style=\"width:50%; padding-right:40px\"> <div class=\"entry-title\"> <h3 style=\"line-height:1.2142857142857142;margin-top:0;margin-right:0;margin-bottom:0;margin-left:0;font-size:28px;font-weight:600;color:#2c3643\"> Who we are ?</h3> </div> <div class=\"entry-content\" style=\"margin-top:20px\"> <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cupiditate, asperiores quod est tenetur in. Eligendi, deserunt, blanditiis est quisquam doloribus voluptate id aperiam ea ipsum magni aut perspiciatis rem voluptatibus officia eos rerum deleniti quae nihil facilis repellat atque vitae voluptatem libero at eveniet veritatis ab facere. </p> </div> </div> </div> <div style=\"margin:30px 0 30px 0\" class=\"clearfix\"> <div class=\"pull-left\" style=\"width:40%\"> <a href=\"images/blog2.jpg\" data-lightbox=\"image\"><img height=\"300px;\" class=\"image_fade\" src=\"images/blog2.jpg\" alt=\"Standard Post with Image\"></a> </div> <div class=\"pull-right\" style=\"width:50%; padding-left:10px\"> <div class=\"entry-title\"> <h3 style=\"line-height:1.2142857142857142;margin-top:0;margin-right:0;margin-bottom:0;margin-left:0;font-size:28px;font-weight:600;color:#2c3643\"> What we're all about ?</h3> </div> <div class=\"entry-content\" style=\"margin-top:20px\"> <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cupiditate, asperiores quod est tenetur in. Eligendi, deserunt, blanditiis est quisquam doloribus voluptate id aperiam ea ipsum magni aut perspiciatis rem voluptatibus officia eos rerum deleniti quae nihil facilis repellat atque vitae voluptatem libero at eveniet veritatis ab facere. </p> </div> </div> </div> <div> </div> </div> </div> <div style=\"background-color:#EEE; padding:20px 20px 20px 20px; margin-bottom:50px\" class=\"container\"> <h2 style=\"text-align:center; margin-bottom:50px;letter-spacing:-0.45px;line-height:1;font-weight:300;font-size:3.8rem\"> Meet The Team <div style=\"display:block;height:2px;width:30px;background:#dc221a;margin-left:auto;margin-right:auto;margin-bottom:0;margin-top:15px\"> </div> </h2> <div class=\"row row-centered\"> <div style=\"margin-bottom:10px\" ng-repeat=\"destination in destinations\" class=\"col-xs-3 col-centered col-fixed\"> <div class=\"item\"> <div class=\"content\"> <div class=\"center-block\" style=\"max-width:250px; max-height:300px; background:#fff; padding:10px; border-radius:5px\"> <img class=\"center-block img-circle\" width=\"100\" height=\"100\" src=\"images/manipur.jpg\"> <h4 class=\"text-center\">Name</h4> <h6 class=\"text-center\">Some Text</h6> <div class=\"feature-box fbox-small fbox-plain\"> <div class=\"fbox-icon\"> <a><i class=\"icon-adjust\"></i> </a></div> <div style=\"padding-top:5px\">Something Something</div> </div> <div class=\"feature-box fbox-small fbox-plain\"> <div class=\"fbox-icon\"> <a><i class=\"icon-adjust\"></i> </a></div> <div style=\"padding-top:5px\">Something Something</div> </div> </div> <!--\n" +
    "            <h5 style=\"font-size:1.6rem\" class=\"text-center\">\n" +
    "                    {{destination.name}}</h5>--> </div> </div> </div> </div> </div> </section> <!-- #content end --> "
  );


  $templateCache.put('views/account.html',
    " <p>This is the account page</p>"
  );


  $templateCache.put('views/blog-detail.html',
    "<div style=\"background-color:#000;background-image: url('images/destination-bg.jpg');background-size: cover; height:100vh\"> <div class=\"container clearfix\"> <div class=\"slider-caption-center\"> <h2 class=\"text-center\" style=\"font-size:48px;letter-spacing:0px;font-weight:600;color:#fff;margin-top:200px\" data-caption-animate=\"fadeInUp\">Welcome to Blog Details Page</h2> <!--<a class=\"custom-button center-block text-center\">\n" +
    "         <span>Let's Wander</span> <i style=\"margin-left:10px;\" class=\"icon-angle-right\"></i></a>--> </div> </div> </div> <section id=\"content\"> <div class=\"content-wrap\"> <div class=\"container clearfix\"> <!-- Post Content\n" +
    "					============================================= --> <div class=\"postcontent nobottommargin clearfix\"> <div class=\"single-post nobottommargin\"> <!-- Single Post\n" +
    "						============================================= --> <div class=\"entry clearfix\"> <!-- Entry Title\n" +
    "							============================================= --> <!--<div class=\"entry-title\">\n" +
    "            <h2>{{postDetail.title}}</h2>\n" +
    "          </div>--> <!-- .entry-title end --> <!-- Entry Meta\n" +
    "							============================================= --> <ul class=\"entry-meta clearfix\"> <li><i class=\"icon-calendar3\"></i> 10th July 2014</li> <li><a href=\"#\"><i class=\"icon-user\"></i> {{author.name}}</a></li> <li><i class=\"icon-folder-open\"></i> <a href=\"#\">General</a></li> <li><a href=\"#\"><i class=\"icon-comments\"></i> 43 Comments</a></li> </ul> <!-- .entry-meta end --> <!-- Entry Image\n" +
    "							============================================= --> <!--<div class=\"entry-image bottommargin\">\n" +
    "            <a href=\"#\"><img ng-src=\"{{postDetail.imageUrl}}\" alt=\"Blog Single\"></a>\n" +
    "          </div>--> <!-- .entry-image end --> <!-- Entry Content\n" +
    "							============================================= --> <div class=\"entry-content notopmargin\"> <p>{{postDetail.description}}</p> <p>Nullam id dolor id nibh ultricies vehicula ut id elit. <a href=\"#\">Curabitur blandit tempus porttitor</a>. Integer posuere erat a ante venenatis dapibus posuere velit aliquet. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Vestibulum id ligula porta felis euismod semper. Donec id elit non mi porta gravida at eget metus. Vestibulum id ligula porta felis euismod semper.</p> <p>Integer posuere erat a ante venenatis dapibus posuere velit aliquet. Cras mattis consectetur purus sit amet fermentum. Donec id elit non mi porta gravida at eget metus.</p> <p>Morbi leo risus, porta ac consectetur ac, vestibulum at eros. Aenean lacinia bibendum nulla sed consectetur. Cras justo odio, dapibus ac facilisis in, egestas eget quam. <a href=\"#\">Nullam quis risus eget urna</a> mollis ornare vel eu leo. Integer posuere erat a ante venenatis dapibus posuere velit aliquet.</p> <p>Duis mollis, est non commodo luctus, nisi erat porttitor ligula, eget lacinia odio sem nec elit. Cras mattis consectetur purus sit amet fermentum. Morbi leo risus, porta ac consectetur ac, vestibulum at eros. Praesent commodo cursus magna, vel scelerisque nisl consectetur et.</p> <p>Nullam id dolor id nibh ultricies vehicula ut id elit. Curabitur blandit tempus porttitor. Integer posuere erat a ante venenatis dapibus posuere velit aliquet. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Vestibulum id ligula porta felis euismod semper. Donec id elit non mi porta gravida at eget metus. Vestibulum id ligula porta felis euismod semper.</p> <!-- Post Single - Content End --> <div> <img ng-src=\"{{postDetail.imageUrl}}\" alt=\"Blog Single\" width=\"auto\" height=\"auto\"> </div> <div class=\"clear\"></div> <!-- Post Single - Share\n" +
    "								============================================= --> <div class=\"si-share noborder clearfix\"> <span>Share this Post:</span> <div> <a href=\"#\" class=\"social-icon si-borderless si-facebook\"> <i class=\"icon-facebook\"></i> <i class=\"icon-facebook\"></i> </a> <a href=\"#\" class=\"social-icon si-borderless si-twitter\"> <i class=\"icon-twitter\"></i> <i class=\"icon-twitter\"></i> </a> <a href=\"#\" class=\"social-icon si-borderless si-pinterest\"> <i class=\"icon-pinterest\"></i> <i class=\"icon-pinterest\"></i> </a> <a href=\"#\" class=\"social-icon si-borderless si-gplus\"> <i class=\"icon-gplus\"></i> <i class=\"icon-gplus\"></i> </a> <a href=\"#\" class=\"social-icon si-borderless si-rss\"> <i class=\"icon-rss\"></i> <i class=\"icon-rss\"></i> </a> <a href=\"#\" class=\"social-icon si-borderless si-email3\"> <i class=\"icon-email3\"></i> <i class=\"icon-email3\"></i> </a> </div> </div> <!-- Post Single - Share End --> </div> </div> <!-- .entry end --> <!-- Post Author Info\n" +
    "						============================================= --> <div class=\"panel panel-default\"> <div class=\"panel-heading\"> <h3 class=\"panel-title\">Posted by <span><a href=\"#\">{{author.name}}</a></span></h3> </div> <div class=\"panel-body\"> <div class=\"author-image\"> <img ng-src=\"http://0.gravatar.com/avatar/ad516503a11cd5ca435acc9bb6523536?s=60\" alt=\"\" class=\"img-circle\"> </div> Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolores, eveniet, eligendi et nobis neque minus mollitia sit repudiandae ad repellendus recusandae blanditiis praesentium vitae ab sint earum voluptate velit beatae alias fugit accusantium laboriosam nisi reiciendis deleniti tenetur molestiae maxime id quaerat consequatur fugiat aliquam laborum nam aliquid. Consectetur, perferendis? </div> </div> <!-- Post Single - Author End --> <h3 class=\"panel-title\" style=\"text-align:center\">Share your story with us at contact@wanderwagon.com</h3> <!-- Comments\n" +
    "						============================================= --> <div id=\"comments\" class=\"clearfix\"> <h3 id=\"comments-title\"><span>3</span> Comments</h3> <!-- Comments List\n" +
    "							============================================= --> <ol class=\"commentlist clearfix\"> <li class=\"comment even thread-even depth-1\" id=\"li-comment-1\"> <div id=\"comment-1\" class=\"comment-wrap clearfix\"> <div class=\"comment-meta\"> <div class=\"comment-author vcard\"> <span class=\"comment-avatar clearfix\"> <img alt=\"\" src=\"http://0.gravatar.com/avatar/ad516503a11cd5ca435acc9bb6523536?s=60\" class=\"avatar avatar-60 photo avatar-default\" height=\"60\" width=\"60\"></span> </div> </div> <div class=\"comment-content clearfix\"> <div class=\"comment-author\">John Doe<span><a href=\"#\" title=\"Permalink to this comment\">April 24, 2012 at 10:46 am</a></span></div> <p>Donec sed odio dui. Nulla vitae elit libero, a pharetra augue. Nullam id dolor id nibh ultricies vehicula ut id elit. Integer posuere erat a ante venenatis dapibus posuere velit aliquet.</p> <a class=\"comment-reply-link\" href=\"#\"><i class=\"icon-reply\"></i></a> </div> <div class=\"clear\"></div> </div> <ul class=\"children\"> <li class=\"comment byuser comment-author-_smcl_admin odd alt depth-2\" id=\"li-comment-3\"> <div id=\"comment-3\" class=\"comment-wrap clearfix\"> <div class=\"comment-meta\"> <div class=\"comment-author vcard\"> <span class=\"comment-avatar clearfix\"> <img alt=\"\" src=\"http://1.gravatar.com/avatar/30110f1f3a4238c619bcceb10f4c4484?s=40&amp;d=http%3A%2F%2F1.gravatar.com%2Favatar%2Fad516503a11cd5ca435acc9bb6523536%3Fs%3D40&amp;r=G\" class=\"avatar avatar-40 photo\" height=\"40\" width=\"40\"></span> </div> </div> <div class=\"comment-content clearfix\"> <div class=\"comment-author\"><a href=\"#\" rel=\"external nofollow\" class=\"url\">SemiColon</a><span><a href=\"#\" title=\"Permalink to this comment\">April 25, 2012 at 1:03 am</a></span></div> <p>Nullam id dolor id nibh ultricies vehicula ut id elit.</p> <a class=\"comment-reply-link\" href=\"#\"><i class=\"icon-reply\"></i></a> </div> <div class=\"clear\"></div> </div> </li> </ul> </li> <li class=\"comment byuser comment-author-_smcl_admin even thread-odd thread-alt depth-1\" id=\"li-comment-2\"> <div id=\"comment-2\" class=\"comment-wrap clearfix\"> <div class=\"comment-meta\"> <div class=\"comment-author vcard\"> <span class=\"comment-avatar clearfix\"> <img alt=\"\" src=\"http://1.gravatar.com/avatar/30110f1f3a4238c619bcceb10f4c4484?s=60&amp;d=http%3A%2F%2F1.gravatar.com%2Favatar%2Fad516503a11cd5ca435acc9bb6523536%3Fs%3D60&amp;r=G\" class=\"avatar avatar-60 photo\" height=\"60\" width=\"60\"></span> </div> </div> <div class=\"comment-content clearfix\"> <div class=\"comment-author\"><a href=\"http://themeforest.net/user/semicolonweb\" rel=\"external nofollow\" class=\"url\">SemiColon</a><span><a href=\"#\" title=\"Permalink to this comment\">April 25, 2012 at 1:03 am</a></span></div> <p>Integer posuere erat a ante venenatis dapibus posuere velit aliquet.</p> <a class=\"comment-reply-link\" href=\"#\"><i class=\"icon-reply\"></i></a> </div> <div class=\"clear\"></div> </div> </li> </ol> <!-- .commentlist end --> <div class=\"clear\"></div> <!-- Comment Form\n" +
    "							============================================= --> <div id=\"respond\" class=\"clearfix\"> <button style=\"float:right\" ng-click=\"showCommentForm = true;\" id=\"\" tabindex=\"5\" class=\"button button-3d nomargin\">ADD A COMMENT</button> <form ng-show=\"showCommentForm\" class=\"clearfix\" action=\"#\" method=\"post\" id=\"commentform\"> <div class=\"col_full\"> <label for=\"comment\">Comment</label> <textarea name=\"comment\" cols=\"58\" rows=\"7\" tabindex=\"4\" class=\"sm-form-control\"></textarea> </div> <div class=\"col_full nobottommargin\"> <button name=\"submit\" type=\"submit\" id=\"submit-button\" tabindex=\"5\" value=\"Submit\" class=\"button button-3d nomargin\">Submit</button> </div> </form> </div> <!-- #respond end --> </div> <!-- #comments end --> </div> </div> <!-- .postcontent end --> <!-- Sidebar\n" +
    "					============================================= --> <div class=\"sidebar nobottommargin col_last clearfix\"> <div class=\"sidebar-widgets-wrap\"> <!--<div class=\"widget widget-twitter-feed clearfix\">\n" +
    "\n" +
    "								<h4>Twitter Feed</h4>\n" +
    "								<ul class=\"iconlist twitter-feed\" data-username=\"envato\" data-count=\"2\">\n" +
    "									<li></li>\n" +
    "								</ul>\n" +
    "\n" +
    "								<a href=\"#\" class=\"btn btn-default btn-sm fright\">Follow Us on Twitter</a>\n" +
    "\n" +
    "							</div>--> <div class=\"widget clearfix\"> <div class=\"tabs nobottommargin clearfix\" id=\"sidebar-tabs\"> <uib-tabset active=\"activeJustified\" justified=\"true\"> <uib-tab index=\"0\" heading=\"Similar Posts\"> <div class=\"tab-content clearfix\"> <div id=\"popular-post-list-sidebar\"> <div ng-repeat=\"post in popularPosts\" class=\"spost clearfix\"> <div class=\"entry-image\"> <a href=\"#\" class=\"nobg\"><img class=\"img-circle\" ng-src=\"{{post.authorImage}}\" alt=\"\"></a> </div> <div class=\"entry-c\"> <div class=\"entry-title\"> <h4><a href=\"#\">{{post.postTitle}}</a></h4> </div> <ul class=\"entry-meta\"> <li><i class=\"icon-comments-alt\"></i> {{post.numberOfComments}} Comments</li> </ul> </div> </div> </div> </div> </uib-tab> </uib-tabset> </div> </div> <!--<div class=\"widget clearfix\">\n" +
    "\n" +
    "            <h4>Portfolio Carousel</h4>\n" +
    "            <div id=\"oc-portfolio-sidebar\" class=\"owl-carousel carousel-widget\" data-items=\"1\" data-margin=\"10\" data-loop=\"true\" data-nav=\"false\"\n" +
    "              data-autoplay=\"5000\">\n" +
    "\n" +
    "              <div class=\"oc-item\">\n" +
    "                <div class=\"iportfolio\">\n" +
    "                  <div class=\"portfolio-image\">\n" +
    "                    <a href=\"#\">\n" +
    "                      <img src=\"images/portfolio/4/3.jpg\" alt=\"Mac Sunglasses\">\n" +
    "                    </a>\n" +
    "                    <div class=\"portfolio-overlay\">\n" +
    "                      <a href=\"http://vimeo.com/89396394\" class=\"center-icon\" data-lightbox=\"iframe\"><i class=\"icon-line-play\"></i></a>\n" +
    "                    </div>\n" +
    "                  </div>\n" +
    "                  <div class=\"portfolio-desc center nobottompadding\">\n" +
    "                    <h3><a href=\"portfolio-single-video.html\">Mac Sunglasses</a></h3>\n" +
    "                    <span><a href=\"#\">Graphics</a>, <a href=\"#\">UI Elements</a></span>\n" +
    "                  </div>\n" +
    "                </div>\n" +
    "              </div>\n" +
    "\n" +
    "              <div class=\"oc-item\">\n" +
    "                <div class=\"iportfolio\">\n" +
    "                  <div class=\"portfolio-image\">\n" +
    "                    <a href=\"portfolio-single.html\">\n" +
    "                      <img src=\"images/portfolio/4/1.jpg\" alt=\"Open Imagination\">\n" +
    "                    </a>\n" +
    "                    <div class=\"portfolio-overlay\">\n" +
    "                      <a href=\"images/blog/full/1.jpg\" class=\"center-icon\" data-lightbox=\"image\"><i class=\"icon-line-plus\"></i></a>\n" +
    "                    </div>\n" +
    "                  </div>\n" +
    "                  <div class=\"portfolio-desc center nobottompadding\">\n" +
    "                    <h3><a href=\"portfolio-single.html\">Open Imagination</a></h3>\n" +
    "                    <span><a href=\"#\">Media</a>, <a href=\"#\">Icons</a></span>\n" +
    "                  </div>\n" +
    "                </div>\n" +
    "              </div>\n" +
    "\n" +
    "            </div>\n" +
    "          </div>--> <!--<div class=\"widget clearfix\">\n" +
    "\n" +
    "            <h4>Tag Cloud</h4>\n" +
    "            <div class=\"tagcloud\">\n" +
    "              <a href=\"#\">general</a>\n" +
    "              <a href=\"#\">videos</a>\n" +
    "              <a href=\"#\">music</a>\n" +
    "              <a href=\"#\">media</a>\n" +
    "              <a href=\"#\">photography</a>\n" +
    "              <a href=\"#\">parallax</a>\n" +
    "              <a href=\"#\">ecommerce</a>\n" +
    "              <a href=\"#\">terms</a>\n" +
    "              <a href=\"#\">coupons</a>\n" +
    "              <a href=\"#\">modern</a>\n" +
    "            </div>\n" +
    "\n" +
    "          </div>--> </div> </div> <!-- .sidebar end --> </div> </div> <div class=\"container\"> <div class=\"fancy-title title-center title-dotted-border topmargin\"> <h3>Looking for similar experiences ?</h3> </div> <div class=\"entry clearfix\"> <div class=\"row\"> <div class=\"row\"> <div class=\"col-md-3\"> <!-- Controls --> <div class=\"controls hidden-xs\"> <a class=\"icon-angle-left btn\" href=\"#carousel-example-generic\" ng-non-bindable data-slide=\"prev\"></a> <a class=\"icon-angle-right btn\" href=\"#carousel-example-generic\" ng-non-bindable data-slide=\"next\"></a> </div> </div> </div> <div id=\"carousel-example-generic\" class=\"carousel slide hidden-xs\" data-ride=\"carousel\"> <!-- Wrapper for slides --> <div class=\"carousel-inner\"> <div class=\"item active\"> <div class=\"row\"> <div class=\"col-sm-4\"> <div ui-sref=\"travel-plan\" style=\"cursor:pointer\" class=\"col-item\"> <div style=\"width:350px; height:400px\" class=\"photo\"> <img ng-src=\"{{images[0].imageUrl}}\" class=\"img-responsive\" alt=\"a\"> </div> <div class=\"info\"> <h5 style=\"font-size:1.6rem\" class=\"text-center\"> {{images[0].text}}</h5> </div> </div> </div> <div class=\"col-sm-4\"> <div ui-sref=\"travel-plan\" style=\"cursor:pointer\" class=\"col-item\"> <div style=\"width:350px; height:400px\" class=\"photo\"> <img ng-src=\"{{images[1].imageUrl}}\" class=\"img-responsive\" alt=\"a\"> </div> <div class=\"info\"> <h5 style=\"font-size:1.6rem\" class=\"text-center\"> {{images[1].text}}</h5> </div> </div> </div> <div class=\"col-sm-4\"> <div ui-sref=\"travel-plan\" style=\"cursor:pointer\" class=\"col-item\"> <div style=\"width:350px; height:400px\" class=\"photo\"> <img ng-src=\"{{images[2].imageUrl}}\" class=\"img-responsive\" alt=\"a\"> </div> <div class=\"info\"> <h5 style=\"font-size:1.6rem\" class=\"text-center\"> {{images[2].text}}</h5> </div> </div> </div> </div> </div> <div class=\"item\"> <div class=\"row\"> <div class=\"col-sm-4\"> <div ui-sref=\"travel-plan\" style=\"cursor:pointer\" class=\"col-item\"> <div style=\"width:350px; height:400px\" class=\"photo\"> <img ng-src=\"{{images[3].imageUrl}}\" class=\"img-responsive\" alt=\"a\"> </div> <div class=\"info\"> <h5 style=\"font-size:1.6rem\" class=\"text-center\"> {{images[3].text}}</h5> </div> </div> </div> <div class=\"col-sm-4\"> <div ui-sref=\"travel-plan\" style=\"cursor:pointer\" class=\"col-item\"> <div style=\"width:350px; height:400px\" class=\"photo\"> <img ng-src=\"{{images[4].imageUrl}}\" class=\"img-responsive\" alt=\"a\"> </div> <div class=\"info\"> <h5 style=\"font-size:1.6rem\" class=\"text-center\"> {{images[4].text}}</h5> </div> </div> </div> <div class=\"col-sm-4\"> <div ng-click=\"heading1.isOpen = !heading1.isOpen\" style=\"cursor:pointer\" class=\"col-item\"> <div ui-sref=\"travel-plan\" class=\"photo\"> <img ng-src=\"{{images[5].imageUrl}}\" class=\"img-responsive\" alt=\"a\"> </div> <div class=\"info\"> <h5 style=\"font-size:1.6rem\" class=\"text-center\"> {{images[5].text}}</h5> </div> </div> </div> </div> </div> </div> </div> </div> </div> </div> <div class=\"clear\"></div> </section> <!-- #content end --> "
  );


  $templateCache.put('views/blog-list.html',
    "<div style=\"background-color:#000;background-image: url('images/slider/1.jpg');background-size: cover; height:100vh\"> <div class=\"container clearfix\"> <div class=\"slider-caption-center\"> <h2 class=\"text-center\" style=\"font-size:48px;letter-spacing:0px;font-weight:600;color:#fff;margin-top:200px\" data-caption-animate=\"fadeInUp\">Welcome to Blog Page</h2> <!--<a class=\"custom-button center-block text-center\">\n" +
    "         <span>Let's Wander</span> <i style=\"margin-left:10px;\" class=\"icon-angle-right\"></i></a>--> </div> </div> </div> <!-- Content\n" +
    "		============================================= --> <section id=\"content\"> <div class=\"content-wrap\"> <div class=\"container clearfix\"> <!-- Post Content\n" +
    "					============================================= --> <div class=\"postcontent nobottommargin clearfix\"> <!-- Posts\n" +
    "						============================================= --> <div id=\"posts\" class=\"post-timeline clearfix\"> <div class=\"timeline-border\"></div> <div ng-repeat=\"post in posts\" class=\"entry clearfix\"> <div class=\"entry-timeline\"> <!--10<span>{{post.date | date:'MMM'}}</span>--> 10<span>May</span> <div class=\"timeline-divider\"></div> </div> <div class=\"entry-image\"> <a ng-href=\"{{post.image}}\" data-lightbox=\"image\"><img class=\"image_fade\" ng-src=\"{{post.image}}\" alt=\"Standard Post with Image\"></a> </div> <div class=\"entry-title\"> <h3 style=\"cursor:pointer\" ui-sref=\"blog.detail({postId: post.id})\" style=\"line-height:1.2142857142857142;margin-top:0;margin-right:0;margin-bottom:0;margin-left:0;font-size:28px;font-weight:600;color:#2c3643\"> For rivers, seas and slopes at their most inviting</h3> </div> <ul class=\"entry-meta clearfix\"> <li><a href=\"#\"><i class=\"icon-user\"></i> {{post.author}}</a></li> <li><i class=\"icon-folder-open\"></i> <a href=\"#\">General</a></li> <li><a><i class=\"icon-comments\"></i> {{post.comments}} Comment(s)</a></li> </ul> <div class=\"entry-content\"> <p>{{post.description}}</p> <a href=\"\" ui-sref=\"blog.detail({postId: post.id})\" class=\"more-link\">Read More</a> </div> </div> </div> <!-- #posts end --> <!-- Pagination\n" +
    "						============================================= --> <ul class=\"pager nomargin\"> <li class=\"previous\"><a href=\"#\">&larr; Older</a></li> <li class=\"next\"><a href=\"#\">Newer &rarr;</a></li> </ul> <!-- .pager end --> </div> <!-- .postcontent end --> <!-- Sidebar\n" +
    "					============================================= --> <div class=\"sidebar nobottommargin col_last clearfix\"> <div class=\"sidebar-widgets-wrap\"> <!--<div class=\"widget widget-twitter-feed clearfix\">\n" +
    "\n" +
    "								<h4>Twitter Feed</h4>\n" +
    "								<ul class=\"iconlist twitter-feed\" data-username=\"envato\" data-count=\"2\">\n" +
    "									<li></li>\n" +
    "								</ul>\n" +
    "\n" +
    "								<a href=\"#\" class=\"btn btn-default btn-sm fright\">Follow Us on Twitter</a>\n" +
    "\n" +
    "							</div>--> <div class=\"widget clearfix\"> <h4>Instagram Photostream</h4> <!--<div id=\"flickr-widget\" class=\"flickr-feed masonry-thumbs\" >--> <!--<div ng-repeat=\"image in instaImages\">\n" +
    "              <img width=\"50\" height=\"50\" class=\"image_fade\" ng-src=\"{{image.image}}\" alt=\"Standard Post with Image\">\n" +
    "            </div>--> <!--</div>--> <div class=\"row\"> <div ng-repeat=\"image in instaImages\" class=\"col-sm-6\"> <img style=\"padding-bottom: 5px\" width=\"200\" height=\"100\" class=\"image_fade\" ng-src=\"{{image.image}}\" alt=\"Standard Post with Image\"> </div> </div> </div> <div class=\"widget clearfix\"> <div class=\"tabs nobottommargin clearfix\" id=\"sidebar-tabs\"> <uib-tabset active=\"activeJustified\" justified=\"true\"> <uib-tab index=\"0\" heading=\"Popular\"> <div class=\"tab-content clearfix\"> <div id=\"popular-post-list-sidebar\"> <div ng-repeat=\"post in popularPosts\" class=\"spost clearfix\"> <div class=\"entry-image\"> <a href=\"#\" class=\"nobg\"><img class=\"img-circle\" ng-src=\"{{post.authorImage}}\" alt=\"\"></a> </div> <div class=\"entry-c\"> <div class=\"entry-title\"> <h4><a href=\"#\">{{post.postTitle}}</a></h4> </div> <ul class=\"entry-meta\"> <li><i class=\"icon-comments-alt\"></i> {{post.numberOfComments}} Comments</li> </ul> </div> </div> </div> </div> </uib-tab> <uib-tab index=\"1\" heading=\"Recent\"> <div class=\"tab-content clearfix\"> <div id=\"recent-post-list-sidebar\"> <div ng-repeat=\"post in recentPosts\" class=\"spost clearfix\"> <div class=\"entry-image\"> <a href=\"#\" class=\"nobg\"><img class=\"img-circle\" ng-src=\"{{post.authorImage}}\" alt=\"\"></a> </div> <div class=\"entry-c\"> <div class=\"entry-title\"> <h4><a href=\"#\">{{post.postTitle}}</a></h4> </div> <ul class=\"entry-meta\"> <li>{{post.date}}</li> </ul> </div> </div> </div> </div> </uib-tab> </uib-tabset> </div> </div> <!--<div class=\"widget clearfix\">\n" +
    "\n" +
    "            <h4>Portfolio Carousel</h4>\n" +
    "            <div id=\"oc-portfolio-sidebar\" class=\"owl-carousel carousel-widget\" data-items=\"1\" data-margin=\"10\" data-loop=\"true\" data-nav=\"false\"\n" +
    "              data-autoplay=\"5000\">\n" +
    "\n" +
    "              <div class=\"oc-item\">\n" +
    "                <div class=\"iportfolio\">\n" +
    "                  <div class=\"portfolio-image\">\n" +
    "                    <a href=\"#\">\n" +
    "                      <img src=\"images/portfolio/4/3.jpg\" alt=\"Mac Sunglasses\">\n" +
    "                    </a>\n" +
    "                    <div class=\"portfolio-overlay\">\n" +
    "                      <a href=\"http://vimeo.com/89396394\" class=\"center-icon\" data-lightbox=\"iframe\"><i class=\"icon-line-play\"></i></a>\n" +
    "                    </div>\n" +
    "                  </div>\n" +
    "                  <div class=\"portfolio-desc center nobottompadding\">\n" +
    "                    <h3><a href=\"portfolio-single-video.html\">Mac Sunglasses</a></h3>\n" +
    "                    <span><a href=\"#\">Graphics</a>, <a href=\"#\">UI Elements</a></span>\n" +
    "                  </div>\n" +
    "                </div>\n" +
    "              </div>\n" +
    "\n" +
    "              <div class=\"oc-item\">\n" +
    "                <div class=\"iportfolio\">\n" +
    "                  <div class=\"portfolio-image\">\n" +
    "                    <a href=\"portfolio-single.html\">\n" +
    "                      <img src=\"images/portfolio/4/1.jpg\" alt=\"Open Imagination\">\n" +
    "                    </a>\n" +
    "                    <div class=\"portfolio-overlay\">\n" +
    "                      <a href=\"images/blog/full/1.jpg\" class=\"center-icon\" data-lightbox=\"image\"><i class=\"icon-line-plus\"></i></a>\n" +
    "                    </div>\n" +
    "                  </div>\n" +
    "                  <div class=\"portfolio-desc center nobottompadding\">\n" +
    "                    <h3><a href=\"portfolio-single.html\">Open Imagination</a></h3>\n" +
    "                    <span><a href=\"#\">Media</a>, <a href=\"#\">Icons</a></span>\n" +
    "                  </div>\n" +
    "                </div>\n" +
    "              </div>\n" +
    "\n" +
    "            </div>\n" +
    "          </div>--> <!--<div class=\"widget clearfix\">\n" +
    "\n" +
    "            <h4>Tag Cloud</h4>\n" +
    "            <div class=\"tagcloud\">\n" +
    "              <a href=\"#\">general</a>\n" +
    "              <a href=\"#\">videos</a>\n" +
    "              <a href=\"#\">music</a>\n" +
    "              <a href=\"#\">media</a>\n" +
    "              <a href=\"#\">photography</a>\n" +
    "              <a href=\"#\">parallax</a>\n" +
    "              <a href=\"#\">ecommerce</a>\n" +
    "              <a href=\"#\">terms</a>\n" +
    "              <a href=\"#\">coupons</a>\n" +
    "              <a href=\"#\">modern</a>\n" +
    "            </div>\n" +
    "\n" +
    "          </div>--> </div> </div> <!-- .sidebar end --> </div> </div> </section> <!-- #content end --> "
  );


  $templateCache.put('views/cancellation-policy.html',
    "<section style=\"background:#444\" id=\"page-title\"> </section> <!-- #page-title end --> <div style=\"margin-top:50px\" class=\"container\"> <h1 style=\"font-size:18px\">Cancellation/ Modification Policy</h1> TravelTriangle believes in helping its customers as far as possible, and has therefore a liberal cancellation policy. Under this policy: <ul class=\"normal_ul\"> <li>Cancellations will be considered only if the request is made within 72 hours of placing an order. However, the cancellation request will not be entertained if the orders have been communicated to the vendors/merchants and they have initiated the process of shipping them.</li> <li>There is no cancellation of orders placed under the Same Day Delivery category.</li> <li>No cancellations are entertained for those products that the TravelTriangle marketing team has obtained on special tours like Group Tour, etc. These are limited occasion offers and therefore cancellations are not possible.</li> <li>In case you feel that the product (trip) received is not as shown on the site or as per your expectations, you must bring it to the notice of our customer service within 24 hours of receiving the product. The Customer Service Team after looking into your complaint will take an appropriate decision.</li> <li> TT or its affiliate partners will not be liable for any Visa rejections and Hotel cancellation policies would still stand as they are.</li> <li>Refunds can only be given in cases of inclusions mentioned in package confirmed by customer are not delivered by booking agent. Refunds will not be given in any other case.</li> <li>If due to unforeseen circumstances, the traveler has to pay for the inclusions already mentioned in the package, refund claims for the inclusions part of the package may be considered and refunded upon submission of proper receipts, provided this was pre-informed to Travel Triangle advisor or travel agent.</li> <li>Travel Triangle guarantees delivery of services booked through Travel Triangle. In case part package is booked by traveler themselves or outside of Travel Triangle, no claim against such services shall be entertained.</li> <li>In case local attractions are closed for maintenance/weather conditions/government orders/strike/curfew/natural calamity/other unforeseen reasons, Travel Triangle/travel agent will try its best to reimburse the traveler appropriate amount against the same in case refund is possible. However, Travel Triangle/travel agent are not obligated for the same and cannot be held liable against it.</li> </ul> <br><br> <h2 style=\"font-size:18px\">Refund Policy</h2> Under this policy: <ul class=\"normal_ul\"> <li>If you are, for any reason, not entirely happy with your purchase, we will cheerfully issue applicable refund provided such refund is sought pursuant to cancellation and the request for same is made within 72 hours of your purchase and shall be further subject to the travel agent having not processed your order.To request a refund, simply contact us with your purchase details within three (3) days of your purchase.</li> <li> Please include your order number (sent to you via email after ordering) and optionally tell us why you’re requesting a refund - we take customer feedback very seriously and use it to constantly improve our products and quality of service. Refunds are being processed within 21 days period however, we shall not be liable for any default caused in processing the refund amount owing to the delay caused by processing bank.</li> <li>Any amendments/additions to package (dates, inclusions, itinerary etc), will be done at extra cost to the customer. Changes made to the package will be made as per cancellation policy of the original package and customer has to bear the cost incurred due to this.</li> <li>Travel Triangle doesn't encourage changes and modifications to online bookings once they're made. However, facilitation of changes related to postponement or rescheduling of the already booked package is the sole discretion of Travel agent under permitted circumstances. Travel Triangle shall not be held liable for any impact due to change in original itinierary by the traveler and this is subject to mutual agreement and discussion between traveler and travel agent.</li> <li>In case of force majeure cases (such as curfew, riots etc), Travel Triangle shall not be liable for any losses made thereof.</li> <li>Circumstances amounting to “force majeure” include any event which we or the supplier of the service(s) in question could not even with all due care, foresee or forestall such as (by way of example and not by way of limitation) war, threat of war, riot, civil strife, industrial dispute, terrorist activity, natural or nuclear disaster, fire, acts of God, adverse weather conditions, and all similar events.</li> </ul> </div> "
  );


  $templateCache.put('views/careers.html',
    " <!-- Page Title\n" +
    "		============================================= --> <section id=\"page-title\" style=\"background-image: url('https://www.harman.com/sites/default/files/Careers-new.jpg'); padding: 120px 0\" data-stellar-background-ratio=\"0.3\"> <div class=\"container clearfix\"> <h1>Job Openings</h1> <span>Join our Fabulous Team of Intelligent Individuals</span> </div> </section><!-- #page-title end --> <!-- Content\n" +
    "		============================================= --> <section id=\"content\"> <div class=\"content-wrap\"> <div class=\"container clearfix\"> <div class=\"col_three_fifth nobottommargin\"> <div class=\"fancy-title title-bottom-border\"> <h3>Senior Python Developer</h3> </div> <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nemo, natus voluptatibus adipisci porro magni dolore eos eius ducimus corporis quos perspiciatis quis iste, vitae autem libero ullam omnis cupiditate quam.</p> <div class=\"accordion accordion-bg clearfix\"> <div class=\"acctitle\"><i class=\"acc-closed icon-ok-circle\"></i><i class=\"acc-open icon-remove-circle\"></i>Requirements</div> <div class=\"acc_content clearfix\"> <ul class=\"iconlist iconlist-color nobottommargin\"> <li><i class=\"icon-ok\"></i>B.Tech./ B.E / MCA degree in Computer Science, Engineering or a related stream.</li> <li><i class=\"icon-ok\"></i>3+ years of software development experience.</li> <li><i class=\"icon-ok\"></i>3+ years of Python / Java development projects experience.</li> <li><i class=\"icon-ok\"></i>Minimum of 4 live project roll outs.</li> <li><i class=\"icon-ok\"></i>Experience with third-party libraries and APIs.</li> <li><i class=\"icon-ok\"></i>In depth understanding and experience of either SDLC or PDLC.</li> <li><i class=\"icon-ok\"></i>Good Communication Skills</li> <li><i class=\"icon-ok\"></i>Team Player</li> </ul> </div> <div class=\"acctitle\"><i class=\"acc-closed icon-ok-circle\"></i><i class=\"acc-open icon-remove-circle\"></i>What we Expect from you?</div> <div class=\"acc_content clearfix\"> <ul class=\"iconlist iconlist-color nobottommargin\"> <li><i class=\"icon-plus-sign\"></i>Design and build applications/ components using open source technology.</li> <li><i class=\"icon-plus-sign\"></i>Taking complete ownership of the deliveries assigned.</li> <li><i class=\"icon-plus-sign\"></i>Collaborate with cross-functional teams to define, design, and ship new features.</li> <li><i class=\"icon-plus-sign\"></i>Work with outside data sources and API's.</li> <li><i class=\"icon-plus-sign\"></i>Unit-test code for robustness, including edge cases, usability, and general reliability.</li> <li><i class=\"icon-plus-sign\"></i>Work on bug fixing and improving application performance.</li> </ul> </div> <div class=\"acctitle\"><i class=\"acc-closed icon-ok-circle\"></i><i class=\"acc-open icon-remove-circle\"></i>What you've got?</div> <div class=\"acc_content clearfix\">You'll be familiar with agile practices and have a highly technical background, comfortable discussing detailed technical aspects of system design and implementation, whilst remaining business driven. With 5+ years of systems analysis, technical analysis or business analysis experience, you'll have an expansive toolkit of communication techniques to enable shared, deep understanding of financial and technical concepts by diverse stakeholders with varying backgrounds and needs. In addition, you will have exposure to financial systems or accounting knowledge.</div> </div> <a href=\"#\" data-scrollto=\"#job-apply\" class=\"button button-3d button-black nomargin\">Apply Now</a> <div class=\"divider divider-short\"><i class=\"icon-star3\"></i></div> <div class=\"fancy-title title-bottom-border\"> <h3>Design Analyst</h3> </div> <p>Repudiandae quasi perspiciatis ea placeat nobis asperiores quod fuga ipsa facere enim ipsum expedita debitis, sit quia adipisci deserunt vitae hic obcaecati voluptates rerum nihil.</p> <div class=\"accordion accordion-bg clearfix\"> <div class=\"acctitle\"><i class=\"acc-closed icon-ok-circle\"></i><i class=\"acc-open icon-remove-circle\"></i>Requirements</div> <div class=\"acc_content clearfix\"> <ul class=\"iconlist iconlist-color nobottommargin\"> <li><i class=\"icon-ok\"></i>B.Tech./ B.E / MCA degree in Computer Science, Engineering or a related stream.</li> <li><i class=\"icon-ok\"></i>3+ years of software development experience.</li> <li><i class=\"icon-ok\"></i>3+ years of Python / Java development projects experience.</li> <li><i class=\"icon-ok\"></i>Minimum of 4 live project roll outs.</li> <li><i class=\"icon-ok\"></i>Experience with third-party libraries and APIs.</li> <li><i class=\"icon-ok\"></i>In depth understanding and experience of either SDLC or PDLC.</li> <li><i class=\"icon-ok\"></i>Good Communication Skills</li> <li><i class=\"icon-ok\"></i>Team Player</li> </ul> </div> <div class=\"acctitle\"><i class=\"acc-closed icon-ok-circle\"></i><i class=\"acc-open icon-remove-circle\"></i>What we Expect from you?</div> <div class=\"acc_content clearfix\"> <ul class=\"iconlist iconlist-color nobottommargin\"> <li><i class=\"icon-plus-sign\"></i>Design and build applications/ components using open source technology.</li> <li><i class=\"icon-plus-sign\"></i>Taking complete ownership of the deliveries assigned.</li> <li><i class=\"icon-plus-sign\"></i>Collaborate with cross-functional teams to define, design, and ship new features.</li> <li><i class=\"icon-plus-sign\"></i>Work with outside data sources and API's.</li> <li><i class=\"icon-plus-sign\"></i>Unit-test code for robustness, including edge cases, usability, and general reliability.</li> <li><i class=\"icon-plus-sign\"></i>Work on bug fixing and improving application performance.</li> </ul> </div> <div class=\"acctitle\"><i class=\"acc-closed icon-ok-circle\"></i><i class=\"acc-open icon-remove-circle\"></i>What you've got?</div> <div class=\"acc_content clearfix\">You'll be familiar with agile practices and have a highly technical background, comfortable discussing detailed technical aspects of system design and implementation, whilst remaining business driven. With 5+ years of systems analysis, technical analysis or business analysis experience, you'll have an expansive toolkit of communication techniques to enable shared, deep understanding of financial and technical concepts by diverse stakeholders with varying backgrounds and needs. In addition, you will have exposure to financial systems or accounting knowledge.</div> </div> <a href=\"#\" data-scrollto=\"#job-apply\" class=\"button button-3d button-black nomargin\">Apply Now</a> <div class=\"divider divider-short\"><i class=\"icon-star3\"></i></div> <div class=\"fancy-title title-bottom-border\"> <h3>Head of UX and Design</h3> </div> <p>Repudiandae quasi perspiciatis ea placeat nobis asperiores quod fuga ipsa facere enim ipsum expedita debitis, sit quia adipisci deserunt vitae hic obcaecati voluptates rerum nihil.</p> <div class=\"accordion accordion-bg clearfix\"> <div class=\"acctitle\"><i class=\"acc-closed icon-ok-circle\"></i><i class=\"acc-open icon-remove-circle\"></i>Requirements</div> <div class=\"acc_content clearfix\"> <ul class=\"iconlist iconlist-color nobottommargin\"> <li><i class=\"icon-ok\"></i>B.Tech./ B.E / MCA degree in Computer Science, Engineering or a related stream.</li> <li><i class=\"icon-ok\"></i>3+ years of software development experience.</li> <li><i class=\"icon-ok\"></i>3+ years of Python / Java development projects experience.</li> <li><i class=\"icon-ok\"></i>Minimum of 4 live project roll outs.</li> <li><i class=\"icon-ok\"></i>Experience with third-party libraries and APIs.</li> <li><i class=\"icon-ok\"></i>In depth understanding and experience of either SDLC or PDLC.</li> <li><i class=\"icon-ok\"></i>Good Communication Skills</li> <li><i class=\"icon-ok\"></i>Team Player</li> </ul> </div> <div class=\"acctitle\"><i class=\"acc-closed icon-ok-circle\"></i><i class=\"acc-open icon-remove-circle\"></i>What we Expect from you?</div> <div class=\"acc_content clearfix\"> <ul class=\"iconlist iconlist-color nobottommargin\"> <li><i class=\"icon-plus-sign\"></i>Design and build applications/ components using open source technology.</li> <li><i class=\"icon-plus-sign\"></i>Taking complete ownership of the deliveries assigned.</li> <li><i class=\"icon-plus-sign\"></i>Collaborate with cross-functional teams to define, design, and ship new features.</li> <li><i class=\"icon-plus-sign\"></i>Work with outside data sources and API's.</li> <li><i class=\"icon-plus-sign\"></i>Unit-test code for robustness, including edge cases, usability, and general reliability.</li> <li><i class=\"icon-plus-sign\"></i>Work on bug fixing and improving application performance.</li> </ul> </div> <div class=\"acctitle\"><i class=\"acc-closed icon-ok-circle\"></i><i class=\"acc-open icon-remove-circle\"></i>What you've got?</div> <div class=\"acc_content clearfix\">You'll be familiar with agile practices and have a highly technical background, comfortable discussing detailed technical aspects of system design and implementation, whilst remaining business driven. With 5+ years of systems analysis, technical analysis or business analysis experience, you'll have an expansive toolkit of communication techniques to enable shared, deep understanding of financial and technical concepts by diverse stakeholders with varying backgrounds and needs. In addition, you will have exposure to financial systems or accounting knowledge.</div> </div> <a href=\"#\" data-scrollto=\"#job-apply\" class=\"button button-3d button-black nomargin\">Apply Now</a> <div class=\"divider divider-short\"><i class=\"icon-star3\"></i></div> <div class=\"fancy-title title-bottom-border\"> <h3>Web &amp; Visual Designer (Marketing)</h3> </div> <p>Repudiandae quasi perspiciatis ea placeat nobis asperiores quod fuga ipsa facere enim ipsum expedita debitis, sit quia adipisci deserunt vitae hic obcaecati voluptates rerum nihil.</p> <div class=\"accordion accordion-bg clearfix\"> <div class=\"acctitle\"><i class=\"acc-closed icon-ok-circle\"></i><i class=\"acc-open icon-remove-circle\"></i>Requirements</div> <div class=\"acc_content clearfix\"> <ul class=\"iconlist iconlist-color nobottommargin\"> <li><i class=\"icon-ok\"></i>B.Tech./ B.E / MCA degree in Computer Science, Engineering or a related stream.</li> <li><i class=\"icon-ok\"></i>3+ years of software development experience.</li> <li><i class=\"icon-ok\"></i>3+ years of Python / Java development projects experience.</li> <li><i class=\"icon-ok\"></i>Minimum of 4 live project roll outs.</li> <li><i class=\"icon-ok\"></i>Experience with third-party libraries and APIs.</li> <li><i class=\"icon-ok\"></i>In depth understanding and experience of either SDLC or PDLC.</li> <li><i class=\"icon-ok\"></i>Good Communication Skills</li> <li><i class=\"icon-ok\"></i>Team Player</li> </ul> </div> <div class=\"acctitle\"><i class=\"acc-closed icon-ok-circle\"></i><i class=\"acc-open icon-remove-circle\"></i>What we Expect from you?</div> <div class=\"acc_content clearfix\"> <ul class=\"iconlist iconlist-color nobottommargin\"> <li><i class=\"icon-plus-sign\"></i>Design and build applications/ components using open source technology.</li> <li><i class=\"icon-plus-sign\"></i>Taking complete ownership of the deliveries assigned.</li> <li><i class=\"icon-plus-sign\"></i>Collaborate with cross-functional teams to define, design, and ship new features.</li> <li><i class=\"icon-plus-sign\"></i>Work with outside data sources and API's.</li> <li><i class=\"icon-plus-sign\"></i>Unit-test code for robustness, including edge cases, usability, and general reliability.</li> <li><i class=\"icon-plus-sign\"></i>Work on bug fixing and improving application performance.</li> </ul> </div> <div class=\"acctitle\"><i class=\"acc-closed icon-ok-circle\"></i><i class=\"acc-open icon-remove-circle\"></i>What you've got?</div> <div class=\"acc_content clearfix\">You'll be familiar with agile practices and have a highly technical background, comfortable discussing detailed technical aspects of system design and implementation, whilst remaining business driven. With 5+ years of systems analysis, technical analysis or business analysis experience, you'll have an expansive toolkit of communication techniques to enable shared, deep understanding of financial and technical concepts by diverse stakeholders with varying backgrounds and needs. In addition, you will have exposure to financial systems or accounting knowledge.</div> </div> <a href=\"#\" data-scrollto=\"#job-apply\" data-highlight=\"yellow\" class=\"button button-3d button-black nomargin\">Apply Now</a> </div> <div class=\"col_two_fifth nobottommargin col_last\"> <div id=\"job-apply\" class=\"heading-block highlight-me\"> <h2>Apply Now</h2> <span>And we'll get back to you within 48 hours.</span> </div> <div class=\"contact-widget\"> <div class=\"contact-form-result\"></div> <form action=\"include/jobs.php\" id=\"template-jobform\" name=\"template-jobform\" method=\"post\" role=\"form\"> <div class=\"form-process\"></div> <div class=\"col_half\"> <label for=\"template-jobform-fname\">First Name <small>*</small></label> <input type=\"text\" id=\"template-jobform-fname\" name=\"template-jobform-fname\" value=\"\" class=\"sm-form-control required\"> </div> <div class=\"col_half col_last\"> <label for=\"template-jobform-lname\">Last Name <small>*</small></label> <input type=\"text\" id=\"template-jobform-lname\" name=\"template-jobform-lname\" value=\"\" class=\"sm-form-control required\"> </div> <div class=\"clear\"></div> <div class=\"col_full\"> <label for=\"template-jobform-email\">Email <small>*</small></label> <input type=\"email\" id=\"template-jobform-email\" name=\"template-jobform-email\" value=\"\" class=\"required email sm-form-control\"> </div> <div class=\"col_half\"> <label for=\"template-jobform-age\">Age <small>*</small></label> <input type=\"text\" name=\"template-jobform-age\" id=\"template-jobform-age\" value=\"\" size=\"22\" tabindex=\"4\" class=\"sm-form-control required\"> </div> <div class=\"col_half col_last\"> <label for=\"template-jobform-city\">City <small>*</small></label> <input type=\"text\" name=\"template-jobform-city\" id=\"template-jobform-city\" value=\"\" size=\"22\" tabindex=\"5\" class=\"sm-form-control required\"> </div> <div class=\"clear\"></div> <div class=\"col_full\"> <label for=\"template-jobform-service\">Position <small>*</small></label> <select name=\"template-jobform-position\" id=\"template-jobform-position\" tabindex=\"9\" class=\"sm-form-control required\"> <option value=\"\">-- Select Position --</option> <option value=\"Senior Python Developer\">Senior Python Developer</option> <option value=\"Design Analyst\">Design Analyst</option> <option value=\"Head of UX and Design\">Head of UX and Design</option> <option value=\"Web &amp; Visual Designer (Marketing)\">Web &amp; Visual Designer (Marketing)</option> </select> </div> <div class=\"col_half\"> <label for=\"template-jobform-salary\">Expected Salary</label> <input type=\"text\" name=\"template-jobform-salary\" id=\"template-jobform-salary\" value=\"\" size=\"22\" tabindex=\"6\" class=\"sm-form-control\"> </div> <div class=\"col_half col_last\"> <label for=\"template-jobform-time\">Start Date</label> <input type=\"text\" name=\"template-jobform-start\" id=\"template-jobform-start\" value=\"\" size=\"22\" tabindex=\"7\" class=\"sm-form-control\"> </div> <div class=\"clear\"></div> <div class=\"col_full\"> <label for=\"template-jobform-website\">Website (if any)</label> <input type=\"text\" name=\"template-jobform-website\" id=\"template-jobform-website\" value=\"\" size=\"22\" tabindex=\"8\" class=\"sm-form-control\"> </div> <div class=\"col_full\"> <label for=\"template-jobform-experience\">Experience (optional)</label> <textarea name=\"template-jobform-experience\" id=\"template-jobform-experience\" rows=\"3\" tabindex=\"10\" class=\"sm-form-control\"></textarea> </div> <div class=\"col_full\"> <label for=\"template-jobform-application\">Application <small>*</small></label> <textarea name=\"template-jobform-application\" id=\"template-jobform-application\" rows=\"6\" tabindex=\"11\" class=\"sm-form-control required\"></textarea> </div> <div class=\"col_full hidden\"> <input type=\"text\" id=\"template-jobform-botcheck\" name=\"template-jobform-botcheck\" value=\"\" class=\"sm-form-control\"> </div> <div class=\"col_full\"> <button class=\"button button-3d button-large btn-block nomargin\" name=\"template-jobform-apply\" type=\"submit\" value=\"apply\">Send Application</button> </div> </form> </div> </div> </div> </div> </section><!-- #content end --> "
  );


  $templateCache.put('views/contact.html',
    "<section style=\"background:#444\" id=\"page-title\"> </section> <div class=\"container\"> <h1 style=\"padding:20px\" class=\"text-center\">CONTACT US</h1> <div style=\"margin-bottom:50px\" class=\"clearfix\"> <div class=\"pull-left\" style=\"width:60%; padding-right:10px\"> <h4 style=\"text-transform:uppercase\">Talk to us we would love to help you plan your trip</h4> <div style=\"padding:30px 0 0 0; text-transform:capitalize\" class=\"col-sm-12\"> <button style=\"margin:0px !important; width:50%; height:50px\" ui-sref=\"form\" class=\"button buttonPrimary\">Fill out 2 minute Questionnaire</button> <div>(We Recommend This)</div> </div> <div style=\"padding:30px 0 0 0; text-transform:capitalize\" class=\"col-sm-12\"> <button style=\"margin:0px !important; width:50%; height:50px\" id=\"{{inquireSubmit}}\" class=\"button buttonPrimary\">Or fill a quick inquiry form</button> <div>(If you're in a hurry')</div> </div> </div> <div class=\"pull-right\" style=\"width:40%\"> <ng-map scrollwheel=\"false\" center=\"[28.5246, 77.2066]\" zoom=\"12\"> <marker position=\"28.5246, 77.2066\" title=\"WanderWagon\"></marker> </ng-map> </div> </div> <!-- Contact Info\n" +
    "					============================================= --> <div class=\"row clear-bottommargin\"> <div class=\"col-md-3 col-sm-6 bottommargin clearfix\"> <div class=\"feature-box fbox-center fbox-bg fbox-plain\"> <div class=\"fbox-icon\"> <a><i class=\"icon-map-marker2\"></i></a> </div> <h3>Our Headquarters<span class=\"subtitle\">Saket, Delhi</span></h3> </div> </div> <div class=\"col-md-3 col-sm-6 bottommargin clearfix\"> <div class=\"feature-box fbox-center fbox-bg fbox-plain\"> <div class=\"fbox-icon\"> <a><i class=\"icon-phone3\"></i></a> </div> <h3>Speak to Us<span class=\"subtitle\">(+91)11 6543 4303</span></h3> </div> </div> <div class=\"col-md-3 col-sm-6 bottommargin clearfix\"> <div class=\"feature-box fbox-center fbox-bg fbox-plain\"> <div class=\"fbox-icon\"> <a style=\"cursor:pointer\" ng-click=\"openFacebook()\"><i class=\"icon-facebook\"></i></a> </div> <h3>Like us<span class=\"subtitle\">WanderWagon</span></h3> </div> </div> <div class=\"col-md-3 col-sm-6 bottommargin clearfix\"> <div class=\"feature-box fbox-center fbox-bg fbox-plain\"> <div class=\"fbox-icon\"> <a><i class=\"icon-email\"></i></a> </div> <h3>Email us<span class=\"subtitle\">contact@wanderwagon.com</span></h3> </div> </div> </div><!-- Contact Info End --> <h3 style=\"padding-top:20px\">MEET US!</h3> <h5>If Delhi is on your itinerary, feel free to drop in! <br> We would love to take you out for a stroll in the capital! </h5> <h3 style=\"padding-top:20px\">OUR ADDRESS</h3> <h5>D-169, II Floor, Freedom Fighters Enclave, Ignou Road <br> Saket, New Delhi - 110068 </h5> </div> "
  );


  $templateCache.put('views/destination-detail.html',
    "<div style=\"background-color:#000;background-image: url('images/destination-detail-bg.jpg');background-size: cover; height:100vh\"> <div class=\"container clearfix\"> <div class=\"center-block slider-caption-center\"> <h2 class=\"text-center\" style=\"font-size:68px;letter-spacing:0px;font-weight:600;color:#fff;margin-top:200px\" data-caption-animate=\"fadeInUp\">Dharamshala</h2> <p style=\"font-size:3rem; font-style:italic; color:#fff\" class=\"text-center\"> is a stunning tapestry</p> </div> </div> </div> <!-- Header\n" +
    "		============================================= --> <header style=\"height:50px\" sticky id=\"header\" class=\"full-header\"> <div class=\"container clearfix\"> <!-- Primary Navigation\n" +
    "					============================================= --> <nav style=\"margin-left:30%; margin-right:20%\" id=\"primary-menu\" class=\"style-2\"> <ul class=\"one-page-menu\"> <li> <a ng-click=\"gotoContent('about')\" style=\"cursor:pointer;color:#444;padding:10px 15px\"> <div>About</div> </a> </li> <li> <a ng-click=\"gotoContent('howToReach')\" style=\"cursor:pointer;color:#444;padding:10px 15px\"> <div>How to reach</div> </a> </li> <li> <a ng-click=\"gotoContent('places')\" style=\"cursor:pointer;color:#444;padding:10px 15px\"> <div>Places to visit</div> </a> </li> <li> <a ng-click=\"gotoContent('activities')\" style=\"cursor:pointer;color:#444;padding:10px 15px\"> <div>Activities</div> </a> </li> </ul> </nav> <!-- #primary-menu end --> </div> </header> <!-- #header end --> <section id=\"about\"> <div class=\"container clearfix\" style=\"height:100vh\"> <div style=\"margin-top:100px\"> <h2 style=\"text-align:center;margin:8rem 0 8rem 0;letter-spacing:-0.45px;line-height:1;font-weight:300;font-size:3.8rem\"> About <div style=\"display:block;height:2px;width:30px;background:#dc221a;margin-left:auto;margin-right:auto;margin-bottom:0;margin-top:15px\"> </div> </h2> </div> <div class=\"center-block custom-para pull-left\" style=\"width:60%\"> <p>Nullam id dolor id nibh ultricies vehicula ut id elit. <a href=\"#\">Curabitur blandit tempus porttitor</a>. Integer posuere erat a ante venenatis dapibus posuere velit aliquet. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Vestibulum id ligula porta felis euismod semper. Donec id elit non mi porta gravida at eget metus. Vestibulum id ligula porta felis euismod semper.</p> <p>Integer posuere erat a ante venenatis dapibus posuere velit aliquet. Cras mattis consectetur purus sit amet fermentum. Donec id elit non mi porta gravida at eget metus.</p> </div> <div class=\"center-block pull-right\" style=\"width:40%; border:1px solid #F5F5F5; border-radius:2%\"> <h2 style=\"text-align:center;margin:2rem 0 2rem 0;letter-spacing:-0.45px;line-height:1;font-weight:300;font-size:1.8rem\"> Overview <div style=\"display:block;height:2px;width:30px;background:#dc221a;margin-left:auto;margin-right:auto;margin-bottom:0;margin-top:15px\"> </div> </h2> <div style=\"margin: 30px\"> <h5 class=\"pull-left\"><i style=\"padding-right:10px\" class=\"icon-calendar i-alt\"></i>Best Time To Visit</h5> <p style=\"margin-right: 40px\" class=\"pull-right\">All Seasons</p> </div> <span class=\"clearfix\"></span> <div style=\"margin: 0 30px 30px 30px\"> <h5 class=\"pull-left\"><i style=\"padding-right:10px\" class=\"icon-calendar i-alt\"></i>Days Required</h5> <p style=\"margin-right: 40px\" class=\"pull-right\">4-5 Days</p> </div> <span class=\"clearfix\"></span> <div style=\"margin: 0 30px 30px 30px\"> <h5 class=\"pull-left\"><i style=\"padding-right:10px\" class=\"icon-folder i-alt\"></i>Category</h5> <p style=\"margin-right: 40px\" class=\"pull-right\">Hills</p> </div> </div> </div> </section> <section id=\"howToReach\"> <div class=\"container clearfix\" style=\"height:100vh\"> <div style=\"margin-top:100px\"> <h2 style=\"text-align:center;margin:8rem 0 8rem 0;letter-spacing:-0.45px;line-height:1;font-weight:300;font-size:3.8rem\"> How to reach <div style=\"display:block;height:2px;width:30px;background:#dc221a;margin-left:auto;margin-right:auto;margin-bottom:0;margin-top:15px\"> </div> </h2> </div> <div class=\"center-block\" style=\"width:700px\"> <div class=\"feature-box\"> <div class=\"custom-fbox-icon\"> <i class=\"icon-plane i-alt\"></i> </div> <span style=\"font:bold; font-size:20px\">Airport</span> <p>Powerful Layout with Responsive functionality that can be adapted to any screen size. </p> </div> <div class=\"feature-box\"> <div class=\"custom-fbox-icon\"> <i class=\"icon-train i-alt\"></i> </div> <span style=\"font:bold; font-size:20px\">Railways</span> <p>An overnight train journey is a good option to reach Dharamshala. The nearest major railway station is at Pathankot, 85 kilometres away. There are numerous trains that go to Jammu and Kashmir that stop by in Pathankot. </p> </div> <div class=\"feature-box\"> <div class=\"custom-fbox-icon\"> <i class=\"icon-bus i-alt\"></i> </div> <span style=\"font:bold; font-size:20px\">Bus</span> <p>You can take a taxi or bus from Pathankot to reach Dharamshala. </p> </div> </div> </div> </section> <section id=\"places\"> <div class=\"container clearfix\" style=\"height:100vh\"> <div class=\"topmargin\"> <h2 style=\"text-align:center;margin:6rem 0 2rem 0;letter-spacing:-0.45px;line-height:1;font-weight:300;font-size:3.8rem\"> Places to visit <div style=\"display:block;height:2px;width:30px;background:#dc221a;margin-left:auto;margin-right:auto;margin-bottom:0;margin-top:15px\"> </div> </h2> </div> <div class=\"row\"> <div class=\"row\"> <div class=\"col-md-3\"> <!-- Controls --> <div class=\"controls hidden-xs\"> <a class=\"icon-angle-left btn\" href=\"#carousel-example-generic\" ng-non-bindable data-slide=\"prev\"></a> <a class=\"icon-angle-right btn\" href=\"#carousel-example-generic\" ng-non-bindable data-slide=\"next\"></a> </div> </div> </div> <div id=\"carousel-example-generic\" class=\"carousel slide hidden-xs\" data-ride=\"carousel\"> <!-- Wrapper for slides --> <div class=\"carousel-inner\"> <div class=\"item active\"> <div class=\"row\"> <div class=\"col-sm-4\"> <div ng-click=\"heading1.isOpen = !heading1.isOpen\" style=\"cursor:pointer\" class=\"col-item\"> <div style=\"width:350px; height:400px\" class=\"photo\"> <img class=\"cover\" ng-src=\"{{activities[0].imageUrl}}\" alt=\"a\"> </div> <div class=\"info\"> <h5 style=\"font-size:1.6rem\" class=\"text-center\"> {{activities[0].text}}</h5> </div> </div> </div> <div class=\"col-sm-4\"> <div ng-click=\"heading1.isOpen = !heading1.isOpen\" style=\"cursor:pointer\" class=\"col-item\"> <div style=\"width:350px; height:400px\" class=\"photo\"> <img ng-src=\"{{activities[1].imageUrl}}\" class=\"img-responsive\" alt=\"a\"> </div> <div class=\"info\"> <h5 style=\"font-size:1.6rem\" class=\"text-center\"> {{activities[1].text}}</h5> </div> </div> </div> <div class=\"col-sm-4\"> <div ng-click=\"heading1.isOpen = !heading1.isOpen\" style=\"cursor:pointer\" class=\"col-item\"> <div style=\"width:350px; height:400px\" class=\"photo\"> <img ng-src=\"{{activities[2].imageUrl}}\" class=\"img-responsive\" alt=\"a\"> </div> <div class=\"info\"> <h5 style=\"font-size:1.6rem\" class=\"text-center\"> {{activities[2].text}}</h5> </div> </div> </div> </div> </div> <div class=\"item\"> <div class=\"row\"> <div class=\"col-sm-4\"> <div ng-click=\"heading1.isOpen = !heading1.isOpen\" style=\"cursor:pointer\" class=\"col-item\"> <div style=\"width:350px; height:400px\" class=\"photo\"> <img ng-src=\"{{activities[3].imageUrl}}\" class=\"img-responsive\" alt=\"a\"> </div> <div class=\"info\"> <h5 style=\"font-size:1.6rem\" class=\"text-center\"> {{activities[3].text}}</h5> </div> </div> </div> <div class=\"col-sm-4\"> <div ng-click=\"heading1.isOpen = !heading1.isOpen\" style=\"cursor:pointer\" class=\"col-item\"> <div style=\"width:350px; height:400px\" class=\"photo\"> <img ng-src=\"{{activities[4].imageUrl}}\" class=\"img-responsive\" alt=\"a\"> </div> <div class=\"info\"> <h5 style=\"font-size:1.6rem\" class=\"text-center\"> {{activities[4].text}}</h5> </div> </div> </div> <div class=\"col-sm-4\"> <div ng-click=\"heading1.isOpen = !heading1.isOpen\" style=\"cursor:pointer\" class=\"col-item\"> <div style=\"width:350px; height:400px\" class=\"photo\"> <img ng-src=\"{{activities[5].imageUrl}}\" class=\"img-responsive\" alt=\"a\"> </div> <div class=\"info\"> <h5 style=\"font-size:1.6rem\" class=\"text-center\"> {{activities[5].text}}</h5> </div> </div> </div> </div> </div> </div> </div> <uib-accordion> <uib-accordion-group is-open=\"heading1.isOpen\"> <div class=\"center-block\" style=\"width:80%\"> <div class=\"topmargin\"> <h2 style=\"text-align:center;margin:6rem 0 2rem 0;letter-spacing:-0.45px;line-height:1;font-weight:300;font-size:3.8rem\"> Name <div style=\"display:block;height:2px;width:30px;background:#dc221a;margin-left:auto;margin-right:auto;margin-bottom:0;margin-top:15px\"> </div> </h2> </div> <div class=\"pull-left\" style=\"width:30%\"> <a href=\"images/blog3.jpg\"><img height=\"350px\" width=\"100%\" src=\"images/blog3.jpg\" alt=\"Standard Post with Image\"></a> </div> <div class=\"pull-right\" style=\"width:70%; padding-left:10px\"> <h4 style=\"line-height:1.2142857142857142;font-size:18px;font-weight:200;color:#2c3643\"> What is it.....</h4> <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cupiditate, asperiores quod est tenetur in. Eligendi, deserunt, blanditiis est quisquam doloribus voluptate id aperiam ea ipsum magni aut perspiciatis rem voluptatibus officia eos rerum. </p> <h4 style=\"line-height:1.2142857142857142;font-size:18px;font-weight:200;color:#2c3643\"> Overview</h4> <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cupiditate, asperiores quod est tenetur in. Eligendi, deserunt. </p> <h4 style=\"line-height:1.2142857142857142;font-size:18px;font-weight:200;color:#2c3643\"> How to reach</h4> <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cupiditate, asperiores quod est tenetur in. Eligendi, deserunt. </p> <div> <h4 class=\"pull-left\" style=\"line-height:1.2142857142857142;font-size:18px;font-weight:200;color:#2c3643\"> Timings - <span>8am - 6pm</span></h4> <h4 class=\"pull-right\" style=\"line-height:1.2142857142857142;font-size:18px;font-weight:200;color:#2c3643\"> Pricing - <span>₹7999</span></h4> </div> </div> </div> </uib-accordion-group> </uib-accordion> </div> </div> </section> <section id=\"activities\"> <div class=\"container clearfix\" style=\"height:100vh\"> <div class=\"topmargin\"> <h2 style=\"text-align:center;margin:6rem 0 2rem 0;letter-spacing:-0.45px;line-height:1;font-weight:300;font-size:3.8rem\"> Activities <div style=\"display:block;height:2px;width:30px;background:#dc221a;margin-left:auto;margin-right:auto;margin-bottom:0;margin-top:15px\"> </div> </h2> </div> <div class=\"row\"> <div class=\"row\"> <div class=\"col-md-3\"> <!-- Controls --> <div class=\"controls hidden-xs\"> <a class=\"icon-angle-left btn\" href=\"#carousel-example-generic1\" ng-non-bindable data-slide=\"prev\"></a> <a class=\"icon-angle-right btn\" href=\"#carousel-example-generic1\" ng-non-bindable data-slide=\"next\"></a> </div> </div> </div> <div id=\"carousel-example-generic1\" class=\"carousel slide hidden-xs\" data-ride=\"carousel\"> <!-- Wrapper for slides --> <div class=\"carousel-inner\"> <div class=\"item active\"> <div class=\"row\"> <div class=\"col-sm-4\"> <div ng-click=\"heading2.isOpen = !heading2.isOpen\" style=\"cursor:pointer\" class=\"col-item\"> <div style=\"width:350px; height:400px\" class=\"photo\"> <img ng-src=\"{{activities[0].imageUrl}}\" class=\"img-responsive\" alt=\"a\"> </div> <div class=\"info\"> <h5 style=\"font-size:1.6rem\" class=\"text-center\"> {{activities[0].text}}</h5> </div> </div> </div> <div class=\"col-sm-4\"> <div ng-click=\"heading2.isOpen = !heading2.isOpen\" style=\"cursor:pointer\" class=\"col-item\"> <div style=\"width:350px; height:400px\" class=\"photo\"> <img ng-src=\"{{activities[1].imageUrl}}\" class=\"img-responsive\" alt=\"a\"> </div> <div class=\"info\"> <h5 style=\"font-size:1.6rem\" class=\"text-center\"> {{activities[1].text}}</h5> </div> </div> </div> <div class=\"col-sm-4\"> <div ng-click=\"heading2.isOpen = !heading2.isOpen\" style=\"cursor:pointer\" class=\"col-item\"> <div style=\"width:350px; height:400px\" class=\"photo\"> <img ng-src=\"{{activities[2].imageUrl}}\" class=\"img-responsive\" alt=\"a\"> </div> <div class=\"info\"> <h5 style=\"font-size:1.6rem\" class=\"text-center\"> {{activities[2].text}}</h5> </div> </div> </div> </div> </div> <div class=\"item\"> <div class=\"row\"> <div class=\"col-sm-4\"> <div ng-click=\"heading2.isOpen = !heading2.isOpen\" style=\"cursor:pointer\" class=\"col-item\"> <div style=\"width:350px; height:400px\" class=\"photo\"> <img ng-src=\"{{activities[3].imageUrl}}\" class=\"img-responsive\" alt=\"a\"> </div> <div class=\"info\"> <h5 style=\"font-size:1.6rem\" class=\"text-center\"> {{activities[3].text}}</h5> </div> </div> </div> <div class=\"col-sm-4\"> <div ng-click=\"heading2.isOpen = !heading2.isOpen\" style=\"cursor:pointer\" class=\"col-item\"> <div style=\"width:350px; height:400px\" class=\"photo\"> <img ng-src=\"{{activities[4].imageUrl}}\" class=\"img-responsive\" alt=\"a\"> </div> <div class=\"info\"> <h5 style=\"font-size:1.6rem\" class=\"text-center\"> {{activities[4].text}}</h5> </div> </div> </div> <div class=\"col-sm-4\"> <div ng-click=\"heading2.isOpen = !heading2.isOpen\" style=\"cursor:pointer\" class=\"col-item\"> <div style=\"width:350px; height:400px\" class=\"photo\"> <img ng-src=\"{{activities[5].imageUrl}}\" class=\"img-responsive\" alt=\"a\"> </div> <div class=\"info\"> <h5 style=\"font-size:1.6rem\" class=\"text-center\"> {{activities[5].text}}</h5> </div> </div> </div> </div> </div> </div> </div> <uib-accordion> <uib-accordion-group is-open=\"heading2.isOpen\"> <div class=\"center-block\" style=\"width:80%\"> <div class=\"topmargin\"> <h2 style=\"text-align:center;margin:6rem 0 2rem 0;letter-spacing:-0.45px;line-height:1;font-weight:300;font-size:3.8rem\"> Name <div style=\"display:block;height:2px;width:30px;background:#dc221a;margin-left:auto;margin-right:auto;margin-bottom:0;margin-top:15px\"> </div> </h2> </div> <div class=\"pull-left\" style=\"width:30%\"> <a href=\"images/blog3.jpg\"><img height=\"350px\" width=\"100%\" src=\"images/blog3.jpg\" alt=\"Standard Post with Image\"></a> </div> <div class=\"pull-right\" style=\"width:70%; padding-left:10px\"> <h4 style=\"line-height:1.2142857142857142;font-size:18px;font-weight:200;color:#2c3643\"> What is it.....</h4> <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cupiditate, asperiores quod est tenetur in. Eligendi, deserunt, blanditiis est quisquam doloribus voluptate id aperiam ea ipsum magni aut perspiciatis rem voluptatibus officia eos rerum deleniti quae nihil facilis repellat atque vitae voluptatem libero at eveniet veritatis ab facere. </p> <h4 style=\"line-height:1.2142857142857142;font-size:18px;font-weight:200;color:#2c3643\"> Place Of Conduct</h4> <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cupiditate, asperiores quod est tenetur in. Eligendi, deserunt. </p> <h4 style=\"line-height:1.2142857142857142;font-size:18px;font-weight:200;color:#2c3643\"> Preferred Timings -</h4> <h4 style=\"line-height:1.2142857142857142;font-size:18px;font-weight:200;color:#2c3643\"> Duration -</h4> <h4 style=\"line-height:1.2142857142857142;font-size:18px;font-weight:200;color:#2c3643\"> Pricing -</h4> </div> </div> </uib-accordion-group> </uib-accordion> </div> </div> </section> <section> <div class=\"topmargin\"> <h2 style=\"text-align:center;margin:8rem 0 8rem 0;letter-spacing:-0.45px;line-height:1;font-weight:300;font-size:3.8rem\"> Why we love Destination ? <div style=\"display:block;height:2px;width:30px;background:#dc221a;margin-left:auto;margin-right:auto;margin-bottom:0;margin-top:15px\"> </div> </h2> </div> <p style=\"color: #67747c;\n" +
    "    font-family: Benton Sans,Helvetica Neue,Helvetica,Arial,sans-serif;\n" +
    "    font-size: 1.8rem;\n" +
    "    font-style: italic;\n" +
    "    line-height: 1.8;\n" +
    "    margin: 0 auto 5.5rem;\n" +
    "    text-align: center;\n" +
    "    width:70%\"> \" Known for its old temple, a fresh water spring, water falls and slate quarries. Bhagsunag can be approached by road. The Bhagsu fall is one of the main attractions of Mcleodganj. You can take a dip in the chilly water of fall....\"<a style=\"cursor:pointer; margin-left:5px\" class=\"read-more\">READ MORE <span style=\"font-size:10px\" class=\"icon-chevron-right\"></span></a> </p> <div class=\"center-block\" style=\"width:70%\"> <h2 style=\"border:1px solid #F5F5F5; padding:5px; text-align:center;margin:8rem 0 8rem 0;letter-spacing:-0.45px;line-height:1;font-weight:300;font-size:3.8rem\"> Loved it ? We got plans for you ! </h2> </div> <div class=\"container\"> <div class=\"center-block\" style=\"width:70%\"> <h2 style=\"text-align:center;margin:8rem 0 2rem 0;letter-spacing:-0.45px;line-height:1;font-weight:300;font-size:3.8rem\"> After Dharamshala, Where Next ? </h2> </div> <div class=\"row\"> <div class=\"row\"> <div class=\"col-md-3\"> <!-- Controls --> <div class=\"controls hidden-xs\"> <a class=\"icon-angle-left btn\" href=\"#carousel-example-generic1\" ng-non-bindable data-slide=\"prev\"></a> <a class=\"icon-angle-right btn\" href=\"#carousel-example-generic1\" ng-non-bindable data-slide=\"next\"></a> </div> </div> </div> <div id=\"carousel-example-generic1\" class=\"carousel slide hidden-xs\" data-ride=\"carousel\"> <!-- Wrapper for slides --> <div class=\"carousel-inner\"> <div class=\"item active\"> <div class=\"row\"> <div class=\"col-sm-4\"> <div ng-click=\"heading1.isOpen = !heading1.isOpen\" style=\"cursor:pointer\" class=\"col-item\"> <div style=\"width:350px; height:400px\" class=\"photo\"> <img ng-src=\"{{activities[0].imageUrl}}\" class=\"img-responsive\" alt=\"a\"> </div> <div class=\"info\"> <h5 style=\"font-size:1.6rem\" class=\"text-center\"> {{activities[0].text}}</h5> </div> </div> </div> <div class=\"col-sm-4\"> <div ng-click=\"heading1.isOpen = !heading1.isOpen\" style=\"cursor:pointer\" class=\"col-item\"> <div style=\"width:350px; height:400px\" class=\"photo\"> <img ng-src=\"{{activities[1].imageUrl}}\" class=\"img-responsive\" alt=\"a\"> </div> <div class=\"info\"> <h5 style=\"font-size:1.6rem\" class=\"text-center\"> {{activities[1].text}}</h5> </div> </div> </div> <div class=\"col-sm-4\"> <div ng-click=\"heading1.isOpen = !heading1.isOpen\" style=\"cursor:pointer\" class=\"col-item\"> <div style=\"width:350px; height:400px\" class=\"photo\"> <img ng-src=\"{{activities[2].imageUrl}}\" class=\"img-responsive\" alt=\"a\"> </div> <div class=\"info\"> <h5 style=\"font-size:1.6rem\" class=\"text-center\"> {{activities[2].text}}</h5> </div> </div> </div> </div> </div> <div class=\"item\"> <div class=\"row\"> <div class=\"col-sm-4\"> <div ng-click=\"heading1.isOpen = !heading1.isOpen\" style=\"cursor:pointer\" class=\"col-item\"> <div style=\"width:350px; height:400px\" class=\"photo\"> <img ng-src=\"{{activities[3].imageUrl}}\" class=\"img-responsive\" alt=\"a\"> </div> <div class=\"info\"> <h5 style=\"font-size:1.6rem\" class=\"text-center\"> {{activities[3].text}}</h5> </div> </div> </div> <div class=\"col-sm-4\"> <div ng-click=\"heading1.isOpen = !heading1.isOpen\" style=\"cursor:pointer\" class=\"col-item\"> <div style=\"width:350px; height:400px\" class=\"photo\"> <img ng-src=\"{{activities[4].imageUrl}}\" class=\"img-responsive\" alt=\"a\"> </div> <div class=\"info\"> <h5 style=\"font-size:1.6rem\" class=\"text-center\"> {{activities[4].text}}</h5> </div> </div> </div> <div class=\"col-sm-4\"> <div ng-click=\"heading1.isOpen = !heading1.isOpen\" style=\"cursor:pointer\" class=\"col-item\"> <div style=\"width:350px; height:400px\" class=\"photo\"> <img ng-src=\"{{activities[5].imageUrl}}\" class=\"img-responsive\" alt=\"a\"> </div> <div class=\"info\"> <h5 style=\"font-size:1.6rem\" class=\"text-center\"> {{activities[5].text}}</h5> </div> </div> </div> </div> </div> </div> </div> </div> </div> </section> "
  );


  $templateCache.put('views/destination.html',
    "<div style=\"background-color:#000;background-image: url('images/destination-bg.jpg');background-size: cover; height:100vh\"> <div class=\"container clearfix\"> <div class=\"slider-caption-center\"> <h2 style=\"font-size:48px;letter-spacing:0px;font-weight:600;color:#fff;margin-top:200px\" data-caption-animate=\"fadeInUp\"> Top 10 Places To Visit In Dharamshala</h2> <a ui-sref=\"blog.list\" class=\"button button-border button-white button-light button-large button-rounded tright nomargin\"> <span>Read More</span> <i class=\"icon-angle-right\"></i></a> </div> </div> </div> <!-- Content\n" +
    "		============================================= --> <section id=\"content\"> <div class=\"topmargin\"> <h2 style=\"text-align:center;margin-bottom:4rem;letter-spacing:-0.45px;line-height:1;font-weight:300;font-size:3.8rem\"> Destinations <div style=\"display:block;height:2px;width:30px;background:#dc221a;margin-left:auto;margin-right:auto;margin-bottom:0;margin-top:15px\"> </div> </h2> </div> <div class=\"container\"> <div class=\"row row-centered\"> <div style=\"margin-bottom:10px\" ng-repeat=\"destination in destinations\" class=\"col-xs-4 col-centered col-fixed\"> <div class=\"item\"> <div style=\"cursor:pointer\" ui-sref=\"destination.detail({id: destination.id})\" class=\"content\"> <img width=\"380\" height=\"255\" ng-src=\"{{destination.imageUrl}}\"> <h5 style=\"font-size:1.6rem\" class=\"text-center\"> {{destination.name}}</h5> </div> </div> </div> </div> </div> </section> "
  );


  $templateCache.put('views/faq.html',
    "<section style=\"background:#444\" id=\"page-title\"> </section> <section id=\"page-title\"> <div class=\"container clearfix\"> <h1>FAQs</h1> <span>All your Questions answered in one place</span> </div> </section> <!-- #page-title end --> <!-- Content\n" +
    "		============================================= --> <section id=\"content\"> <div class=\"content-wrap\"> <div class=\"container clearfix\"> <!-- Post Content\n" +
    "					============================================= --> <div class=\"postcontent nobottommargin clearfix\"> <uib-tabset active=\"activeJustified\" justified=\"true\"> <uib-tab index=\"0\" heading=\"Payment\"> <div class=\"tab-content clearfix\"> <div class=\"toggle faq faq-marketplace faq-authors\"> <div ng-click=\"payment1.isOpen = !payment1.isOpen\" class=\"togglet\"><i class=\"toggle-closed icon-question-sign\"></i> <i class=\"toggle-open icon-question-sign\"></i>How do I become an author?</div> <uib-accordion> <uib-accordion-group is-open=\"payment1.isOpen\"> <div class=\"togglec\">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Assumenda, dolorum, vero ipsum molestiae minima odio quo voluptate illum excepturi quam cum voluptates doloribus quae nisi tempore necessitatibus dolores ducimus enim libero eaque explicabo suscipit animi at quaerat aliquid ex expedita perspiciatis? Saepe, aperiam, nam unde quas beatae vero vitae nulla.</div> </uib-accordion-group> </uib-accordion> </div> <div class=\"toggle faq faq-marketplace faq-authors\"> <div ng-click=\"payment2.isOpen = !payment2.isOpen\" class=\"togglet\"><i class=\"toggle-closed icon-question-sign\"></i> <i class=\"toggle-open icon-question-sign\"></i>How do I become an author?</div> <uib-accordion> <uib-accordion-group is-open=\"payment2.isOpen\"> <div class=\"togglec\">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Assumenda, dolorum, vero ipsum molestiae minima odio quo voluptate illum excepturi quam cum voluptates doloribus quae nisi tempore necessitatibus dolores ducimus enim libero eaque explicabo suscipit animi at quaerat aliquid ex expedita perspiciatis? Saepe, aperiam, nam unde quas beatae vero vitae nulla.</div> </uib-accordion-group> </uib-accordion> </div> </div> </uib-tab> <uib-tab index=\"1\" heading=\"Booking & Cancellation\"> <div class=\"tab-content clearfix\"> <div class=\"tab-content clearfix\"> <div class=\"toggle faq faq-marketplace faq-authors\"> <div ng-click=\"booking1.isOpen = !booking1.isOpen\" class=\"togglet\"><i class=\"toggle-closed icon-question-sign\"></i> <i class=\"toggle-open icon-question-sign\"></i>How do I become an author?</div> <uib-accordion> <uib-accordion-group is-open=\"booking1.isOpen\"> <div class=\"togglec\">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Assumenda, dolorum, vero ipsum molestiae minima odio quo voluptate illum excepturi quam cum voluptates doloribus quae nisi tempore necessitatibus dolores ducimus enim libero eaque explicabo suscipit animi at quaerat aliquid ex expedita perspiciatis? Saepe, aperiam, nam unde quas beatae vero vitae nulla.</div> </uib-accordion-group> </uib-accordion> </div> <div class=\"toggle faq faq-marketplace faq-authors\"> <div ng-click=\"booking2.isOpen = !booking2.isOpen\" class=\"togglet\"><i class=\"toggle-closed icon-question-sign\"></i> <i class=\"toggle-open icon-question-sign\"></i>How do I become an author?</div> <uib-accordion> <uib-accordion-group is-open=\"booking2.isOpen\"> <div class=\"togglec\">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Assumenda, dolorum, vero ipsum molestiae minima odio quo voluptate illum excepturi quam cum voluptates doloribus quae nisi tempore necessitatibus dolores ducimus enim libero eaque explicabo suscipit animi at quaerat aliquid ex expedita perspiciatis? Saepe, aperiam, nam unde quas beatae vero vitae nulla.</div> </uib-accordion-group> </uib-accordion> </div> </div> </div> </uib-tab> <uib-tab index=\"2\" heading=\"Account & Login\"> <div class=\"tab-content clearfix\"> </div> </uib-tab> <uib-tab index=\"3\" heading=\"Support & Feedback\"> <div class=\"tab-content clearfix\"> </div> </uib-tab> </uib-tabset> </div> <!-- .postcontent end --> </div> </div> </section> "
  );


  $templateCache.put('views/home.html',
    "<div style=\"background-color:#000;background-image: url('images/home-bg.jpg');background-size: cover; height:100vh\"> <div class=\"container clearfix\"> <div class=\"slider-caption-center\"> <h2 class=\"text-center\" style=\"margin-bottom:0px;font-size:32px;letter-spacing:1px;font-weight:600;color:#fff;margin-top:300px\"> WANDERWAGON MAKES YOUR GROUP TRIP</h2> <h2 class=\"text-center\" style=\"margin-bottom:0px;font-size:32px;letter-spacing:1px;font-weight:600;color:#fff\"> {{changingText}}</h2> <p style=\"font-size:2.5rem; margin-bottom:50px; color:#fff\" class=\"text-center\"> \"Wanderwagon is the perfect partner to plan that much awaited trip with your buddies\" </p> <a ng-click=\"gotoTravelInspiration()\" class=\"custom-button center-block text-center\"> <span>Let's Wander</span> <i style=\"margin-left:10px\" class=\"icon-angle-right\"></i></a> </div> </div> </div> <!--<section  style=\"background-image: url('images/slider1.jpg'); \n" +
    "background-size:cover; background-repeat:no-repeat; background-position: center center; height:680px;\" class=\"swiper_wrapper full-screen clearfix\">\n" +
    " \n" +
    "</section>--> <!--<section class=\"wrap\">\n" +
    "  <img src=\"images/slider2.jpg\" alt=\"Blog Single\" width=\"1366\" height=\"600\">\n" +
    "  <p style=\"line-height: 62px;\n" +
    "    border-width: 0px;\n" +
    "    font-weight:700;\n" +
    "    letter-spacing: -1px;\n" +
    "    font-size: 41px;\n" +
    "    font-family: 'Raleway', sans-serif;\" class=\"text_over_image_1\">WANDERWAGON MAKES YOUR TRIP MEMORABLE</p>\n" +
    "  <div style=\"width:300px;\" class=\"text_over_image\">\n" +
    "     \n" +
    "\n" +
    "<!--    \n" +
    "  </div>\n" +
    "</section>--> <section id=\"content\" class=\"container\"> <div class=\"topmargin\" style=\"height:100vh\"> <h2 class=\"paul-title\"> Travel Inspiration <div style=\"display:block;height:2px;width:30px;background:#dc221a;margin-left:auto;margin-right:auto;margin-bottom:0;margin-top:15px\"> </div> </h2> <div class=\"row\"> <div id=\"carousel-example-generic\" class=\"carousel slide hidden-xs\" data-ride=\"carousel\"> <a style=\"background-color: rgb(255, 255, 255);\n" +
    "    border: 0px;\n" +
    "    border-radius: 50%;\n" +
    "    cursor: pointer;\n" +
    "    display: block;\n" +
    "    font-size: 9px;\n" +
    "    line-height: 1;\n" +
    "    transition: color 400ms, box-shadow 400ms;\n" +
    "    height: 4.44444em;\n" +
    "    width: 4.44444em;\n" +
    "    box-shadow: rgba(0, 0, 0, 0.0980392) 0px 0.222222em 0.888889em;\n" +
    "    position: absolute;\n" +
    "    bottom: 0px;\n" +
    "    margin-bottom: auto;\n" +
    "    margin-top: auto;\n" +
    "    top: 0px;\n" +
    "    z-index: 20;\n" +
    "    left: -2.22222em\" class=\"btn\" href=\"#carousel-example-generic\" data-slide=\"prev\"> <i style=\"margin:7px 0 0 10px; font-size:15px; font-weight:600\" class=\"icon-angle-left\"></i> </a> <a style=\"background-color: rgb(255, 255, 255);\n" +
    "    border: 0px;\n" +
    "    border-radius: 50%;\n" +
    "    cursor: pointer;\n" +
    "    display: block;\n" +
    "    font-size: 9px;\n" +
    "    line-height: 1;\n" +
    "    transition: color 400ms, box-shadow 400ms;\n" +
    "    height: 4.44444em;\n" +
    "    width: 4.44444em;\n" +
    "    box-shadow: rgba(0, 0, 0, 0.0980392) 0px 0.222222em 0.888889em;\n" +
    "    position: absolute;\n" +
    "    bottom: 0px;\n" +
    "    margin-bottom: auto;\n" +
    "    margin-top: auto;\n" +
    "    top: 0;\n" +
    "    z-index: 20;\n" +
    "    right: -2.22222em\" class=\"btn\" href=\"#carousel-example-generic\" data-slide=\"next\"> <i style=\"margin:7px 10px 0 0; font-size:15px; font-weight:600\" class=\"icon-angle-right\"></i></a> <!-- Wrapper for slides <--> <div class=\"carousel-inner\"> <div class=\"item active\"> <div class=\"row\"> <div class=\"col-sm-3 nopadding\"> <div ng-click=\"heading1.isOpen = !heading1.isOpen\" style=\"cursor:pointer\"> <div class=\"paul-slide\"> <img style=\"object-fit:cover; width:100%; height:100%\" src=\"images/home-bg.jpg\" class=\"img-responsive\" alt=\"a\"> </div> <span class=\"paul-slider-caption\"> {{images[0].text}}</span> </div> </div> <div class=\"col-sm-3 nopadding\"> <div ng-click=\"heading1.isOpen = !heading1.isOpen\" style=\"cursor:pointer\"> <div class=\"paul-slide\"> <img style=\"object-fit:cover; width:100%; height:100%\" src=\"images/destination-bg.jpg\" class=\"img-responsive\" alt=\"a\"> </div> <span class=\"paul-slider-caption\"> {{images[1].text}}</span> </div> </div> <div class=\"col-sm-3 nopadding\"> <div ng-click=\"heading1.isOpen = !heading1.isOpen\" style=\"cursor:pointer\"> <div class=\"paul-slide\"> <img style=\"object-fit:cover; width:100%; height:100%\" src=\"images/manipur.jpg\" class=\"img-responsive\" alt=\"a\"> </div> <span class=\"paul-slider-caption\"> {{images[2].text}}</span> </div> </div> <div class=\"col-sm-3 nopadding\"> <div ng-click=\"heading1.isOpen = !heading1.isOpen\" style=\"cursor:pointer\"> <div class=\"paul-slide\"> <img style=\"object-fit:cover; width:100%; height:100%\" src=\"images/destination-detail-bg.jpg\" class=\"img-responsive\" alt=\"a\"> </div> <span class=\"paul-slider-caption\"> {{images[3].text}}</span> </div> </div> </div> </div> <div class=\"item\"> <div class=\"row\"> <div class=\"col-sm-3 nopadding\"> <div ng-click=\"heading1.isOpen = !heading1.isOpen\" style=\"cursor:pointer\"> <div class=\"paul-slide\"> <img style=\"object-fit:cover; width:100%; height:100%\" src=\"images/home-bg.jpg\" class=\"img-responsive\" alt=\"a\"> </div> <span class=\"paul-slider-caption\"> {{images[4].text}}</span> </div> </div> <div class=\"col-sm-3 nopadding\"> <div ng-click=\"heading1.isOpen = !heading1.isOpen\" style=\"cursor:pointer\"> <div class=\"paul-slide\"> <img style=\"object-fit:cover; width:100%; height:100%\" src=\"images/home-bg.jpg\" class=\"img-responsive\" alt=\"a\"> </div> <span class=\"paul-slider-caption\"> {{images[5].text}}</span> </div> </div> <div class=\"col-sm-3 nopadding\"> <div ng-click=\"heading1.isOpen = !heading1.isOpen\" style=\"cursor:pointer\"> <div class=\"paul-slide\"> <img style=\"object-fit:cover; width:100%; height:100%\" src=\"images/home-bg.jpg\" class=\"img-responsive\" alt=\"a\"> </div> <span class=\"paul-slider-caption\"> {{images[5].text}}</span> </div> </div> <div class=\"col-sm-3 nopadding\"> <div ng-click=\"heading1.isOpen = !heading1.isOpen\" style=\"cursor:pointer\"> <div class=\"paul-slide\"> <img style=\"object-fit:cover; width:100%; height:100%\" src=\"images/destination-bg.jpg\" class=\"img-responsive\" alt=\"a\"> </div> <span class=\"paul-slider-caption\"> {{images[0].text}}</span> </div> </div> </div> </div> </div> </div> </div> </div> </section> <div class=\"container\"> <uib-accordion> <uib-accordion-group is-open=\"heading1.isOpen\"> <div style=\"padding-left:50px\" id=\"posts\" class=\"events small-thumbs\"> <div class=\".col-md-4\" ng-repeat=\"destination in destinations\"> <div class=\"entry-image\" style=\"padding-bottom:10px\"> <a href=\"#\" ui-sref=\"destination.detail({id: destination.id})\"> <img ng-src=\"{{destination.imageUrl}}\" alt=\"Inventore voluptates velit totam ipsa tenetur\"> <h3 class=\"text-center\">{{destination.name}}</h3> </a> </div> </div> </div> </uib-accordion-group> </uib-accordion> </div> <section id=\"content\" class=\"container\"> <div class=\"topmargin\"> <h2 style=\"text-align:center;margin-bottom:4rem;letter-spacing:-0.45px;line-height:1;font-weight:300;font-size:3.8rem\"> The Blog <div style=\"display:block;height:2px;width:30px;background:#dc221a;margin-left:auto;margin-right:auto;margin-bottom:0;margin-top:15px\"> </div> </h2> </div> <div class=\"clearfix\"> <div class=\"pull-right\" style=\"width:40%\"> <a href=\"images/blog1.jpg\"><img height=\"250px\" width=\"100%\" src=\"images/blog1.jpg\" alt=\"Standard Post with Image\"></a> </div> <div class=\"pull-left\" style=\"width:60%; padding-right:10px\"> <div class=\"entry-title\"> <h3 style=\"cursor:pointer\" ui-sref=\"blog.list\" style=\"line-height:1.2142857142857142;margin-top:0;margin-right:0;margin-bottom:0;margin-left:0;font-size:28px;font-weight:600;color:#2c3643\"> For rivers, seas and slopes at their most inviting</h3> </div> <div class=\"entry-content\" style=\"margin-top:40px\"> <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cupiditate, asperiores quod est tenetur in. Eligendi, deserunt, blanditiis est quisquam doloribus voluptate id aperiam ea ipsum magni aut perspiciatis rem voluptatibus officia eos rerum deleniti quae nihil facilis repellat atque vitae voluptatem libero at eveniet veritatis ab facere. </p> <a style=\"cursor:pointer\" ui-sref=\"blog.list\" class=\"more-link\">Read More</a> </div> </div> </div> <div style=\"margin:0 0 30px 0\" class=\"clearfix\"> <div class=\"pull-left\" style=\"width:40%\"> <a href=\"images/blog3.jpg\"><img height=\"250px\" width=\"100%\" src=\"images/blog3.jpg\" alt=\"Standard Post with Image\"></a> </div> <div class=\"pull-right\" style=\"width:60%; padding-left:10px\"> <div class=\"entry-title\"> <h3 style=\"cursor:pointer\" ui-sref=\"blog.list\" style=\"line-height:1.2142857142857142;margin-top:0;margin-right:0;margin-bottom:0;margin-left:0;font-size:28px;font-weight:600;color:#2c3643\"> This is a standard post with preview image</h3> </div> <div class=\"entry-content\" style=\"margin-top:40px\"> <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cupiditate, asperiores quod est tenetur in. Eligendi, deserunt, blanditiis est quisquam doloribus voluptate id aperiam ea ipsum magni aut perspiciatis rem voluptatibus officia eos rerum deleniti quae nihil facilis repellat atque vitae voluptatem libero at eveniet veritatis ab facere. </p> <a style=\"cursor:pointer\" ui-sref=\"blog.list\" class=\"more-link\">Read More</a> </div> </div> </div> </section> <section> <div style=\"background-color:#000;background-image: url('https://resources.luxuryretreats.com/www/images/vr5/home_inquire.jpg');background-size: cover;position:relative; width:100%;  height:100vh\"> <!--<div class=\"text_over_image\">\n" +
    "        {{postDetail.title}}\n" +
    "      </div>--> <div style=\"width:40%; height:100vh; float:left; position:absolute; left:0px; top:0px; z-index:1; background-color: rgba(0,0,0,.66); padding:5px; color: #FFF; font-weight:bold\"> <div style=\"padding:45px\"> <div> <div> <h3 style=\"margin: 0;font-size: 25px;font-weight: 600;\n" +
    "    line-height: normal;\n" +
    "    letter-spacing: 2px;\n" +
    "    color:#FFF\">Not Sure Where to Begin?</h3> <p style=\"color:#FFF; font-size:15px\">Complete this form &amp; we'll get right back to you!</p> </div> </div> <form id=\"\"> <div style=\"padding:0px\" class=\"col-sm-6\"> <label style=\"color:#FFF; text-transform:capitalize\">First Name<span class=\"asterisk\">*</span></label> <input class=\"form-control\" id=\"{{inquireFirstName}}\" type=\"text\" placeholder=\"*Required\" value=\"{{firstName}}\" data-parsley-trim-value=\"true\" required data-prefill=\"firstName\"> </div> <div class=\"col-sm-6\"> <label style=\"color:#FFF; text-transform:capitalize\">Last Name</label> <input class=\"form-control\" id=\"{{inquireLastName}}\" type=\"text\" value=\"{{lastName}}\" data-parsley-trim-value=\"true\" data-prefill=\"lastName\"> </div> <div style=\"padding:10px 0 0 0\" class=\"col-sm-6\"> <label style=\"color:#FFF; text-transform:capitalize\">Email<span class=\"asterisk\">*</span></label> <input class=\"form-control\" id=\"{{inquireEmail}}\" type=\"email\" value=\"{{email}}\" placeholder=\"*Required\" data-parsley-trim-value=\"true\" required data-prefill=\"email\"> </div> <div style=\"padding-top:10px\" class=\"col-sm-6\"> <label style=\"color:#FFF; text-transform:capitalize\">Phone Number<span class=\"asterisk\">*</span></label> <div class=\"inquireTelContainer\"> <input class=\"form-control\" id=\"{{inquireTel}}\" placeholder=\"*Required\" value=\"{{tel}}\" type=\"tel\" data-parsley-intphone=\"{{inquireTel}}\" data-parsley-cnic required data-prefill=\"phone\"> <input id=\"{{inquireCountry}}\" type=\"hidden\" data-prefill=\"country\"> </div> </div> <div style=\"padding:10px 0 0 0\" class=\"col-sm-6\"> <label style=\"color:#FFF; text-transform:capitalize\" for=\"form-condition-10\">I would like to go to...</label> <select ng-click=\"display5={display:'block'}\" id=\"form-condition-10\" name=\"form-condition-10\" class=\"required sm-form-control\"> <option value=\"\">-- Select One --</option> <option value=\"5K\"> Rishikesh</option> <option value=\"5K to 10K\">Manali</option> <option value=\"10K to 15K\">Dharamshala</option> <option value=\"15K to 20K\">Ladakh</option> <option value=\"more than 20K\">Shimla</option> </select> </div> <div style=\"padding-top:10px\" class=\"col-sm-6\"> <label style=\"color:#FFF; text-transform:capitalize\" for=\"form-condition-10\">In the month of...</label> <select ng-click=\"display5={display:'block'}\" id=\"form-condition-10\" name=\"form-condition-10\" class=\"required sm-form-control\"> <option value=\"\">Travel Dates TBC</option> <option value=\"5K\">January</option> <option value=\"5K to 10K\">February</option> <option value=\"10K to 15K\">March</option> <option value=\"15K to 20K\">April</option> <option value=\"more than 20K\">May</option> <option value=\"5K\">June</option> <option value=\"5K to 10K\">July</option> <option value=\"10K to 15K\">August</option> <option value=\"15K to 20K\">September</option> <option value=\"more than 20K\">October</option> <option value=\"10K to 15K\">November</option> <option value=\"15K to 20K\">December</option> </select> </div> <div style=\"width:97%\"> <label style=\"padding-top: 10px; color:#FFF; text-transform:capitalize\">What's the occasion?<span class=\"asterisk\">*</span></label> <textarea style=\"max-width:425px; max-height:500px\" class=\"form-control\" placeholder=\"Tell us a little bit about what you're looking for.\"></textarea> </div> <div style=\"padding:20px 0 0 0; text-transform:capitalize\" class=\"col-sm-12\"> <button style=\"margin:0px !important; width:97%; height:70px\" id=\"{{inquireSubmit}}\" class=\"button buttonPrimary\">Submit Inquiry</button> </div> </form> </div> </div> </div> </section> <section> <div class=\"topmargin\"> <h2 class=\"instaText\" style=\"text-align:center;margin-bottom:4rem;letter-spacing:-0.45px;line-height:1;font-weight:300;font-size:3.8rem\"> On Instagram @ wanderwagon </h2> </div> <div class=\"bottommargin\"> <div class=\"carousel slide\" data-ride=\"carousel\" data-type=\"multi\" data-interval=\"3000\" id=\"myCarousel\"> <div class=\"carousel-inner\"> <div class=\"item active\"> <div class=\"col-md-2 col-sm-4 col-xs-10\"><a href=\"#\"><img src=\"images/manipur.jpg\" class=\"img-responsive\"></a></div> </div> <div class=\"item\"> <div class=\"col-md-2 col-sm-4 col-xs-10\"><a href=\"#\"><img src=\"images/assam.jpg\" class=\"img-responsive\"></a></div> </div> <div class=\"item\"> <div class=\"col-md-2 col-sm-4 col-xs-10\"><a href=\"#\"><img src=\"images/himachal.jpg\" class=\"img-responsive\"></a></div> </div> <div class=\"item\"> <div class=\"col-md-2 col-sm-4 col-xs-10\"><a href=\"#\"><img src=\"images/meghalaya.jpg\" class=\"img-responsive\"></a></div> </div> <div class=\"item\"> <div class=\"col-md-2 col-sm-4 col-xs-10\"><a href=\"#\"><img src=\"images/sikkim.jpg\" class=\"img-responsive\"></a></div> </div> <div class=\"item\"> <div class=\"col-md-2 col-sm-4 col-xs-10\"><a href=\"#\"><img src=\"images/arunachal.jpg\" class=\"img-responsive\"></a></div> </div> <div class=\"item\"> <div class=\"col-md-2 col-sm-4 col-xs-10\"><a href=\"#\"><img src=\"images/kashmir.jpg\" class=\"img-responsive\"></a></div> </div> <div class=\"item\"> <div class=\"col-md-2 col-sm-4 col-xs-10\"><a href=\"#\"><img src=\"images/uttarakhand.jpg\" class=\"img-responsive\"></a></div> </div> </div> </div> </div> </section> "
  );


  $templateCache.put('views/login.html',
    "<!-- Page Title\n" +
    "		============================================= --> <!-- Content\n" +
    "		============================================= --> <section id=\"content\" style=\"background-color:#000;background-image: url('images/slider/1.jpg'); background-size:cover\"> <div class=\"content-wrap\"> <div class=\"container clearfix\"> <div class=\"divcenter topmargin nobottommargin clearfix\" id=\"tab-login-register\" style=\"max-width: 500px\"> <uib-tabset active=\"activeJustified\" justified=\"true\"> <uib-tab index=\"0\" heading=\"Login\"> <div class=\"panel panel-default nobottommargin\"> <div class=\"panel-body\" style=\"padding: 40px\"> <form id=\"loginForm\" name=\"loginForm\" class=\"nobottommargin\" ng-submit=\"onLogin(loginForm)\"> <h3>Login to your Account</h3> <div class=\"col_full\"> <label for=\"loginForm-username\">Email:</label> <input ng-model=\"loginObj.emailId\" type=\"text\" id=\"loginForm-username\" name=\"loginForm-username\" value=\"\" class=\"form-control\"> </div> <div class=\"col_full\"> <label for=\"loginForm-password\">Password:</label> <input ng-model=\"loginObj.password\" type=\"password\" id=\"loginForm-password\" name=\"loginForm-password\" value=\"\" class=\"form-control\"> </div> <div class=\"col_full nobottommargin\"> <button type=\"submit\" class=\"button background-primary\" id=\"loginForm-submit\" name=\"loginForm-submit\">Login</button> <a href=\"#\" class=\"fright\">Forgot Password?</a> </div> </form> <div class=\"line line-sm\"></div> <div class=\"center\"> <h4 style=\"margin-bottom: 15px\"> Login with:</h4> <button class=\"button button-rounded si-facebook si-colored\" ng-click=\"authenticate('facebook')\"><i class=\"icon-facebook\"></i>Facebook</button> <span class=\"hidden-xs\">or</span> <button class=\"button button-rounded si-google si-colored\" ng-click=\"authenticate('google')\"><i class=\"icon-facebook\"></i>Google</button> </div> </div> </div> </uib-tab> <uib-tab index=\"1\" heading=\"Sign up\"> <div class=\"panel panel-default nobottommargin\"> <div class=\"panel-body\" style=\"padding: 40px\"> <h3>Sign up for an account</h3> <form id=\"register-form\" name=\"register-form\" class=\"nobottommargin\" action=\"#\" method=\"post\"> <div class=\"col_full\"> <label for=\"register-form-name\">Name:</label> <input type=\"text\" id=\"register-form-name\" name=\"register-form-name\" value=\"\" class=\"form-control\"> </div> <div class=\"col_full\"> <label for=\"register-form-email\">Email Address:</label> <input type=\"text\" id=\"register-form-email\" name=\"register-form-email\" value=\"\" class=\"form-control\"> </div> <div class=\"col_full\"> <label for=\"register-form-password\">Choose Password:</label> <input type=\"password\" id=\"register-form-password\" name=\"register-form-password\" value=\"\" class=\"form-control\"> </div> <div class=\"col_full\"> <label for=\"register-form-repassword\">Re-enter Password:</label> <input type=\"password\" id=\"register-form-repassword\" name=\"register-form-repassword\" value=\"\" class=\"form-control\"> </div> <div class=\"col_full nobottommargin\"> <button class=\"button button-3d nomargin\" id=\"register-form-submit\" name=\"register-form-submit\" value=\"register\">Sign up</button> </div> </form> </div> </div> </uib-tab> </uib-tabset> </div> </div> </div> </section> <!-- #content end --> "
  );


  $templateCache.put('views/main.html',
    " <div class=\"jumbotron\"> <h1>'Allo, 'Allo!</h1> <p class=\"lead\"> <img src=\"images/yeoman.png\" alt=\"I'm Yeoman\"><br> Always a pleasure scaffolding your apps. </p> <p><a class=\"btn btn-lg btn-success\" ng-href=\"#/\">Splendid!<span class=\"glyphicon glyphicon-ok\"></span></a></p> </div> <div class=\"row marketing\"> <h4>HTML5 Boilerplate</h4> <p> HTML5 Boilerplate is a professional front-end template for building fast, robust, and adaptable web apps or sites. </p> <h4>Angular</h4> <p> AngularJS is a toolset for building the framework most suited to your application development. </p> <h4>Karma</h4> <p>Spectacular Test Runner for JavaScript.</p> </div> "
  );


  $templateCache.put('views/partner.html',
    " <p> This is the Parther Page</p>"
  );


  $templateCache.put('views/plan-trip-form.html',
    "<section style=\"background:#444\" id=\"page-title\"> </section> <div class=\"container\"> <h1 style=\"padding:20px\" class=\"text-center\">PLAN YOUR TRIP</h1> <h3 style=\"padding:20px\" class=\"text-center\">UNDERSTANDING YOUR TRAVEL PREFERENCE</h3> <h3>MOST IMPORTANT *</h3> <form id=\"\"> <div style=\"padding:0px\" class=\"col-sm-6\"> <label style=\"text-transform:capitalize\">Your name<span class=\"asterisk\">*</span></label> <input class=\"form-control\" id=\"{{inquireFirstName}}\" type=\"text\" placeholder=\"*Required\" value=\"{{firstName}}\" data-parsley-trim-value=\"true\" required data-prefill=\"firstName\"> </div> <div class=\"col-sm-6\"> <label style=\"text-transform:capitalize\">Your email address<span class=\"asterisk\">*</span></label> <input class=\"form-control\" id=\"{{inquireEmail}}\" type=\"email\" value=\"{{email}}\" placeholder=\"*Required\" data-parsley-trim-value=\"true\" required data-prefill=\"email\"> </div> <div style=\"padding:10px 0 0 0\" class=\"col-sm-6\"> <label style=\"text-transform:capitalize\">Which country are you from ?<span class=\"asterisk\">*</span></label> <input class=\"form-control\" id=\"{{inquireFirstName}}\" type=\"text\" placeholder=\"*Required\" value=\"{{firstName}}\" data-parsley-trim-value=\"true\" required data-prefill=\"firstName\"> </div> <div style=\"padding-top:10px\" class=\"col-sm-6\"> <label style=\"text-transform:capitalize\">How many people are travelling ? <span class=\"asterisk\">*</span></label> <input class=\"form-control\" id=\"{{inquireFirstName}}\" type=\"number\" placeholder=\"*Required\" value=\"{{firstName}}\" data-parsley-trim-value=\"true\" required data-prefill=\"firstName\"> </div> <h3>GETTING TO KNOW YOU A LITTLE BETTER</h3> <div style=\"padding:0 0 0 0\" class=\"col-sm-6\"> <label style=\"text-transform:capitalize\" for=\"form-condition-10\">Tell us more about your travel companions</label> <select ng-click=\"display5={display:'block'}\" id=\"form-condition-10\" name=\"form-condition-10\" class=\"required sm-form-control\"> <option value=\"\">0 Selected</option> <option value=\"5K\"> 1</option> <option value=\"5K to 10K\">2</option> <option value=\"10K to 15K\">3</option> <option value=\"15K to 20K\">4</option> <option value=\"more than 20K\">5</option> </select> </div> <div class=\"col-sm-6\"> <label style=\"text-transform:capitalize\" for=\"form-condition-10\">What age group do you and your travel companions belong to ?</label> <select ng-click=\"display5={display:'block'}\" id=\"form-condition-10\" name=\"form-condition-10\" class=\"required sm-form-control\"> <option value=\"\">0 Selected</option> <option value=\"5K\">15 - 20</option> <option value=\"5K to 10K\">20 - 25</option> <option value=\"10K to 15K\">25 - 30</option> <option value=\"15K to 20K\">30+</option> </select> </div> <div style=\"padding:10px 0 0 0\" class=\"col-sm-6\"> <label style=\"text-transform:capitalize\" for=\"form-condition-10\">How many days would you be travelling for ?</label> <select ng-click=\"display5={display:'block'}\" id=\"form-condition-10\" name=\"form-condition-10\" class=\"required sm-form-control\"> <option value=\"\">0 Selected</option> <option value=\"5K\"> 1</option> <option value=\"5K to 10K\">2</option> <option value=\"10K to 15K\">3</option> <option value=\"15K to 20K\">4</option> <option value=\"more than 20K\">5</option> </select> </div> <div style=\"padding-top:10px\" class=\"col-sm-6\"> <label style=\"text-transform:capitalize\" for=\"form-condition-10\">Where did you hear about us ?</label> <select ng-click=\"display5={display:'block'}\" id=\"form-condition-10\" name=\"form-condition-10\" class=\"required sm-form-control\"> <option value=\"\">Select option</option> <option value=\"5K\">Yes</option> <option value=\"5K to 10K\">No</option> </select> </div> <div style=\"padding:10px 0 0 0\" class=\"col-sm-6\"> <label style=\"text-transform:capitalize\" for=\"form-condition-10\">What kind of traveller do you think you are ?</label> <select ng-click=\"display5={display:'block'}\" id=\"form-condition-10\" name=\"form-condition-10\" class=\"required sm-form-control\"> <option value=\"\">Select One</option> <option value=\"5K\"> 1</option> <option value=\"5K to 10K\">2</option> <option value=\"10K to 15K\">3</option> <option value=\"15K to 20K\">4</option> <option value=\"more than 20K\">5</option> </select> </div> <div style=\"padding-top:10px\" class=\"col-sm-6\"> <label style=\"text-transform:capitalize\" for=\"form-condition-10\">Do you have exact dates ?</label> <input class=\"form-control\" id=\"{{inquireFirstName}}\" type=\"text\" value=\"{{firstName}}\" data-parsley-trim-value=\"true\" data-prefill=\"firstName\"> </div> <div style=\"padding:10px 0 0 0\" class=\"col-sm-12\"> <label style=\"text-transform:capitalize\" for=\"form-condition-10\">Things you want to tell us ?</label> <textarea style=\"width:100%; height:205px\" class=\"form-control\" placeholder=\"Tell us a little bit about what you're looking for.\"></textarea> </div> <div style=\"padding:20px 0 20px 0\" class=\"col-sm-12\"> <button style=\"width:50%; height:70px; display:block; margin: 0 auto\" id=\"{{inquireSubmit}}\" class=\"button buttonPrimary\">Submit Inquiry</button> </div> </form></div> "
  );


  $templateCache.put('views/plan-trip.html',
    "<div style=\"background-color:#000;background-image: url('images/plan-trip-bg.jpg');background-size: cover; height:100vh;\">\n" +
    "  <div class=\"container clearfix\">\n" +
    "   <div class=\"center-block slider-caption-center\">\n" +
    "              <h2 class=\"text-center\" style=\"font-size:68px;letter-spacing:0px;font-weight:600;color:#fff;margin-top:200px;\" data-caption-animate=\"fadeInUp\">Plan your trip</h2>\n" +
    "              <p style=\"font-size:3rem; font-style:italic; color:#fff;\" class=\"text-center\"> Trips customized extensively by you and we shall provide the services. By you, for you, as we ensure the fulfilment of your wishes.</p>\n" +
    "\n" +
    "            </div>\n" +
    "  </div>\n" +
    "</div>\n" +
    "\n" +
    "<!-- Content\n" +
    "		============================================= -->\n" +
    "<section id=\"content\">\n" +
    "\n" +
    "  <div class=\"content-wrap\">\n" +
    "\n" +
    "    <div class=\"container clearfix\">\n" +
    "\n" +
    "      <div style=\"float: none; display: block; margin-right: auto; margin-left: auto;\" class=\"col_half nobottommargin\">\n" +
    "\n" +
    "        <form id=\"conditional-form\" action=\"/booktrip/\" method=\"post\" class=\"nobottommargin\">\n" +
    "          <input type='hidden' name='csrfmiddlewaretoken' value='bajfYtFDAH9kXmH4gfAHVQOPg4DvfBYZ' />\n" +
    "          <div class=\"col_full\">\n" +
    "            <label for=\"form-condition-1\">Destination – Where do you want to go?</label>\n" +
    "            <input ng-keypress=\"display={display:'block'}\" type=\"text\" class=\"sm-form-control required\" id=\"form-condition-1\" name=\"form-condition-1\"\n" +
    "              value=\"\">\n" +
    "            <!-- <a href=\"#\" class=\"button button-border button-rounded\"><i class=\"icon-gift\"></i>Button</a> -->\n" +
    "          </div>\n" +
    "\n" +
    "          <div ng-style=\"display\" class=\"col_full\" id=\"form-condition-2-wrap\" style=\"display:none;\">\n" +
    "            <label for=\"form-condition-2\">Departure city: From where do you plan to start?</label>\n" +
    "            <input ng-keypress=\"display1={display:'block'}\" type=\"text\" class=\"sm-form-control required\" id=\"form-condition-2\" name=\"form-condition-2\"\n" +
    "              value=\"\">\n" +
    "          </div>\n" +
    "\n" +
    "          <div ng-style=\"display1\" class=\"input-daterange travel-date-group\" style=\"display:none;\">\n" +
    "            <div class=\"col_full\">\n" +
    "              <label for=\"form-condition-3\">Departure date: Your departure date</label>\n" +
    "              <p class=\"input-group\">\n" +
    "                <input ng-click=\"display2={display:'block'}\" type=\"text\" class=\"form-control\" popup-placement=\"top\" show-button-bar=\"false\" uib-datepicker-popup=\"{{format}}\" ng-model=\"dt\" is-open=\"popup1.opened\" datepicker-options=\"dateOptions\"\n" +
    "                  ng-required=\"true\"  alt-input-formats=\"altInputFormats\" />\n" +
    "                <span class=\"input-group-btn\">\n" +
    "            <button type=\"button\" class=\"btn btn-default\" ng-click=\"open1(); display2={display:'block'}\"><i class=\"glyphicon glyphicon-calendar\"></i></button>\n" +
    "          </span>\n" +
    "              </p>\n" +
    "            </div>\n" +
    "          </div>\n" +
    "\n" +
    "\n" +
    "\n" +
    "          <div ng-style=\"display2\" class=\"col_full\" id=\"form-condition-4-wrap\" style=\"display:none;\">\n" +
    "            <label for=\"form-condition-4\">Duration: How long is your trip?</label>\n" +
    "            <input ng-keypress=\"display3={display:'block'}\" type=\"text\" class=\"sm-form-control required\" id=\"form-condition-4\" name=\"form-condition-4\"\n" +
    "              value=\"\">\n" +
    "          </div>\n" +
    "\n" +
    "          <div ng-style=\"display3\" class=\"col_full\" id=\"form-condition-5-wrap\" style=\"display:none;\">\n" +
    "            <label for=\"form-condition-5\">Number of fellow wanderlusts!</label>\n" +
    "            <input ng-keypress=\"display4={display:'block'}\" type=\"text\" class=\"sm-form-control required\" id=\"form-condition-5\" name=\"form-condition-5\"\n" +
    "              value=\"\">\n" +
    "          </div>\n" +
    "\n" +
    "\n" +
    "          <div ng-style=\"display4\" class=\"col_full\" id=\"form-condition-10-wrap\" style=\"display:none;\">\n" +
    "            <label for=\"form-condition-10\">Per person budget for your trip:</label>\n" +
    "            <select ng-click=\"display5={display:'block'}\" id=\"form-condition-10\" name=\"form-condition-10\" class=\"required sm-form-control\">\n" +
    "									<option value=\"\">-- Select One --</option>\n" +
    "									<option value=\"<5K\"> < 5K</option>\n" +
    "									<option value=\"5K to 10K\">5K to 10K</option>\n" +
    "									<option value=\"10K to 15K\">10K to 15K</option>\n" +
    "									<option value=\"15K to 20K\">15K to 20K</option>\n" +
    "									<option value=\"more than 20K\">more than 20K</option>\n" +
    "								</select>\n" +
    "          </div>\n" +
    "\n" +
    "\n" +
    "          <div ng-style=\"display5\" class=\"col_full\" id=\"form-condition-12-wrap\" style=\"display:none;\">\n" +
    "            <label for=\"form-condition-12\">Stage in Planning</label>\n" +
    "            <select ng-click=\"display6={display:'block'}\" id=\"form-condition-12\" name=\"form-condition-12\" class=\"required sm-form-control\">\n" +
    "									<option value=\"\">-- Select One --</option>\n" +
    "									<option value=\"Still dreaming...not sure I'm going to this trip\">Still dreaming...not sure I'm going to this trip</option>\n" +
    "									<option value=\"I know I am going somewhere, but not sure about the places\">I know I am going somewhere, but not sure about the places </option>\n" +
    "									<option value=\"I am definitely going\">I am definitely going</option>\n" +
    "								</select>\n" +
    "          </div>\n" +
    "\n" +
    "          <div ng-style=\"display6\" class=\"col_full\" id=\"form-condition-13-wrap\" style=\"display:none;\">\n" +
    "            <label for=\"form-condition-13\">What Would You Like To See And Do?</label>\n" +
    "            <textarea ng-keypress=\"display7={display:'block'}\" class=\"sm-form-control required\" id=\"form-condition-13\" name=\"form-condition-13\"\n" +
    "              rows=\"5\" col=\"20\" placeholder=\"Message to us\"></textarea>\n" +
    "          </div>\n" +
    "\n" +
    "          <div ng-style=\"display7\" class=\"col_full\" id=\"form-condition-14-wrap\" style=\"display:none;\">\n" +
    "            <label for=\"form-condition-14\">Enter Name</label>\n" +
    "            <input ng-keypress=\"display8={display:'block'}\" type=\"text\" class=\"sm-form-control required\" id=\"form-condition-14\" name=\"form-condition-14\"\n" +
    "              value=\"\">\n" +
    "          </div>\n" +
    "\n" +
    "          <div ng-style=\"display8\" class=\"col_full\" id=\"form-condition-15-wrap\" style=\"display:none;\">\n" +
    "            <label for=\"form-condition-15\">Enter Email</label>\n" +
    "            <input ng-keypress=\"display9={display:'block'}\" type=\"email\" class=\"sm-form-control required email\" id=\"form-condition-15\"\n" +
    "              name=\"form-condition-15\" value=\"\">\n" +
    "          </div>\n" +
    "\n" +
    "          <div ng-style=\"display9\" class=\"col_full\" id=\"form-condition-16-wrap\" style=\"display:none;\">\n" +
    "            <label for=\"form-condition-16\">Phone No.</label>\n" +
    "            <input ng-keypress=\"display10={display:'block'}\" type=\"text\" class=\"sm-form-control required\" id=\"form-condition-16\" name=\"form-condition-16\"\n" +
    "              value=\"\">\n" +
    "          </div>\n" +
    "\n" +
    "          <div ng-style=\"display10\" class=\"col_full\" id=\"form-condition-submit\" style=\"display:none;\">\n" +
    "            <button ng-keypress=\"display10={display:'block'}\" class=\"button button-3d nomargin\" type=\"submit\">Plan My Trip</button>\n" +
    "          </div>\n" +
    "\n" +
    "        </form>\n" +
    "\n" +
    "      </div>\n" +
    "\n" +
    "      <!-- <div class=\"col_half col_last common-height\">\n" +
    "						<h3></h3>\n" +
    "						<a href=\"#\" id=\"button_add_destination\" class=\"bottom button button-small button-border button-reveal button-rounded\"><i class=\"icon-map-marker2\"></i>Add Destination</a>\n" +
    "					</div> -->\n" +
    "\n" +
    "    </div>\n" +
    "\n" +
    "  </div>\n" +
    "\n" +
    "</section>\n" +
    "<!-- #content end -->\n"
  );


  $templateCache.put('views/signUp.html',
    " <!-- Page Title\n" +
    "		============================================= --> <!--<section id=\"page-title\">\n" +
    "\n" +
    "	<div class=\"container clearfix\">\n" +
    "		<h1>My Account</h1>\n" +
    "		<ol class=\"breadcrumb\">\n" +
    "			<li><a href=\"#\">Home</a></li>\n" +
    "			<li><a href=\"#\">Pages</a></li>\n" +
    "			<li class=\"active\">Login</li>\n" +
    "		</ol>\n" +
    "	</div>\n" +
    "\n" +
    "</section>--> <!-- #page-title end --> <!-- Content\n" +
    "		============================================= --> <section id=\"content\"> <div class=\"content-wrap\"> <div class=\"container clearfix\"> <div class=\"tabs divcenter nobottommargin clearfix\" id=\"tab-login-register\" style=\"max-width: 500px\"> <div class=\"tab-content clearfix\" id=\"tab-register\"> <div class=\"panel panel-default nobottommargin\"> <div class=\"panel-body\" style=\"padding: 40px\"> <h3>Sign up for an Account</h3> <form id=\"signUpForm\" name=\"signUpForm\" class=\"nobottommargin\" ng-submit=\"onSignUp(signUpForm)\"> <!--<div class=\"col_full\">\n" +
    "									<label for=\"signUpForm-firstName\">First Name:</label>\n" +
    "									<input ng-model=\"signUpObj.firstName\" type=\"text\" id=\"signUpForm-firstName\" name=\"signUpForm-firstName\" value=\"\" class=\"form-control\"\n" +
    "										required/>\n" +
    "								</div>\n" +
    "\n" +
    "								<div class=\"col_full\">\n" +
    "									<label for=\"signUpForm-lastName\">Last Name:</label>\n" +
    "									<input ng-model=\"signUpObj.lastName\" type=\"text\" id=\"signUpForm-lastName\" name=\"signUpForm-lastName\" value=\"\" class=\"form-control\"\n" +
    "										required/>\n" +
    "								</div>--> <div class=\"col_full\"> <label for=\"signUpForm-email\">Email Address:</label> <input ng-model=\"signUpObj.email\" type=\"email\" id=\"signUpForm-email\" name=\"signUpForm-email\" value=\"\" class=\"form-control\" required> </div> <div class=\"col_full\"> <label for=\"signUpForm-password\">Choose Password:</label> <input ng-model=\"signUpObj.password\" type=\"password\" id=\"signUpForm-password\" name=\"signUpForm-password\" value=\"\" class=\"form-control\" required> </div> <div class=\"col_full\"> <label for=\"signUpForm-repassword\">Re-enter Password:</label> <input ng-model=\"signUpObj.confirmPassword\" type=\"password\" id=\"signUpForm-repassword\" name=\"signUpForm-repassword\" value=\"\" class=\"form-control\" required> </div> <!--<div class=\"col_full\">\n" +
    "									<label for=\"signUpForm-dob\">Date of Birth:</label>\n" +
    "									<p class=\"input-group\">\n" +
    "										<input type=\"text\" class=\"form-control\" uib-datepicker-popup=\"{{format}}\" ng-model=\"signUpObj.date\" is-open=\"popup1.opened\"\n" +
    "											datepicker-options=\"dateOptions\" ng-required=\"true\" close-text=\"Close\" alt-input-formats=\"altInputFormats\" />\n" +
    "										<span class=\"input-group-btn\">\n" +
    "            <button type=\"button\" class=\"btn btn-default\" ng-click=\"open1()\"><i class=\"glyphicon glyphicon-calendar\"></i></button>\n" +
    "          </span>\n" +
    "									</p>\n" +
    "								</div>\n" +
    "\n" +
    "								<div class=\"col_full\">\n" +
    "									<label for=\"signUpForm-gender\">Gender:</label>\n" +
    "									<span class=\"radio-control\">\n" +
    "													<input type=\"radio\" id=\"signUpForm-gender\" name=\"signUpForm-gender\" required/> Male\n" +
    "													<input type=\"radio\" id=\"signUpForm-gender\" name=\"signUpForm-gender\" required/> Female\n" +
    "												</span>\n" +
    "\n" +
    "								</div>--> <div class=\"row\"> <div class=\"col-md-6 brd\"> <button type=\"submit\" class=\"button background-primary\" id=\"signUpForm-submit\" name=\"signUpForm-submit\">Submit</button> </div> <div class=\"col-md-6 brd\"> <div ng-show=\"showMessage\" class=\"alert\" ng-class=\"'alert-' + (alert.type || 'warning')\"> {{alert.msg}} </div> </div> </div> </form> </div> </div> </div> </div> </div> </div> </section> <!-- #content end --> <div class=\"modal fade\" id=\"signUpModel\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"signUpModelLabel\"> <div class=\"modal-dialog\" role=\"document\" style=\"height: 100px\"> <div class=\"modal-content\"> <div class=\"modal-header\"> <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Close\"> <span aria-hidden=\"true\"> &times; </span> </button> <h4 class=\"modal-title\" id=\"signUpModelLabel\">{{message.type}}</h4> </div> <div class=\"row modal-body\"> <form class=\"form-horizontal\"> <div class=\"form-group\"> <div class=\"text-center\"> <label class=\"text-center\"> {{ message.msg }} </label> </div> </div> </form> </div> </div> </div> </div>"
  );


  $templateCache.put('views/test.html',
    "	<!--[if lte IE 8]>\n" +
    "      <p class=\"browsehappy\">You are using an <strong>outdated</strong> browser. Please <a href=\"http://browsehappy.com/\">upgrade your browser</a> to improve your experience.</p>\n" +
    "    <![endif]--> <!-- Add your site or application content here --> <!-- Document Wrapper\n" +
    "	============================================= --> <div class=\"clearfix\"> <!-- Top Bar\n" +
    "		============================================= --> <div id=\"top-bar\" class=\"transparent-topbar\"> <div class=\"container clearfix\"> <div class=\"col_half nobottommargin clearfix\"> <!-- Top Links\n" +
    "					============================================= --> <div class=\"top-links\"> <ul> <li><a ui-sref=\"login\">Login</a></li> <li><a ui-sref=\"signUp\">Sign Up</a></li> <li><a ui-sref=\"partner\">Partner With Us</a></li> <li><a ui-sref=\"careers\">Careers</a></li> </ul> </div> <!-- .top-links end --> </div> <div ng-controller=\"LinkCtrl\" class=\"col_half fright col_last clearfix nobottommargin\"> <!-- Top Social\n" +
    "					============================================= --> <div id=\"top-social\"> <ul> <li><a href=\"\" ng-click=\"openFacebook()\" class=\"si-facebook\"><span class=\"ts-icon\"><i class=\"icon-facebook\"></i></span><span class=\"ts-text\">Facebook</span></a></li> <li><a href=\"\" ng-click=\"openTwitter()\" class=\"si-twitter\"><span class=\"ts-icon\"><i class=\"icon-twitter\"></i></span><span class=\"ts-text\">Twitter</span></a></li> <li><a href=\"\" ng-click=\"openInstagram()\" class=\"si-instagram\"><span class=\"ts-icon\"><i class=\"icon-instagram\"></i></span><span class=\"ts-text\">Instagram</span></a></li> <li><a href=\"\" ng-click=\"openYoutube()\" class=\"si-youtube\"><span class=\"ts-icon\"><i class=\"icon-youtube\"></i></span><span class=\"ts-text\">Youtube</span></a></li> <li><a href=\"tel:1800 123 1234\" class=\"si-call\"><span class=\"ts-icon\"><i class=\"icon-call\"></i></span><span class=\"ts-text\">1800 123 1234</span></a></li> <li><a href=\"mailto:info@travike.com\" class=\"si-email3\"><span class=\"ts-icon\"><i class=\"icon-envelope2\"></i></span><span class=\"ts-text\">info@travike.com</span></a></li> </ul> </div> <!-- #top-social end --> </div> </div> </div> <!-- #top-bar end --> <!-- Header\n" +
    "		============================================= --> <header id=\"header\" class=\"transparent-header\" data-sticky-class=\"not-dark\" data-responsive-class=\"not-dark\"> <div id=\"header-wrap\"> <div class=\"container clearfix\"> <div id=\"primary-menu-trigger\"><i class=\"icon-reorder\"></i></div> <!-- Logo\n" +
    "					============================================= --> <div id=\"logo\"> <a href=\"\" ui-sref=\"home\" class=\"standard-logo\" data-dark-logo=\"images/logo-dark.png\"><img src=\"images/logo-dark.png\" alt=\"Canvas Logo\"></a> <a href=\"\" ui-sref=\"home\" class=\"retina-logo\" data-dark-logo=\"images/logo-dark@2x.png\"><img src=\"images/logo-dark@2x.png\" alt=\"Canvas Logo\"></a> </div> <!-- #logo end --> <!-- Primary Navigation\n" +
    "					============================================= --> <nav id=\"primary-menu\" class=\"style-2\"> <ul> <li> <a href=\"\" ui-sref-active=\"current\" ui-sref=\"home\"> <div><i class=\"icon-home2\"></i>Home</div> </a> </li> <li> <a href=\"\" ui-sref-active=\"active-menu\" ui-sref=\"gallery\"> <div><i class=\"icon-picture\"></i>Gallery</div> </a> </li> <li> <a href=\"\" ui-sref-active=\"active-menu\" ui-sref=\"events\"> <div><i class=\"icon-calendar\"></i>Events</div> </a> </li> <li> <a href=\"\" ui-sref-active=\"active-menu\" ui-sref=\"community\"> <div><i class=\"icon-users\"></i>Community</div> </a> </li> <li> <a href=\"\" ui-sref-active=\"active-menu\" ui-sref=\"about\"> <div><i class=\"icon-info\"></i>About Us</div> </a> </li> <li> <a href=\"\" ui-sref-active=\"active-menu\" ui-sref=\"contact\"> <div><i class=\"icon-call\"></i>Contact Us</div> </a> </li> </ul> </nav> <!-- #primary-menu end --> </div> </div> </header> <!-- #header end --> <!-- Page Title\n" +
    "		============================================= --> <section> {{test}} <div style=\"height: 520px\"> <div uib-carousel active=\"active\" interval=\"myInterval\" no-wrap=\"noWrapSlides\"> <div uib-slide ng-repeat=\"slide in slides\" index=\"slide.id\" style=\"background-color: #222\"> <img ng-src=\"{{slide.image}}\" style=\"margin:auto; min-width: 100%; height: 520px\"> <div class=\"carousel-caption\"> <p>{{slide.text}}</p> </div> </div> </div> </div> </section> <!-- #page-title end --> <section id=\"content\"> <div class=\"content-wrap nopadding\"> <div class=\"section notopmargin\"> <div class=\"container clearfix\"> <div class=\"heading-block center nobottomborder nobottommargin\"> <h2>Why Choose Us</h2> </div> </div> </div> </div> <div class=\"container bottommargin-lg clearfix\"> <div class=\"row\"> <div class=\"col-md-4 col-sm-12 col-xs-12\"> <div class=\"box-awesome-service\"> <div class=\"box-icon\"> <span class=\"icon-compass\"></span> </div> <div class=\"box-text\"> <h3>ADVENTURE</h3> <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse placerat urna a vehicula bibendum, cras erat ipsum.</p> </div> </div> </div> <div class=\"col-md-4 col-sm-12 col-xs-12\"> <div class=\"box-awesome-service\"> <div class=\"box-icon\"> <span class=\"icon-support\"></span> </div> <div class=\"box-text\"> <h3>FUN & SAFETY</h3> <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse placerat urna a vehicula bibendum, cras erat ipsum.</p> </div> </div> </div> <div class=\"col-md-4 col-sm-12 col-xs-12\"> <div class=\"box-awesome-service\"> <div class=\"box-icon\"> <span class=\"icon-flag\"></span> </div> <div class=\"box-text\"> <h3>IMPECCABLE SERVICE</h3> <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse placerat urna a vehicula bibendum, cras erat ipsum.</p> </div> </div> </div> </div> </div> </section> // New Header <!-- Header\n" +
    "		============================================= --> <header id=\"header\" class=\"transparent-header full-header\" data-sticky-class=\"not-dark\"> <div id=\"header-wrap\"> <div class=\"container clearfix\"> <div id=\"primary-menu-trigger\"><i class=\"icon-reorder\"></i></div> <!-- Logo\n" +
    "					============================================= --> <div id=\"logo\"> <a href=\"index.html\" class=\"standard-logo\" data-dark-logo=\"images/logo-dark.png\"><img src=\"images/logo-dark.png\" alt=\"Canvas Logo\"></a> <a href=\"index.html\" class=\"retina-logo\" data-dark-logo=\"images/logo-dark@2x.png\"><img src=\"images/logo@2x.png\" alt=\"Canvas Logo\"></a> </div><!-- #logo end --> <!-- Primary Navigation\n" +
    "					============================================= --> <nav id=\"primary-menu\" class=\"dark\"> <ul> <li class=\"current\"><a href=\"index.html\"><div>Home</div></a> </li> <li><a href=\"#\"><div>Features</div></a> </li> <li class=\"mega-menu\"><a href=\"#\"><div>Pages</div></a> </li> <li class=\"mega-menu\"><a href=\"#\"><div>Portfolio</div></a> </li> <li class=\"mega-menu\"><a href=\"#\"><div>Blog</div></a>> </li> <li><a href=\"shop.html\"><div>Shop</div></a> </li> <li class=\"mega-menu\"><a href=\"#\"><div>Shortcodes</div></a> </li> </ul> </nav><!-- #primary-menu end --> </div> </div> </header><!-- #header end --></div>"
  );


  $templateCache.put('views/testimonials.html',
    "<div style=\"background-color:#000;background-image: url('images/slider/1.jpg');background-size: cover; height:100vh\"> <div class=\"container clearfix\"> <div class=\"center-block slider-caption-center\"> <h2 class=\"text-center\" style=\"font-size:68px;letter-spacing:0px;font-weight:600;color:#fff;margin-top:200px\" data-caption-animate=\"fadeInUp\">Testimonials</h2> </div> </div> </div> <section> <div class=\"container\"> <div class=\"topmargin\"> <h2 style=\"text-align:center;margin-bottom:4rem;letter-spacing:-0.45px;line-height:1;font-weight:300;font-size:3.8rem\"> Testimonials <div style=\"display:block;height:2px;width:30px;background:#dc221a;margin-left:auto;margin-right:auto;margin-bottom:0;margin-top:15px\"> </div> </h2> </div> <div class=\"clearfix\" style=\"border:1px solid #EEE;padding:10px\"> <div class=\"pull-left\" style=\"width:30%\"> <a><img height=\"150\" width=\"150\" class=\"center-block img-circle\" src=\"images/blog2.jpg\" alt=\"Standard Post with Image\"></a> <h4 class=\"text-center\" style=\"line-height:1.2142857142857142;margin-top:0;margin-right:0;margin-bottom:0;margin-left:0;font-size:18px;color:#2c3643\"> Name</h4> <h4 class=\"text-center\" style=\"line-height:1.2142857142857142;margin-top:10px;margin-right:0;margin-bottom:0;margin-left:0;font-size:18px;color:#2c3643\"> <i class=\"icon-location\"></i>From City</h4> </div> <div class=\"pull-right\" style=\"width:70%\"> <div class=\"entry-title\"> <h3 style=\"line-height:1.2142857142857142;margin-top:0;margin-right:0;margin-bottom:0;margin-left:0;font-size:18px;font-weight:100;color:#2c3643\"> June 21, 2016</h3> </div> <div class=\"entry-content\" style=\"margin-top:50px\"> <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cupiditate, asperiores quod est tenetur in. Eligendi, deserunt, blanditiis est quisquam doloribus voluptate id aperiam ea ipsum magni aut perspiciatis rem voluptatibus officia eos rerum deleniti quae nihil facilis repellat atque vitae voluptatem libero at eveniet veritatis ab facere. <br> Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cupiditate, asperiores quod est tenetur in. Eligendi, deserunt, blanditiis est quisquam doloribus voluptate id aperiam ea ipsum magni aut perspiciatis rem voluptatibus officia eos rerum deleniti quae nihil facilis repellat atque vitae voluptatem libero at eveniet veritatis ab facere. </p> </div> </div> </div> <div class=\"clearfix\" style=\"border:1px solid #EEE;padding:10px; margin:20px 0\"> <div class=\"pull-right\" style=\"width:30%\"> <a><img height=\"150\" width=\"150\" class=\"center-block img-circle\" src=\"images/blog2.jpg\" alt=\"Standard Post with Image\"></a> <h4 class=\"text-center\" style=\"line-height:1.2142857142857142;margin-top:0;margin-right:0;margin-bottom:0;margin-left:0;font-size:18px;color:#2c3643\"> Name</h4> <h4 class=\"text-center\" style=\"line-height:1.2142857142857142;margin-top:10px;margin-right:0;margin-bottom:0;margin-left:0;font-size:18px;color:#2c3643\"> <i class=\"icon-location\"></i>From City</h4> </div> <div class=\"pull-left\" style=\"width:70%\"> <div class=\"entry-title\"> <h3 style=\"line-height:1.2142857142857142;margin-top:0;margin-right:0;margin-bottom:0;margin-left:0;font-size:18px;font-weight:100;color:#2c3643\"> June 21, 2016</h3> </div> <div class=\"entry-content\" style=\"margin-top:50px\"> <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cupiditate, asperiores quod est tenetur in. Eligendi, deserunt, blanditiis est quisquam doloribus voluptate id aperiam ea ipsum magni aut perspiciatis rem voluptatibus officia eos rerum deleniti quae nihil facilis repellat atque vitae voluptatem libero at eveniet veritatis ab facere. <br> Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cupiditate, asperiores quod est tenetur in. Eligendi, deserunt, blanditiis est quisquam doloribus voluptate id aperiam ea ipsum magni aut perspiciatis rem voluptatibus officia eos rerum deleniti quae nihil facilis repellat atque vitae voluptatem libero at eveniet veritatis ab facere. </p> </div> </div> </div> <div style=\"padding:0px 0 30px 0; float: none; display: block; margin-right: auto; margin-left: auto\" class=\"control-center col-sm-6\"> <button ui-sref=\"plan-trip\" style=\"margin:0px !important; width:97%; height:70px\" id=\"{{inquireSubmit}}\" class=\"button buttonPrimary\"><i class=\"icon-plane\"></i>Plan Your Trip</button> </div> </div> </section> "
  );


  $templateCache.put('views/tnc.html',
    "<section style=\"background:#444\" id=\"page-title\"> </section> <div class=\"container padding-t-30 padding-b-30\"> <h1 class=\"font-24 sm-font-20\">Terms &amp; Conditions</h1> Welcome to WanderWagon.com(\"Website\"). The domain name www.WanderWagon.com is owned by WanderWagon Private Limited a company incorporated under the Companies Act, 1956(hereinafter referred to as \"WanderWagon\" or “WW”). WW's registration number is 13/172/2011. The term 'You' refers to the user or viewer of the Website. <br><br> Your use of the Website and services and tools are governed by the following terms and conditions (\"Terms of Use\") as applicable to the Website including the applicable policies which are incorporated herein by way of reference. If You transact on the Website, You shall be subject to the policies that are applicable to the Website for such transaction. By mere use of the Website, You shall be contracting with WanderWagon and these terms and conditions including the policies constitute Your binding obligations, with WanderWagon. The use of this website is subject to the following terms of use:<br><br> <ul class=\"normal_ul\"> <li>The content of the pages of this website is for your general information and use only. It is subject to change without notice.</li> <li>Your use of any information or materials on this website is entirely at your own risk, for which we shall not be liable. It shall be your own responsibility to ensure that any products, services or information available through this website meet your specific requirements.</li> <li>This website contains material which is owned by or licensed to us. This material includes, but is not limited to, the design, layout, look, appearance and graphics. Reproduction is prohibited other than in accordance with the copyright notice, which forms part of these terms and conditions.</li> <li>Unauthorised use of this website may give rise to a claim for damages and/or be a criminal offence.</li> <li>From time to time this website may also include links to other websites. These links are provided for your convenience to provide further information. They do not signify that we endorse the website(s). We have no responsibility for the content of the linked website(s).</li> <li>WW hereby expressly disclaims any implied warranties imputed by the laws of any jurisdiction or country other than those in India. WW considers itself and intends to be subject to the jurisdiction only of the courts of NCR of Delhi, India.</li> <li>You agree and acknowledge that WW will have the right of indemnification for any loss that may be caused to WW for any misuse of its website by You and WW will have all rights to approach any court of law for enforcement of such rights.</li> <li> WW or its affiliate partners will not be liable for any Visa rejections and Hotel cancellation policies would still stand as they are.</li> <li>Traveler are advised to check that passports are valid and eligible for international travel. WanderWagon or affiliated parties will not be liable for passport being declared ineligible for entry/exit. <ul class=\"padding-l-10\"> <li>Validity of passports should be at least 6 months from date of return.</li> <li>Hand wriWWen passports will not be considered valid</li> <li>Passports must have Barcode</li> <li>Passports should not be mutilated or tampered</li> <li>Name on passport should match with name on other documents provided for visa</li> </ul> </li> <li>Force Majeure: None of the parties shall be responsible for, nor be deemed to be in default on account of, any failure to perform or delay in performance hereunder caused directly or indirectly by any fact beyond supplier’s reasonable control including, but not limited to, acts of God, war, terrorism, criminal acts of third parties, embargo, strikes or other labour disputes, work stoppages, riots, civil unrest, fires or acts of government (“Force Majeure”). The Parties shall use their best efforts to avoid, overcome and offset the effects of any cause or potential cause of an event of Force Majeure. Upon cessation of the cause of the Force Majeure, this Agreement shall again become fully operative. However, a Force Majeure event will not relieve either Party of the obligations accrued prior to the occurrence of the Force Majeure. In case Force Majeure event persists, either party can terminate this agreement by communicating in writing and losses, if any, would be decided at large.</li> </ul> <br><br> <b>Platform for Transaction and Communication</b><br> The Website is a platform that Users utilize to meet and interact with one another for their transactions. WanderWagon is not and cannot be a party to or control in any manner any transaction between the Website’s Users. Henceforward: <br><br> <ul class=\"normal_ul\"> <li>All commercial/contractual terms are offered by and agreed to between Buyers (travelers) and Sellers (travel agents) alone. The commercial/contractual terms include without limitation price, payment methods, payment terms, date, period and mode of delivery, warranties related to products and services and after sales services related to products and services. WanderWagon does not have any control or does not determine or advise or in any way involve itself in the offering or acceptance of such commercial/contractual terms between the Buyers and Sellers.</li> <li>You acknowledge that through this Website, WanderWagon merely provides a platform which enables you to have access to various travel services offered by the Sellers. It is agreed that the contract for sale of any of the products or services shall be a strictly bipartite contract between the Seller and the Buyer.</li> <li>WanderWagon (including its directors, officers, employees, agents and their respective successors, heirs and assigns) shall not be or deemed to be responsible or liable for any direct, indirect, punitive, incidental, special, or consequential damages arising out of, or in any way connected with, your access to, display of or use of this Website or for any lack or deficiency of services provided by any person (including any airline, travel agent / tour operator, hotel, facility or similar agency) you shall engage or hire or appoint pursuant to or resulting from, the material available on this website.</li> <li>WanderWagon does not make any representation or warranty as to the item-specifics (such as legal title, creditworthiness, identity, etc) of any of its Users. You are advised to independently verify the bona fides of any particular User that You choose to deal with on the Website and use Your best judgment in that behalf.</li> <li>WW shall not be liable for delays or inabilities in performance or nonperformance in whole or in part of its obligations due to any causes that are not due to its acts or omissions and are beyond its reasonable control, such as acts of God, fire, strikes, embargo, acts of government, acts of terrorism or other similar causes, problems at airlines, rails, buses, hotels or transporters end. In such event, the user affected will be promptly given notice as the situation permits.</li> </ul> <br><br> <b class=\"font-20\">Contact Us</b><br> Please send any questions or comments (including all inquiries unrelated to copyright infringement) regarding this Website to customercare@WanderWagon.com. <br><br> Grievance officer<br> In accordance with Information Technology Act 2000 and rules made there under, the name and contact details of the Grievance Officer are provided below:<br> Mr. Madhukar Bhardwaj<br> Holiday Triangle Travel Pvt Ltd<br> Pioneer House, Lower Ground Floor,A 45-50<br> Sector-16,Noida-201301​<br> UWWar-Pradesh,India<br> Phone: 1800 123 5555<br> Email: customercare@WanderWagon.com<br> </div> "
  );


  $templateCache.put('views/travel-plan.html',
    " <div style=\"background-color:#000;background-image: url('images/travel.jpg');background-size: cover; height:100vh\"> <div class=\"container clearfix\"> <div class=\"slider-caption-center\"> <h2 class=\"text-center\" style=\"font-size:48px;letter-spacing:0px;font-weight:600;color:#fff;margin-top:200px\" data-caption-animate=\"fadeInUp\"> It's time to travel</h2> <!--<a class=\"custom-button center-block text-center\">\n" +
    "         <span>Let's Wander</span> <i style=\"margin-left:10px;\" class=\"icon-angle-right\"></i></a>--> </div> </div> </div> <section id=\"content\"> <div class=\"container\"> <div class=\"topmargin\"> <h2 style=\"text-align:center;margin-bottom:4rem;letter-spacing:-0.45px;line-height:1;font-weight:300;font-size:3.8rem\"> Travel Inspiration <div style=\"display:block;height:2px;width:30px;background:#dc221a;margin-left:auto;margin-right:auto;margin-bottom:0;margin-top:15px\"> </div> </h2> </div> <div class=\"row\"> <div class=\"row\"> <div class=\"col-md-3\"> <!-- Controls --> <div class=\"controls hidden-xs\"> <a class=\"icon-angle-left btn\" href=\"#carousel-example-generic\" ng-non-bindable data-slide=\"prev\"></a> <a class=\"icon-angle-right btn\" href=\"#carousel-example-generic\" ng-non-bindable data-slide=\"next\"></a> </div> </div> </div> <div id=\"carousel-example-generic\" class=\"carousel slide hidden-xs\" data-ride=\"carousel\"> <!-- Wrapper for slides --> <div class=\"carousel-inner\"> <div class=\"item active\"> <div class=\"row\"> <div class=\"col-sm-4\"> <div ng-click=\"heading1.isOpen = !heading1.isOpen\" style=\"cursor:pointer\" class=\"col-item\"> <div style=\"width:350px; height:400px\" class=\"photo\"> <img ng-src=\"{{images[0].imageUrl}}\" class=\"img-responsive\" alt=\"a\"> </div> <div class=\"info\"> <h5 style=\"font-size:1.6rem\" class=\"text-center\"> {{images[0].text}}</h5> </div> </div> </div> <div class=\"col-sm-4\"> <div ng-click=\"heading1.isOpen = !heading1.isOpen\" style=\"cursor:pointer\" class=\"col-item\"> <div style=\"width:350px; height:400px\" class=\"photo\"> <img ng-src=\"{{images[1].imageUrl}}\" class=\"img-responsive\" alt=\"a\"> </div> <div class=\"info\"> <h5 style=\"font-size:1.6rem\" class=\"text-center\"> {{images[1].text}}</h5> </div> </div> </div> <div class=\"col-sm-4\"> <div ng-click=\"heading1.isOpen = !heading1.isOpen\" style=\"cursor:pointer\" class=\"col-item\"> <div style=\"width:350px; height:400px\" class=\"photo\"> <img ng-src=\"{{images[2].imageUrl}}\" class=\"img-responsive\" alt=\"a\"> </div> <div class=\"info\"> <h5 style=\"font-size:1.6rem\" class=\"text-center\"> {{images[2].text}}</h5> </div> </div> </div> </div> </div> <div class=\"item\"> <div class=\"row\"> <div class=\"col-sm-4\"> <div ng-click=\"heading1.isOpen = !heading1.isOpen\" style=\"cursor:pointer\" class=\"col-item\"> <div style=\"width:350px; height:400px\" class=\"photo\"> <img ng-src=\"{{images[3].imageUrl}}\" class=\"img-responsive\" alt=\"a\"> </div> <div class=\"info\"> <h5 style=\"font-size:1.6rem\" class=\"text-center\"> {{images[3].text}}</h5> </div> </div> </div> <div class=\"col-sm-4\"> <div ng-click=\"heading1.isOpen = !heading1.isOpen\" style=\"cursor:pointer\" class=\"col-item\"> <div style=\"width:350px; height:400px\" class=\"photo\"> <img ng-src=\"{{images[4].imageUrl}}\" class=\"img-responsive\" alt=\"a\"> </div> <div class=\"info\"> <h5 style=\"font-size:1.6rem\" class=\"text-center\"> {{images[4].text}}</h5> </div> </div> </div> <div class=\"col-sm-4\"> <div ng-click=\"heading1.isOpen = !heading1.isOpen\" style=\"cursor:pointer\" class=\"col-item\"> <div style=\"width:350px; height:400px\" class=\"photo\"> <img ng-src=\"{{images[5].imageUrl}}\" class=\"img-responsive\" alt=\"a\"> </div> <div class=\"info\"> <h5 style=\"font-size:1.6rem\" class=\"text-center\"> {{images[5].text}}</h5> </div> </div> </div> </div> </div> </div> </div> <uib-accordion> <uib-accordion-group is-open=\"heading1.isOpen\"> <div style=\"padding-left:50px\" id=\"posts\" class=\"events small-thumbs\"> <div class=\".col-md-4\" ng-repeat=\"destination in destinations\"> <div class=\"entry-image\" style=\"padding-bottom:10px\"> <a href=\"#\" ui-sref=\"destination.detail({id: destination.id})\"> <img ng-src=\"{{destination.imageUrl}}\" alt=\"Inventore voluptates velit totam ipsa tenetur\"> <h3 class=\"text-center\">{{destination.name}}</h3> </a> </div> </div> </div> </uib-accordion-group> </uib-accordion> </div> <div class=\"clear\"></div> <div class=\"topmargin\"> <h2 style=\"text-align:center;margin-bottom:4rem;letter-spacing:-0.45px;line-height:1;font-weight:300;font-size:3.8rem\"> Recent Articles <div style=\"display:block;height:2px;width:30px;background:#dc221a;margin-left:auto;margin-right:auto;margin-bottom:0;margin-top:15px\"> </div> </h2> </div> <div class=\"clearfix\"> <div class=\"pull-right\" style=\"width:40%\"> <a href=\"images/blog1.jpg\" data-lightbox=\"image\"><img height=\"300px;\" src=\"images/blog1.jpg\" alt=\"Standard Post with Image\"></a> </div> <div class=\"pull-left\" style=\"width:50%; padding-right:50px\"> <div class=\"entry-title\"> <h3 style=\"cursor:pointer\" ui-sref=\"blog.list\" style=\"line-height:1.2142857142857142;margin-top:0;margin-right:0;margin-bottom:0;margin-left:0;font-size:28px;font-weight:600;color:#2c3643\"> For rivers, seas and slopes at their most inviting</h3> </div> <div class=\"entry-content\" style=\"margin-top:50px\"> <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cupiditate, asperiores quod est tenetur in. Eligendi, deserunt, blanditiis est quisquam doloribus voluptate id aperiam ea ipsum magni aut perspiciatis rem voluptatibus officia eos rerum deleniti quae nihil facilis repellat atque vitae voluptatem libero at eveniet veritatis ab facere. </p> <a href=\"blog-single.html\" class=\"more-link\">Read More</a> </div> </div> </div> <div style=\"margin:30px 0 30px 0\" class=\"clearfix\"> <div class=\"pull-left\" style=\"width:40%\"> <a href=\"images/blog2.jpg\" data-lightbox=\"image\"><img height=\"300px;\" class=\"image_fade\" src=\"images/blog2.jpg\" alt=\"Standard Post with Image\"></a> </div> <div class=\"pull-right\" style=\"width:50%; padding-left:10px\"> <div class=\"entry-title\"> <h3 style=\"cursor:pointer\" ui-sref=\"blog.list\" style=\"line-height:1.2142857142857142;margin-top:0;margin-right:0;margin-bottom:0;margin-left:0;font-size:28px;font-weight:600;color:#2c3643\"> For rivers, seas and slopes at their most inviting</h3> </div> <div class=\"entry-content\" style=\"margin-top:50px\"> <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cupiditate, asperiores quod est tenetur in. Eligendi, deserunt, blanditiis est quisquam doloribus voluptate id aperiam ea ipsum magni aut perspiciatis rem voluptatibus officia eos rerum deleniti quae nihil facilis repellat atque vitae voluptatem libero at eveniet veritatis ab facere. </p> <a href=\"blog-single.html\" class=\"more-link\">Read More</a> </div> </div> </div> <div style=\"padding:0px 0 30px 0; float: none; display: block; margin-right: auto; margin-left: auto\" class=\"control-center col-sm-6\"> <button ui-sref=\"plan-trip\" style=\"margin:0px !important; width:97%; height:70px\" id=\"{{inquireSubmit}}\" class=\"button buttonPrimary\">Couldn't decide ? Let us Help You !</button> </div> </div>  </section> "
  );

}]);
