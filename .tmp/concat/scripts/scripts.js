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
    'ae-datetimepicker',
    'ngMap',
    'sticky',
    'duScroll',
    'vAccordion',
    'satellizer',
    '720kb.socialshare',
    'angular-owl-carousel-2',
    'ng.picturefill',
    'hm.readmore'
  ])
  .config(['$routeProvider', '$urlRouterProvider', '$stateProvider', '$locationProvider', '$authProvider', function ($routeProvider, $urlRouterProvider, $stateProvider, $locationProvider, $authProvider) {

    $locationProvider.html5Mode(true);
    // $locationProvider.hashPrefix('');

    $authProvider.baseUrl = '/';

    $authProvider.facebook({
      clientId: '1758555154405794',
      responseType: 'token',
      redirectUri : window.location.origin + '/home'
    });


    $authProvider.google({
      clientId: '1074764438873-k221gusckcgqaalhqnsqn891kjoigcas.apps.googleusercontent.com',
      responseType: 'token',
      redirectUri : window.location.origin + '/home'
    });

    $urlRouterProvider.otherwise('/home');

    $stateProvider
      .state('home', {
        url: '/home',
        templateUrl: 'views/home.html',
        controller: 'HomeCtrl'
      })
      .state('signUp', {
        url: '/signUp',
        templateUrl: 'views/signUp.html',
        controller: 'LoginCtrl',
      })
      // .state('user-profile', {
      //   url: '/user-profile',
      //   templateUrl: 'views/account.html',
      //   controller: 'AccountCtrl'
      // })
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
      .state('travel-plan', {
        url: '/travel-plan',
        abstract: true,
        template: "<ui-view></ui-view>"
      })
      .state('travel-plan.list', {
        url: '',
        templateUrl: 'views/travel-plan.html',
        controller: 'TravelPlanCtrl'
      })
      .state('travel-plan.detail', {
        url: '/:id',
        templateUrl: 'views/travel-plan-detail.html',
        controller: 'TravelPlanDetailCtrl'
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
      .state('emailVerify', {
        url: '/emailVerify',
        templateUrl: 'views/email-verification.html',
        controller: 'EmailVerificationCtrl'
      })
      .state('changePassword', {
        url: '/changePassword',
        templateUrl: 'views/change-password.html',
        controller: 'ChangePasswordCtrl'
      })
      .state('privacy-policy', {
        url: '/privacy-policy',
        templateUrl: 'views/privacy-policy.html',
        controller: 'ContactCtrl'
      })
      .state('payment', {
        url: '/payment',
        templateUrl: 'views/payment.html',
        controller: 'PaymentCtrl'
      })
      .state('events', {
        url: '/events/:id',
        templateUrl: 'views/events.html',
        controller: 'EventCtrl'
      });

  }])
  .run(["$rootScope", "$location", "$window", "auth", "$anchorScroll", function ($rootScope, $location, $window, auth, $anchorScroll) {

    $rootScope.changeLocation = function (path) {
      $rootScope.$evalAsync(function () {
        $location.path(path);
      });
    };

    $rootScope.$on("$locationChangeSuccess", function () {
      $window.ga('send', 'pageview', $location.path());
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
  .controller('LoginCtrl', ["$scope", "$rootScope", "$window", "$cookies", "auth", "$location", "$auth", function ($scope, $rootScope, $window, $cookies, auth, $location, $auth) {

    $scope.showModal = function(messageType, message) {
      angular.element(document.querySelectorAll('#loginModal')).modal('show');
      $scope.messageType = messageType;
      $scope.message = message;
    };

    $rootScope.$on('show-login', function (event, data) {
      $scope.showModal('Error', "Error While With Facebook Login. Please Try After Some Time");
    });


    $scope.authenticate = function (provider) {
      $auth.authenticate(provider)
        .then(function (response) {
          if (provider == 'google') {
            auth.googleLogin(response.access_token)
              .then(function (data) {
                    $location.path('/home');
                    $rootScope.$emit('social-login', 'true');                    
              })
              .catch(function (error) {
                $scope.showModal('Error', "Error While With Facebook Login. Please Try After Some Time");
              });
              
          } else {
            auth.facebookLogin(response.access_token)
              .then(function (data) {
                $location.path('/home');
                 $rootScope.$emit('social-login', 'true'); 
              })
              .catch(function (error) {
                $scope.showModal('Error', "Error While With Facebook Login. Please Try After Some Time");
              });
          }
        })
        .catch(function (response) {
          console.log("Something went Wrong");
        })
    };





    $scope.signUpObj = {};
    $scope.onSignUpFormSubmit = function (form) {
      if (form.$valid) {
        $scope.obj = {};
        if ($scope.signUpObj.password == $scope.signUpObj.confirmPassword) {
          $scope.obj.email = $scope.signUpObj.email;
          $scope.obj.password = $scope.signUpObj.password;
          $scope.obj.name = $scope.signUpObj.name;
          $scope.obj.phone = $scope.signUpObj.phone;
          $scope.obj.accountType = 3;


          auth.signUp($scope.obj)
            .then(function (data) {
             $scope.showModal("Confirm Your Email Address", "A confirmation email has been sent to " + $scope.signUpObj.email + ". Click on the confirmation link in the email to verify your email address.");
              $scope.signUpObj = {};
            })
            .catch(function (data) {
              console.log(data.error.message);
             $scope.showModal("Error", data.error.message);

          });
        } else {
              $scope.showModal("Error", "Password Doesn't Match !");
        }
      }
    };


    $scope.redirected = $cookies.getObject('redirected');
    $scope.loginObj = {};
    $scope.pwdObj = {};
    $scope.resendObj = {};


    var login = function (loginObj) {
    };

    $scope.onLoginFormSubmit = function (form) {
      if (form.$valid) {
        $scope.loginObj.accountType = 3;
         auth.login($scope.loginObj)
            .then(function (data) {
                  $location.path('/home');
                  $rootScope.$emit('social-login', 'true'); 
            })
            .catch(function (error) {
             $scope.showModal("Error", error.error.message);

          });
      }
    };



    $scope.showPasswordModal = function () {
       angular.element(document.querySelectorAll('#passwordModal')).modal('show');
    };


    $scope.emailSubmit = false;

    $scope.onEmailFormSubmit = function () {
      var email = $scope.emailObj.email;

      auth.forgotPassword(email)
        .success(function (data) {
  
          $scope.emailSubmit = true;
          $scope.message = "Password reset link has been sent to email " + email ;
        })
        .error(function (error){
          console.log(error);
        })
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
  .controller('HomeCtrl', ["$scope", "$timeout", "remoteSvc", "$document", "$window", "$interval", "$location", function ($scope, $timeout, remoteSvc, $document, $window, $interval, $location) {

    $scope.getBlogs = function () {
      remoteSvc.getHomeBlogs().then(function (response) {
        $scope.blog = response;
      })
    };

    
    $scope.getTravelInspirations = function () {
      remoteSvc.getTravelInspirations().then(function (response) {
        $scope.sliderData = response;
      });
    };

    $scope.travelPlanData = [];
    var getTravelPlans = function (id) {
      remoteSvc.getTravelPlans(id).then(function (response){
        $scope.travelPlanData = response;
      });
    };


    $scope.getTravelInspirations();
    $scope.getBlogs();


    $scope.openAccordion = false;
    $scope.openOrCloseAccordion = function (id) {
      if ($scope.openAccordion === true) {
        $scope.closeAccordion();
      } else if ($scope.openAccordion === false) {
        $scope.openAccordion = true;
        getTravelPlans(id);
      }
    };

    $scope.closeAccordion = function () {
      $scope.travelPlanData = undefined;
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

    var showImageModal = function() {
      angular.element(document.querySelectorAll('#homeFormModal')).modal('show');
    };



    $scope.onFormSubmit = function (form) {
      if (form.$valid) {
        remoteSvc.quickQuery($scope.inquiryObj)
          .success(function (data) {
            $scope.inquiryObj = {};
            showImageModal();
          })
          .error(function (error) {
            $scope.inquiryObj = {};
            $scope.showModal('Error', "Error While Submitting Your Request");
          })
      } else {
        $scope.showModal('Error', "Please Enter Correct Details");
      }
    };


   

    var owlAPi;
    $scope.ready = function ($api) {
      owlAPi = $api;
  };
   
    $scope.properties = {
      autoHeight:true,
      animateIn: 'fadeIn',
      lazyLoad: true,
      items: 3,
      margin: 0,
      mouseDrag: true,
      touchDrag: true,
      dots: false,
      nav: true,
      responsiveClass:true,
      navText : ["<i class='icon-circle-arrow-left'></i>","<i class='icon-circle-arrow-right'></i>"],
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

 

$scope.accordionProperties = {
  autoHeight:true,
  animateIn: 'fadeIn',
  lazyLoad: true,
  items: 3,
  margin: 10,
  mouseDrag: true,
  touchDrag: true,
  dots: false,
  nav: true,
  responsiveClass:true,
  navText : ["<i class='icon-circle-arrow-left'></i>","<i class='icon-circle-arrow-right'></i>"],
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
  .controller('LinkCtrl', ["$scope", "$window", "$location", "$rootScope", "$auth", "$timeout", "auth", "remoteSvc", function ($scope, $window, $location, $rootScope, $auth, $timeout, auth, remoteSvc) {

    $scope.checked = true;
    $scope.isEventOpen = false;

    if (auth.isLoggedIn()) {
      $rootScope.loggedIn = true;
    } else {
      $rootScope.loggedIn = false;
    }
    $scope.userName = auth.getUserName();


    $rootScope.$on('social-login', function (event, data) {
      $rootScope.loggedIn = data;
      $scope.userName = auth.getUserName();
    });

    remoteSvc.getAllEvents().then(function (data){
      $rootScope.eventList = data.response;
    })



    $rootScope.onLogOut = function () {
      auth.logout();
      $location.path('/home');
      $rootScope.loggedIn = false;
    }

      $scope.showModal = function(messageType, message) {
      angular.element(document.querySelectorAll('#successModal')).modal('show');
      $scope.messageType = messageType;
      $scope.message = message;
    };

     $scope.showLoginModal = function(messageType, message) {
      angular.element(document.querySelectorAll('#loginModal')).modal('show');
      $scope.messageType = messageType;
      $scope.message = message;
    };

     var closeLoginModal = function () {
      angular.element(document.querySelectorAll('#loginModal')).modal('hide');
    };


    $rootScope.authenticate = function (provider) {
      $auth.authenticate(provider)
        .then(function (response) {
          if (provider == 'google') {
            auth.googleLogin(response.access_token)
            .then(function (data) {
              closeLoginModal();
              $rootScope.$emit('social-login', 'true');                    
            })
            .catch(function (error) {
              closeLoginModal();
              $scope.showModal('Error', "Error While With Facebook Login. Please Try After Some Time");
            });
          } else{
            auth.facebookLogin(response.access_token)
            .then(function (data) {
              closeLoginModal();
               $rootScope.$emit('social-login', 'true'); 
            })
            .catch(function (error) {
              closeLoginModal();
              $scope.showModal('Error', "Error While With Facebook Login. Please Try After Some Time");
            });
          }
        })
        .catch(function (response) {
          closeLoginModal();
          console.log(response);
        })
    };

    var showImageModal = function() {
      angular.element(document.querySelectorAll('#imageModal')).modal('show');
    };


    $scope.onSubscribeFormSubmit = function (form) {
      if (form.$valid) {
        remoteSvc.submitNewsletterEmail($scope.emailObj)
          .success(function (data) {
            $scope.emailObj = {};
            showImageModal();
          })
          .error(function (error) {
            $scope.showModal("Error", "Error while submitting your request !");
          })
      }
    };


    $scope.openEvents = function(){
      if($scope.isEventOpen) {
        $scope.isEventOpen = false;
      } else{
        $scope.isEventOpen = true;
      }
      
    }



    $scope.openSideNav = function () {
      angular.element(document.getElementById('mySidenav')).css('width', '50%');
    }

    $rootScope.closeSideNav = function () {
      angular.element(document.getElementById('mySidenav')).css('width', '0px');
      $scope.isEventOpen = false;
    }

    $scope.openSocialSite = function (name) {
      $window.open('https://www.' + name + '.com/wanderwagon', ' _blank');
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
  .controller('PlanTripCtrl', ["$scope", "remoteSvc", "auth", "$rootScope", function ($scope, remoteSvc, auth, $rootScope) {

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
        if(form.$valid) {
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
          $scope.showModal("Error", "Please enter details correctly !");
        }
      } else{
        $scope.showLoginModal("Log In", "");
      }
    };
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
  .controller('BlogListCtrl', ["$scope", "remoteSvc", function ($scope, remoteSvc) {

    $scope.getBlogList = function () {
      remoteSvc.getBlogList().then(function (response){
        $scope.posts = response;
      });
    };
    $scope.getBlogList();


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
  .controller('BlogDetailCtrl', ["$q", "$scope", "$rootScope", "$cookies", "$stateParams", "remoteSvc", "$window", "$auth", "$location", "auth", function ($q, $scope, $rootScope, $cookies, $stateParams, remoteSvc, $window, $auth, $location, auth) {

    var postId = $stateParams.postId;

    $scope.showModal = function (messageType, message) {
      angular.element(document.querySelectorAll('#shareModal')).modal('show');
      $scope.messageType = messageType;
      $scope.message = message;
    };

     $scope.showLoginModal = function (messageType, message) {
      angular.element(document.querySelectorAll('#loginModal')).modal('show');
      $scope.messageType = messageType;
      $scope.message = message;
    };

    var closeLoginModal = function () {
      angular.element(document.querySelectorAll('#loginModal')).modal('hide');
    };

    $scope.getBlogDetail = function () {
      remoteSvc.getBlogDetail(postId).then(function (response) {
        $scope.postDetail = response.response;
      }); 
    };
    $scope.getBlogDetail();

    var getComments = function(postId) {
      remoteSvc.getCommentsByBlogId(postId).then(function (response){
        $scope.comments = response;
      })
    };
    getComments(postId);

    $scope.commentObj = {};
    $scope.postComment = function (blogId) {
      $scope.commentObj.blogId = blogId;
      remoteSvc.postComment($scope.commentObj)
        .success(function (data){
          $scope.commentObj = {};
          getComments(postId);
        })
        .error(function (error){
          console.log(error);
        });
    };


    
    $scope.showForm = false;
    $scope.showCommentForm = function() {
        if (auth.isLoggedIn()) {
           $scope.showForm = true;
        } else {
           $scope.showLoginModal("Log In", "");
        }
    };  

    $rootScope.$on('social-login', function (event, data) {
      $scope.showForm = true;
    });

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
  .controller('DestinationCtrl', ["$scope", "remoteSvc", function ($scope, remoteSvc) {

    $scope.getDestinationsList = function() {
      remoteSvc.getDestinationsList().then(function(data){
        $scope.destinations = data.response;
      });
    };

    $scope.getDestinationsList();


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
  .controller('ContactCtrl', ["$scope", "$window", "remoteSvc", function ($scope, $window, remoteSvc) {

    $scope.showModal = function (messageType, message) {
      angular.element(document.querySelectorAll('#contactModal')).modal('show');
      $scope.messageType = messageType;
      $scope.message = message;
    };

    var showImageModal = function() {
      angular.element(document.querySelectorAll('#contactImageModal')).modal('show');
    };

    $scope.submitContactForm = function (form) {
      if (form.$valid) {
        remoteSvc.submitContactForm($scope.contactObj)
          .success(function (data) { 
            $scope.contactObj = {};
            showImageModal();
          })
          .error(function (error) {
            console.log(error);
            $scope.contactObj = {};
            $scope.showModal("Error", error.error.message);
          });
      }
    };

   


    $scope.submitTravelEnquiryForm = function(form) {
      if (form.$valid) {
        remoteSvc.submitTravelEnquiryForm($scope.travelEnqObj)
          .success(function (data) { 
            showImageModal();
          })
          .error(function (error) {
            console.log(error);
            $scope.showModal("Error", error.error.message);
          });
      }
    };

    $scope.openFacebook = function () {
      $window.open('https://www.facebook.com/wanderwagon', ' _blank');
    };

    $scope.openInstagram = function () {
      $window.open('https://www.instagram.com/wanderwagon', ' _blank');
    };



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
          .post(remoteAddr + '/auth/signup', reqObj)
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
          .post(remoteAddr + '/auth/login', reqObj)
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

      facebookLogin: function (token, callback) {
        var cb = callback || angular.noop;
        var deferred = $q.defer();

        $http
          .post(remoteAddr + '/auth/facebook-login?access-token='+ token)
          .success(function (data, status) {
            $cookies.put('token', data.response.signUpResponse.token);
            $cookies.put('tokenTime', (new Date()).getTime());
            $cookies.put('userName', data.response.userProfile.name);
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

      googleLogin: function (token, callback) {
        var cb = callback || angular.noop;
        var deferred = $q.defer();

        $http
          .post(remoteAddr + '/auth/google-login?access-token='+token)
          .success(function (data, status) {
            $cookies.put('token', data.response.signUpResponse.token);
            $cookies.put('tokenTime', (new Date()).getTime());
            $cookies.put('userName', data.response.userProfile.name);
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

      verifyEmail: function (token, userId, callback) {
        var cb = callback || angular.noop;
        var deferred = $q.defer();

        $http
          .get(remoteAddr + '/auth/verify-email?token=' + token + '&userId=' + userId)
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

      forgotPassword: function (token, email, callback) {
        var cb = callback || angular.noop;
        var deferred = $q.defer();

        $http
          .get(remoteAddr + '/auth/forget-password?token=' + token + '&email=' + email)
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

      updatePassword: function (updatePassObj) {
        return $http({
          method:'PUT',
          data: updatePassObj,
          url: remoteAddr + '/auth/updatePassword'
        })
      },

      logout: function () {
        $cookies.remove('token');
        $cookies.remove('tokenTime');
        $cookies.remove('currUser');
        $cookies.remove('role');
        $cookies.remove('fb-token');
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
      },

      getUserName: function () {
        return $cookies.get('userName');
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

    var homePageData;
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

      updateConsumerProfile: function (profileObj) {
        return $http({
          method: 'POST',
          data: profileObj,
          headers: {
            'auth-token': auth.getToken()
          },
          url: remoteAddr + 'consumer/account/editprofile'
        })
      },

      getCurrentUri: function () {
        return $location.path();
      },


      // **** BLOGS API ******* //


      getBlogList: function () {
        return $http({
          method: 'GET',
          url: remoteAddr + '/blogs/all'
        }).then(function (data, status){
           var posts = [];
          for (var i = 0; i < data.data.response.length; i++) {
            var post = data.data.response[i];
            posts[i] = {};
            posts[i].title = post.title;
            posts[i].author = post.user.name;
            posts[i].description = post.description;
            posts[i].imageUrl = post.imageUrl;
            posts[i].id = post.id;
            posts[i].comments = post.comments;
            posts[i].date = new Date(new Date(post.time).getTime());
          }
          return posts;
        }, function (error, status) {
          return error.data;
        })
      },

      getBlogDetail: function (postId) {
        return $http({
          method: 'GET',
          url: remoteAddr + '/blogs/blogdetail/' + postId
        }).then(function (data, status){
          return data.data;
        }, function (error, status){
          return error.data;
        });
      },

      getBlogInstaPhotos : function() {
        return $http({
          method: 'GET',
          url: remoteAddr + '/blogs/instaPhotos'
        })
      },

      getSimilarBlogs : function(blogId) {
        return $http({
          method: 'GET',
          url: remoteAddr + '/blogs/similarBlogs/' + blogId
        })
      },


      postComment: function (commentObj) {
        return $http({
          method: 'POST',
          headers: {
            'auth-token': auth.getToken()
          },
          data: commentObj,
          url: remoteAddr + '/blogs/comment'
        })
      },

      getCommentsByBlogId : function (blogId) {
        return $http({
          method: 'GET',
          url: remoteAddr + '/blogs/comments/' + blogId
        }).then(function (data, status){
     
          var comments = [];
         for (var i = 0; i < data.data.response.length; i++) {
           var comment = data.data.response[i];
           comments[i] = {};
           comments[i].userName = comment.userProfile.name;
           comments[i].profilePic = comment.userProfile.profilePic;
           comments[i].comment = comment.comment;
           comments[i].date = new Date(new Date(comment.commentTime).getTime());
         }
         return comments;
       }, function (error, status) {
         return error.data;
       })
      },



       // **** TRAVEL PLANS API ******* //

       getTravelPlanBlogs : function() {
        return $http({
          method: 'GET',
          url: remoteAddr + "/travelplans/blogs"
        }).then(function (data, status) {
          var posts = [];
         for (var i = 0; i < data.data.response.length; i++) {
           var post = data.data.response[i];
           posts[i] = {};
           posts[i].title = post.title;
           posts[i].author = post.user.name;
           posts[i].description = post.description;
           posts[i].imageUrl = post.imageUrl;
           posts[i].id = post.id;
           posts[i].date = new Date(new Date(post.time).getTime());
         }
         return posts;
        }, function (error, status) {
          return error.data.error;
        });
      },


      getTravelInspirations : function () {
        return $http({
          method: 'GET',
          url: remoteAddr + '/home/travelInspirations'
        }).then(function (data, status) {
          return data.data.response;
        }, function (error, status) {
          console.log(error);
          return error.data.error;
        });
      },


      getTravelPlans : function (id) {
        return $http({
          method: 'GET',
          url: remoteAddr + '/travelplans/travelInspiration/' + id
        }).then(function (data, status) {
          return data.data.response;
        }, function (error, status) {
          return error.data.error;
        });
      },


      getTravelInspirationDetail: function(id) {
        return $http({
          method: 'GET',
          url: remoteAddr + '/travelplans/' + id
        }).then(function (data, status) {
          return data.data;
        }, function (error, status) {
          return error.data;
        })
      },


       // **** HOME PAGE API ******* //

       


      getInstaPhotos : function() {
        return $http({
          method: 'GET',
          url: remoteAddr + "/home/instagramPhotos"
        }).then(function (data, status) {
          return data.data.response;
        }, function (error, status) {
          return error.data.error;
        });
      },

      getHomeBlogs : function() {
        return $http({
          method: 'GET',
          url: remoteAddr + "/home/blog"
        }).then(function (data, status) {
          var posts = [];
         for (var i = 0; i < data.data.response.length; i++) {
           var post = data.data.response[i];
           posts[i] = {};
           posts[i].title = post.title;
           posts[i].author = post.user.name;
           posts[i].description = post.description;
           posts[i].imageUrl = post.imageUrl;
           posts[i].id = post.id;
           posts[i].date = new Date(new Date(post.time).getTime());
         }
         return posts;
        }, function (error, status) {
          return error.data.error;
        });
      },

      getTravelPlanContent: function() {
        return $http({
          method: 'GET',
          url: remoteAddr + '/travel-plan'
        }).then(function (data, status){
          return data.data;
        }, function (error, status){
          return error.data;
        })
      },




       // **** DESTINATION API ******* //

      getDestinationsList: function() {
        return $http({
          method: 'GET',
          url: remoteAddr + '/destination'
        }).then(function (data, status){
          return data.data;
        }, function (error, status){
          return error.data;
        })
      },

      getDestinationDetailById : function(id) {
        return $http({
          method: 'GET',
          url: remoteAddr + '/destination/' + id
        }).then(function (data, status){
          return data.data;
        }, function (error, status){
          return error.data;
        })
      },

      quickQuery : function(queryObj) {
        return $http({
          method: 'POST',
          data: queryObj,
          url: remoteAddr + '/travelplans/quickquery'
        })
      },

      shareOnFacebook : function(shareObj) {
        return $http({
          method: 'POST',
          data: shareObj,
          url: remoteAddr + '/blogs/share'
        })
      },

      shareOnGoglePlus : function(shareObj) {
        return $http({
          method: 'POST',
          data: shareObj,
          url: remoteAddr + '/blogs/google-share'
        })
      },


      // **** EVENTS API ******* //

      getAllEvents: function() {
        return $http({
          method: 'GET',
          url: remoteAddr + '/events'
        }).then(function (data, status){
          return data.data;
        }, function (error, status){
          return error.data;
        })
      },

      getEventById: function(eventId) {
        return $http({
          method: 'GET',
          url: remoteAddr + '/events/' + eventId
        }).then(function (data, status){
          return data.data;
        }, function (error, status){
          return error.data;
        })
      },

      submitEventForm: function(formObj) {
        return $http({
          method: 'POST',
          data: formObj,
          url: remoteAddr + '/events/query'
        })
      },



       // **** PLAN MY TRIP API ******* //


      submitPlanMyTripForm : function(formObj) {
        return $http({
          method: 'POST',
          data: formObj,
          headers: {
            'auth-token': auth.getToken()
          },
          url: remoteAddr + '/travelplans/query'
        })
      },


       // **** CONATACTS API ******* //

      submitContactForm : function(contactObj) {
        return $http({
          method: 'POST',
          data: contactObj,
          url: remoteAddr + "/travelplans/contactUs"
        })
      },

      submitTravelEnquiryForm : function(enquiryFormObj) {
        return $http({
          method: 'POST',
          data: enquiryFormObj,
          url: remoteAddr + "/travelplans/travelinquery"
        })
      },



       // **** SUBSCRIBE API ******* //

      submitNewsletterEmail : function(emailObj) {
        return $http({
          method: 'POST',
          data: emailObj,
          url: remoteAddr + "/newsLatter/subscribe"
        })
      }


    };
  }]);

angular.module('config', [])

.constant('ENV', {name:'production',endPoint:'http://54.179.166.97:8080/api/v1'})

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
  .controller('AboutCtrl', ["$scope", "$window", function ($scope, $window) {


    $scope.openSocialSite = function (url) {
      $window.open(url, ' _blank');
    }


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
  .controller('DestinationDetailCtrl', ["$scope", "$stateParams", "remoteSvc", "$document", "$state", function ($scope, $stateParams, remoteSvc, $document, $state) {

    var destinationId = $stateParams.id;

    $scope.getDestinationDetailById = function (destinationId) {
      remoteSvc.getDestinationDetailById(destinationId).then(function (data) {
        $scope.detail = data.response;
        $scope.placesData = data.response.places;
        $scope.activitiesData = data.response.activities;
      });
    };
    $scope.getDestinationDetailById(destinationId);


    $scope.redirectToPlans = function(travelPlanId) {
      if(travelPlanId != null) {
        $state.go('travel-plan.detail', {id : travelPlanId});
      } else{
        $state.go('travel-plan.list');
      }
    }

    $scope.openAccordion = false;
    $scope.openAccordion1 = false;


    $scope.openOrCloseAccordion = function (param) {

      if (param === 'place') {
        if ($scope.openAccordion === true) {
          $scope.closeAccordion();
        } else if ($scope.openAccordion === false) {
          $scope.openAccordion = true;
        }
      } else if (param === 'activity') {
        if ($scope.openAccordion1 === true) {
          $scope.closeAccordion1();
        } else if ($scope.openAccordion1 === false) {
          $scope.openAccordion1 = true;
        }
      }

    };

    $scope.closeAccordion = function () {
      $scope.openAccordion = false;
      var someElement = angular.element(document.getElementById('places'));
      $document.scrollToElement(someElement, 30, 800);
    };


    $scope.closeAccordion1 = function () {
      $scope.openAccordion1 = false;
      var someElement = angular.element(document.getElementById('activities'));
      $document.scrollToElement(someElement, 30, 800);
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

    var owlAPi;
    $scope.ready = function ($api) {
      owlAPi = $api;
    };

    var placeAccordionOwlAPi;
    $scope.readyPlaceAccordion = function ($api) {
      placeAccordionOwlAPi = $api;
    };

    var activityAccordionOwlAPi;
    $scope.readyActivityAccordion = function ($api) {
      activityAccordionOwlAPi = $api;
    };


    $scope.gotoCarouselPlace = function (param) {
      placeAccordionOwlAPi.trigger('to.owl.carousel', [param, 1]);
    };

    $scope.gotoCarouselActivity = function (param) {
      activityAccordionOwlAPi.trigger('to.owl.carousel', [param, 1]);
    };

    $scope.sliderProperties = {
      // autoHeight:true,
      animateIn: 'fadeIn',
      lazyLoad: true,
      items: 4,
      margin: 0,
      mouseDrag: true,
      touchDrag: true,
      dots: false,
      nav: true,
      responsiveClass: true,
      navText : ["<i class='icon-circle-arrow-left'></i>","<i class='icon-circle-arrow-right'></i>"],
      responsive: {
        0: {
          items: 1,
          nav: true
        },
        600: {
          items: 3,
          nav: true
        },
        1000: {
          items: 4,
          nav: true
        }
      }
    };
    $scope.accordionProperties = {
      // autoHeight:true,
      animateIn: 'fadeIn',
      lazyLoad: true,
      items: 1,
      margin: 10,
      mouseDrag: true,
      touchDrag: true,
      dots: false,
      nav: true,
      responsiveClass: true,
      navText : ["<i class='icon-circle-arrow-left'></i>","<i class='icon-circle-arrow-right'></i>"],
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
  .controller('TravelPlanCtrl', ["$scope", "remoteSvc", "$document", function ($scope, remoteSvc, $document) {

     var getTravelInspirations = function () {
      remoteSvc.getTravelInspirations().then(function (response) {
        $scope.sliderData = response;
      });
    };

    var getTravelBlogs = function () {
      remoteSvc.getTravelPlanBlogs().then(function (response) {
        $scope.blog = response;
      })
    };

    getTravelInspirations();
    getTravelBlogs();

    $scope.travelPlanData = [];
    var getTravelPlans = function (id) {
      remoteSvc.getTravelPlans(id).then(function (response){
        $scope.travelPlanData = response;
      });
    };

  
    $scope.openAccordion = false;
    $scope.openOrCloseAccordion = function (id) {
      if ($scope.openAccordion === true) {
        $scope.closeAccordion();
      } else if ($scope.openAccordion === false) {
        $scope.openAccordion = true;
        getTravelPlans(id);
      }
    };

    $scope.closeAccordion = function () {
      $scope.travelPlanData = undefined;
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
       navText : ["<i class='icon-circle-arrow-left'></i>","<i class='icon-circle-arrow-right'></i>"],
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
 
   $scope.ready = function ($api) {
     owlAPi = $api;
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
   navText : ["<i class='icon-circle-arrow-left'></i>","<i class='icon-circle-arrow-right'></i>"],
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



  }]);

'use strict';

/**
 * @ngdoc service
 * @name wanderwagon-webapp.mockRemoteSvc
 * @description
 * # mockRemoteSvc
 * Factory in the wanderwagon-webapp.
 */
angular.module('wanderwagon-webapp')
  .factory('mockRemoteSvc', ["$q", function ($q) {


    var slider = [{
        imageUrl: 'images/backpacking.jpg',
        text: 'Backpacking',
        id: 1
      },
      {
        imageUrl: 'images/roadtrip.jpg',
        text: 'Road Trip',
        id: 2
      },
      {
        imageUrl: 'images/adventure.jpg',
        text: 'Adventure',
        id: 3
      },
      {
        imageUrl: 'images/nature.jpg',
        text: 'Nature',
        id: 4
      },
      {
        imageUrl: 'images/adventure.jpg',
        text: 'Family',
        id: 5
      },
      {
        imageUrl: 'images/backpacking.jpg',
        text: 'Couple',
        id: 6
      },
      {
        imageUrl: 'images/adventure.jpg',
        text: 'Family',
        id: 7
      },
      {
        imageUrl: 'images/backpacking.jpg',
        text: 'Couple',
        id: 8
      },
    ];

    var destinations = [{
        imageUrl: 'images/nainital-cover.jpg',
        name: 'Nainital',
        id: 1,
        data: {
          imageUrl: 'images/nainital-cover.jpg',
          name: 'Nainital',
          title: 'The Lake District Of India',
          about: "Among the reigning queens of North Indian hill stations, Nainital's crowning glory is its tranquil blue lake earning her the title of Lake District of India. What comes to mind when we talk about Nainital are images of glistening lakes, forested hills, and meandering trails.The crescent shaped lake, bustling roads of Nainital, beautified with Victorian lamp posts, radiate a vintage charm. It is Kumaon’s largest town and favorite hill resort. It is located in the enchanting state of Uttarakhand and is a peaceful destination to get away from the ho-hum of life. It has a myriad of bustling bazaars and a cobweb of walking tracks that cover the sites overlooking the distant Himalayan peaks. Apart from the sparkling blue waters and mountain ranges, one can enjoy views of nature at its full bloom.",
          overview: {
            bestTimeToVisit: 'All Seasons',
            daysRequired: '1-2 days',
            category: 'Hills/Adventure/Wildlife/Trekking/Nature'
          },
          howToReach: {
            airport: 'Pantnagar is the nearest airport which is 65 km. away from the district. Taxis are easily available from here to Nainital. There is no direct connectivity to Nainital by air. However, unless you opt for privately chartered flights, this is not the ideal arrival spot either. Dehradun is 173 km from Nainital.',
            railways: 'Kathgodam is the nearest railway station which is 35 km. away from the district.Plenty of trains connect Nainital with Delhi and Dehradun.',
            roadways: 'Nainital enjoys excellent road connectivity with several cities and small towns of North India. Daily bus service to Nainital is available from Delhi and Kathgodam. Boarding an overnight bus from Delhi is the most convenient way to reach Nainital. Visitors commuting to Nainital by road can take the National Highway 87. If driving from Delhi, take the Noida road, proceed to Muradabad and thereon to Haldwani. From Haldwani, take the road to Kathgodam and continue to Nainital.'
          },
          places: [{
              imageUrl: 'images/naini-lake.JPG',
              name: 'Naini Lake',
              id: 7
            },
            {
              imageUrl: 'images/governor.jpg',
              name: 'Governor’s House',
              id: 8
            },
            {
              imageUrl: 'images/tiffin-top.jpg',
              name: 'Tiffin Top',
              id: 9
            },
            {
              imageUrl: 'images/china-peak.jpg',
              name: 'China Peak',
              id: 9
            },
            {
              imageUrl: 'images/zoo.jpg',
              name: 'Nainital Zoo',
              id: 7
            },
            {
              imageUrl: 'images/eco-cave.jpg',
              name: 'Eco Cave Gardens',
              id: 8
            },
            {
              imageUrl: 'images/nanda-devi.jpg',
              name: 'Nanda Devi Temple',
              id: 9
            },
            {
              imageUrl: 'images/snow-view.jpg',
              name: 'Snow View',
              id: 9
            }
          ],
          activities: [{
              imageUrl: 'images/boating.jpg',
              name: 'Boating',
              id: 7
            },
            {
              imageUrl: 'images/cablecar.jpg',
              name: 'Cable Car',
              id: 8
            },
            {
              imageUrl: 'images/horse-riding.JPG',
              name: 'Horse Riding',
              id: 9
            },
            {
              imageUrl: 'images/rock-climbing.jpg',
              name: 'Rock Climbing',
              id: 9
            },
            {
              imageUrl: 'images/boating.jpg',
              name: 'Boating',
              id: 7
            },
            {
              imageUrl: 'images/cablecar.jpg',
              name: 'Cable Car',
              id: 8
            },
            {
              imageUrl: 'images/horse-riding.JPG',
              name: 'Horse Riding',
              id: 9
            },
            {
              imageUrl: 'images/rock-climbing.jpg',
              name: 'Rock Climbing',
              id: 9
            }
          ]
        }
      },
      {
        imageUrl: 'images/uttarakhand.jpg',
        name: 'Mussoorie',
        id: 2
      },
      {
        imageUrl: 'images/kashmir.jpg',
        name: 'Dehradun',
        id: 3
      },
      {
        imageUrl: 'images/meghalaya.jpg',
        name: 'Shimla',
        id: 4
      },
      {
        imageUrl: 'images/arunachal.jpg',
        name: 'Mcleodganj',
        id: 5
      },
      {
        imageUrl: 'images/sikkim.jpg',
        name: 'Rishikesh',
        id: 6
      },
      {
        imageUrl: 'images/manipur.jpg',
        name: 'Manali',
        id: 7
      },
      {
        imageUrl: 'images/assam.jpg',
        name: 'Kasol',
        id: 8
      },
      {
        imageUrl: 'images/darjeeling.jpg',
        name: 'Haridwar',
        id: 9
      }
    ];


    var homePageBlog = [{
        title: 'For rivers, seas and slopes at their most inviting',
        description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cupiditate, asperiores quod est tenetur in. Eligendi, deserunt, blanditiis est quisquam doloribus voluptate id aperiam ea ipsum magni aut perspiciatis rem voluptatibus',
        dateTime: '02 Jun 2017',
        imageUrl: 'images/manipur.jpg',
        author: 'Zoe Bennett',
        id: 1
      },

      {
        title: 'For rivers, seas and slopes at their most inviting',
        description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cupiditate, asperiores quod est tenetur in. Eligendi, deserunt, blanditiis est quisquam doloribus voluptate id aperiam ea ipsum magni aut perspiciatis rem voluptatibus',
        dateTime: '02 Jun 2017',
        imageUrl: 'images/himachal.jpg',
        author: 'Zoe Bennett',
        id: 2
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


    var homePageContent = {
      slider: slider,
      destinations: destinations,
      homePageBlog: homePageBlog,
      instaImages: instaImages
    };

    var articles = [{
        title: 'For rivers, seas and slopes at their most inviting',
        description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cupiditate, asperiores quod est tenetur in. Eligendi, deserunt, blanditiis est quisquam doloribus voluptate id aperiam ea ipsum magni aut perspiciatis rem voluptatibus',
        dateTime: '02 Jun 2017',
        imageUrl: 'images/manipur.jpg',
        author: 'Zoe Bennett',
        id: 1
      },

      {
        title: 'For rivers, seas and slopes at their most inviting',
        description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cupiditate, asperiores quod est tenetur in. Eligendi, deserunt, blanditiis est quisquam doloribus voluptate id aperiam ea ipsum magni aut perspiciatis rem voluptatibus',
        dateTime: '02 Jun 2017',
        imageUrl: 'images/himachal.jpg',
        author: 'Zoe Bennett',
        id: 2
      }
    ];

    var travelPlanContent = {
      slider: slider,
      articles: articles
    };


    var blogs = [{
        title: 'Tips for solo travellers',
        description: 'Traveling alone may seem scary at first, But , The number of reasons why one should travel alone at least once outnumbers why one should not by a considerable margin. One reason is that after a solo adventure you wouldn’t be the same person as you were before, I can bet on that. The solitude that you get while traveling solo gives a new dimension to your thought process. ',
        dateTime: '02 Jun 2017',
        imageUrl: 'images/tips-cover.jpg',
        author: 'Zoe Bennett',
        id: 1,
        comments: 2
      },

      {
        title: 'For rivers, seas and slopes at their most inviting',
        description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cupiditate, asperiores quod est tenetur in. Eligendi, deserunt, blanditiis est quisquam doloribus voluptate id aperiam ea ipsum magni aut perspiciatis rem voluptatibus',
        dateTime: '02 Jun 2017',
        imageUrl: 'images/himachal.jpg',
        author: 'Zoe Bennett',
        id: 2,
        comments: 5
      },
      {
        title: 'For rivers, seas and slopes at their most inviting',
        description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cupiditate, asperiores quod est tenetur in. Eligendi, deserunt, blanditiis est quisquam doloribus voluptate id aperiam ea ipsum magni aut perspiciatis rem voluptatibus',
        dateTime: '02 Jun 2017',
        imageUrl: 'images/himachal.jpg',
        author: 'Zoe Bennett',
        id: 3,
        comments: 5
      },
      {
        title: 'For rivers, seas and slopes at their most inviting',
        description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cupiditate, asperiores quod est tenetur in. Eligendi, deserunt, blanditiis est quisquam doloribus voluptate id aperiam ea ipsum magni aut perspiciatis rem voluptatibus',
        dateTime: '02 Jun 2017',
        imageUrl: 'images/himachal.jpg',
        author: 'Zoe Bennett',
        id: 4,
        comments: 5
      },
      {
        title: 'For rivers, seas and slopes at their most inviting',
        description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cupiditate, asperiores quod est tenetur in. Eligendi, deserunt, blanditiis est quisquam doloribus voluptate id aperiam ea ipsum magni aut perspiciatis rem voluptatibus',
        dateTime: '02 Jun 2017',
        imageUrl: 'images/himachal.jpg',
        author: 'Zoe Bennett',
        id: 5,
        comments: 5
      },
      {
        title: 'For rivers, seas and slopes at their most inviting',
        description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cupiditate, asperiores quod est tenetur in. Eligendi, deserunt, blanditiis est quisquam doloribus voluptate id aperiam ea ipsum magni aut perspiciatis rem voluptatibus',
        dateTime: '02 Jun 2017',
        imageUrl: 'images/himachal.jpg',
        author: 'Zoe Bennett',
        id: 6,
        comments: 5
      },
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

    var blogPageData = {
      blogs: blogs,
      instaImages: instaImages,
      popularPosts: popularPosts,
      recentPosts: recentPosts
    };

    var eventsData = [{
        eventId: 1,
        eventImage: "https://s3-ap-southeast-1.amazonaws.com/wanderwagon/images/destinations/macleodganj/coverpic/cover.jpg",
        eventName: "New Year Festival",
        description: "New Year is the time at which a new calendar year begins and the calendar's year count increments by one. Many cultures celebrate the event in some manner and the 1st day of January is often marked as a national holiday.",
        eventLocations: [{
            locationName: "Kasol",
            locationId: 1,
            locationImage: "https://s3-ap-southeast-1.amazonaws.com/wanderwagon/images/destinations/kasol/coverpic/cover_picture.jpg"
          },
          {
            locationName: "Kasol",
            locationId: 2,
            locationImage: "https://s3-ap-southeast-1.amazonaws.com/wanderwagon/images/destinations/kasol/coverpic/cover_picture.jpg"
          },
          {
            locationName: "Kasol",
            locationId: 3,
            locationImage: "https://s3-ap-southeast-1.amazonaws.com/wanderwagon/images/destinations/kasol/coverpic/cover_picture.jpg"
          },
          {
            locationName: "Kasol",
            locationId: 4,
            locationImage: "https://s3-ap-southeast-1.amazonaws.com/wanderwagon/images/destinations/kasol/coverpic/cover_picture.jpg"
          },
          {
            locationName: "Kasol",
            locationId: 5,
            locationImage: "https://s3-ap-southeast-1.amazonaws.com/wanderwagon/images/destinations/kasol/coverpic/cover_picture.jpg"
          },
          {
            locationName: "Kasol",
            locationId: 6,
            locationImage: "https://s3-ap-southeast-1.amazonaws.com/wanderwagon/images/destinations/kasol/coverpic/cover_picture.jpg"
          }
        ]
      },
      {
        eventId: 2,
        eventImage: "https://s3-ap-southeast-1.amazonaws.com/wanderwagon/images/destinations/haridwar/coverpic/cover.jpg",
        eventName: "International Yoga Festival",
        description: "The annual International Yoga Festival, organized by Parmarth Niketan (Rishikesh) in the sacred and heavenly state of Uttarakhand, the birthplace of Yoga, is grounded in the authentic origin of Yoga.",
        eventLocations: [{
            locationName: "Rishikesh",
            locationId: 1,
            locationImage: "https://s3-ap-southeast-1.amazonaws.com/wanderwagon/images/destinations/rishikesh/coverpic/cover_picture.jpg"
          },
          {
            locationName: "Rishikesh",
            locationId: 2,
            locationImage: "https://s3-ap-southeast-1.amazonaws.com/wanderwagon/images/destinations/rishikesh/coverpic/cover_picture.jpg"
          },
          {
            locationName: "Rishikesh",
            locationId: 1,
            locationImage: "https://s3-ap-southeast-1.amazonaws.com/wanderwagon/images/destinations/rishikesh/coverpic/cover_picture.jpg"
          },
          {
            locationName: "Rishikesh",
            locationId: 1,
            locationImage: "https://s3-ap-southeast-1.amazonaws.com/wanderwagon/images/destinations/rishikesh/coverpic/cover_picture.jpg"
          },
          {
            locationName: "Rishikesh",
            locationId: 1,
            locationImage: "https://s3-ap-southeast-1.amazonaws.com/wanderwagon/images/destinations/rishikesh/coverpic/cover_picture.jpg"
          },
          {
            locationName: "Rishikesh",
            locationId: 1,
            locationImage: "https://s3-ap-southeast-1.amazonaws.com/wanderwagon/images/destinations/rishikesh/coverpic/cover_picture.jpg"
          }
        ]
      }
    ];


    // Public API here
    return {
      getHomePageContent: function () {
        var deferred = $q.defer();
        deferred.resolve(homePageContent);
        return deferred.promise;
      },


      getTravelInspirationDetail: function (id) {
        var deferred = $q.defer();
        angular.forEach(slider, function (value, key) {
          if (value.id == id) {
            deferred.resolve(value.data);
          }
        });
        return deferred.promise;
      },

      getTravelPlanContent: function () {
        var deferred = $q.defer();
        deferred.resolve(travelPlanContent);
        return deferred.promise;
      },


      getDestinationsList: function () {
        var deferred = $q.defer();
        deferred.resolve(destinations);
        return deferred.promise;
      },

      getDestinationDetailById: function (id) {
        var deferred = $q.defer();
        angular.forEach(destinations, function (value, key) {
          if (value.id == id) {
            deferred.resolve(value.data);
          }
        });
        return deferred.promise;
      },

      getBlogList: function () {
        var deferred = $q.defer();
        deferred.resolve(blogPageData);
        return deferred.promise;
      },


      getBlogDetail: function (id) {
        var deferred = $q.defer();
        angular.forEach(blogs, function (value, key) {
          if (value.id == id) {
            deferred.resolve(value);
          }
        });
        return deferred.promise;
      },

      getAllEvents: function () {
        var deferred = $q.defer();
        deferred.resolve(eventsData);
        return deferred.promise;
      },

      getEventById: function (id) {
        var deferred = $q.defer();
        angular.forEach(eventsData, function (value, key) {
          if (value.eventId == id) {
            deferred.resolve(value);
          }
        });
        return deferred.promise;
      }
    }
  }]);

'use strict';

/**
 * @ngdoc function
 * @name wanderwagon-webapp.controller:EmailVerificationCtrl
 * @description
 * # EmailVerificationCtrl
 * Controller of the wanderwagon-webapp
 */
angular.module('wanderwagon-webapp')
  .controller('EmailVerificationCtrl', ["$location", "auth", "$scope", function ($location, auth, $scope) {

    var verificationToken = $location.search().token;
    var userId = $location.search().userId;
    $scope.verified;

     $scope.showModal = function(messageType, message) {
      angular.element(document.querySelectorAll('#verificationModal')).modal('show');
      $scope.messageType = messageType;
      $scope.message = message;
    };


    $scope.showEmailModal = function(messageType, message) {
      angular.element(document.querySelectorAll('#emailModal')).modal('show');
    };

 

    if(verificationToken !== undefined) {
     
      auth.verifyEmail(verificationToken, userId)
        .then(function (data){
          $scope.showModal("Success", "Email verified successfully. Login Now");
        })
        .catch(function (error){
           $scope.verified = false;
          $scope.showModal("Error", "Email verification link is expired !");
        });
    } else{
      $location.path('/home');
    }


    $scope.sendVerificationLink = function() {
      $scope.showModal("Sent", "Verification link has been sent to your email address and it will be valid for 10 minutes only.");
    };

    $scope.changeEmailAddress = function() {
      $scope.showEmailModal();
    };
    

  }]);

'use strict';

/**
 * @ngdoc function
 * @name wanderwagon-webapp.controller:ChangePasswordCtrl
 * @description
 * # ChangePasswordCtrl
 * Controller of the wanderwagon-webapp
 */
angular.module('wanderwagon-webapp')
  .controller('ChangePasswordCtrl', ["$location", "auth", "$scope", function ($location, auth, $scope) {

    var verificationToken = $location.search().token;
    var email = $location.search().email;

    $scope.showModal = function(messageType, message) {
      angular.element(document.querySelectorAll('#changePasswordModal')).modal('show');
      $scope.messageType = messageType;
      $scope.message = message;
    };

    $scope.verified = false;

    if(verificationToken !== undefined) {
      auth.forgotPassword(verificationToken, email)
        .then(function (data){
          $scope.verified = true;
          $scope.messageType = "Change Password ";
        })
        .catch(function (error){
           $scope.verified = false;
           $scope.messageType = "Error";
            $scope.errorMessage = "Password reset link is expired";
        });

    } else{
      $location.path('/home');
    }


    $scope.onSubmit = function() {

    };
   
   
  }]);

'use strict';

/**
 * @ngdoc function
 * @name wanderwagon-webapp.controller:TravelPlanDetailCtrl
 * @description
 * # TravelPlanDetailCtrl
 * Controller of the wanderwagon-webapp
 */
angular.module('wanderwagon-webapp')
  .controller('TravelPlanDetailCtrl', ["$scope", "$document", "$stateParams", "remoteSvc", function ($scope, $document, $stateParams, remoteSvc) {

    var id = $stateParams.id; 


    var getTravelInspirationDetail = function () {
      remoteSvc.getTravelInspirationDetail(id).then(function (response) {
        $scope.planDetail = response.response;
        $scope.itineraries = response.response.itineraries;
      });
    };
    getTravelInspirationDetail();

    var owlAPi;
    $scope.ready = function ($api) {
      owlAPi = $api;
    };


    $scope.sliderProperties = {
      // autoHeight:true,
      animateIn: 'fadeIn',
      lazyLoad: true,
      items: 4,
      margin: 0,
      mouseDrag: true,
      touchDrag: true,
      dots: false,
      nav: true,
      responsiveClass: true,
      navText : ["<i class='icon-circle-arrow-left'></i>","<i class='icon-circle-arrow-right'></i>"],
      responsive: {
        0: {
          items: 1,
          nav: true
        },
        600: {
          items: 3,
          nav: true
        },
        1000: {
          items: 3,
          nav: true
        }
      }
    };
    $scope.accordionProperties = {
      // autoHeight:true,
      animateIn: 'fadeIn',
      lazyLoad: true,
      items: 1,
      margin: 10,
      mouseDrag: true,
      touchDrag: true,
      dots: false,
      nav: true,
      responsiveClass: true,
      navText : ["<i class='icon-circle-arrow-left'></i>","<i class='icon-circle-arrow-right'></i>"],
    };

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
  }]);

'use strict';

/**
 * @ngdoc directive
 * @name wanderwagon-webapp.directive:flipBook
 * @description
 * # flipBook
 */
angular.module('wanderwagon-webapp')
  .directive('flipBook', ["$timeout", "remoteSvc", function ($timeout, remoteSvc) {
    return {
      templateUrl: 'views/flipbook.html',
      restrict: 'E',
      scope: {
        data: '='
      },
      link: function postLink(scope, element, attrs) {


          $timeout(function(){
          $('#flipbook').turn({
            width: '100%',
            height: '650px',
            autoCenter: true,
            duration: 1000,
            gradients: true,
            elevation: 100,
            next: true
          });


          $('#flipbook').turn('peel', 'br');

          $("#prev").click(function (e) {
            e.preventDefault();
            $('#flipbook').turn("previous");
          });

          $("#next").click(function (e) {
            e.preventDefault();
            $('#flipbook').turn("next");
          });


          $(window).width(function () {
            var win = $(this); //this = window
            if (win.width() >= 768) {
              $('#flipbook').turn('display', 'double');
              $('#flipbook').turn('peel', 'br');
            } else {
              $('#flipbook').turn('display', 'single');
              $("#flipbook").turn("size", '100%', 500);
              $('#flipbook').turn('peel', 'br');
            }
          });
          $(window).resize(function () {
            var win = $(this); //this = window
            if (win.width() >= 768) {
              $('#flipbook').turn('display', 'double');
              $('#flipbook').turn('peel', 'br');
            } else {
              $('#flipbook').turn('display', 'single');
              $("#flipbook").turn("resize");
              $("#flipbook").turn("size", '100%', 500);
              $('#flipbook').turn('peel', 'br');
            }
          });
         }, 1000);



        // $("#prev").click(function (e) {
        //   e.preventDefault();
        //   $('#flipbook').turn("previous");
        // });

        // $("#next").click(function (e) {
        //   e.preventDefault();
        //    $('#flipbook').turn("next");
        // });
      }
    };
  }]);

'use strict';

/**
 * @ngdoc directive
 * @name wanderwagon-webapp.directive:instaPhotoStream
 * @description
 * # instaPhotoStream
 */
angular.module('wanderwagon-webapp')
  .directive('instaPhotoStream', ["$interval", "remoteSvc", "$window", function ($interval, remoteSvc, $window) {
    return {
      templateUrl: 'views/insta-photo-stream.html',
      restrict: 'E',
      link: function postLink(scope, element, attrs) {

        scope.getInstaPhotos = function () {
          remoteSvc.getInstaPhotos().then(function (response) {
            scope.instaData = response;
          });
        };
        scope.getInstaPhotos();

        scope.redirectToInstagram = function () {
          $window.open('https://www.instagram.com/wanderwagon', ' _blank');
        }
  
    
        // window.requestAnimationFrame = (function(){
        //   return  window.requestAnimationFrame       ||
        //           window.webkitRequestAnimationFrame ||
        //           window.mozRequestAnimationFrame  
        // })();

        // var speed = 5000;
        // (function currencySlide(){
        //     var currencyPairWidth = $('.slideItem:last-child').outerWidth();
        //     $(".slideContainer").animate({marginLeft:-currencyPairWidth},speed, 'linear', function(){
        //                 $(this).css({marginLeft:0}).find("li:first").after($(this).find("li:last"));
        //         });
        //         requestAnimationFrame(currencySlide);
        // })();

      }
    };
  }]);

'use strict';

/**
 * @ngdoc function
 * @name wanderwagon-webapp.controller:PaymentCtrl
 * @description
 * # PaymentCtrl
 * Controller of the wanderwagon-webapp
 */
angular.module('wanderwagon-webapp')
  .controller('PaymentCtrl', ["$scope", function ($scope) {

    $scope.isPaymentDone = false;

    var options = {
      "key": "rzp_live_lhuK7gjYSF90ee",
      "amount": 100,    
      "name": "Wanderwagon Pvt Ltd",
      "image": "https://s3-ap-southeast-1.amazonaws.com/wanderwagon/images/logo/logo-short.png",        
      "description": "Kheerganga Trek Booking",
      "prefill": {
          "name": "Deepak Paul",
          "email": "deepak@wanderwagon.com"
      },
      "notes": {
          "address": "Hello World"
      },
      "theme": {
          "color": "blue"
      },
      handler: function(response) {
        showPaymentModal();
      }
    };

    $scope.pay = function() {
      var rzp = new Razorpay(options);
      rzp.open();
    };

    var onSuccess = function() {
      
    };

    var showPaymentModal = function() {
      angular.element(document.querySelectorAll('#paymentModal')).modal('show');
    };
    
  }]);

'use strict';

/**
 * @ngdoc function
 * @name wanderwagon-webapp.controller:EventCtrl
 * @description
 * # EventCtrl
 * Controller of the wanderwagon-webapp
 */
angular.module('wanderwagon-webapp')
  .controller('EventCtrl', ["$scope", "$stateParams", "remoteSvc", function ($scope, $stateParams, remoteSvc) {
   
    var eventId = $stateParams.id;

    $scope.formSubmitted = false;
    $scope.messageType = "Query Form";

    var getEventById = function(eventId) {
      remoteSvc.getEventById(eventId).then(function(data){
        $scope.eventDetail = data.response;
        console.log(data);
      });
    };
    getEventById(eventId);

    $scope.queryObj = {};


    $scope.onQueryButtonClicked = function(id) {
      $scope.queryObj.locationId = id;
      $scope.queryObj.eventId = eventId;
      $scope.formSubmitted = false;
      angular.element(document.querySelectorAll('#eventModal')).modal('show');
    };


    var showImageModal = function() {
      angular.element(document.querySelectorAll('#eventSuccessModal')).modal('show');
    };


    $scope.onFormSubmit = function(form) {
      remoteSvc.submitEventForm($scope.queryObj)
        .success(function(data){
          angular.element(document.querySelectorAll('#eventModal')).modal('hide');
          showImageModal();
          
            $scope.queryObj = {};
        })
        .error(function (error) {
          console.log(error);
        })
    }
  }]);

angular.module('wanderwagon-webapp').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('views/about.html',
    "<div class=\"cover-page page-title-parallax\" style=\"background-color:#36353B;background-image: url('https://s3-ap-southeast-1.amazonaws.com/wanderwagon/images/about/about-cover.jpg'); background-attachment: fixed;\n" +
    "background-position: center;\n" +
    "background-repeat: no-repeat;\n" +
    "background-size: cover; height:100vh\"> <!-- <div class=\"container clearfix\">\n" +
    "    <h1 style=\"margin-top:                                                                                                                              25%; color: rgba(255,255,255,0.9)\">About Us</h1>\n" +
    "    <span style=\"color: rgba(255,255,255,0.9)\">Everything you need to know about our Company</span>\n" +
    "    \n" +
    "  </div> --> </div> <div class=\"mobile-cover-page\" style=\"background-color:#36353B;background-image: url('https://s3-ap-southeast-1.amazonaws.com/wanderwagon/images/mobile/about_cover.jpg');background-size: cover;background-attachment: fixed;\n" +
    "background-position: center;\n" +
    "background-repeat: no-repeat; height:100vh\"> <div class=\"container clearfix\"> <div class=\"center-block\"> <!-- <h2 class=\"text-center\" style=\"font-size:48px;letter-spacing:0px;font-weight:600;color:#fff;margin-top:200px;\" data-caption-animate=\"fadeInUp\">\n" +
    "        Our Story\n" +
    "      </h2> --> <!--<p style=\"font-size:3rem; font-style:italic;\" class=\"text-center\"> is a stunning tapestry</p>--> </div> </div> </div> <!-- Content\n" +
    "		============================================= --> <section id=\"content\"> <div class=\"container clearfix topmargin\"> <div class=\"col_one_third\"> <div class=\"heading-block fancy-title nobottomborder title-bottom-border\"> <h4>Who We <span style=\"color:#14C1E0\">Are</span>.</h4> </div> <p style=\"text-align:justify\">We firmly believe that stories are powerful and that they can inspire, thrill, entertain and educate. If a story is in you, it has to come out. We are the storytellers. We are ordinary and we are proud of it. We are so much like you, ordinary humans trying to do something extraordinary. We love the journey more than the destination and we love to enjoy various colors of life and experience varied emotions with equal curiosity. We intend to give wings to your travel dreams. </p> </div> <div class=\"col_one_third\"> <div class=\"heading-block fancy-title nobottomborder title-bottom-border\"> <h4>What We <span style=\"color:#14C1E0\">Do</span>.</h4> </div> <p style=\"text-align:justify\">We fuel your wanderlust. From inspiring you through the means of our travel Blogs and social media feeds to brimming you up with the intense desire to travel, we cover it all. The idea is to pull you out of your comfort zone and compel you to take those risks which we believe might help you rediscover your true self. We do not hold your hand and walk along, but give that first push that gets you going! Our aim is to build a community of like-minded travel enthusiasts . </p> </div> <div class=\"col_one_third col_last\"> <div class=\"heading-block fancy-title nobottomborder title-bottom-border\"> <h4>What Makes Us <span style=\"color:#14C1E0\">Different</span>.</h4> </div> <p style=\"text-align:justify\">The world doesn't need just another travel platform . What it needs is a really basic ,simple, bare-boned version , which often gets forgotten in the race to get followers and likes. It needs STORIES. Pure, old-fashioned, which never go out of style. We do not intend to lure the customers and push them to travel, we believe in inspiring them to do it on their own. What is it that inspires you to travel? What is that exact moment when you decide to pack your bags and leave? For those who are searching for the answers to these questions, WANDERWAGON tries to be the answer! </p> </div> </div> <div class=\"container clearfix\"> <div style=\"margin-top:0%\"> <h2 class=\"paul-title\"> Meet The Team </h2> <p style=\"font-size:2rem\" class=\"text-center\"> It’s not our works’ life. It’s our life's work. </p><div class=\"underline\"> </div> <p></p> </div> <div class=\"row clearfix\"> <div class=\"col-md-6 bottommargin\"> <div class=\"team team-list clearfix\"> <div class=\"team-image\"> <img src=\"https://s3-ap-southeast-1.amazonaws.com/wanderwagon/images/about/team/Sarvesh.jpg\" alt=\"Sarvesh Verma\"> </div> <div class=\"team-desc\"> <div class=\"team-title\"> <h4>Sarvesh Verma</h4><span style=\"color:#14C1E0\">Founder & CEO</span></div> <div class=\"team-content\"> <div> <b> IIT Delhi </b></div> <div style=\"margin-top:10px\" class=\"one-liner-font\">\"One who leads the Squad\"</div> <div style=\"margin-top:10px\" class=\"bucket-list-font\"> Travel Bucket List - Chadar trek </div> </div> <a ng-click=\"openSocialSite('https://www.facebook.com/sarvesh.verma147')\" class=\"social-icon si-rounded si-small si-light si-facebook\"> <i class=\"icon-facebook\"></i> <i class=\"icon-facebook\"></i> </a> <a ng-click=\"openSocialSite('https://www.linkedin.com/in/sarvesh-verma-09497871')\" class=\"social-icon si-rounded si-small si-light si-linkedin\"> <i class=\"icon-linkedin\"></i> <i class=\"icon-linkedin\"></i> </a> </div> </div> </div> <div class=\"col-md-6 bottommargin\"> <div class=\"team team-list clearfix\"> <div class=\"team-image\"> <img src=\"https://s3-ap-southeast-1.amazonaws.com/wanderwagon/images/about/team/Ashok.jpg\" alt=\"Ashok Sahara\"> </div> <div class=\"team-desc\"> <div class=\"team-title\"> <h4>Ashok Sahara</h4><span style=\"color:#14C1E0\">CTO</span></div> <div class=\"team-content\"> <div> <b> IIT Delhi </b> </div> <div style=\"margin-top:10px\" class=\"one-liner-font\">\"Chai, Code and Workload\" </div> <div style=\"margin-top:10px\" class=\"bucket-list-font\">Travel Bucket list - Spiti Valley </div> </div> <a ng-click=\"openSocialSite('https://www.facebook.com/ashok.meena.7140')\" class=\"social-icon si-rounded si-small si-light si-facebook\"> <i class=\"icon-facebook\"></i> <i class=\"icon-facebook\"></i> </a> <a ng-click=\"openSocialSite('https://www.linkedin.com/in/ashok-sahara-4b536888')\" class=\"social-icon si-rounded si-small si-light si-linkedin\"> <i class=\"icon-linkedin\"></i> <i class=\"icon-linkedin\"></i> </a> </div> </div> </div> <div class=\"col-md-6 bottommargin\"> <div class=\"team team-list clearfix\"> <div class=\"team-image\"> <img src=\"https://s3-ap-southeast-1.amazonaws.com/wanderwagon/images/about/team/Rahul+Kumar.jpg\" alt=\"Rahul Kumar\"> </div> <div class=\"team-desc\"> <div class=\"team-title\"> <h4>Rahul Kumar</h4><span style=\"color:#14C1E0\">AI and Data Analytics, Executive</span></div> <div class=\"team-content\"> <div> <b>IIT Delhi</b> </div> <div style=\"margin-top:10px\" class=\"one-liner-font\"> \"Code ninja on his way to become travel samurai\" </div> <div style=\"margin-top:10px\" class=\"bucket-list-font\"> Travel Bucket list - Auroville </div> </div> <a ng-click=\"openSocialSite('https://www.facebook.com/ikumr')\" class=\"social-icon si-rounded si-small si-light si-facebook\"> <i class=\"icon-facebook\"></i> <i class=\"icon-facebook\"></i> </a> <a ng-click=\"openSocialSite('https://www.instagram.com/rahul.ikumar')\" class=\"social-icon si-rounded si-small si-light si-instagram\"> <i class=\"icon-instagram\"></i> <i class=\"icon-instagram\"></i> </a> <a ng-click=\"openSocialSite('https://www.linkedin.com/in/rahul-kumar-01916a137')\" class=\"social-icon si-rounded si-small si-light si-linkedin\"> <i class=\"icon-linkedin\"></i> <i class=\"icon-linkedin\"></i> </a> </div> </div> </div> <div class=\"col-md-6 bottommargin\"> <div class=\"team team-list clearfix\"> <div class=\"team-image\"> <img src=\"https://s3-ap-southeast-1.amazonaws.com/wanderwagon/images/about/team/sameer.jpg\" alt=\"Sameer Singh\"> </div> <div class=\"team-desc\"> <div class=\"team-title\"> <h4>Sameer Singh</h4><span style=\"color:#14C1E0\">Operations Manager </span></div> <div class=\"team-content\"> <div> <b>NIFT Mumbai</b> </div> <div style=\"margin-top:10px\" class=\"one-liner-font\"> \"Casting a spell with his camera\" </div> <div style=\"margin-top:10px\" class=\"bucket-list-font\"> Travel Bucket list- Chadar trek </div> </div> <a ng-click=\"openSocialSite('https://www.facebook.com/profile.php?id=100001447118758')\" class=\"social-icon si-rounded si-small si-light si-facebook\"> <i class=\"icon-facebook\"></i> <i class=\"icon-facebook\"></i> </a> <a ng-click=\"openSocialSite('https://www.instagram.com/sameer_singh_')\" class=\"social-icon si-rounded si-small si-light si-instagram\"> <i class=\"icon-instagram\"></i> <i class=\"icon-instagram\"></i> </a> <a ng-click=\"openSocialSite('https://www.behance.net/sameersingh')\" class=\"social-icon si-rounded si-small si-light si-yahoo\"> <i class=\"icon-behance\">Be</i> <i class=\"icon-behance\">Be</i> </a> </div> </div> </div> <div class=\"col-md-6 bottommargin\"> <div class=\"team team-list clearfix\"> <div class=\"team-image\"> <img src=\"https://s3-ap-southeast-1.amazonaws.com/wanderwagon/images/about/team/Hrikshesh.jpg\" alt=\"Deepak Bonal\"> </div> <div class=\"team-desc\"> <div class=\"team-title\"> <h4>Hrikshesh Kandpal</h4><span style=\"color:#14C1E0\">Marketing Manager</span></div> <div class=\"team-content\"> <div class=\"one-liner-font\">\"Windowseats and Headphones\"</div> <div style=\"margin-top:10px\" class=\"bucket-list-font\"> Travel Bucket list- UNESCO World Heritage sites in India </div> </div> <a ng-click=\"openSocialSite('https://www.facebook.com/hrikshesh.kandpal')\" class=\"social-icon si-rounded si-small si-light si-facebook\"> <i class=\"icon-facebook\"></i> <i class=\"icon-facebook\"></i> </a> <a ng-click=\"openSocialSite('https://www.instagram.com/hrikshesh')\" class=\"social-icon si-rounded si-small si-light si-instagram\"> <i class=\"icon-instagram\"></i> <i class=\"icon-instagram\"></i> </a> <a ng-click=\"openSocialSite('https://www.linkedin.com/in/hrikshesh-kandpal')\" class=\"social-icon si-rounded si-small si-light si-linkedin\"> <i class=\"icon-linkedin\"></i> <i class=\"icon-linkedin\"></i> </a> </div> </div> </div> <div class=\"col-md-6 bottommargin\"> <div class=\"team team-list clearfix\"> <div class=\"team-image\"> <img src=\"https://s3-ap-southeast-1.amazonaws.com/wanderwagon/images/about/team/Deepak.jpg\" alt=\"Deepak Bonal\"> </div> <div class=\"team-desc\"> <div class=\"team-title\"> <h4>Deepak Rudra Paul</h4><span style=\"color:#14C1E0\">Software Developer</span></div> <div class=\"team-content\"> <div class=\"one-liner-font\">\"Eat, Sleep, Code, Repeat\" </div> <div style=\"margin-top:10px\" class=\"bucket-list-font\"> Travel Bucket list - Munnar</div> </div> <a ng-click=\"openSocialSite('https://www.facebook.com/deepak.rudra.paul')\" class=\"social-icon si-rounded si-small si-light si-facebook\"> <i class=\"icon-facebook\"></i> <i class=\"icon-facebook\"></i> </a> <a ng-click=\"openSocialSite('https://www.instagram.com/deepak_rudra_paul')\" class=\"social-icon si-rounded si-small si-light si-instagram\"> <i class=\"icon-instagram\"></i> <i class=\"icon-instagram\"></i> </a> </div> </div> </div> <div class=\"col-md-6 bottommargin\"> <div class=\"team team-list clearfix\"> <div class=\"team-image\"> <img src=\"https://s3-ap-southeast-1.amazonaws.com/wanderwagon/images/about/team/apoorva.jpg\" alt=\"Apoorva Bora\"> </div> <div class=\"team-desc\"> <div class=\"team-title\"> <h4>Apoorva Bora</h4><span style=\"color:#14C1E0\">Director of Content </span></div> <div class=\"team-content\"> <div> <b>Delhi University</b> </div> <div style=\"margin-top:10px\" class=\"one-liner-font\"> \"One who decided to go for it\" </div> <div style=\"margin-top:10px\" class=\"bucket-list-font\"> Travel Bucket list - UNESCO world heritage sites in India </div> </div> <a ng-click=\"openSocialSite('https://www.facebook.com/apoorva.bora')\" class=\"social-icon si-rounded si-small si-light si-facebook\"> <i class=\"icon-facebook\"></i> <i class=\"icon-facebook\"></i> </a> <a ng-click=\"openSocialSite('https://www.instagram.com/apoorvabora/')\" class=\"social-icon si-rounded si-small si-light si-instagram\"> <i class=\"icon-instagram\"></i> <i class=\"icon-instagram\"></i> </a> </div> </div> </div> <div class=\"col-md-6 bottommargin\"> <div class=\"team team-list clearfix\"> <div class=\"team-image\"> <img src=\"https://s3-ap-southeast-1.amazonaws.com/wanderwagon/images/about/team/negi.jpg\" alt=\"Vaibhav Negi\"> </div> <div class=\"team-desc\"> <div class=\"team-title\"> <h4>Vaibhav Negi</h4><span style=\"color:#14C1E0\">Creative Director</span></div> <div class=\"team-content\"> <div> <b>NIFT Delhi </b> </div> <div style=\"margin-top:10px\" class=\"one-liner-font\"> \"Takes the road not taken\" </div> <div style=\"margin-top:10px\" class=\"bucket-list-font\"> Travel Bucket list - Kanchenjunga</div> </div> <a ng-click=\"openSocialSite('https://www.facebook.com/Vaibhav.negi.09')\" class=\"social-icon si-rounded si-small si-light si-facebook\"> <i class=\"icon-facebook\"></i> <i class=\"icon-facebook\"></i> </a> <a ng-click=\"openSocialSite('https://www.instagram.com/da_noob_')\" class=\"social-icon si-rounded si-small si-light si-instagram\"> <i class=\"icon-instagram\"></i> <i class=\"icon-instagram\"></i> </a> <a ng-click=\"openSocialSite('https://www.behance.net/da_noob')\" class=\"social-icon si-rounded si-small si-light si-yahoo\"> <i class=\"icon-behance\">Be</i> <i class=\"icon-behance\">Be</i> </a> </div> </div> </div> <div class=\"col-md-6 bottommargin\"> <div class=\"team team-list clearfix\"> <div class=\"team-image\"> <img src=\"https://s3-ap-southeast-1.amazonaws.com/wanderwagon/images/about/team/Shailesh.jpg\" alt=\"Shailesh Kumar\"> </div> <div class=\"team-desc\"> <div class=\"team-title\"> <h4>Shailesh Kumar</h4><span style=\"color:#14C1E0\">Multimedia Developer</span></div> <div class=\"team-content\"> <div> <b>NIFT Delhi</b> </div> <div style=\"margin-top:10px\" class=\"one-liner-font\"> \"Always looking for a travel muse\" </div> <div style=\"margin-top:10px\" class=\"bucket-list-font\">Travel Bucket list - Chadar Trek </div> </div> <a ng-click=\"openSocialSite('https://www.facebook.com/abayvaibhu')\" class=\"social-icon si-rounded si-small si-light si-facebook\"> <i class=\"icon-facebook\"></i> <i class=\"icon-facebook\"></i> </a> <a ng-click=\"openSocialSite('https://www.instagram.com/shailesh_20')\" class=\"social-icon si-rounded si-small si-light si-instagram\"> <i class=\"icon-instagram\"></i> <i class=\"icon-instagram\"></i> </a> </div> </div> </div> <div class=\"col-md-6 bottommargin\"> <div class=\"team team-list clearfix\"> <div class=\"team-image\"> <img src=\"https://s3-ap-southeast-1.amazonaws.com/wanderwagon/images/about/team/Kokila.jpg\" alt=\"Kokila Srivastava\"> </div> <div class=\"team-desc\"> <div class=\"team-title\"> <h4>Kokila Srivastava</h4><span style=\"color:#14C1E0\">Content Developer</span></div> <div class=\"team-content\"> <div> <b>NIFT Delhi</b> </div> <div style=\"margin-top:10px\" class=\"one-liner-font\">\"One who weaves stories\" </div> <div style=\"margin-top:10px\" class=\"bucket-list-font\"> Travel Bucket list - Kashmir </div> </div> <a ng-click=\"openSocialSite('https://www.facebook.com/kokila.srivastava')\" class=\"social-icon si-rounded si-small si-light si-facebook\"> <i class=\"icon-facebook\"></i> <i class=\"icon-facebook\"></i> </a> <a ng-click=\"openSocialSite('https://www.instagram.com/madam_tutli_putli')\" class=\"social-icon si-rounded si-small si-light si-instagram\"> <i class=\"icon-instagram\"></i> <i class=\"icon-instagram\"></i> </a> </div> </div> </div> <div class=\"col-md-6 bottommargin\"> <div class=\"team team-list clearfix\"> <div class=\"team-image\"> <img src=\"https://s3-ap-southeast-1.amazonaws.com/wanderwagon/images/about/team/Shubham.jpg\" alt=\"Shubham Vig\"> </div> <div class=\"team-desc\"> <div class=\"team-title\"> <h4>Shubham Vig</h4><span style=\"color:#14C1E0\">Illustrator</span></div> <div class=\"team-content\"> <div> <b>NIFT Delhi</b> </div> <div style=\"margin-top:10px\" class=\"one-liner-font\"> \"Happy Travelling Feet\" </div> <div style=\"margin-top:10px\" class=\"bucket-list-font\"> Travel Bucket list - Mansarovar Lake </div> </div> <a ng-click=\"openSocialSite('https://www.facebook.com/shubham.vig.58')\" class=\"social-icon si-rounded si-small si-light si-facebook\"> <i class=\"icon-facebook\"></i> <i class=\"icon-facebook\"></i> </a> <a ng-click=\"openSocialSite('https://www.instagram.com/shubham.vig.58/')\" class=\"social-icon si-rounded si-small si-light si-instagram\"> <i class=\"icon-instagram\"></i> <i class=\"icon-instagram\"></i> </a> <a ng-click=\"openSocialSite('https://www.behance.net/Shubhamvig')\" class=\"social-icon si-rounded si-small si-light si-yahoo\"> <i class=\"icon-behance\">Be</i> <i class=\"icon-behance\">Be</i> </a> </div> </div> </div> <div class=\"col-md-6 bottommargin\"> <div class=\"team team-list clearfix\"> <div class=\"team-image\"> <img src=\"https://s3-ap-southeast-1.amazonaws.com/wanderwagon/images/about/team/Ashish.jpg\" alt=\"Ashish Goswami\"> </div> <div class=\"team-desc\"> <div class=\"team-title\"> <h4>Ashish Goswami</h4><span style=\"color:#14C1E0\">SEO Analyst </span></div> <div class=\"team-content\"> <div class=\"one-liner-font\"> \"Backpacks and Bunkbeds\" </div> <div style=\"margin-top:10px\" class=\"bucket-list-font\"> Travel Bucket list - Beyul Pamako Trek </div> </div> <a ng-click=\"openSocialSite('https://www.facebook.com/ashishgoswami01')\" class=\"social-icon si-rounded si-small si-light si-facebook\"> <i class=\"icon-facebook\"></i> <i class=\"icon-facebook\"></i> </a> <a ng-click=\"openSocialSite('https://www.instagram.com/ashish_here')\" class=\"social-icon si-rounded si-small si-light si-instagram\"> <i class=\"icon-instagram\"></i> <i class=\"icon-instagram\"></i> </a> <a ng-click=\"openSocialSite('https://www.linkedin.com/in/ashish-goswami-3b89209b')\" class=\"social-icon si-rounded si-small si-light si-linkedin\"> <i class=\"icon-linkedin\"></i> <i class=\"icon-linkedin\"></i> </a> </div> </div> </div> <div class=\"col-md-6 bottommargin\"> <div class=\"team team-list clearfix\"> <div class=\"team-image\"> <img src=\"https://s3-ap-southeast-1.amazonaws.com/wanderwagon/images/about/team/Shubham+bhatt.jpg\" alt=\"Shubham Bhatt\"> </div> <div class=\"team-desc\"> <div class=\"team-title\"> <h4>Shubham Bhatt</h4><span style=\"color:#14C1E0\">Content Marketing</span></div> <div class=\"team-content\"> <div style=\"margin-top:10px\" class=\"one-liner-font\"> \"Heart of a Vagabond\" </div> <div style=\"margin-top:10px\" class=\"bucket-list-font\">Travel Bucket list - Kasol </div> </div> <a ng-click=\"openSocialSite('https://www.facebook.com/shubham.bhatt.3388')\" class=\"social-icon si-rounded si-small si-light si-facebook\"> <i class=\"icon-facebook\"></i> <i class=\"icon-facebook\"></i> </a> <a ng-click=\"openSocialSite('https://www.instagram.com/s4tr2/')\" class=\"social-icon si-rounded si-small si-light si-instagram\"> <i class=\"icon-instagram\"></i> <i class=\"icon-instagram\"></i> </a> <a ng-click=\"openSocialSite('https://www.linkedin.com/in/shubham-bhatt')\" class=\"social-icon si-rounded si-small si-light si-linkedin\"> <i class=\"icon-linkedin\"></i> <i class=\"icon-linkedin\"></i> </a> </div> </div> </div> </div> </div> </section> <!-- #content end --> "
  );


  $templateCache.put('views/account.html',
    "<div style=\"padding-top:100px; background-color:#36353B\"> </div> <section style=\"background-color:#F2F2F2\"> <div class=\"center-block\" style=\"width:70%; padding:2%\"> <img height=\"300\" width=\"100%;\" class=\"cover\" src=\"https://s3-ap-southeast-1.amazonaws.com/wanderwagon/images/profile/profile_bg.jpg\"> <img width=\"150\" height=\"150\" style=\"border: 3px solid #FFF; border-radius: 50%; position:absolute; top:350px; left:20%\" src=\"images/profile.jpg\"> <div style=\"background-color:#FFF; padding:2% 0 2% 25%\"> <h4>John Smith <span ng-click=\"showModal()\" class=\"pull-right\"><i class=\"i-rounded icon-edit\"></i></span></h4>  <p> <span style=\"padding:0 2% 0 0\">99 years old</span> • <span style=\"padding:0 2%\"> India </span> • <span style=\"padding:0 2%\">Male</span> </p> <p>This is the bio text that users can customize by editing thier profile. As an admin you can set a maximum character limit for the bio. </p> <div> <h4>Favourite Travel Activities</h4> <div ng-style=\"{{}}\" ng-repeat=\"item in favouriteActivities\" class=\"chip\"> {{item.name}} </div> </div> </div> </div> </section> <div class=\"modal fade\" id=\"profileEditModal\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"profileEditModal\"> <div class=\"modal-dialog\" role=\"document\"> <div class=\"modal-content\"> <div class=\"modal-header\"> <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Close\"><span aria-hidden=\"true\">&times;</span></button> <h4 class=\"modal-title\" id=\"profileEditModallabel\">Edit Profile</h4> </div> <div class=\"modal-body\"> <div class=\"row\" style=\"padding:0 2%\"> <form name=\"profileForm\" class=\"nobottommargin\" ng-submit=\"onFormSubmit(profileForm)\"> <div class=\"col-sm-6 toppadding\"> <input ng-model=\"profileObj.name\" class=\"form-control\" type=\"text\" value=\"{{name}}\" placeholder=\"Name\"> </div> <div class=\"col-sm-6 toppadding\"> <input ng-model=\"profileObj.age\" class=\"form-control\" type=\"text\" value=\"{{age}}\" placeholder=\"Age\"> </div> <div class=\"col-sm-6 toppadding\"> <input ng-model=\"profileObj.place\" class=\"form-control\" type=\"text\" value=\"{{place}}\" placeholder=\"Place\"> </div> <div class=\"col-sm-6 toppadding\"> <input ng-model=\"profileObj.gender\" class=\"form-control\" type=\"text\" value=\"{{gender}}\" placeholder=\"Gender\"> </div> <div class=\"col-sm-12 toppadding\"> <textarea ng-model=\"profileObj.bio\" style=\"max-width:100%; max-height:200px\" class=\"form-control\" placeholder=\"Bio\"></textarea> </div> <div style=\"text-transform:capitalize; padding-top:20px\" class=\"col-sm-6\"> <button type=\"submit\" style=\"margin:0px !important; width:100%; height:70px\" class=\"button button-blue\">Save</button> </div> </form> </div> </div> </div> </div> </div> "
  );


  $templateCache.put('views/blog-detail.html',
    "<div class=\"cover-page\" style=\"background-color:#36353B;background-image: url({{postDetail.imageUrl}});background-attachment: fixed;\n" +
    "background-position: center;\n" +
    "background-repeat: no-repeat;\n" +
    "background-size: cover; height:100vh\"> <div class=\"container clearfix\"> <div class=\"center-block slider-caption-center\"> <h2 class=\"text-center primary-title\">{{postDetail.title}}</h2> <!-- <p class=\"text-center primary-title-1\">{{detail.title}}</p> --> </div> </div> </div> <div class=\"mobile-cover-page\" style=\"background-color:#36353B;background: url({{postDetail.imageUrl}}) no-repeat center center fixed;background-attachment: fixed;\n" +
    "background-size: cover; height:100vh\"> <div class=\"container clearfix\"> <div class=\"center-block slider-caption-center\"> <h2 class=\"text-center primary-title\">{{postDetail.title}}</h2> <!-- <p class=\"text-center primary-title-1\">{{detail.title}}</p> --> </div> </div> </div> <!-- <div class=\"si-sticky\">\n" +
    "  <a socialshare\n" +
    "  socialshare-provider=\"facebook\" \n" +
    "  socialshare-via=\"1758555154405794\" \n" +
    "  socialshare-type=\"feed\" \n" +
    "  socialshare-description=\"{{postDetail.description}}\" \n" +
    "  socialshare-media=\"{{postDetail.imageUrl}}\"        \n" +
    "  socialshare-text=\"{{postDetail.title}}\" \n" +
    "  socialshare-caption=\"#wanderwagon\"\n" +
    "  socialshare-url=\"http://www.wanderwagon.com\" class=\"social-icon si-facebook\" data-animate=\"bounceInLeft\">\n" +
    "    <i class=\"icon-facebook\"></i>\n" +
    "    <i class=\"icon-facebook\"></i>\n" +
    "  </a>\n" +
    "  <a socialshare socialshare-provider=\"twitter\" socialshare-text=\"For rivers, seas and slopes at their most inviting\" socialshare-hashtags=\"wanderwagon\"\n" +
    "                    socialshare-description=\"Nullam id dolor id nibh ultricies vehicula ut id elit. Curabitur blandit tempus porttitor. Integer posuere\n" +
    "                erat a ante venenatis dapibus posuere velit aliquet. Cras justo odio, dapibus ac facilisis in, egestas eget\n" +
    "                quam. Vestibulum id ligula porta felis euismod semper. Donec id elit non mi porta gravida at eget metus.\n" +
    "                Vestibulum id ligula porta felis euismod semper.\" socialshare-media=\"images/home-bg.jpg\" socialshare-url=\"http://wanderwagon.com/\" class=\"social-icon si-twitter\" data-animate=\"bounceInLeft\" data-delay=\"600\">\n" +
    "    <i class=\"icon-twitter\"></i>\n" +
    "    <i class=\"icon-twitter\"></i>\n" +
    "  </a>\n" +
    "  <a href=\"#\" class=\"social-icon si-gplus\" data-animate=\"bounceInLeft\" data-delay=\"600\">\n" +
    "    <i class=\"icon-gplus\"></i>\n" +
    "    <i class=\"icon-gplus\"></i>\n" +
    "  </a> -->   <section id=\"content\"> <div class=\"custom-blog-detail single-post nobottommargin center-block\"> <!-- Single Post\n" +
    "						============================================= --> <div class=\"clearfix\"> <div class=\"topmargin\"> <p class=\"blog-content\" style=\"text-align:justify;font-size:1.5rem\"> {{postDetail.description}} </p> <div class=\"topmargin\" ng-repeat=\"point in postDetail.blogSections\"> <h3 class=\"common-title\"> {{point.title}} </h3> <div ng-repeat=\"para in point.paragraphs\"> <p class=\"blog-content\" style=\"text-align:justify; font-size:1.5rem\"> {{para.text}} </p> <!--<p>{{para.bulletPoints}}</p>--> <ul style=\"margin-left:5%\"> <li style=\"color: #67747c;\n" +
    "  font-family: Benton Sans, Helvetica Neue, Helvetica, Arial, sans-serif;\n" +
    "  font-size: 1.5rem;\n" +
    "  line-height: 1.8;\n" +
    "  text-align: justify\" ng-repeat=\"bullet in para.bulletPoints\">{{bullet.text}}</li> </ul> </div> <div> <img ng-src=\"{{point.imageUrl}}\" alt=\"Blog Single\" width=\"100%;\"> </div> </div> <div class=\"clear\"></div> </div> </div> <!-- .entry end --> <!-- Post Author Info\n" +
    "						============================================= --> <div class=\"panel panel-default\"> <div style=\"padding:1%; color: #333333;\n" +
    "    background-color: #dddddd !important;\n" +
    "    border: 0px solid #000; margin-top:5%\"> <p style=\"cursor:pointer; margin-top:0; margin-bottom:0\" class=\"common-title\">Posted by <span><a style=\"color:#14C1E0\">{{postDetail.author.name}}</a></span></p> </div> <div class=\"panel-body\" style=\"border: 0px solid #000\"> <div style=\"cursor:pointer\" class=\"author-image\"> <img ng-src=\"{{postDetail.author.imageUrl}}\" alt=\"\" class=\"img-circle\"> </div> <p style=\"text-align:justify\" class=\"common-font\"> {{postDetail.author.about}} </p> </div> </div> <!-- Post Single - Author End --> <div class=\"center-block\" style=\"background-color: #1265A8;padding:2%; text-align:center; cursor:pointer\"> <a style=\"margin-bottom: 0px;\n" +
    "    font-size: 2rem;\n" +
    "    letter-spacing: 1px;\n" +
    "    font-weight: 300;\n" +
    "    padding:2%;\n" +
    "    color: #fff\" href=\"mailto:contact@wanderwagon.com\" target=\"_blank\"> Share your story with us at contact@wanderwagon.com</a> </div> <!-- Comments\n" +
    "						============================================= --> <div id=\"comments\" class=\"clearfix\"> <h3 id=\"comments-title\"><span>{{comments.length}}</span> Comments</h3> <!-- Comments List\n" +
    "							============================================= --> <ol ng-if=\"comments.length > 0\" class=\"commentlist clearfix\"> <li ng-repeat=\"item in comments\" class=\"comment even thread-even depth-1\" id=\"li-comment-1\"> <div id=\"comment-1\" class=\"comment-wrap clearfix\"> <div class=\"comment-meta\"> <div class=\"comment-author vcard\"> <span class=\"comment-avatar clearfix\"> <img alt=\"\" ng-src=\"{{item.profilePic}}\" class=\"avatar avatar-60 photo avatar-default\" height=\"60\" width=\"60\"></span> </div> </div> <div class=\"comment-content clearfix\"> <div class=\"comment-author\">{{item.userName}}<span><a title=\"Permalink to this comment\">{{item.date | date : 'MMM d, y h:mm a'}}</a></span></div> <p>{{item.comment}}</p> </div> <div class=\"clear\"></div> </div> </li> </ol> <!-- .commentlist end --> <div class=\"clear\"></div> <!-- Comment Form\n" +
    "							============================================= --> <div id=\"respond\" class=\"clearfix\"> <button style=\"float:right\" ng-click=\"showCommentForm()\" id=\"\" tabindex=\"5\" class=\"button button-blue\">ADD A COMMENT</button> <form ng-if=\"showForm\" class=\"clearfix\" id=\"commentform\" ng-submit=\"postComment(postDetail.id)\"> <div class=\"col_full\"> <label for=\"comment\">Comment</label> <textarea required name=\"comment\" ng-model=\"commentObj.comment\" cols=\"58\" rows=\"7\" tabindex=\"4\" class=\"sm-form-control\"></textarea> </div> <div class=\"col_full nobottommargin\"> <button type=\"submit\" name=\"submit\" id=\"submit-button\" tabindex=\"5\" class=\"button button-blue\">Submit</button> </div> </form> </div> <!-- #respond end --> </div> <!-- #comments end --> </div> </section> <!-- #content end --> <div class=\"modal fade\" id=\"shareModal\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"shareModal\"> <div class=\"modal-dialog\" role=\"document\"> <div class=\"modal-content\"> <div class=\"modal-header\"> <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Close\"><span aria-hidden=\"true\">&times;</span></button> <h4 class=\"modal-title\" id=\"shareModallabel\">{{messageType}}</h4> </div> <div class=\"modal-body\"> <div class=\"row\"> <div style=\"padding:5%\" class=\"col-full\"> {{message}} </div> <!--<div class=\"col-md-6 col-sm-6 col-xs-6 text-right\">\n" +
    "            Its button\n" +
    "					</div>--> </div> </div> <!--<div class=\"modal-body\" ng-show=\"error\">\n" +
    "				<div class=\"row filter-remove text-center\">\n" +
    "					<p>Error</p>\n" +
    "				</div>\n" +
    "			</div>--> </div> </div> </div> "
  );


  $templateCache.put('views/blog-list.html',
    "<div class=\"cover-page\" style=\"background-color:#36353B;background-image: url('https://s3-ap-southeast-1.amazonaws.com/wanderwagon/images/blogs/cover-pic.jpg');background-attachment: fixed;\n" +
    "background-position: center;\n" +
    "background-repeat: no-repeat;\n" +
    "background-size: cover; height:100vh\"> </div> <div class=\"mobile-cover-page\" style=\"background-color:#36353B;background: url('https://s3-ap-southeast-1.amazonaws.com/wanderwagon/images/mobile/blog_cover.jpg') no-repeat center center fixed;background-size: cover; height:100vh\"> </div> <!-- Content\n" +
    "		============================================= --> <section id=\"content\" style=\"margin-top:5%\"> <div class=\"container\"> <!-- Post Content\n" +
    "					============================================= --> <div class=\"postcontent nobottommargin clearfix center-block custom-margin\"> <!-- Posts\n" +
    "						============================================= --> <div id=\"posts\" class=\"post-timeline clearfix\"> <div class=\"timeline-border\"></div> <div ng-repeat=\"post in posts | orderBy:'-date'\" class=\"entry clearfix\"> <div class=\"entry-timeline\" style=\"color: #14C1E0\"> {{post.date | date:'dd'}}<span>{{post.date | date:'MMM'}}</span> <div class=\"timeline-divider\"></div> </div> <div class=\"entry-image\"> <a ui-sref=\"blog.detail({postId: post.id})\" data-lightbox=\"image\"> <span class=\"image_fade\" picture-fill> <span pf-src=\"{{post.imageUrl | trimExt}}.jpg\" data-media=\"(max-width: 768px)\"></span> <span pf-src=\"{{post.imageUrl | trimExt}}.jpg\" data-media=\"(min-width: 768px)\"></span> </span> </a> </div> <div class=\"entry-title\"> <h3 style=\"cursor:pointer\" class=\"blog-title\" ui-sref=\"blog.detail({postId: post.id})\"> {{post.title}}</h3> </div> <ul class=\"entry-meta clearfix\" style=\"margin:1%\"> <li><a href=\"#\"><i class=\"icon-user\"></i> {{post.author}}</a></li> <li><a><i class=\"icon-comments\"></i> {{post.comments}} Comment(s)</a></li> </ul> <div class=\"blog-content clearfix\"> <p>{{post.description}}</p> <a href=\"\" ui-sref=\"blog.detail({postId: post.id})\" class=\"more-link\" style=\"color: #14C1E0\">Read More</a> </div> </div> </div> <!-- #posts end --> <!-- Pagination\n" +
    "						============================================= --> <!-- <ul class=\"pager\">\n" +
    "          <li class=\"previous\"><a href=\"#\">&larr; Older</a></li>\n" +
    "          <li class=\"next\"><a href=\"#\">Newer &rarr;</a></li>\n" +
    "        </ul> --> <!-- .pager end --> </div> <!-- .postcontent end --> </div> </section> <!-- #content end --> "
  );


  $templateCache.put('views/cancellation-policy.html',
    "<section style=\"background:#36353B\" id=\"page-title\"> </section> <!-- #page-title end --> <div style=\"margin-top:50px\" class=\"container\"> <h3 class=\"content-title\">Cancellation/ Modification Policy</h3> <h2 style=\"font-size:16px\">Wanderwagon believes in helping its customers as far as possible, and has therefore a liberal cancellation policy. Under this policy:</h2> <ul class=\"normal_ul\"> <li>Cancellation must be requested via mail and a viable reason for cancellation is requested to be cited. Mail at booking@wanderwagon.com.</li> <li>In certain circumstances, the planned trip can be transferred to a third party but a written request must be made to booking@wanderwagon.com and the decision will solely depend on the Wanderwagon . </li> <li>Additionally, in case of no-show no amount will be refunded under any circumstances including natural forces, accidents, illness etc. </li> <li>If a member of party cancels his trip for example- say if two members of a group of 10 decide to cancel their trip then that must be notified within 7 days before departure to booking@wanderwagon.com and only then an amount of total deposit will be refunded. That amount will be decided solely by the Wanderwagon team because planning a trip depends on several interdependent factors.</li> <li> In case if you feel the facilities or product provided during the tour was not satisfactory or misleading, please bring it to our attention by writing to booking@wanderwagon.com or call us at +91 9999553113. Appropriate measures will be taken after looking into the complaint. Additionally, if you are not satisfied with your overall experience with us, then do write us at booking@wanderwagon.com; our sole aim is to provide a good travel experience to our customers and our team will take appropriate measures to cover your loss. </li> <li>No cancellations are entertained for those products that the Wanderwagon marketing team has obtained on special tours like Group Tour, etc. These are limited occasion offers and therefore cancellations are not possible.</li> <li>Wanderwagon or its affiliate partners will not be liable for any Visa rejections and Hotel cancellation policies would still stand as they are.</li> <li>Refunds can only be given in cases of inclusions mentioned in package confirmed by customer are not delivered by booking agent. Refunds will not be given in any other case.</li> <li>If due to unforeseen circumstances, the traveler has to pay for the inclusions already mentioned in the package, refund claims for the inclusions part of the package may be considered and refunded upon submission of proper receipts, provided this was pre-informed to Wanderwagon advisor or travel agent.</li> <li>Wanderwagon guarantees delivery of services booked through www.wanderwagon.com. In case part package is booked by traveler themselves or outside of Wanderwagon, no claim against such services shall be entertained.</li> <li>In case local attractions are closed for maintenance/weather conditions/government orders/strike/curfew/natural calamity/other unforeseen reasons, Wanderwagon/travel agent will try its best to reimburse the traveler appropriate amount against the same in case refund is possible. However, Wanderwagon/travel agent are not obligated for the same and cannot be held liable against it.</li> </ul> <br><br> <h1 style=\"font-size:22px\">Refund Policy</h1> <h2 style=\"font-size:16px\">Under this policy:</h2> <ul class=\"normal_ul\"> <li>If you are, for any reason, not entirely happy with your purchase, we will cheerfully issue applicable refund provided such refund is sought pursuant to cancellation and the request for same is made within 72 hours of your purchase and shall be further subject to the travel agent having not processed your order. To request a refund, simply contact us with your purchase details within three (3) days of your purchase.</li> <li>Please include your order number (sent to you via email after ordering) and optionally tell us why you’re requesting a refund - we take customer feedback very seriously and use it to constantly improve our products and quality of service. Refunds are being processed within 21 days period however, we shall not be liable for any default caused in processing the refund amount owing to the delay caused by processing bank.</li> <li>Any amendments/additions to package (dates, inclusions, itinerary etc), will be done at extra cost to the customer. Changes made to the package will be made as per cancellation policy of the original package and customer has to bear the cost incurred due to this.</li> <li>Wanderwagon doesn't encourage changes and modifications to online bookings once they're made. However, facilitation of changes related to postponement or rescheduling of the already booked package is the sole discretion of Travel agent under permitted circumstances. Wanderwagon shall not be held liable for any impact due to change in original itinerary by the traveler and this is subject to mutual agreement and discussion between traveler and travel agent.</li> <li>In case of force majeure cases (such as curfew, riots etc), Wanderwagon shall not be liable for any losses made thereof.</li> <li>Circumstances amounting to “force majeure” include any event which we or the supplier of the service(s) in question could not even with all due care, foresee or forestall such as (by way of example and not by way of limitation) war, threat of war, riot, civil strife, industrial dispute, terrorist activity, natural or nuclear disaster, fire, acts of God, adverse weather conditions, and all similar events.</li> </ul> </div> "
  );


  $templateCache.put('views/careers.html',
    " <!-- Page Title\n" +
    "		============================================= --> <section id=\"page-title\" style=\"background-image: url('https://www.harman.com/sites/default/files/Careers-new.jpg'); padding: 120px 0\" data-stellar-background-ratio=\"0.3\"> <div class=\"container clearfix\"> <h1>Job Openings</h1> <span>Join our Fabulous Team of Intelligent Individuals</span> </div> </section><!-- #page-title end --> <!-- Content\n" +
    "		============================================= --> <section id=\"content\"> <div class=\"content-wrap\"> <div class=\"container clearfix\"> <div class=\"col_three_fifth nobottommargin\"> <div class=\"fancy-title title-bottom-border\"> <h3>Senior Python Developer</h3> </div> <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nemo, natus voluptatibus adipisci porro magni dolore eos eius ducimus corporis quos perspiciatis quis iste, vitae autem libero ullam omnis cupiditate quam.</p> <div class=\"accordion accordion-bg clearfix\"> <div class=\"acctitle\"><i class=\"acc-closed icon-ok-circle\"></i><i class=\"acc-open icon-remove-circle\"></i>Requirements</div> <div class=\"acc_content clearfix\"> <ul class=\"iconlist iconlist-color nobottommargin\"> <li><i class=\"icon-ok\"></i>B.Tech./ B.E / MCA degree in Computer Science, Engineering or a related stream.</li> <li><i class=\"icon-ok\"></i>3+ years of software development experience.</li> <li><i class=\"icon-ok\"></i>3+ years of Python / Java development projects experience.</li> <li><i class=\"icon-ok\"></i>Minimum of 4 live project roll outs.</li> <li><i class=\"icon-ok\"></i>Experience with third-party libraries and APIs.</li> <li><i class=\"icon-ok\"></i>In depth understanding and experience of either SDLC or PDLC.</li> <li><i class=\"icon-ok\"></i>Good Communication Skills</li> <li><i class=\"icon-ok\"></i>Team Player</li> </ul> </div> <div class=\"acctitle\"><i class=\"acc-closed icon-ok-circle\"></i><i class=\"acc-open icon-remove-circle\"></i>What we Expect from you?</div> <div class=\"acc_content clearfix\"> <ul class=\"iconlist iconlist-color nobottommargin\"> <li><i class=\"icon-plus-sign\"></i>Design and build applications/ components using open source technology.</li> <li><i class=\"icon-plus-sign\"></i>Taking complete ownership of the deliveries assigned.</li> <li><i class=\"icon-plus-sign\"></i>Collaborate with cross-functional teams to define, design, and ship new features.</li> <li><i class=\"icon-plus-sign\"></i>Work with outside data sources and API's.</li> <li><i class=\"icon-plus-sign\"></i>Unit-test code for robustness, including edge cases, usability, and general reliability.</li> <li><i class=\"icon-plus-sign\"></i>Work on bug fixing and improving application performance.</li> </ul> </div> <div class=\"acctitle\"><i class=\"acc-closed icon-ok-circle\"></i><i class=\"acc-open icon-remove-circle\"></i>What you've got?</div> <div class=\"acc_content clearfix\">You'll be familiar with agile practices and have a highly technical background, comfortable discussing detailed technical aspects of system design and implementation, whilst remaining business driven. With 5+ years of systems analysis, technical analysis or business analysis experience, you'll have an expansive toolkit of communication techniques to enable shared, deep understanding of financial and technical concepts by diverse stakeholders with varying backgrounds and needs. In addition, you will have exposure to financial systems or accounting knowledge.</div> </div> <a href=\"#\" data-scrollto=\"#job-apply\" class=\"button button-3d button-black nomargin\">Apply Now</a> <div class=\"divider divider-short\"><i class=\"icon-star3\"></i></div> <div class=\"fancy-title title-bottom-border\"> <h3>Design Analyst</h3> </div> <p>Repudiandae quasi perspiciatis ea placeat nobis asperiores quod fuga ipsa facere enim ipsum expedita debitis, sit quia adipisci deserunt vitae hic obcaecati voluptates rerum nihil.</p> <div class=\"accordion accordion-bg clearfix\"> <div class=\"acctitle\"><i class=\"acc-closed icon-ok-circle\"></i><i class=\"acc-open icon-remove-circle\"></i>Requirements</div> <div class=\"acc_content clearfix\"> <ul class=\"iconlist iconlist-color nobottommargin\"> <li><i class=\"icon-ok\"></i>B.Tech./ B.E / MCA degree in Computer Science, Engineering or a related stream.</li> <li><i class=\"icon-ok\"></i>3+ years of software development experience.</li> <li><i class=\"icon-ok\"></i>3+ years of Python / Java development projects experience.</li> <li><i class=\"icon-ok\"></i>Minimum of 4 live project roll outs.</li> <li><i class=\"icon-ok\"></i>Experience with third-party libraries and APIs.</li> <li><i class=\"icon-ok\"></i>In depth understanding and experience of either SDLC or PDLC.</li> <li><i class=\"icon-ok\"></i>Good Communication Skills</li> <li><i class=\"icon-ok\"></i>Team Player</li> </ul> </div> <div class=\"acctitle\"><i class=\"acc-closed icon-ok-circle\"></i><i class=\"acc-open icon-remove-circle\"></i>What we Expect from you?</div> <div class=\"acc_content clearfix\"> <ul class=\"iconlist iconlist-color nobottommargin\"> <li><i class=\"icon-plus-sign\"></i>Design and build applications/ components using open source technology.</li> <li><i class=\"icon-plus-sign\"></i>Taking complete ownership of the deliveries assigned.</li> <li><i class=\"icon-plus-sign\"></i>Collaborate with cross-functional teams to define, design, and ship new features.</li> <li><i class=\"icon-plus-sign\"></i>Work with outside data sources and API's.</li> <li><i class=\"icon-plus-sign\"></i>Unit-test code for robustness, including edge cases, usability, and general reliability.</li> <li><i class=\"icon-plus-sign\"></i>Work on bug fixing and improving application performance.</li> </ul> </div> <div class=\"acctitle\"><i class=\"acc-closed icon-ok-circle\"></i><i class=\"acc-open icon-remove-circle\"></i>What you've got?</div> <div class=\"acc_content clearfix\">You'll be familiar with agile practices and have a highly technical background, comfortable discussing detailed technical aspects of system design and implementation, whilst remaining business driven. With 5+ years of systems analysis, technical analysis or business analysis experience, you'll have an expansive toolkit of communication techniques to enable shared, deep understanding of financial and technical concepts by diverse stakeholders with varying backgrounds and needs. In addition, you will have exposure to financial systems or accounting knowledge.</div> </div> <a href=\"#\" data-scrollto=\"#job-apply\" class=\"button button-3d button-black nomargin\">Apply Now</a> <div class=\"divider divider-short\"><i class=\"icon-star3\"></i></div> <div class=\"fancy-title title-bottom-border\"> <h3>Head of UX and Design</h3> </div> <p>Repudiandae quasi perspiciatis ea placeat nobis asperiores quod fuga ipsa facere enim ipsum expedita debitis, sit quia adipisci deserunt vitae hic obcaecati voluptates rerum nihil.</p> <div class=\"accordion accordion-bg clearfix\"> <div class=\"acctitle\"><i class=\"acc-closed icon-ok-circle\"></i><i class=\"acc-open icon-remove-circle\"></i>Requirements</div> <div class=\"acc_content clearfix\"> <ul class=\"iconlist iconlist-color nobottommargin\"> <li><i class=\"icon-ok\"></i>B.Tech./ B.E / MCA degree in Computer Science, Engineering or a related stream.</li> <li><i class=\"icon-ok\"></i>3+ years of software development experience.</li> <li><i class=\"icon-ok\"></i>3+ years of Python / Java development projects experience.</li> <li><i class=\"icon-ok\"></i>Minimum of 4 live project roll outs.</li> <li><i class=\"icon-ok\"></i>Experience with third-party libraries and APIs.</li> <li><i class=\"icon-ok\"></i>In depth understanding and experience of either SDLC or PDLC.</li> <li><i class=\"icon-ok\"></i>Good Communication Skills</li> <li><i class=\"icon-ok\"></i>Team Player</li> </ul> </div> <div class=\"acctitle\"><i class=\"acc-closed icon-ok-circle\"></i><i class=\"acc-open icon-remove-circle\"></i>What we Expect from you?</div> <div class=\"acc_content clearfix\"> <ul class=\"iconlist iconlist-color nobottommargin\"> <li><i class=\"icon-plus-sign\"></i>Design and build applications/ components using open source technology.</li> <li><i class=\"icon-plus-sign\"></i>Taking complete ownership of the deliveries assigned.</li> <li><i class=\"icon-plus-sign\"></i>Collaborate with cross-functional teams to define, design, and ship new features.</li> <li><i class=\"icon-plus-sign\"></i>Work with outside data sources and API's.</li> <li><i class=\"icon-plus-sign\"></i>Unit-test code for robustness, including edge cases, usability, and general reliability.</li> <li><i class=\"icon-plus-sign\"></i>Work on bug fixing and improving application performance.</li> </ul> </div> <div class=\"acctitle\"><i class=\"acc-closed icon-ok-circle\"></i><i class=\"acc-open icon-remove-circle\"></i>What you've got?</div> <div class=\"acc_content clearfix\">You'll be familiar with agile practices and have a highly technical background, comfortable discussing detailed technical aspects of system design and implementation, whilst remaining business driven. With 5+ years of systems analysis, technical analysis or business analysis experience, you'll have an expansive toolkit of communication techniques to enable shared, deep understanding of financial and technical concepts by diverse stakeholders with varying backgrounds and needs. In addition, you will have exposure to financial systems or accounting knowledge.</div> </div> <a href=\"#\" data-scrollto=\"#job-apply\" class=\"button button-3d button-black nomargin\">Apply Now</a> <div class=\"divider divider-short\"><i class=\"icon-star3\"></i></div> <div class=\"fancy-title title-bottom-border\"> <h3>Web &amp; Visual Designer (Marketing)</h3> </div> <p>Repudiandae quasi perspiciatis ea placeat nobis asperiores quod fuga ipsa facere enim ipsum expedita debitis, sit quia adipisci deserunt vitae hic obcaecati voluptates rerum nihil.</p> <div class=\"accordion accordion-bg clearfix\"> <div class=\"acctitle\"><i class=\"acc-closed icon-ok-circle\"></i><i class=\"acc-open icon-remove-circle\"></i>Requirements</div> <div class=\"acc_content clearfix\"> <ul class=\"iconlist iconlist-color nobottommargin\"> <li><i class=\"icon-ok\"></i>B.Tech./ B.E / MCA degree in Computer Science, Engineering or a related stream.</li> <li><i class=\"icon-ok\"></i>3+ years of software development experience.</li> <li><i class=\"icon-ok\"></i>3+ years of Python / Java development projects experience.</li> <li><i class=\"icon-ok\"></i>Minimum of 4 live project roll outs.</li> <li><i class=\"icon-ok\"></i>Experience with third-party libraries and APIs.</li> <li><i class=\"icon-ok\"></i>In depth understanding and experience of either SDLC or PDLC.</li> <li><i class=\"icon-ok\"></i>Good Communication Skills</li> <li><i class=\"icon-ok\"></i>Team Player</li> </ul> </div> <div class=\"acctitle\"><i class=\"acc-closed icon-ok-circle\"></i><i class=\"acc-open icon-remove-circle\"></i>What we Expect from you?</div> <div class=\"acc_content clearfix\"> <ul class=\"iconlist iconlist-color nobottommargin\"> <li><i class=\"icon-plus-sign\"></i>Design and build applications/ components using open source technology.</li> <li><i class=\"icon-plus-sign\"></i>Taking complete ownership of the deliveries assigned.</li> <li><i class=\"icon-plus-sign\"></i>Collaborate with cross-functional teams to define, design, and ship new features.</li> <li><i class=\"icon-plus-sign\"></i>Work with outside data sources and API's.</li> <li><i class=\"icon-plus-sign\"></i>Unit-test code for robustness, including edge cases, usability, and general reliability.</li> <li><i class=\"icon-plus-sign\"></i>Work on bug fixing and improving application performance.</li> </ul> </div> <div class=\"acctitle\"><i class=\"acc-closed icon-ok-circle\"></i><i class=\"acc-open icon-remove-circle\"></i>What you've got?</div> <div class=\"acc_content clearfix\">You'll be familiar with agile practices and have a highly technical background, comfortable discussing detailed technical aspects of system design and implementation, whilst remaining business driven. With 5+ years of systems analysis, technical analysis or business analysis experience, you'll have an expansive toolkit of communication techniques to enable shared, deep understanding of financial and technical concepts by diverse stakeholders with varying backgrounds and needs. In addition, you will have exposure to financial systems or accounting knowledge.</div> </div> <a href=\"#\" data-scrollto=\"#job-apply\" data-highlight=\"yellow\" class=\"button button-3d button-black nomargin\">Apply Now</a> </div> <div class=\"col_two_fifth nobottommargin col_last\"> <div id=\"job-apply\" class=\"heading-block highlight-me\"> <h2>Apply Now</h2> <span>And we'll get back to you within 48 hours.</span> </div> <div class=\"contact-widget\"> <div class=\"contact-form-result\"></div> <form action=\"include/jobs.php\" id=\"template-jobform\" name=\"template-jobform\" method=\"post\" role=\"form\"> <div class=\"form-process\"></div> <div class=\"col_half\"> <label for=\"template-jobform-fname\">First Name <small>*</small></label> <input type=\"text\" id=\"template-jobform-fname\" name=\"template-jobform-fname\" value=\"\" class=\"sm-form-control required\"> </div> <div class=\"col_half col_last\"> <label for=\"template-jobform-lname\">Last Name <small>*</small></label> <input type=\"text\" id=\"template-jobform-lname\" name=\"template-jobform-lname\" value=\"\" class=\"sm-form-control required\"> </div> <div class=\"clear\"></div> <div class=\"col_full\"> <label for=\"template-jobform-email\">Email <small>*</small></label> <input type=\"email\" id=\"template-jobform-email\" name=\"template-jobform-email\" value=\"\" class=\"required email sm-form-control\"> </div> <div class=\"col_half\"> <label for=\"template-jobform-age\">Age <small>*</small></label> <input type=\"text\" name=\"template-jobform-age\" id=\"template-jobform-age\" value=\"\" size=\"22\" tabindex=\"4\" class=\"sm-form-control required\"> </div> <div class=\"col_half col_last\"> <label for=\"template-jobform-city\">City <small>*</small></label> <input type=\"text\" name=\"template-jobform-city\" id=\"template-jobform-city\" value=\"\" size=\"22\" tabindex=\"5\" class=\"sm-form-control required\"> </div> <div class=\"clear\"></div> <div class=\"col_full\"> <label for=\"template-jobform-service\">Position <small>*</small></label> <select name=\"template-jobform-position\" id=\"template-jobform-position\" tabindex=\"9\" class=\"sm-form-control required\"> <option value=\"\">-- Select Position --</option> <option value=\"Senior Python Developer\">Senior Python Developer</option> <option value=\"Design Analyst\">Design Analyst</option> <option value=\"Head of UX and Design\">Head of UX and Design</option> <option value=\"Web &amp; Visual Designer (Marketing)\">Web &amp; Visual Designer (Marketing)</option> </select> </div> <div class=\"col_half\"> <label for=\"template-jobform-salary\">Expected Salary</label> <input type=\"text\" name=\"template-jobform-salary\" id=\"template-jobform-salary\" value=\"\" size=\"22\" tabindex=\"6\" class=\"sm-form-control\"> </div> <div class=\"col_half col_last\"> <label for=\"template-jobform-time\">Start Date</label> <input type=\"text\" name=\"template-jobform-start\" id=\"template-jobform-start\" value=\"\" size=\"22\" tabindex=\"7\" class=\"sm-form-control\"> </div> <div class=\"clear\"></div> <div class=\"col_full\"> <label for=\"template-jobform-website\">Website (if any)</label> <input type=\"text\" name=\"template-jobform-website\" id=\"template-jobform-website\" value=\"\" size=\"22\" tabindex=\"8\" class=\"sm-form-control\"> </div> <div class=\"col_full\"> <label for=\"template-jobform-experience\">Experience (optional)</label> <textarea name=\"template-jobform-experience\" id=\"template-jobform-experience\" rows=\"3\" tabindex=\"10\" class=\"sm-form-control\"></textarea> </div> <div class=\"col_full\"> <label for=\"template-jobform-application\">Application <small>*</small></label> <textarea name=\"template-jobform-application\" id=\"template-jobform-application\" rows=\"6\" tabindex=\"11\" class=\"sm-form-control required\"></textarea> </div> <div class=\"col_full hidden\"> <input type=\"text\" id=\"template-jobform-botcheck\" name=\"template-jobform-botcheck\" value=\"\" class=\"sm-form-control\"> </div> <div class=\"col_full\"> <button class=\"button button-3d button-large btn-block nomargin\" name=\"template-jobform-apply\" type=\"submit\" value=\"apply\">Send Application</button> </div> </form> </div> </div> </div> </div> </section><!-- #content end --> "
  );


  $templateCache.put('views/change-password.html',
    "<section id=\"content\" style=\"background-color:#36353B;background-size: cover;background-image: url('images/login-bg.jpg')\"> <div ng-show=\"verified\" class=\"style-msg2 center-block\" style=\"width:50%; margin-top:10%; margin-bottom:10%; background-color: #EEE\"> <div class=\"msgtitle\">{{messageType}}</div> <div class=\"sb-msg\"> <form name=\"changePasswordForm\" class=\"nobottommargin\" ng-submit=\"onSubmit(changePasswordForm)\"> <div style=\"width:80%\"> <label for=\"register-form-password\">Choose Password:</label> <input type=\"password\" id=\"register-form-password\" name=\"register-form-password\" ng-model=\"obj.password\" value=\"\" class=\"form-control\" required> </div> <div style=\"width:80%\"> <label for=\"register-form-repassword\">Re-enter Password:</label> <input type=\"password\" id=\"register-form-repassword\" name=\"register-form-repassword\" ng-model=\"obj.confirmPassword\" value=\"\" class=\"form-control\" required> </div> <div class=\"col_full topmargin\"> <button type=\"submit\" class=\"button button-blue\"><font color=\"white\">Change Password</font></button> </div> </form> </div> </div> <div ng-show=\"!verified\" class=\"style-msg2 center-block\" style=\"width:60%; margin-top:20%; margin-bottom:20%; background-color: #EEE\"> <div class=\"msgtitle\">{{messageType}}</div> <div class=\"sb-msg\"> {{errorMessage}} </div> <a style=\"cursor:pointer\" ng-click=\"sendVerificationLink()\" class=\"button button-3d button-small button-rounded button-brown\">Resend Verification Link</a> </div>  </section> <div class=\"modal fade\" id=\"changePasswordModal\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"changePasswordModal\"> <div class=\"modal-dialog\" role=\"document\"> <div class=\"modal-content\"> <div class=\"modal-header\"> <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Close\"><span aria-hidden=\"true\">&times;</span></button> <h4 class=\"modal-title\" id=\"changePasswordModallabel\">{{messageType}}</h4> </div> <div class=\"modal-body\"> <div class=\"row\"> <div class=\"col-md-6 col-sm-6 col-xs-6\"> {{message}} </div> <!--<div class=\"col-md-6 col-sm-6 col-xs-6 text-right\">\n" +
    "            Its button\n" +
    "					</div>--> </div> </div> <!--<div class=\"modal-body\" ng-show=\"error\">\n" +
    "				<div class=\"row filter-remove text-center\">\n" +
    "					<p>Error</p>\n" +
    "				</div>\n" +
    "			</div>--> </div> </div> </div> "
  );


  $templateCache.put('views/contact.html',
    "<!-- Page Title\n" +
    "============================================= --> <section style=\"background:#36353B\" id=\"page-title\"> </section> <section id=\"page-title\"> <div class=\"container clearfix\"> <h1>Contact</h1> <span>Get in Touch with Us</span> <ol class=\"breadcrumb\"> <li><a href=\"#\">Home</a></li> <li class=\"active\">Contact</li> </ol> </div> <!-- #page-title end --> <!-- Google Map\n" +
    "============================================= --> <br> <section id=\"google-map\" class=\"gmap slider-parallax\"> <ng-map scrollwheel=\"false\" center=\"[28.508758, 77.196247]\" zoom=\"12\"> <marker position=\"28.508758, 77.196247\" title=\"WanderWagon\"></marker> </ng-map> </section> <!-- Content\n" +
    "============================================= --> <section id=\"content\"> <div class=\"content-wrap\"> <div class=\"container clearfix\"> <!-- Postcontent\n" +
    "      ============================================= --> <div class=\"postcontent nobottommargin\"> <h3>Send us an Email</h3> <div class=\"contact-widget\"> <div class=\"contact-form-result\"></div> <form class=\"nobottommargin\" id=\"contactform\" name=\"contactform\" ng-submit=\"submitContactForm(contactform)\"> <div class=\"form-process\"></div> <div class=\"col_two_third\"> <label for=\"template-contactform-name\">Name <small>*</small></label> <input pattern=\"[a-zA-Z][a-zA-Z ]+\" required ng-model=\"contactObj.name\" type=\"text\" id=\"template-contactform-name\" name=\"template-contactform-name\" value=\"\" class=\"form-control required show-error-msg\"> </div> <div class=\"col_two_third\"> <label for=\"template-contactform-email\">Email <small>*</small></label> <input required ng-model=\"contactObj.email\" type=\"email\" id=\"template-contactform-email\" name=\"template-contactform-email\" value=\"\" class=\"required email form-control\"> </div> <div class=\"col_two_third col_last\"> <label for=\"template-contactform-phone\">Phone</label> <input pattern=\"^[0][1-9]\\d{9}$|^[1-9]\\d{9}$\" required ng-model=\"contactObj.phone\" type=\"text\" id=\"template-contactform-phone\" name=\"template-contactform-phone\" value=\"\" class=\"form-control\"> </div> <div class=\"clear\"></div> <div class=\"clear\"></div> <div class=\"col_full\"> <label for=\"template-contactform-message\">Message <small>*</small></label> <textarea required ng-model=\"contactObj.message\" class=\"required sm-form-control\" id=\"template-contactform-message\" name=\"template-contactform-message\" rows=\"6\" cols=\"30\"></textarea> </div> <div class=\"col_full\"> <button class=\"button button-3d button-blue\" type=\"submit\" id=\"template-contactform-submit\" name=\"template-contactform-submit\" value=\"submit\">Send Message</button> </div> </form> </div> </div> <!-- .postcontent end --> <!-- Sidebar\n" +
    "      ============================================= --> <div class=\"sidebar col_last nobottommargin\"> <address> <strong>Headquarter:</strong><br> D-169, 2nd Floor, Freedom Fighters Enclave, Saket<br> New Delhi - 110068 </address> <abbr><strong>Phone:</strong></abbr> 011 - 65434303<br> <abbr><strong>Email:</strong></abbr> contact@wanderwagon.com <div class=\"widget noborder notoppadding\"> <strong>Connect with Us</strong> <div class=\"center-block\" style=\"width:100%\"> <a href=\"\" ng-click=\"openFacebook()\" class=\"social-icon si-small si-dark si-facebook\"> <i class=\"icon-facebook\"></i> <i class=\"icon-facebook\"></i> </a> <a href=\"\" ng-click=\"openInstagram()\" class=\"social-icon si-small si-dark si-instagram\"> <i class=\"icon-instagram\"></i> <i class=\"icon-instagram\"></i> </a> </div> </div> <!-- .sidebar end --> </div> </div> </div></section> <!-- #content end --> <div class=\"modal fade\" id=\"contactModal\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"contactModal\"> <div class=\"modal-dialog\" role=\"document\"> <div class=\"modal-content\"> <div class=\"modal-header\"> <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Close\"><span aria-hidden=\"true\">&times;</span></button> <h4 class=\"modal-title\" id=\"contactModallabel\">{{messageType}}</h4> </div> <div class=\"modal-body\"> <div class=\"row\"> <div style=\"padding:5%\" class=\"col-full\"> {{message}} </div> <!--<div class=\"col-md-6 col-sm-6 col-xs-6 text-right\">\n" +
    "            Its button\n" +
    "					</div>--> </div> </div> <!--<div class=\"modal-body\" ng-show=\"error\">\n" +
    "				<div class=\"row filter-remove text-center\">\n" +
    "					<p>Error</p>\n" +
    "				</div>\n" +
    "			</div>--> </div> </div> </div> <div class=\"modal fade\" id=\"contactImageModal\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"contactImageModal\"> <div class=\"modal-dialog\" role=\"document\"> <button style=\"color:#FFF; font-size:20px\" type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Close\"><span aria-hidden=\"true\">&times;</span></button> <img src=\"https://s3-ap-southeast-1.amazonaws.com/wanderwagon/images/popups/contact.jpg\"> </div> </div> </section>"
  );


  $templateCache.put('views/destination-detail.html',
    "<div class=\"cover-page\" style=\"background-color:#36353B;background-image: url({{detail.imageUrl}});background-attachment: fixed;\n" +
    "background-position: center;\n" +
    "background-repeat: no-repeat;\n" +
    "background-size: cover; height:100vh\"> <div class=\"container clearfix\"> <div class=\"center-block slider-caption-center\"> <h2 class=\"text-center big-title\">{{detail.name}}</h2> <p class=\"text-center primary-title-1\">{{detail.title}}</p> </div> </div> </div> <div class=\"mobile-cover-page\" style=\"background-color:#36353B;background: url({{detail.imageUrl}}) no-repeat center center fixed;background-attachment: fixed;\n" +
    "background-size: cover; height:100vh\"> <div class=\"container clearfix\"> <div class=\"center-block slider-caption-center\"> <h2 class=\"text-center primary-title\">{{detail.name}}</h2> <p class=\"text-center primary-title-1\">{{detail.title}}</p> </div> </div> </div> <!-- Header\n" +
    "		============================================= --> <header style=\"height:50px; background-color:#FFFFFF\" sticky id=\"header\" class=\"full-header\"> <!-- Primary Navigation\n" +
    "					============================================= --> <nav id=\"primary-menu\" style=\"margin-left:20%; margin-right:25%\"> <ul class=\"one-page-menu\"> <li> <a href=\"#about\" du-smooth-scroll=\"\" du-scrollspy=\"\" duration=\"800\" style=\"cursor:pointer;color:#444;padding:10px 15px\"> <div>About</div> </a> </li> <li> <a href=\"#howToReach\" du-smooth-scroll=\"\" du-scrollspy=\"\" duration=\"800\" style=\"cursor:pointer;color:#444;padding:10px 15px\"> <div>How to reach</div> </a> </li> <li> <a href=\"#places\" du-smooth-scroll=\"\" du-scrollspy=\"\" duration=\"800\" style=\"cursor:pointer;color:#444;padding:10px 15px\"> <div>Places to visit</div> </a> </li> <li> <a href=\"#activities\" du-smooth-scroll=\"\" du-scrollspy=\"\" duration=\"800\" style=\"cursor:pointer;color:#444;padding:10px 15px\"> <div>Activities</div> </a> </li> </ul> </nav> <!-- #primary-menu end --> </header> <!-- #header end --> <section id=\"about\"> <div class=\"container clearfix\"> <div> <h2 class=\"paul-title\" style=\"margin-top:5%\"> Welcome to {{detail.name}} </h2> <div class=\"underline\" style=\"margin-bottom:2rem\"> </div> </div> <div class=\"center-block custom-para\"> <p hm-read-more hm-text=\"{{detail.description}}\" hm-limit=\"500\" hm-more-text=\"Read more\" hm-less-text=\"Read less\" hm-dots-class=\"dots\" hm-link-class=\"links\"></p> <br> </div> <div class=\"center-block overview\"> <h2 style=\"text-align:center\" class=\"common-title\"> Overview </h2> <div class=\"underline\" style=\"margin-bottom:2rem\"> </div> <div style=\"margin: 30px\"> <h5 class=\"pull-left1\"><i style=\"padding-right:10px\" class=\"icon-calendar i-alt\"></i>Best Time To Visit</h5> <p style=\"margin-right: 40px\" class=\"pull-right1 common-font\">{{detail.bestTimeToVisit}}</p> </div> <span class=\"clearfix\"></span> <div style=\"margin: 0 30px 30px 30px\"> <h5 class=\"pull-left1\"><i style=\"padding-right:10px\" class=\"icon-calendar i-alt\"></i>Days Required</h5> <p style=\"margin-right: 40px\" class=\"pull-right1 common-font\">{{detail.daysToVisit}}</p> </div> <span class=\"clearfix\"></span> <div style=\"margin: 0 30px 30px 30px\"> <h5 class=\"pull-left1\"><i style=\"padding-right:10px\" class=\"icon-folder i-alt\"></i>Category</h5> <p style=\"margin-right: 40px; word-wrap: break-word\" class=\"pull-right1 common-font\">{{detail.category}}</p> </div> </div> </div> </section> <section id=\"howToReach\"> <div class=\"container clearfix\"> <div style=\"margin-top:5%\"> <h2 class=\"paul-title\"> How to reach </h2> <div class=\"underline\" style=\"margin-bottom:2rem\"> </div> </div> <div class=\"center-block\" style=\"margin:5% 0\"> <div class=\"feature-box\"> <div class=\"custom-fbox-icon\"> <!--<i class=\"icon-plane i-alt\"></i>--> <img src=\"images/plane.png\"> </div> <span class=\"common-title\" style=\"font-size:2.1rem\">Via Air</span> <p class=\"common-font\">{{detail.airPath}} </p> </div> <div class=\"feature-box\" style=\"margin:5% 0\"> <div class=\"custom-fbox-icon\"> <img src=\"images/train.png\"> </div> <span class=\"common-title\" style=\"font-size:2.1rem\">Via Rail</span> <p class=\"common-font\">{{detail.railway}} </p> </div> <div class=\"feature-box\"> <div class=\"custom-fbox-icon\"> <img src=\"images/road.png\"> </div> <span class=\"common-title\" style=\"font-size:2.1rem\">Via Road</span> <p class=\"common-font\">{{detail.roadway}} </p> </div> </div> </div> </section> <section class=\"clearfix custom-padding\" id=\"places\"> <h2 style=\"margin-top:5%\" class=\"paul-title\"> Places to visit </h2> <div class=\"underline\" style=\"margin-bottom:5rem\"> </div> <ng-owl-carousel class=\"owl-theme\" owl-items=\"placesData\" owl-properties=\"sliderProperties\" owl-ready=\"ready($api)\"> <div ng-click=\"openOrCloseAccordion('place') ; gotoCarouselPlace($index)\" class=\"paul-slide-new\" style=\"padding:2% 2% 2% 2%\" data-ng-repeat=\"item in placesData\"> <img style=\"object-fit:cover; width:100%; height:100%\" class=\"owl-lazy\" data-src=\"{{item.imageUrl}}\"> <span class=\"paul-slider-caption\"> {{item.placeName}}</span> </div> </ng-owl-carousel> <div id=\"accordion1\" class=\"clearfix\"> <uib-accordion> <uib-accordion-group is-open=\"openAccordion\"> <ng-owl-carousel class=\"owl-theme\" owl-items=\"placesData\" owl-properties=\"accordionProperties\" owl-ready=\"readyPlaceAccordion($api)\"> <div data-ng-repeat=\"item in placesData\"> <div class=\"center-block\"> <div> <h2 style=\"text-align:center;margin:2rem 0 2rem 0;letter-spacing:-0.45px;line-height:1;font-weight:100;font-size:3.8rem\"><br> {{item.placeName}} <div class=\"underline\" style=\"margin-top:2rem\"> </div> </h2> </div> <div class=\"dropdown-slider-image\"> <a><img height=\"450px\" width=\"100%\" ng-src=\"{{item.imageUrl}}\" alt=\"{{item.placeName}}\"></a> </div> <div class=\"dropdown-slider-content\"> <span ng-click=\"closeAccordion()\" style=\"margin-top:4%; right:3%; position: absolute; cursor:pointer; font-size:3rem\" class=\"glyphicon glyphicon-remove-circle\"></span> <h3 class=\"common-title\" style=\"margin-top:0\"> About {{item.placeName}}</h3> <p class=\"common-font\">{{item.description}} </p> <h3 class=\"common-title\" style=\"margin-top:0\"> How to reach</h3> <p class=\"common-font\">{{item.howToReachDesc}} </p> <div> <h3 class=\"content-title\" style=\"margin-top:0\"> Timing</h3> <p class=\"common-font\">{{item.timing}} </p> </div> </div> </div> </div> </ng-owl-carousel> </uib-accordion-group> </uib-accordion> </div> </section> <section class=\"clearfix custom-padding\" id=\"activities\"> <h2 class=\"paul-title\"> Activities </h2> <div class=\"underline\" style=\"margin-bottom:5rem\"> </div> <ng-owl-carousel class=\"owl-theme\" owl-items=\"activitiesData\" owl-properties=\"sliderProperties\" owl-ready=\"ready($api)\"> <div ng-click=\"openOrCloseAccordion('activity') ; gotoCarouselActivity($index)\" class=\"paul-slide-new\" style=\"padding:2% 2% 2% 2%\" data-ng-repeat=\"item in activitiesData\"> <img style=\"object-fit:cover; width:100%; height:100%\" class=\"owl-lazy\" data-src=\"{{item.imageUrl}}\"> <span class=\"paul-slider-caption\"> {{item.activityName}}</span> </div> </ng-owl-carousel> <div id=\"accordion2\" class=\"clearfix\" style=\"margin-bottom:0%\"> <uib-accordion> <uib-accordion-group is-open=\"openAccordion1\"> <ng-owl-carousel class=\"owl-theme\" owl-items=\"activitiesData\" owl-properties=\"accordionProperties\" owl-ready=\"readyActivityAccordion($api)\"> <div data-ng-repeat=\"item in activitiesData\"> <div class=\"center-block\"> <div> <h2 style=\"text-align:center;margin:2rem 0 2rem 0;letter-spacing:-0.45px;line-height:1;font-weight:100;font-size:3.8rem\"><br> {{item.activityName}} <div class=\"underline\" style=\"margin-top:2rem\"> </div> </h2> </div> <div class=\"dropdown-slider-image\"> <a><img height=\"450px\" width=\"100%\" ng-src=\"{{item.imageUrl}}\" alt=\"{{item.activityName}}\"></a> </div> <div class=\"dropdown-slider-content\"> <span ng-click=\"closeAccordion1()\" style=\"margin-top:4%; right:3%; position: absolute; cursor:pointer; font-size:3rem\" class=\"glyphicon glyphicon-remove-circle\"></span> <h3 class=\"common-title\" style=\"margin-top:0\"> About {{item.activityName}}</h3> <p class=\"common-font\">{{item.description}} </p> <h3 class=\"content-title\" style=\"margin-top:0\"> How to reach</h3> <p class=\"common-font\">{{item.placeOfConduct}} </p> <div> <!-- <h4 class=\"pull-left\" style=\"line-height:1.2142857142857142;font-size:18px;font-weight:200;color:#2c3643;\">\n" +
    "                            Timings - <span>{{item.timing}}</span></h4> --> <h3 class=\"content-title\" style=\"margin-top:0\"> Duration</h3> <p class=\"common-font\">{{item.duration}} </p> </div> </div> </div> </div> </ng-owl-carousel> </uib-accordion-group> </uib-accordion> </div> </section> <section> <h2 class=\"paul-title\" style=\"margin-top:5%\"> Why we love {{detail.name}} ? </h2> <div class=\"underline\" style=\"margin-bottom:5rem\"> </div>  <p style=\"color: #67747c; font-family: Benton Sans,Helvetica Neue,Helvetica,Arial,sans-serif; font-size: 1.8rem; font-style:\n" +
    "                    italic; line-height: 1.8; margin: 0 auto 5.5rem; text-align: center; width:70%\"> \" {{detail.reasonToLoveDest}} \" </p> <div ng-click=\"redirectToPlans(detail.travelPlanId)\" class=\"center-block\" style=\"width:70%; cursor:pointer\"> <a class=\"button button-3d button-rounded button-blue loved-it-button\"> Loved it ? We got plans for you !</a> </div> <div class=\"custom-padding\" style=\"margin:5% 0\"> <h2 class=\"paul-title\" style=\"margin-bottom:5rem\"> After {{detail.name}}, Where Next ? </h2> <ng-owl-carousel class=\"owl-theme\" owl-items=\"detail.recommendedDestinations\" owl-properties=\"sliderProperties\" owl-ready=\"ready($api)\"> <div class=\"paul-slide-new\" style=\"padding:2% 2% 2% 2%\" data-ng-repeat=\"item in detail.recommendedDestinations\"> <img ui-sref=\"destination.detail({id: item.id})\" style=\"object-fit:cover; width:100%; height:100%\" class=\"owl-lazy\" data-src=\"{{item.imageUrl}}\"> <span class=\"paul-slider-caption\"> {{item.name}}</span> </div> </ng-owl-carousel> </div> </section> "
  );


  $templateCache.put('views/destination.html',
    "<div class=\"cover-page\" style=\"background-color:#36353B;background-image: url('https://s3-ap-southeast-1.amazonaws.com/wanderwagon/images/destinations/destination_cover.jpg');background-attachment: fixed;\n" +
    "background-position: center;\n" +
    "background-repeat: no-repeat;\n" +
    "background-size: cover; height:100vh\"> <div class=\"container clearfix\"> </div> </div> <div class=\"mobile-cover-page\" style=\"background-color:#36353B;background: url('https://s3-ap-southeast-1.amazonaws.com/wanderwagon/images/mobile/destinations_cover.jpg') no-repeat center center fixed ;background-size: cover; height:100vh\"> <div class=\"container clearfix\"> </div> </div> <!-- Content\n" +
    "		============================================= --> <section id=\"content\"> <div class=\"topmargin\"> <h2 style=\"text-align:center;margin-bottom:4rem;letter-spacing:-0.45px;line-height:1;font-weight:300;font-size:3.8rem\"> Destinations </h2> <div class=\"underline\" style=\"margin-bottom:2rem\"> </div> </div> <div class=\"container\"> <div class=\"row row-centered\"> <div style=\"margin-bottom:2%\" ng-repeat=\"destination in destinations\" class=\"col-sm-4 col-centered col-fixed\"> <a ui-sref=\"destination.detail({id: destination.id})\"> <div class=\"photo\" style=\"cursor:pointer; width: 100%;\n" +
    "    height: 100%;\n" +
    "    float: left;\n" +
    "    overflow: hidden;\n" +
    "    position: relative;\n" +
    "    text-align: center;\n" +
    "    margin: 10px 0\"> <img class=\"img-responsive\" style=\"height:300px; display: block;\n" +
    "    position: relative;\n" +
    "    -webkit-transition: all 0.3s;\n" +
    "    transition: all 0.3s;\n" +
    "    margin: 0 auto\" src=\"{{destination.imageUrl}}\"> <div class=\"overlay\" style=\"width: 100%;\n" +
    "    height: 100%;\n" +
    "    position: absolute;\n" +
    "    overflow: hidden;\n" +
    "    top: 0;\n" +
    "    left: 0;\n" +
    "    -webkit-transition: all 0.4s ease-in-out;\n" +
    "    transition: all 0.4s ease-in-out\"> <h2 style=\"color: #fff;\n" +
    "    text-align: center;\n" +
    "    position: absolute;\n" +
    "    width: 100%;\n" +
    "    bottom: 10%;\n" +
    "    font-size: 20px;\n" +
    "    font-weight: 400;\n" +
    "    padding: 10px;\n" +
    "    background: rgba(0,0,0,0.6)\" class=\"ng-binding\">{{destination.name}}</h2> </div> </div> </a> </div> </div> </div> </section> "
  );


  $templateCache.put('views/email-verification.html',
    "<section id=\"content\" style=\"background-color:#36353B;background-size: cover;background-image: url('images/login-bg.jpg')\"> <div ng-show=\"verified\" class=\"style-msg2 center-block\" style=\"width:60%; margin-top:20%; margin-bottom:20%; background-color: #EEE\"> <div class=\"msgtitle\">{{success}}</div> <div class=\"sb-msg\"> {{successMessage}} </div> </div> <div ng-show=\"!verified\" class=\"style-msg2 center-block\" style=\"width:60%; margin-top:20%; margin-bottom:20%; background-color: #EEE\"> <div class=\"msgtitle\">{{error}}</div> <div class=\"sb-msg\"> {{errorMessage}} </div> <a style=\"cursor:pointer\" ng-click=\"sendVerificationLink()\" class=\"button button-3d button-small button-rounded button-blue\">Resend Verification Link</a> </div>  </section> <div class=\"modal fade\" id=\"verificationModal\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"verificationModal\"> <div class=\"modal-dialog\" role=\"document\"> <div class=\"modal-content\"> <div class=\"modal-header\"> <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Close\"><span aria-hidden=\"true\">&times;</span></button> <h4 class=\"modal-title\" id=\"verificationModallabel\">{{messageType}}</h4> </div> <div class=\"modal-body\"> <div class=\"row\"> <div class=\"col-md-6 col-sm-6 col-xs-6\"> {{message}} </div> <!--<div class=\"col-md-6 col-sm-6 col-xs-6 text-right\">\n" +
    "            Its button\n" +
    "					</div>--> </div> </div> <!--<div class=\"modal-body\" ng-show=\"error\">\n" +
    "				<div class=\"row filter-remove text-center\">\n" +
    "					<p>Error</p>\n" +
    "				</div>\n" +
    "			</div>--> </div> </div> </div> "
  );


  $templateCache.put('views/events.html',
    "<div class=\"cover-page\" style=\"background-color:#36353B;background-image: url('https://s3-ap-southeast-1.amazonaws.com/wanderwagon/images/events/cover_pic.jpg');background-attachment: fixed;\n" +
    "background-position: center;\n" +
    "background-repeat: no-repeat;\n" +
    "background-size: cover; height:100vh\"> <div class=\"container clearfix\"> <div class=\"center-block slider-caption-center\"> <!-- <h2 class=\"text-center big-title\">{{detail.name}}</h2>\n" +
    "      <p class=\"text-center primary-title-1\">{{detail.title}}</p> --> </div> </div> </div> <div class=\"mobile-cover-page\" style=\"background-color:#36353B;background: url('https://s3-ap-southeast-1.amazonaws.com/wanderwagon/images/mobile/event_cover_pic.jpg') no-repeat center center fixed;background-attachment: fixed;\n" +
    "background-size: cover; height:100vh\"> <div class=\"container clearfix\"> <div class=\"center-block slider-caption-center\"> <!-- <h2 class=\"text-center primary-title\">{{detail.name}}</h2>\n" +
    "      <p class=\"text-center primary-title-1\">{{detail.title}}</p> --> </div> </div> </div> <section id=\"about\"> <div class=\"container clearfix\"> <div> <h2 class=\"paul-title\" style=\"margin-top:5%\"> {{eventDetail.description}} </h2> <div class=\"underline\" style=\"margin-bottom:2rem\"> </div> </div> <div class=\"center-block custom-para\"> <p ng-repeat=\"para in eventDetail.paragraphs\">{{para.text}}</p> </div> </div> </section> <section id=\"content\"> <div class=\"container\"> <div class=\"row row-centered\"> <div style=\"margin-bottom:2%\" ng-repeat=\"location in eventDetail.eventLocations\" class=\"col-sm-4 col-centered col-fixed\"> <a ng-href=\"{{location.pdfUrl}}\"> <div class=\"photo\" style=\"cursor:pointer; width: 100%;\n" +
    "    height: 100%;\n" +
    "    float: left;\n" +
    "    overflow: hidden;\n" +
    "    position: relative;\n" +
    "    text-align: center;\n" +
    "    margin: 10px 0\"> <img class=\"img-responsive paul-slide\" style=\"display: block;\n" +
    "    position: relative;\n" +
    "    -webkit-transition: all 0.3s;\n" +
    "    transition: all 0.3s;\n" +
    "    margin: 0 auto\" src=\"{{location.locationImage}}\"> </div> </a> <div style=\"text-align:center\"> <button class=\"button button-3d button-rounded button-blue\" ng-click=\"onQueryButtonClicked(location.locationId)\">Send Query</button> </div> </div> </div> </div> </section> <div class=\"modal fade\" id=\"eventModal\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"eventModal\"> <div class=\"modal-dialog\" role=\"document\"> <div class=\"modal-content\"> <div class=\"modal-header\"> <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Close\"><span aria-hidden=\"true\">&times;</span></button> <h4 class=\"modal-title\" id=\"eventModallabel\">Query Form</h4> </div> <div class=\"modal-body\"> <div class=\"row\"> <div style=\"padding:0 5%\" class=\"col-full\"> <form name=\"queryForm\" class=\"nobottommargin\" ng-submit=\"onFormSubmit(queryForm)\"> <div class=\"col_full\"> <label for=\"queryName\"><font color=\"white\">Name</font></label> <input type=\"text\" class=\"form-control\" id=\"queryName\" name=\"queryName\" placeholder=\"Name\" ng-model=\"queryObj.name\" required> </div> <div class=\"col_full\"> <label for=\"queryPhone\"><font color=\"white\">Phone no.</font></label> <input type=\"tel\" class=\"form-control\" id=\"queryPhone\" name=\"queryPhone\" placeholder=\"Phone\" ng-model=\"queryObj.phone\" required> </div> <div class=\"col_full nobottommargin\"> <button type=\"submit\" class=\"button button-blue\"><font color=\"white\">Submit</font></button> </div> </form> </div> </div> </div> </div> </div> </div> <div class=\"modal fade\" id=\"eventSuccessModal\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"eventSuccessModal\"> <div class=\"modal-dialog\" role=\"document\"> <button style=\"color:#FFF; font-size:20px\" type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Close\"><span aria-hidden=\"true\">&times;</span></button> <img src=\"https://s3-ap-southeast-1.amazonaws.com/wanderwagon/images/popups/event_query_popup.jpg\"> </div> </div> "
  );


  $templateCache.put('views/faq.html',
    "<section style=\"background:#36353B\" id=\"page-title\"> </section> <section id=\"page-title\"> <div class=\"container clearfix\"> <h1>FAQs</h1> <span>All your Questions answered in one place</span> </div> </section> <!-- #page-title end --> <!-- Content\n" +
    "		============================================= --> <section id=\"content\"> <div class=\"content-wrap\"> <div class=\"container clearfix\"> <!-- Post Content\n" +
    "					============================================= --> <div class=\"postcontent nobottommargin clearfix\"> <uib-tabset active=\"activeJustified\" justified=\"true\"> <uib-tab index=\"0\" heading=\"Payment\"> <div class=\"tab-content clearfix\"> <div class=\"toggle faq faq-marketplace faq-authors\"> <div ng-click=\"payment1.isOpen = !payment1.isOpen\" class=\"togglet\"><i class=\"toggle-closed icon-play\"></i> <!--  <i class=\"toggle-closed icon-question-sign\"></i>-->What are different modes of payment for booking a trip through Wanderwagon?</div> <uib-accordion> <uib-accordion-group is-open=\"payment1.isOpen\"> <div class=\"togglec\">Wanderwagon allows you to pay through varoius payment options, they are - NEFT TRANSFER, Cash. We will provide a confirmation mail along with an e-receipt.</div> </uib-accordion-group> </uib-accordion> </div> <div class=\"toggle faq faq-marketplace faq-authors\"> <div ng-click=\"payment2.isOpen = !payment2.isOpen\" class=\"togglet\"><i class=\"toggle-closed icon-play\"></i> <!--<i class=\"toggle-open icon-question-sign\"></i>-->Does Wanderwagon provide any discounts?</div> <uib-accordion> <uib-accordion-group is-open=\"payment2.isOpen\"> <div class=\"togglec\">Yes! Wanderwagon does provide discounts and offers from time to time. Subscribe your email account to avail these offers. We also provide wandercoins for availing our services which can also be redeemed.</div> </uib-accordion-group> </uib-accordion> </div> <div class=\"toggle faq faq-marketplace faq-authors\"> <div ng-click=\"payment3.isOpen = !payment3.isOpen\" class=\"togglet\"><i class=\"toggle-closed icon-play\"></i> <!--<i class=\"toggle-open icon-question-sign\"></i>-->Can the price change during booking? </div> <uib-accordion> <uib-accordion-group is-open=\"payment3.isOpen\"> <div class=\"togglec\"> Since planning a trip depends on a lot of interdependent factors therefore issues like sudden increase in fuel cost, taxes and hotel rents can lead to change in price. </div> </uib-accordion-group> </uib-accordion> </div> </div> </uib-tab> <uib-tab index=\"1\" heading=\"Booking & Cancellation\"> <div class=\"tab-content clearfix\"> <div class=\"tab-content clearfix\"> <div class=\"toggle faq faq-marketplace faq-authors\"> <div ng-click=\"booking1.isOpen = !booking1.isOpen\" class=\"togglet\"><i class=\"toggle-closed icon-play\"></i> <!--<i class=\"toggle-open icon-question-sign\"></i>-->How do I book a trip through Wanderwagon?</div> <uib-accordion> <uib-accordion-group is-open=\"booking1.isOpen\"> <div class=\"togglec\">Online- You will need to create an account on the Wanderwagon website and then you can select a trip listed in the event or book a pre planned group trip. You can also form your own group trip. Offline- You can call us or message us on our facebook page and tell us about the services you require. You can also send us an email and plan your trip.</div> </uib-accordion-group> </uib-accordion> </div> <div class=\"toggle faq faq-marketplace faq-authors\"> <div ng-click=\"booking2.isOpen = !booking2.isOpen\" class=\"togglet\"><i class=\"toggle-closed icon-play\"></i> <!--<i class=\"toggle-open icon-question-sign\"></i>-->I have posted a trip request on the Wanderwagon website, what should I do now?</div> <uib-accordion> <uib-accordion-group is-open=\"booking2.isOpen\"> <div class=\"togglec\">Worry not. We will send an instant email-confirming that we have your request. Our travel expert will contact you within 24 hours for further details. </div> </uib-accordion-group> </uib-accordion> </div> <div class=\"toggle faq faq-marketplace faq-authors\"> <div ng-click=\"booking3.isOpen = !booking3.isOpen\" class=\"togglet\"><i class=\"toggle-closed icon-play\"></i> <!--<i class=\"toggle-open icon-question-sign\"></i>-->How do I cancel my booking?</div> <uib-accordion> <uib-accordion-group is-open=\"booking3.isOpen\"> <div class=\"togglec\">Log on to our website, go to the booking section, select upcoming trips and request for cancellation. You can also cancel your booking by mailing at booking@wanderwagon.com or call us at +919999553113. </div> </uib-accordion-group> </uib-accordion> </div> <div class=\"toggle faq faq-marketplace faq-authors\"> <div ng-click=\"booking4.isOpen = !booking4.isOpen\" class=\"togglet\"><i class=\"toggle-closed icon-play\"></i> <!--<i class=\"toggle-open icon-question-sign\"></i>-->How long does it take for a refund to be processed?</div> <uib-accordion> <uib-accordion-group is-open=\"booking4.isOpen\"> <div class=\"togglec\">Once a refund is accepted at Wanderwagon it normally takes 5-7 business days to process excluding any delay in banking. </div> </uib-accordion-group> </uib-accordion> </div> <div class=\"toggle faq faq-marketplace faq-authors\"> <div ng-click=\"booking5.isOpen = !booking5.isOpen\" class=\"togglet\"><i class=\"toggle-closed icon-play\"></i> <!--<i class=\"toggle-open icon-question-sign\"></i>-->What is your cancellation policy?</div> <uib-accordion> <uib-accordion-group is-open=\"booking5.isOpen\"> <div class=\"togglec\">Please refer to our separate cancellation policy section for all the details. </div> </uib-accordion-group> </uib-accordion> </div> <div class=\"toggle faq faq-marketplace faq-authors\"> <div ng-click=\"booking6.isOpen = !booking6.isOpen\" class=\"togglet\"><i class=\"toggle-closed icon-play\"></i> <!--<i class=\"toggle-open icon-question-sign\"></i>-->What is your refund policy?</div> <uib-accordion> <uib-accordion-group is-open=\"booking6.isOpen\"> <div class=\"togglec\">Please refer to our separate cancellation policy section for all the details. </div> </uib-accordion-group> </uib-accordion> </div> </div> </div> </uib-tab> <uib-tab index=\"2\" heading=\"Account & Login\"> <div class=\"tab-content clearfix\"> <div class=\"toggle faq faq-marketplace faq-authors\"> <div ng-click=\"booking1.isOpen = !booking1.isOpen\" class=\"togglet\"><i class=\"toggle-closed icon-play\"></i> <!--<i class=\"toggle-open icon-question-sign\"></i>-->Why do I need to create an account?</div> <uib-accordion> <uib-accordion-group is-open=\"booking1.isOpen\"> <div class=\"togglec\">To avail subscription from our website. To get updates about the offers and new services. To avail services from Wanderwagon. To get wandercoins and redeem them. </div> </uib-accordion-group> </uib-accordion> </div> <div class=\"toggle faq faq-marketplace faq-authors\"> <div ng-click=\"booking2.isOpen = !booking2.isOpen\" class=\"togglet\"><i class=\"toggle-closed icon-play\"></i> <!--<i class=\"toggle-open icon-question-sign\"></i>-->How do we create an account?</div> <uib-accordion> <uib-accordion-group is-open=\"booking2.isOpen\"> <div class=\"togglec\">For creating an account, you can directly click on this link here or refer to our website. You can also register through facebook or your e-mail account. </div> </uib-accordion-group> </uib-accordion> </div> <div class=\"toggle faq faq-marketplace faq-authors\"> <div ng-click=\"booking3.isOpen = !booking3.isOpen\" class=\"togglet\"><i class=\"toggle-closed icon-play\"></i> <!--<i class=\"toggle-open icon-question-sign\"></i>-->Is there any fee to register on your site?</div> <uib-accordion> <uib-accordion-group is-open=\"booking3.isOpen\"> <div class=\"togglec\">No, creating an account is absolutely free. </div> </uib-accordion-group> </uib-accordion> </div> <div class=\"toggle faq faq-marketplace faq-authors\"> <div ng-click=\"booking4.isOpen = !booking4.isOpen\" class=\"togglet\"><i class=\"toggle-closed icon-play\"></i> <!--<i class=\"toggle-open icon-question-sign\"></i>-->What should I do if I forget my password?</div> <uib-accordion> <uib-accordion-group is-open=\"booking4.isOpen\"> <div class=\"togglec\">A link will be sent to your e-mail account, clicking on which you can proceed to add a new password. </div> </uib-accordion-group> </uib-accordion> </div> </div> </uib-tab> <uib-tab index=\"3\" heading=\"Support & Feedback\"> <div class=\"tab-content clearfix\"> <div class=\"toggle faq faq-marketplace faq-authors\"> <div ng-click=\"booking1.isOpen = !booking1.isOpen\" class=\"togglet\"><i class=\"toggle-closed icon-play\"></i> <!--<i class=\"toggle-open icon-question-sign\"></i>-->How can I remain in touch with Wanderwagon?</div> <uib-accordion> <uib-accordion-group is-open=\"booking1.isOpen\"> <div class=\"togglec\">You can subscribe your email to receive latest news, or you can drop us a mail at contact@wanderwagon.com or you can call us at +9999553113. </div> </uib-accordion-group> </uib-accordion> </div> <div class=\"toggle faq faq-marketplace faq-authors\"> <div ng-click=\"booking2.isOpen = !booking2.isOpen\" class=\"togglet\"><i class=\"toggle-closed icon-play\"></i> <!--<i class=\"toggle-open icon-question-sign\"></i>-->How can I rate/write a feedback to Wanderwagon?</div> <uib-accordion> <uib-accordion-group is-open=\"booking2.isOpen\"> <div class=\"togglec\">The Wanderwagon team sends a feedback form once the trip is over. Or you can write us at contact@wanderwagon.com </div> </uib-accordion-group> </uib-accordion> </div> <div class=\"toggle faq faq-marketplace faq-authors\"> <div ng-click=\"booking3.isOpen = !booking3.isOpen\" class=\"togglet\"><i class=\"toggle-closed icon-play\"></i> <!--<i class=\"toggle-open icon-question-sign\"></i>-->What information can I get through your website without creating an account?</div> <uib-accordion> <uib-accordion-group is-open=\"booking3.isOpen\"> <div class=\"togglec\">You can get all the information about the places where we are providing travel services, people’s blogs and their travel experiences, our packages and deals. </div> </uib-accordion-group> </uib-accordion> </div> </div> </uib-tab> </uib-tabset> </div> <!-- .postcontent end --> </div> </div> </section> "
  );


  $templateCache.put('views/flipbook.html',
    "<div id=\"flipbook\"> <div ng-repeat=\"item in data\"> <img style=\"object-fit:fill; width:100%; height:100%\" ng-src=\"{{item.imageUrl}}\"> </div> </div> <a class=\"btn flipbook-prev-button\" href=\"#\" id=\"prev\"> <i style=\"margin:7px 0 0 0px; font-size:15px; color:white; font-weight:600\" class=\"icon-angle-left\"></i> </a> <a class=\"btn flipbook-next-button\" href=\"#\" id=\"next\"> <i style=\"margin:7px 0 0 0; font-size:15px; color:white; font-weight:600\" class=\"icon-angle-right\"></i></a> "
  );


  $templateCache.put('views/home.html',
    "<div class=\"cover-page\" style=\"background-color:#36353B;background-image: url('https://s3-ap-southeast-1.amazonaws.com/wanderwagon/images/home/homepage.jpg');background-attachment: fixed;\n" +
    "background-position: center;\n" +
    "background-repeat: no-repeat;\n" +
    "background-size: cover; height:100vh\"> <div class=\"container clearfix\"> <div class=\"slider-caption-center\"> <a style=\"position:absolute; bottom:5%; right:40%\" href=\"#travel\" du-smooth-scroll=\"\" du-scrollspy=\"\" duration=\"800\" class=\"custom-button center-block text-center\"> <span>Take Me There ! </span> <i style=\"margin-left:10px\" class=\"icon-angle-right\"></i></a> </div> </div> </div> <div class=\"mobile-cover-page\" style=\"background-color:#36353B;background-image: url('https://s3-ap-southeast-1.amazonaws.com/wanderwagon/images/mobile/home_cover.jpg') ;\n" +
    "background-attachment: fixed;\n" +
    "background-position: center;\n" +
    "background-repeat: no-repeat;\n" +
    "background-size: cover; height:100vh\"> <div class=\"container clearfix\"> <div class=\"slider-caption-center\"> <a style=\"position:absolute; left:0%; right:0%; bottom:20%\" href=\"#travel\" du-smooth-scroll=\"\" du-scrollspy=\"\" duration=\"800\" class=\"custom-button center-block text-center\"> <span>Take Me There ! </span> <i style=\"margin-left:10px\" class=\"icon-angle-right\"></i></a> </div> </div> </div> <section id=\"travel\" style=\"margin-top:5%\" class=\"custom-padding\"> <h2 class=\"paul-title\"> Travel Inspiration </h2> <p style=\"font-size:2rem\" class=\"text-center\"> Your choices, Your friends, Your travel plans </p><div class=\"underline\"> </div> <p></p> <ng-owl-carousel class=\"owl-theme\" owl-items=\"sliderData\" owl-properties=\"properties\" owl-ready=\"ready($api)\"> <div class=\"paul-slide\" style=\"padding:2% 0 2% 0%\" data-ng-repeat=\"item in sliderData | orderBy:'title'\"> <img ng-click=\"openOrCloseAccordion(item.id);\" style=\"object-fit:cover; width:100%; height:100%\" class=\"owl-lazy\" data-src=\"{{item.imageUrl}}\"> </div> </ng-owl-carousel> <div id=\"accordion\" class=\"clearfix\"> <uib-accordion> <uib-accordion-group is-open=\"openAccordion\"> <div ng-click=\"closeAccordion()\" style=\"cursor:pointer; font-size:3rem; margin-left:95%\" class=\"glyphicon glyphicon-remove-circle\"></div> <!-- <ng-owl-carousel class=\"owl-theme\" owl-items=\"travelPlanData\" owl-properties=\"accordionProperties\" owl-ready=\"ready($api)\">\n" +
    "              <div  class=\"paul-slide-new\" style=\"padding:2% 0 2% 0; text-align:center;\" data-ng-repeat=\"item in travelPlanData\">\n" +
    "                <img ui-sref=\"travel-plan.detail({id: item.id})\" style=\"object-fit:cover; width:100%; height:100%;\" class=\"owl-lazy\" data-src=\"{{item.imageUrl}}\">\n" +
    "              </div>\n" +
    "          \n" +
    "            </ng-owl-carousel> --> <div class=\"row row-centered\"> <div style=\"margin-bottom:2%\" ng-repeat=\"item in travelPlanData\" class=\"col-sm-4 col-centered col-fixed\"> <img ui-sref=\"travel-plan.detail({id: item.id})\" class=\"img-responsive\" style=\"cursor:pointer; object-fit:cover; height:300px; display: block;\n" +
    "                position: relative;\n" +
    "                -webkit-transition: all 0.3s;\n" +
    "                transition: all 0.3s;\n" +
    "                margin: 0 auto\" src=\"{{item.imageUrl}}\"> </div> </div> </uib-accordion-group> </uib-accordion> </div> </section> <section id=\"articles\" class=\"custom-padding\"> <div class=\"\"> <h2 ui-sref=\"blog.list\" style=\"cursor:pointer\" class=\"paul-title\"> The Blogs </h2> <p style=\"font-size:2rem\" class=\"text-center\"> Live the wanderlust through words </p><div class=\"underline\"> </div> <p></p> </div> <div style=\"overflow:hidden; margin-bottom:2%\"> <div style=\"cursor:pointer\" ui-sref=\"blog.detail({postId: blog[0].id})\" class=\"image blog-image-left\"> <picture> <!--<source media=\"(min-width: 1280px)\" srcset=\"https://www.roughguides.com/wp-content/uploads/2016/04/pier-440339-660x420.jpg 1280w\">\n" +
    "          <source media=\"(min-width: 960px)\" srcset=\"https://www.roughguides.com/wp-content/uploads/2016/04/pier-440339-660x420.jpg 960w\">\n" +
    "          <source media=\"(min-width: 640px)\" srcset=\"https://www.roughguides.com/wp-content/uploads/2016/04/pier-440339-660x420.jpg 640w\">--> <img ng-src=\"{{blog[0].imageUrl}}\" alt=\"{{blog[0].title}}\"> </picture> </div> <div class=\"text blog-content-left\" class=\"web-blog-padding\"> <h3 style=\"cursor:pointer\" ui-sref=\"blog.detail({postId: blog[0].id})\" class=\"blog-title\"> {{blog[0].title}}</h3> <div class=\"blog-content\"> <p style=\"margin-bottom:0\">{{blog[0].description}}... </p> <span class=\"icon-calendar3 toppadding\"> <b> {{blog[0].date | date : 'dd-MM-yyyy' }} • {{blog[0].author}} </b></span> </div> </div> </div> <div style=\"overflow:hidden\"> <div style=\"cursor:pointer\" ui-sref=\"blog.detail({postId: blog[1].id})\" class=\"image blog-image-right\"> <picture> <!--<source media=\"(min-width: 1280px)\" srcset=\"https://www.roughguides.com/wp-content/uploads/2016/04/pier-440339-660x420.jpg 1280w\">\n" +
    "          <source media=\"(min-width: 960px)\" srcset=\"https://www.roughguides.com/wp-content/uploads/2016/04/pier-440339-660x420.jpg 960w\">\n" +
    "          <source media=\"(min-width: 640px)\" srcset=\"https://www.roughguides.com/wp-content/uploads/2016/04/pier-440339-660x420.jpg 640w\">--> <img ng-src=\"{{blog[1].imageUrl}}\" alt=\"{{blog[1].title}}\"> </picture> </div> <div class=\"text blog-content-right\"> <h3 style=\"cursor:pointer\" ui-sref=\"blog.detail({postId: blog[1].id})\" class=\"blog-title\"> {{blog[1].title}}</h3> <div class=\"blog-content\"> <p style=\"margin-bottom:0\">{{blog[1].description}}... </p> <span class=\"icon-calendar3 toppadding\"><b> {{blog[1].date | date : 'dd-MM-yyyy'}} • {{blog[1].author}} </b></span> </div> </div> </div> </section> <section style=\"margin-top:5%\"> <div class=\"home-form-bg\"> <!--<div class=\"text_over_image\">\n" +
    "        {{postDetail.title}}\n" +
    "      </div>--> <div class=\"home-form\"> <div style=\"padding:10% 5% 17% 5%\"> <div> <div> <h3 style=\"margin: 0;font-size: 25px;font-weight: 600;\n" +
    "    line-height: normal;\n" +
    "    letter-spacing: 2px;\n" +
    "    color:#FFF\">Not Sure Where to Begin?</h3> <p style=\"color:#FFF; font-size:15px\">Complete this form &amp; we'll get right back to you!</p> </div> </div> <form name=\"inquiryForm\" class=\"nobottommargin\" ng-submit=\"onFormSubmit(inquiryForm)\"> <div class=\"col-sm-6 toppadding\"> <label style=\"color:#FFF; text-transform:capitalize\">Name<span class=\"asterisk\">*</span></label> <input ng-model=\"inquiryObj.name\" pattern=\"[a-zA-Z][a-zA-Z ]+\" class=\"form-control\" id=\"{{name}}\" type=\"text\" value=\"{{name}}\"> </div> <div class=\"col-sm-6 toppadding\"> <label style=\"color:#FFF; text-transform:capitalize\">Phone Number<span class=\"asterisk\">*</span></label> <div class=\"inquireTelContainer\"> <input ng-model=\"inquiryObj.phone\" class=\"form-control\" id=\"{{inquireTel}}\" value=\"{{phone}}\" type=\"tel\" data-parsley-intphone=\"{{inquireTel}}\" pattern=\"^[0][1-9]\\d{9}$|^[1-9]\\d{9}$\" data-parsley-cnic required data-prefill=\"phone\"> </div> </div> <div class=\"col-sm-6 toppadding\"> <label style=\"color:#FFF; text-transform:capitalize\">Email<span class=\"asterisk\">*</span></label> <input ng-model=\"inquiryObj.email\" class=\"form-control\" id=\"{{inquireEmail}}\" type=\"email\" value=\"{{email}}\" data-parsley-trim-value=\"true\" required data-prefill=\"email\"> </div> <div class=\"col-sm-6 toppadding\"> <label style=\"color:#FFF; text-transform:capitalize\">No. of Travellers<span class=\"asterisk\">*</span></label> <div class=\"inquireTelContainer\"> <input ng-model=\"inquiryObj.noOfTravellers\" class=\"form-control\" id=\"{{inquireTel}}\" min=\"1\" type=\"number\"> <input id=\"{{inquireCountry}}\" type=\"hidden\" data-prefill=\"country\"> </div> </div> <div class=\"col-sm-6 toppadding\"> <label style=\"color:#FFF; text-transform:capitalize\">I Would Like To Go To<span class=\"asterisk\">*</span></label> <input ng-model=\"inquiryObj.destination\" pattern=\"^[a-zA-Z ]*$\" class=\"form-control\" type=\"text\" value=\"{{destination}}\"> </div> <div class=\"col-sm-6 toppadding\"> <label style=\"color:#FFF; text-transform:capitalize\" for=\"form-condition-10\">In the month of...</label> <select ng-model=\"inquiryObj.travelMonth\" ng-click=\"display5={display:'block'}\" id=\"form-condition-10\" name=\"form-condition-10\" class=\"required form-control\"> <option value=\"\">Travel Dates TBC</option> <option value=\"January\">January</option> <option value=\"February\">February</option> <option value=\"March\">March</option> <option value=\"April\">April</option> <option value=\"May\">May</option> <option value=\"June\">June</option> <option value=\"July\">July</option> <option value=\"August\">August</option> <option value=\"September\">September</option> <option value=\"October\">October</option> <option value=\"November\">November</option> <option value=\"December\">December</option> </select> </div> <div style=\"width:100%\" class=\"col-sm-12 toppadding\"> <label style=\"color:#FFF; text-transform:capitalize\">Tell us a little bit about what you're looking for ?<span class=\"asterisk\">*</span></label> <textarea required ng-model=\"inquiryObj.occasion\" style=\"max-width:100%; max-height:10%\" class=\"form-control\"></textarea> </div> <div style=\"text-transform:capitalize; padding-top:15%\" class=\"col-sm-12\"> <button type=\"submit\" style=\"margin:0px !important; width:100%; height:70px\" id=\"{{inquireSubmit}}\" class=\"button button-blue\">Submit Inquiry</button> </div> </form> </div> </div> </div> </section> <section class=\"bottommargin\" style=\"margin-top:5%\"> <div class=\"topmargin\"> <h2 class=\"instaText\"> On Instagram @ wanderwagon </h2> </div> <insta-photo-stream></insta-photo-stream> </section> <div class=\"modal fade\" style=\"margin-top:40%\" id=\"messageModal\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"messageModal\"> <div class=\"modal-dialog vertical-align-center\" role=\"document\"> <div class=\"modal-content\"> <div class=\"modal-header\"> <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Close\"><span aria-hidden=\"true\">&times;</span></button> <h4 class=\"modal-title\" id=\"messageModalLabel\">{{messageType}}</h4> </div> <div class=\"modal-body\"> <div class=\"row\"> <div style=\"padding:5%\" class=\"col-full\"> {{message}} </div> </div> </div> </div> </div> </div> <div class=\"modal fade\" id=\"homeFormModal\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"homeFormModal\"> <div class=\"modal-dialog\" role=\"document\"> <button style=\"color:#FFF; font-size:20px\" type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Close\"><span aria-hidden=\"true\">&times;</span></button> <img src=\"https://s3-ap-southeast-1.amazonaws.com/wanderwagon/images/popups/homepage.jpg\"> </div> </div> "
  );


  $templateCache.put('views/insta-photo-stream.html',
    " <div class=\"photo-roll--container\"> <div class=\"photo-roll\"> <img ng-repeat=\"item in instaData\" style=\"cursor:pointer\" ng-click=\"redirectToInstagram()\" style=\"margin:1%\" ng-src=\"{{item.imageUrl}}\" alt=\"Instafeed\"> </div> </div> "
  );


  $templateCache.put('views/login.html',
    "<section id=\"content\" style=\"background-color:#000;background-image: url('images/login-bg.jpg'); height:100vh\"> <!--background-size: cover; height:100vh;\n" +
    "\n" +
    "background-image: linear-gradient(to bottom,#654a86,#534292);\n" +
    "    background-color: #534292;--> <div class=\"container clearfix login-margin\"> <div class=\"center-block clearfix\" style=\"max-width: 550px;background:rgba(255,255,255,0.5);; padding: 50px; border-radius:1%\"> <div class=\"center\"> <p style=\"margin-bottom: 15px\"> <font color=\"white\" size=\"3\">Login with:</font> </p> <button class=\"button button-rounded si-facebook si-colored\" ng-click=\"authenticate('facebook')\"><i class=\"icon-facebook\"></i>Facebook</button> <span class=\"hidden-xs\"><font color=\"white\">or</font></span> <button class=\"button button-rounded si-google si-colored\" ng-click=\"authenticate('google')\"><i class=\"icon-google\"></i>Google</button> </div> <!--<v-accordion id=\"accordionA\" class=\"vAccordion--default\" control=\"accordionA\">\n" +
    "        <v-pane id=\"pane1\" expanded>\n" +
    "          <v-pane-header id=\"pane1-header\">\n" +
    "            <h3 class=\"acctitle\">\n" +
    "              <font color=\"white\"><i class=\"acc-closed icon-lock3\"></font></i><i class=\"acc-open icon-unlock\"></i>\n" +
    "                <font color=\"white\">Login to your Account</font>\n" +
    "            </h3>\n" +
    "          </v-pane-header>\n" +
    "\n" +
    "          <v-pane-content id=\"pane1-content\">\n" +
    "\n" +
    "            <form class=\"form-horizontal\" name=\"loginForm\" ng-submit=\"onLoginFormSubmit(loginForm)\">\n" +
    "              <div class=\"col_full\">\n" +
    "                <label for=\"loginEmail\"><font color=\"white\">Email</font></label>\n" +
    "                <input type=\"email\" class=\"form-control\" id=\"loginEmail\" name=\"loginEmail\" placeholder=\"Email\" ng-model=\"loginObj.email\"\n" +
    "                  required />\n" +
    "              </div>\n" +
    "              <div class=\"col_full\">\n" +
    "                <label for=\"loginPass\"> <font color=\"white\">Password</font></label>\n" +
    "                <input type=\"password\" class=\"form-control\" id=\"loginPass\" name=\"loginPass\" placeholder=\"Password\" ng-model=\"loginObj.password\"\n" +
    "                  required />\n" +
    "              </div>\n" +
    "              <div class=\"col_full nobottommargin\">\n" +
    "                <button type=\"submit\" class=\"button button-blue\"><font color=\"white\">Login</font></button>\n" +
    "                <a href=\"\" ng-click=\"showPasswordModal()\" class=\"fright\">\n" +
    "                  <font color=\"white\">Forgot Password?</font>\n" +
    "                </a>\n" +
    "              </div>\n" +
    "            </form>\n" +
    "\n" +
    "            <div class=\"line line-sm\"></div>\n" +
    "\n" +
    "            \n" +
    "          </v-pane-content>\n" +
    "        </v-pane>\n" +
    "\n" +
    "        <v-pane id=\"pane2\">\n" +
    "          <v-pane-header id=\"pane2-header\">\n" +
    "            <h3 class=\"acctitle\">\n" +
    "              <font color=\"white\"><i class=\"acc-closed icon-user4\"></font></i><i class=\"acc-open icon-ok-sign\"></i>\n" +
    "                <font color=\"white\">New Signup? Register for an Account</font>\n" +
    "            </h3>\n" +
    "          </v-pane-header>\n" +
    "\n" +
    "          <v-pane-content id=\"pane2-content\">\n" +
    "            <form name=\"signUpForm\" class=\"nobottommargin\" ng-submit=\"onSignUpFormSubmit(signUpForm)\">\n" +
    "              <div class=\"col_full\">\n" +
    "                <label for=\"register-form-name\"><font color=\"white\">Name:</font></label>\n" +
    "                <input type=\"text\" id=\"register-form-name\" name=\"register-form-name\" ng-model=\"signUpObj.name\" value=\"\" class=\"form-control\"\n" +
    "                  required/>\n" +
    "              </div>\n" +
    "\n" +
    "              <div class=\"col_full\">\n" +
    "                <label for=\"register-form-email\"><font color=\"white\">Email Address:</font></label>\n" +
    "                <input type=\"email\" id=\"register-form-email\" name=\"register-form-email\" ng-model=\"signUpObj.email\" value=\"\" class=\"form-control\"\n" +
    "                  required/>\n" +
    "              </div>\n" +
    "\n" +
    "              <div class=\"col_full\">\n" +
    "                <label for=\"register-form-phone\"><font color=\"white\">Phone:</font></label>\n" +
    "                <input type=\"text\" id=\"register-form-phone\" name=\"register-form-phone\" ng-model=\"signUpObj.phone\" value=\"\" class=\"form-control\"\n" +
    "                  required/>\n" +
    "              </div>\n" +
    "\n" +
    "              <div class=\"col_full\">\n" +
    "                <label for=\"register-form-password\"><font color=\"white\">Choose Password:</font></label>\n" +
    "                <input type=\"password\" id=\"register-form-password\" name=\"register-form-password\" ng-model=\"signUpObj.password\" value=\"\" class=\"form-control\"\n" +
    "                  required/>\n" +
    "              </div>\n" +
    "\n" +
    "              <div class=\"col_full\">\n" +
    "                <label for=\"register-form-repassword\"><font color=\"white\">Re-enter Password:</font></label>\n" +
    "                <input type=\"password\" id=\"register-form-repassword\" name=\"register-form-repassword\" ng-model=\"signUpObj.confirmPassword\"\n" +
    "                  value=\"\" class=\"form-control\" required/>\n" +
    "              </div>\n" +
    "\n" +
    "              <div class=\"col_full nobottommargin\">\n" +
    "                <button type=\"submit\" class=\"button button-blue\"><font color=\"white\">Sign Up</font></button>\n" +
    "              </div>\n" +
    "            </form>\n" +
    "          </v-pane-content>\n" +
    "        </v-pane>\n" +
    "\n" +
    "      </v-accordion>--> </div> </div> </section> <!-- #content end --> <div class=\"modal fade\" id=\"loginModal\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"loginModal\"> <div class=\"modal-dialog\" role=\"document\"> <div class=\"modal-content\"> <div class=\"modal-header\"> <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Close\"><span aria-hidden=\"true\">&times;</span></button> <h4 class=\"modal-title\" id=\"loginModallabel\">{{messageType}}</h4> </div> <div class=\"modal-body\"> <div class=\"row\"> <div style=\"padding:5%\" class=\"col-full\"> {{message}} </div> <!--<div class=\"col-md-6 col-sm-6 col-xs-6 text-right\">\n" +
    "            Its button\n" +
    "					</div>--> </div> </div> <!--<div class=\"modal-body\" ng-show=\"error\">\n" +
    "				<div class=\"row filter-remove text-center\">\n" +
    "					<p>Error</p>\n" +
    "				</div>\n" +
    "			</div>--> </div> </div> </div> <div class=\"modal fade\" id=\"passwordModal\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"passowrdModal\"> <div class=\"modal-dialog\" role=\"document\"> <div class=\"modal-content\"> <div class=\"modal-header\"> <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Close\"><span aria-hidden=\"true\">&times;</span></button> <h4 class=\"modal-title\" id=\"passowrdModallabel\">Forgot Password ?</h4> </div> <div class=\"modal-body\"> <div class=\"row\" style=\"padding:5%\"> <form ng-hide=\"emailSubmit\" name=\"emailForm\" class=\"nobottommargin\" ng-submit=\"onEmailFormSubmit(emailForm)\"> <div class=\"col_full\"> <label for=\"loginEmail\"><font color=\"white\">Email</font></label> <input type=\"email\" class=\"form-control\" id=\"loginEmail\" name=\"loginEmail\" placeholder=\"Email\" ng-model=\"emailObj.email\" required> </div> <div class=\"col_full nobottommargin\"> <button type=\"submit\" class=\"button button-blue\"><font color=\"white\">Submit</font></button> </div> </form> <div ng-show=\"emailSubmit\" class=\"modal-body\"> <div class=\"row\"> <div style=\"padding:5%\" class=\"col-full\"> {{message}} </div> <!--<div class=\"col-md-6 col-sm-6 col-xs-6 text-right\">\n" +
    "            Its button\n" +
    "					</div>--> </div> </div> <!--<div class=\"col-md-6 col-sm-6 col-xs-6 text-right\">\n" +
    "            Its button\n" +
    "					</div>--> </div> </div> <!--<div class=\"modal-body\" ng-show=\"error\">\n" +
    "				<div class=\"row filter-remove text-center\">\n" +
    "					<p>Error</p>\n" +
    "				</div>\n" +
    "			</div>--> </div> </div> </div> "
  );


  $templateCache.put('views/main.html',
    " <div class=\"jumbotron\"> <h1>'Allo, 'Allo!</h1> <p class=\"lead\"> <img src=\"images/yeoman.png\" alt=\"I'm Yeoman\"><br> Always a pleasure scaffolding your apps. </p> <p><a class=\"btn btn-lg btn-success\" ng-href=\"#/\">Splendid!<span class=\"glyphicon glyphicon-ok\"></span></a></p> </div> <div class=\"row marketing\"> <h4>HTML5 Boilerplate</h4> <p> HTML5 Boilerplate is a professional front-end template for building fast, robust, and adaptable web apps or sites. </p> <h4>Angular</h4> <p> AngularJS is a toolset for building the framework most suited to your application development. </p> <h4>Karma</h4> <p>Spectacular Test Runner for JavaScript.</p> </div> "
  );


  $templateCache.put('views/modal.html',
    "<div class=\"modal fade\"> <div class=\"modal-dialog\"> <div class=\"modal-content\"> <div class=\"modal-header\"> <button type=\"button\" class=\"close\" ng-click=\"close('Cancel')\" data-dismiss=\"modal\" aria-hidden=\"true\">&times;</button> <h4 class=\"modal-title\">Yes or No?</h4> </div> <div class=\"modal-body\"> <p>It's your call...</p> </div> <div class=\"modal-footer\"> <button type=\"button\" ng-click=\"close('No')\" class=\"btn btn-default\" data-dismiss=\"modal\">No</button> <button type=\"button\" ng-click=\"close('Yes')\" class=\"btn btn-primary\" data-dismiss=\"modal\">Yes</button> </div> </div> </div> </div> "
  );


  $templateCache.put('views/partner.html',
    " <p> This is the Parther Page</p>"
  );


  $templateCache.put('views/payment.html',
    "<section id=\"content\" style=\"background-color:#36353B; height:100vh\"> <div class=\"container clearfix login-margin\"> <div class=\"center-block clearfix\" style=\"max-width: 550px;background:rgba(255,255,255,0.5);margin-top:10%; padding: 50px; border-radius:1%\"> <div class=\"center\"> <button ng-if=\"!isPaymentDone\" class=\"button button-3d button-rounded button-blue\" ng-click=\"pay()\">Pay with Razorpay</button> <button ng-if=\"isPaymentDone\" class=\"button button-3d button-rounded button-blue\">Your Payment was successful!</button> </div> </div> </div> </section> <div class=\"modal fade\" id=\"paymentModal\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"paymentModal\"> <div class=\"modal-dialog\" role=\"document\"> <div class=\"modal-content\"> <div class=\"modal-header\"> <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Close\"><span aria-hidden=\"true\">&times;</span></button> <h4 class=\"modal-title\" id=\"paymentModallabel\">Payment</h4> </div> <div class=\"modal-body\"> <div class=\"center\"> <p style=\"margin-bottom: 15px\"> Your payment was successful ! </p> </div> </div> </div> </div> </div> "
  );


  $templateCache.put('views/plan-trip-form.html',
    "<section style=\"background:#36353B\" id=\"page-title\"> </section> <div class=\"container\"> <h1 style=\"padding:20px\" class=\"text-center\">PLAN YOUR TRIP</h1> <h3 style=\"padding:20px\" class=\"text-center\">UNDERSTANDING YOUR TRAVEL PREFERENCE</h3> <h3>MOST IMPORTANT *</h3> <form id=\"\" name=\"enquiryForm\" class=\"nobottommargin\" ng-submit=\"submitTravelEnquiryForm(enquiryForm)\"> <div style=\"padding:0px\" class=\"col-sm-6\"> <label style=\"text-transform:capitalize\">Your name<span class=\"asterisk\">*</span></label> <input ng-model=\"travelEnqObj.name\" class=\"form-control\" id=\"{{inquireFirstName}}\" type=\"text\" placeholder=\"*Required\" value=\"{{firstName}}\" data-parsley-trim-value=\"true\" required data-prefill=\"firstName\"> </div> <div class=\"col-sm-6\"> <label style=\"text-transform:capitalize\">Your email address<span class=\"asterisk\">*</span></label> <input ng-model=\"travelEnqObj.email\" class=\"form-control\" id=\"{{inquireEmail}}\" type=\"email\" value=\"{{email}}\" placeholder=\"*Required\" data-parsley-trim-value=\"true\" required data-prefill=\"email\"> </div> <div style=\"padding:10px 0 0 0\" class=\"col-sm-6\"> <label style=\"text-transform:capitalize\">Which country are you from ?<span class=\"asterisk\">*</span></label> <input ng-model=\"travelEnqObj.country\" class=\"form-control\" id=\"{{inquireFirstName}}\" type=\"text\" placeholder=\"*Required\" value=\"{{firstName}}\" data-parsley-trim-value=\"true\" required data-prefill=\"firstName\"> </div> <div style=\"padding-top:10px\" class=\"col-sm-6\"> <label style=\"text-transform:capitalize\">How many people are travelling ? <span class=\"asterisk\">*</span></label> <input ng-model=\"travelEnqObj.totalPerson\" class=\"form-control\" id=\"{{inquireFirstName}}\" type=\"number\" placeholder=\"*Required\" value=\"{{firstName}}\" data-parsley-trim-value=\"true\" required data-prefill=\"firstName\"> </div> <h3>GETTING TO KNOW YOU A LITTLE BETTER</h3> <div style=\"padding:0 0 0 0\" class=\"col-sm-6\"> <label style=\"text-transform:capitalize\" for=\"form-condition-10\">Tell us more about your travel companions</label> <select ng-model=\"travelEnqObj.travelCompanion\" class=\"form-control\"> <option>Mustard</option> <option>Ketchup</option> <option>Relish</option> </select> </div> <div class=\"col-sm-6\"> <label style=\"text-transform:capitalize\" for=\"form-condition-10\">What age group do you and your travel companions belong to ?</label> <select ng-model=\"travelEnqObj.ageGroup\" ng-click=\"display5={display:'block'}\" id=\"form-condition-10\" name=\"form-condition-10\" class=\"required form-control\"> <option value=\"\">0 Selected</option> <option value=\"1\">15 - 20</option> <option value=\"2\">20 - 25</option> <option value=\"3\">25 - 30</option> <option value=\"4\">30+</option> </select> </div> <div style=\"padding:10px 0 0 0\" class=\"col-sm-6\"> <label style=\"text-transform:capitalize\" for=\"form-condition-10\">How many days would you be travelling for ?</label> <select ng-model=\"travelEnqObj.tarvellingDays\" ng-click=\"display5={display:'block'}\" id=\"form-condition-10\" name=\"form-condition-10\" class=\"required form-control\"> <option value=\"\">0 Selected</option> <option value=\"1\">1</option> <option value=\"2\">2</option> <option value=\"3\">3</option> <option value=\"4\">4</option> <option value=\"5\">5</option> </select> </div> <div style=\"padding-top:10px\" class=\"col-sm-6\"> <label style=\"text-transform:capitalize\" for=\"form-condition-10\">Where did you hear about us ?</label> <select ng-model=\"travelEnqObj.infoSource\" ng-click=\"display5={display:'block'}\" id=\"form-condition-10\" name=\"form-condition-10\" class=\"required form-control\"> <option value=\"\">Select option</option> <option value=\"yes\">Yes</option> <option value=\"no\">No</option> </select> </div> <div style=\"padding:10px 0 0 0\" class=\"col-sm-6\"> <label style=\"text-transform:capitalize\" for=\"form-condition-10\">What kind of traveller do you think you are ?</label> <select ng-model=\"travelEnqObj.tarvellerType\" ng-click=\"display5={display:'block'}\" id=\"form-condition-10\" name=\"form-condition-10\" class=\"required form-control\"> <option value=\"\">Select One</option> <option value=\"1\"> 1</option> <option value=\"2\">2</option> <option value=\"3\">3</option> <option value=\"4\">4</option> <option value=\"5\">5</option> </select> </div> <div style=\"padding-top:10px\" class=\"col-sm-6\"> <label style=\"text-transform:capitalize\" for=\"form-condition-10\">Do you have exact dates ?</label> <input ng-model=\"travelEnqObj.exactDates\" class=\"form-control\" id=\"{{inquireFirstName}}\" type=\"text\" value=\"{{firstName}}\" data-parsley-trim-value=\"true\" data-prefill=\"firstName\"> </div> <div style=\"padding:10px 0 0 0\" class=\"col-sm-12\"> <label style=\"text-transform:capitalize\" for=\"form-condition-10\">Things you want to tell us ?</label> <textarea ng-model=\"travelEnqObj.message\" style=\"width:100%; height:205px\" class=\"form-control\" placeholder=\"Tell us a little bit about what you're looking for.\"></textarea> </div> <div style=\"padding:20px 0 20px 0\" class=\"col-sm-12\"> <button style=\"width:50%; height:70px; display:block; margin: 0 auto\" id=\"{{inquireSubmit}}\" class=\"button button-blue\">Submit Inquiry</button> </div> </form></div>  <div class=\"modal fade\" id=\"contactModal\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"contactModal\"> <div class=\"modal-dialog\" role=\"document\"> <div class=\"modal-content\"> <div class=\"modal-header\"> <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Close\"><span aria-hidden=\"true\">&times;</span></button> <h4 class=\"modal-title\" id=\"contactModallabel\">{{messageType}}</h4> </div> <div class=\"modal-body\"> <div class=\"row\"> <div style=\"padding:5%\" class=\"col-full\"> {{message}} </div> <!--<div class=\"col-md-6 col-sm-6 col-xs-6 text-right\">\n" +
    "            Its button\n" +
    "					</div>--> </div> </div> <!--<div class=\"modal-body\" ng-show=\"error\">\n" +
    "				<div class=\"row filter-remove text-center\">\n" +
    "					<p>Error</p>\n" +
    "				</div>\n" +
    "			</div>--> </div> </div> </div> "
  );


  $templateCache.put('views/plan-trip.html',
    "<div class=\"cover-page\" style=\"background-color:#36353B;background-image: url('https://s3-ap-southeast-1.amazonaws.com/wanderwagon/images/plan-trip/cover.jpg');background-attachment: fixed;\n" +
    "background-position: center;\n" +
    "background-repeat: no-repeat;\n" +
    "background-size: cover; height:100vh\"> <div class=\"container clearfix\"> </div> </div> <div class=\"mobile-cover-page\" style=\"background-color:#36353B;background: url('https://s3-ap-southeast-1.amazonaws.com/wanderwagon/images/mobile/plan_my_trip_cover.jpg') no-repeat center center fixed ;background-size: cover; height:100vh\"> <div class=\"container clearfix\"> </div> </div> <!-- Content\n" +
    "		============================================= --> <section id=\"content\"> <div class=\"content-wrap\"> <div class=\"container clearfix\"> <div style=\"float: none; display: block; margin-right: auto; margin-left: auto\" class=\"col_half nobottommargin\"> <form id=\"conditional-form\" name=\"tripForm\" class=\"nobottommargin\" ng-submit=\"submitTravelPlanForm(tripForm)\"> <input type=\"hidden\" name=\"csrfmiddlewaretoken\" value=\"bajfYtFDAH9kXmH4gfAHVQOPg4DvfBYZ\"> <div class=\"col_full\"> <label for=\"form-condition-1\">Where would you like to go?</label> <input pattern=\"^[a-zA-Z ]*$\" ng-keydown=\"display={display:'block'}\" ng-dblclick=\"display={display:'block'}\" ng-keypress=\"display={display:'block'}\" type=\"text\" class=\"form-control required\" id=\"form-condition-1\" name=\"form-condition-1\" ng-model=\"formObj.destination\" required> <!-- <a href=\"#\" class=\"button button-border button-rounded\"><i class=\"icon-gift\"></i>Button</a> --> </div> <div ng-style=\"display\" class=\"col_full\" id=\"form-condition-2-wrap\" style=\"display:none\"> <label for=\"form-condition-2\">Where would you like to start from?</label> <input pattern=\"^[a-zA-Z ]*$\" ng-keydown=\"display1={display:'block'}\" ng-dblclick=\"display1={display:'block'}\" ng-keypress=\"display1={display:'block'}\" type=\"text\" class=\"form-control required\" id=\"form-condition-2\" name=\"form-condition-2\" ng-model=\"formObj.departureCity\" required> </div> <div ng-style=\"display1\" class=\"input-daterange travel-date-group\" style=\"display:none\"> <div class=\"col_full\"> <label for=\"form-condition-3\">When would you like to go?</label> <p class=\"input-group\"> <input ng-model=\"formObj.departureTime\" ng-keydown=\"display2={display:'block'}\" ng-dblclick=\"display2={display:'block'}\" ng-click=\"display2={display:'block'}\" type=\"text\" class=\"form-control\" popup-placement=\"top\" show-button-bar=\"false\" uib-datepicker-popup=\"{{format}}\" ng-model=\"dt\" is-open=\"popup1.opened\" datepicker-options=\"dateOptions\" ng-required=\"true\" alt-input-formats=\"altInputFormats\" required> <span class=\"input-group-btn\"> <button type=\"button\" class=\"btn btn-default\" ng-touch=\"open1(); display2={display:'block'}\" ng-click=\"open1(); display2={display:'block'}\"><i class=\"glyphicon glyphicon-calendar\"></i></button> </span> </p> </div> </div> <div ng-style=\"display2\" class=\"col_full\" id=\"form-condition-4-wrap\" style=\"display:none\"> <label for=\"form-condition-4\">How long would you like to go for? (Number of Days)</label> <input required ng-model=\"formObj.duration\" min=\"1\" ng-keydown=\"display3={display:'block'}\" placeholder=\"Enter Duration\" ng-dblclick=\"display3={display:'block'}\" ng-keypress=\"display3={display:'block'}\" type=\"number\" class=\"form-control required\" id=\"form-condition-4\" name=\"form-condition-4\"> </div> <div ng-style=\"display3\" class=\"col_full\" id=\"form-condition-5-wrap\" style=\"display:none\"> <label for=\"form-condition-5\">How many wanderers would accompany you?</label> <input required ng-model=\"formObj.personCount\" min=\"0\" ng-keydown=\"display4={display:'block'}\" ng-dblclick=\"display4={display:'block'}\" ng-keypress=\"display4={display:'block'}\" type=\"number\" class=\"form-control required\" id=\"form-condition-5\" name=\"form-condition-5\"> </div> <div ng-style=\"display4\" class=\"col_full\" id=\"form-condition-10-wrap\" style=\"display:none\"> <label for=\"form-condition-10\">What's the budget of your trip? ( per head )</label> <select required ng-model=\"formObj.perPersonBudget\" ng-touch=\"display5={display:'block'}\" ng-click=\"display5={display:'block'}\" id=\"form-condition-10\" name=\"form-condition-10\" class=\"required form-control\"> <option value=\"\"> Select One </option> <option value=\"5K\">5K</option> <option value=\"5K to 10K\">5K to 10K</option> <option value=\"10K to 15K\">10K to 15K</option> <option value=\"15K to 20K\">15K to 20K</option> <option value=\"more than 20K\">more than 20K</option> </select> </div> <div ng-style=\"display5\" class=\"col_full\" id=\"form-condition-12-wrap\" style=\"display:none\"> <label for=\"form-condition-12\">What stage of planning do you find yourself in?</label> <select required ng-model=\"formObj.planningStage\" ng-touch=\"display6={display:'block'}\" ng-click=\"display6={display:'block'}\" id=\"form-condition-12\" name=\"form-condition-12\" class=\"required form-control\"> <option value=\"\"> Select One </option> <option value=\"Still dreaming...not sure I'm going to this trip\">DREAMING - I really want to but haven't planned anything yet</option> <option value=\"I know I am going somewhere, but not sure about the places\">PLANNING - I'm Going somewhere, Not sure where</option> <option value=\"I am definitely going\">BOOKING - I am ready for my next adventure.</option> </select> </div> <div ng-style=\"display6\" class=\"col_full\" id=\"form-condition-13-wrap\" style=\"display:none\"> <label for=\"form-condition-13\">What would you like to see and do ? ( or you can leave it to us )</label> <textarea ng-model=\"formObj.message\" ng-keydown=\"display7={display:'block'}\" ng-dblclick=\"display7={display:'block'}\" ng-keypress=\"display7={display:'block'}\" class=\"form-control required\" id=\"form-condition-13\" name=\"form-condition-13\" rows=\"5\" col=\"20\" placeholder=\"Message to us\"></textarea> </div> <div ng-style=\"display7\" class=\"col_full\" id=\"form-condition-16-wrap\" style=\"display:none\"> <label for=\"form-condition-16\">Phone No.</label> <input pattern=\"^[0][1-9]\\d{9}$|^[1-9]\\d{9}$\" required ng-model=\"formObj.phone\" ng-keydown=\"display10={display:'block'}\" ng-dblclick=\"display10={display:'block'}\" ng-keypress=\"display10={display:'block'}\" type=\"tel\" class=\"form-control required\" id=\"form-condition-16\" name=\"form-condition-16\" value=\"\"> </div> <div ng-style=\"display10\" class=\"col_full\" id=\"form-condition-submit\" style=\"display:none\"> <button class=\"button nomargin\" type=\"submit\">Plan My Trip</button> </div> </form> </div> </div> </div> </section> <!-- #content end --> <div class=\"modal fade\" id=\"tripModal\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"tripModal\"> <div class=\"modal-dialog\" role=\"document\"> <div class=\"modal-content\"> <div class=\"modal-header\"> <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Close\"><span aria-hidden=\"true\">&times;</span></button> <h4 class=\"modal-title\" id=\"tripModallabel\">{{messageType}}</h4> </div> <div class=\"modal-body\"> <div class=\"row\"> <div style=\"padding:5%\" class=\"col-full\"> {{message}} </div> </div> </div> </div> </div> </div> <div class=\"modal fade\" id=\"plantripModal\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"plantripModal\"> <div class=\"modal-dialog\" role=\"document\"> <button style=\"color:#FFF; font-size:20px\" type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Close\"><span aria-hidden=\"true\">&times;</span></button> <img src=\"https://s3-ap-southeast-1.amazonaws.com/wanderwagon/images/popups/plantrip.jpg\"> </div> </div> "
  );


  $templateCache.put('views/privacy-policy.html',
    "<section style=\"background:#36353B\" id=\"page-title\"> </section> <div class=\"container padding-t-30 padding-b-30\"> <br> <h1 class=\"font-24 sm-font-20\">Privacy Policy</h1> <b> We recognize that your privacy is very important and take it seriously. This Privacy Policy (“Privacy Policy”) describes the Company's policies and procedures on the collection, use and disclosure of your information when you use the Website or our Services. We will not use or share your information with anyone except as described in this Privacy Policy. Please read the following statement to learn about our information gathering and dissemination practices. Note: Our privacy policy is subject to change at any time without notice. To make sure you are aware of any changes, please review this policy periodically. <br><br></b> <ul class=\"normal_ul\"> <li><b>Collection of Personally Identifiable Information</b><br> We collect personally identifiable information (email address, name, phone number, etc.) from you when you set up a free account with wanderwagon.com. While you can browse some sections of our site without being a registered member, certain activities (such as placing an order) do require registration. We do use your contact information to send you offers based on your previous orders and your interests. </li> <li><b>Use of Demographic and Profile Data</b> We use personal information to provide the services you request. To the extent we use your personal information to market to you, we will provide you the ability to opt-out of such uses. We use your personal information to resolve disputes; troubleshoot problems; help promote a safe service; collect fees owed; measure consumer interest in our products and services, inform you about online and offline offers, products, services, and updates; customize your experience; detect and protect us against error, fraud and other criminal activity; enforce our terms and conditions; and as otherwise described to you at the time of collection. In our efforts to continually improve our product and service offerings, we collect and analyze demographic and profile data about our users' activity on our website. We identify and use your IP address to help diagnose problems with our server, and to administer our website. Your IP address is also used to help identify you and to gather broad demographic information. We will occasionally ask you to complete optional online surveys. These surveys may ask you for contact information and demographic information (like zip code, age, or income level). We use this data to tailor your experience at our site, providing you with content that we think you might be interested in and to display content according to your preferences. <br> <b>Cook:</b> A \"cookie\" is a small piece of information stored by a Web server on a Web browser so it can be later read back from that browser. Cookies are useful for enabling the browser to remember information specific to a given user. wanderwagon.com places both permanent and temporary cookies in your computer's hard drive. wanderwagon.com's cookies do not contain any of your personally identifiable information. </li> <li><b>Sharing of personal information</b> Wanderwagon ensures utmost privacy of the information you provide. However when you plan your trip via us we are bound to provide certain information to hotel, cabs, travel agency and other third parties to ensure necessary travel arrangements. The information may also be shared with our business partners and they may contact the customer but only to improve their overall experience. These include- travel insurance, insurance against loss of banking cards, wallet or other similar sensitive information etc.We may share personal information without other corporate entities and affiliates to: help detect and prevent identity theft, fraud and other potentially illegal acts; correlate related or multiple accounts to prevent abuse of our services; and to facilitate joint or co-branded services that you request where such services are provided by more than one corporate entity. Those entities and affiliates may not market to you as a result of such sharing unless you explicitly opt-in. The information may be used for statistical analysis to get general preferences and interests in certain areas by certain class of customers. This analysis may be used by other website, apps, or newspapers or magazines. </li> <li><b>Links to Other Sites</b> Our site links to other websites that may collect personally identifiable information about you. Wanderwagon.com is not responsible for the privacy practices or the content of those linked websites. </li> <li><b>Security Precautions</b> Our site has stringent security measures in place to protect the loss, misuse, and alteration of the information under our control. Whenever you change or access your account information, we offer the use of a secure server. Once your information is in our possession we adhere to strict security guidelines, protecting it against unauthorized access. </li> <li><b>Choice/Opt-Out</b> Wanderwagon.com provides all users with the opportunity to opt-out of receiving non-essential (promotional, marketing-related) communications from us on behalf of our partners, and from us in general, after setting up an account. To remove your contact information from all wanderwagon.com lists and newsletters, Please contact us at the email address below. </li> <li><b>Questions?</b> Questions regarding this statement should be directed to the following email address: support@wanderwagon.com , or If you believe any information that we are holding is incorrect or altered in past then write immediately to above to manage changes. </li> </ul> </div> "
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
    " <div class=\"center-block\" style=\"width:80%\"> <div> <h2 style=\"text-align:center;margin:2rem 0 2rem 0;letter-spacing:-0.45px;line-height:1;font-weight:300;font-size:3.8rem\"><br> {{detail.name}} <div style=\"display:block;height:2px;width:30px;background:#dc221a;margin-left:auto;margin-right:auto;margin-bottom:0;margin-top:15px\"> </div> </h2> </div> <div class=\"pull-left\" style=\"width:30%\"> <a href=\"images/blog3.jpg\"><img height=\"350px\" width=\"100%\" ng-src=\"{{detail.imageUrl}}\" alt=\"Standard Post with Image\"></a> </div> <div class=\"pull-right\" style=\"width:70%; padding-left:10px; text-align:left\"> <span ng-click=\"header1.isOpen=! header1.isOpen\" style=\"top:0; right:20%; position: absolute; cursor:pointer; font-size:3rem\" class=\"glyphicon glyphicon-remove-circle\"></span> <h4 style=\"line-height:1.2142857142857142;font-size:18px;font-weight:200;color:#2c3643\"> What is it.....</h4> <p>{{detail.description}} </p> <h4 style=\"line-height:1.2142857142857142;font-size:18px;font-weight:200;color:#2c3643\"> Overview</h4> <p>{{detail.overview}} </p> <h4 style=\"line-height:1.2142857142857142;font-size:18px;font-weight:200;color:#2c3643\"> How to reach</h4> <p>{{detail.howToReach}} </p> <div> <h4 class=\"pull-left\" style=\"line-height:1.2142857142857142;font-size:18px;font-weight:200;color:#2c3643\"> Timings - <span>{{detail.timings}}</span></h4> <h4 class=\"pull-right\" style=\"line-height:1.2142857142857142;font-size:18px;font-weight:200;color:#2c3643\"> Pricing - <span>{{detail.price}}</span></h4> <br><br><br><br> </div> <!--<center>\n" +
    "                    <span style=\"font-size:48px; padding-right:2%; \" class=\"icon-line2-arrow-left\"></span>\n" +
    "                    <span style=\"font-size:48px; padding-left:2%; \" class=\"icon-line2-arrow-right\"></span>\n" +
    "                  </center>--> </div> </div>"
  );


  $templateCache.put('views/testimonials.html',
    "<div class=\"cover-page\" style=\"background-color:#36353B;background-image: url('https://s3-ap-southeast-1.amazonaws.com/wanderwagon/images/testimonial/testimonial-cover.jpg');background-attachment: fixed;\n" +
    "background-position: center;\n" +
    "background-repeat: no-repeat;\n" +
    "background-size: cover; height:100vh\"> <div class=\"container clearfix\"> <div class=\"center-block\"> <h2 class=\"text-center\" style=\"font-size:48px;letter-spacing:0px;font-weight:600;color:#fff;margin-top:25%\" data-caption-animate=\"fadeInUp\"> You're making us BLUSH! </h2> <p style=\"font-size:3rem; font-style:italic; color:#fff\" class=\"text-center\"> See what people are saying about Wanderwagon. </p> </div> </div> </div> <div class=\"mobile-cover-page\" style=\"background-color:#36353B;background-image: url('https://s3-ap-southeast-1.amazonaws.com/wanderwagon/images/mobile/testimonial_cover.jpg');background-size: cover; height:100vh\"> <div class=\"container clearfix\"> <div class=\"center-block\"> <h2 class=\"text-center\" style=\"font-size:32px;letter-spacing:0px;font-weight:600;color:#fff;margin-top:40%\" data-caption-animate=\"fadeInUp\"> You're making us BLUSH! </h2> <p style=\"font-size:2rem; font-style:italic;color:#fff\" class=\"text-center\"> See what people are saying about Wanderwagon. </p> </div> </div> </div> <section> <div class=\"container\"> <div style=\"margin-top:3%\"> <h2 class=\"paul-title\"> Testimonials </h2> <div class=\"underline\" style=\"margin-bottom:5%\"> </div> </div> <div class=\"clearfix\" style=\"border:0px solid #EEE;padding:10px\"> <div class=\"blog-image-left\"> <a><img height=\"150\" width=\"150\" class=\"center-block img-circle\" src=\"https://s3-ap-southeast-1.amazonaws.com/wanderwagon/images/testimonial/liene_svarce.jpg\" alt=\"Standard Post with Image\"></a> <h4 class=\"text-center\" style=\"line-height:1.2142857142857142;margin-top:0;margin-right:0;margin-bottom:0;margin-left:0;font-size:18px;color:#2c3643\"> Liene Svarce </h4> <!-- <h4 class=\"text-center\" style=\"line-height:1.2142857142857142;margin-top:0;margin-right:0;margin-bottom:0;margin-left:0;font-size:18px;color:#2c3643;\">\n" +
    "            About</h4> --> <h4 class=\"text-center\" style=\"line-height:1.2142857142857142;margin-top:10px;margin-right:0;margin-bottom:0;margin-left:0;font-size:18px;color:#2c3643\"> <i class=\"icon-location\"></i>Latvia</h4> </div> <div class=\"blog-content-left\"> <div class=\"entry-title\"> <h3 class=\"common-title\"> Very helpful via e-mails, really quick to reply, and super friendly</h3> </div> <div class=\"common-font\" style=\"margin-top:50px\"> <p>I felt very looked after. I would highly recommend using Wanderwagon to book your travels- whatever you have in mind, they can do it! They helped me plan everything that I wanted to do – without feeling like I was on a strict itinerary. I explained that I was a solo female backpacker on a budget and they put together a great itinerary for me that was well within my budget. They were very helpful via e-mails, really quick to reply, and super friendly – I felt like I was just getting help from good friends! They took me out for meals, showed me great local spots, and just made me feel like I was one of their friends. I can’t say enough nice things about Wanderwagon. I would like to thank you again for these moments. Whenever I come back to India I will definitely remember you! </p> </div> </div> </div> <div class=\"clearfix\" style=\"border:0px solid #EEE;padding:10px; margin:20px 0\"> <div class=\"blog-image-right\"> <a><img height=\"150\" width=\"150\" class=\"center-block img-circle\" src=\"https://s3-ap-southeast-1.amazonaws.com/wanderwagon/images/testimonial/alok_tiwari+.jpg\" alt=\"Standard Post with Image\"></a> <h4 class=\"text-center\" style=\"line-height:1.2142857142857142;margin-top:0;margin-right:0;margin-bottom:0;margin-left:0;font-size:18px;color:#2c3643\"> Alok Tiwari</h4> <!-- <h4 class=\"text-center\" style=\"line-height:1.2142857142857142;margin-top:0;margin-right:0;margin-bottom:0;margin-left:0;font-size:18px;color:#2c3643;\">\n" +
    "            About</h4> --> <h4 class=\"text-center\" style=\"line-height:1.2142857142857142;margin-top:10px;margin-right:0;margin-bottom:0;margin-left:0;font-size:18px;color:#2c3643\"> <i class=\"icon-location\"></i>Gurugram</h4> </div> <div class=\"blog-content-right\"> <div class=\"entry-title\"> <h3 class=\"common-title\"> Organisers were friendly and obliging</h3> </div> <div class=\"common-font\" style=\"margin-top:50px\"> <p>Someone has rightly said that dreams are made to be followed and life is meant to be lived. And to live a life to its fullest what’s more startling than the adventurous road trips and that too for 5 days. It was the most fun and crazy trip I have ever taken. The road trip challenged my patience and how to be able to stay calm in every new situation. The organisers were so friendly and obliging that we all started living like a family. I feel so fortunate that I got a chance to be a part of this wonderful venture and would like to thank Wanderwagon to make this whole journey worth remembering. They all were so cooperative and fun loving. Have stories to tell not stuff to show. </p> </div> </div> </div> <div class=\"clearfix\" style=\"border:0px solid #EEE;padding:10px\"> <div class=\"blog-image-left\"> <a><img height=\"150\" width=\"150\" class=\"center-block img-circle\" src=\"https://s3-ap-southeast-1.amazonaws.com/wanderwagon/images/testimonial/shashank_yadav.jpg\" alt=\"Standard Post with Image\"></a> <h4 class=\"text-center\" style=\"line-height:1.2142857142857142;margin-top:0;margin-right:0;margin-bottom:0;margin-left:0;font-size:18px;color:#2c3643\"> Shashank Yadav </h4> <!-- <h4 class=\"text-center\" style=\"line-height:1.2142857142857142;margin-top:0;margin-right:0;margin-bottom:0;margin-left:0;font-size:18px;color:#2c3643;\">\n" +
    "            About</h4> --> <h4 class=\"text-center\" style=\"line-height:1.2142857142857142;margin-top:10px;margin-right:0;margin-bottom:0;margin-left:0;font-size:18px;color:#2c3643\"> <i class=\"icon-location\"></i>Mumbai</h4> </div> <div class=\"blog-content-left\"> <div class=\"entry-title\"> <h3 class=\"common-title\"> People with best travel plans. </h3> </div> <div class=\"common-font\" style=\"margin-top:50px\"> <p>A team of concerned people providing their customers with high satisfaction and with best travel plans. I planned a trip to Nainital and we were taken care of. They did not prove us wrong anywhere. I went to a number of places and I swear those days were the foremost part of my life. Each and every moment was worth living. </p> </div> </div> </div> <div class=\"clearfix\" style=\"border:0px solid #EEE;padding:10px; margin:20px 0\"> <div class=\"blog-image-right\"> <a><img height=\"150\" width=\"150\" class=\"center-block img-circle\" src=\"https://s3-ap-southeast-1.amazonaws.com/wanderwagon/images/testimonial/gulshan_gupta.jpg\" alt=\"Standard Post with Image\"></a> <h4 class=\"text-center\" style=\"line-height:1.2142857142857142;margin-top:0;margin-right:0;margin-bottom:0;margin-left:0;font-size:18px;color:#2c3643\"> Gulshan gupta </h4> <!-- <h4 class=\"text-center\" style=\"line-height:1.2142857142857142;margin-top:0;margin-right:0;margin-bottom:0;margin-left:0;font-size:18px;color:#2c3643;\">\n" +
    "            About</h4> --> <h4 class=\"text-center\" style=\"line-height:1.2142857142857142;margin-top:10px;margin-right:0;margin-bottom:0;margin-left:0;font-size:18px;color:#2c3643\"> <i class=\"icon-location\"></i>Auroville</h4> </div> <div class=\"blog-content-right\"> <div class=\"entry-title\"> <h3 class=\"common-title\"> Wanderwagon is for all the adventure enthusiasts </h3> </div> <div class=\"common-font\" style=\"margin-top:50px\"> <p>If you are the kind of person who would like to have some real life experiences rather than staying in some hotel and visiting the same cliche places then Wanderwagon is for you. I had the opportunity to attend the Rishikesh camp, and I absolutely loved it. The place was very beautiful and the camp area was neat. Although we stayed only for one day, we still were able to cover a lot of activities including- kayaking, flying fox, hike to a waterfall, night trek, bonfires in the night (with fireflies twinkling around). It was amazing, wish we had the time to stay longer. The best of all were the camp organizers, superb people- friendly, fun and adventurous. </p> </div> </div> </div> <div class=\"clearfix\" style=\"border:0px solid #EEE;padding:10px\"> <div class=\"blog-image-left\"> <a><img height=\"150\" width=\"150\" class=\"center-block img-circle\" src=\"https://s3-ap-southeast-1.amazonaws.com/wanderwagon/images/testimonial/sahil_trivedi.jpg\" alt=\"Standard Post with Image\"></a> <h4 class=\"text-center\" style=\"line-height:1.2142857142857142;margin-top:0;margin-right:0;margin-bottom:0;margin-left:0;font-size:18px;color:#2c3643\"> Sahil Trivedi </h4> <!-- <h4 class=\"text-center\" style=\"line-height:1.2142857142857142;margin-top:0;margin-right:0;margin-bottom:0;margin-left:0;font-size:18px;color:#2c3643;\">\n" +
    "            About</h4> --> <h4 class=\"text-center\" style=\"line-height:1.2142857142857142;margin-top:10px;margin-right:0;margin-bottom:0;margin-left:0;font-size:18px;color:#2c3643\"> <i class=\"icon-location\"></i>Bangalore</h4> </div> <div class=\"blog-content-left\"> <div class=\"entry-title\"> <h3 class=\"common-title\"> Trek would have been impossible without the travel plans provided by them </h3> </div> <div class=\"common-font\" style=\"margin-top:50px\"> <p>Recently we teamed up with Wanderwagon for the Spiti expedition. To make this plan successful, the kind of support, facility and hospitality given by Wanderwagon members is just amazing and I can't forget in my lifetime. Thanks to the team which has respect towards the local people. This trek would have been impossible without the travel plans provided by them. Looking forward to more and more such expedition with Wanderwagon. We just love you. </p> </div> </div> </div> <div class=\"clearfix\" style=\"border:0px solid #EEE;padding:10px; margin:20px 0\"> <div class=\"blog-image-right\"> <a><img height=\"150\" width=\"150\" class=\"center-block img-circle\" src=\"https://s3-ap-southeast-1.amazonaws.com/wanderwagon/images/testimonial/ayushi_khandelwal.jpg\" alt=\"Standard Post with Image\"></a> <h4 class=\"text-center\" style=\"line-height:1.2142857142857142;margin-top:0;margin-right:0;margin-bottom:0;margin-left:0;font-size:18px;color:#2c3643\"> Aayushi Khandelwal </h4> <!-- <h4 class=\"text-center\" style=\"line-height:1.2142857142857142;margin-top:0;margin-right:0;margin-bottom:0;margin-left:0;font-size:18px;color:#2c3643;\">\n" +
    "            About</h4> --> <h4 class=\"text-center\" style=\"line-height:1.2142857142857142;margin-top:10px;margin-right:0;margin-bottom:0;margin-left:0;font-size:18px;color:#2c3643\"> <i class=\"icon-location\"></i>New Delhi</h4> </div> <div class=\"blog-content-right\"> <div class=\"entry-title\"> <h3 class=\"common-title\"> Camping and hotel arrangements were very good. </h3> </div> <div class=\"common-font\" style=\"margin-top:50px\"> <p> These guys made our farewell trip to McLeodganj & Triund awesome.I really enjoyed trekking and camping at triund.Camping and hotel arrangements were very good.I can't forget the acoustic sounds @bonfire.We enjoyed a lot.Keep planning </p> </div> </div> </div> </div> </section> "
  );


  $templateCache.put('views/tnc.html',
    "<section style=\"background:#36353B\" id=\"page-title\"> </section> <div class=\"container padding-t-30 padding-b-30\"> <br> <h3 class=\"font-24 sm-font-20\">Terms &amp; Conditions</h3> <b>Welcome to www.wanderwagon.com(\"Website\"). The domain name www.wanderwagon.com is owned by Wanderwagon Private Limited an organization consolidated under the Companies Act, 1956 (hereinafter alluded to as \"wanderwagon\" or \"WW\"). The expression \"You\" alludes to the client or watcher of the Website. <br><br> Your utilization of the Website and services and tools are administered by the accompanying terms and conditions (\"Terms of Use\") as relevant to the Website including the pertinent strategies which are fused thus by method for reference. On the off chance that You execute on the Website, You should be liable to the strategies that are pertinent to the Website for such exchange. By minor use of the Website, You might be contracting with wanderwagon and these terms and conditions including the approaches constitute Your coupling commitments, with wanderwagon. The use of this site is liable to the accompanying terms of use: :<br><br></b> <ul class=\"normal_ul\"> <li>The content of the pages of this site is for your general data and utilize as it were. It is subject to change without notice. </li> <li>Your utilization of any data or materials on this site is altogether at your own particular hazard, for which we might not be at risk. It might be your own obligation to guarantee that any items, administrations or data accessible through this site meet your particular necessities. </li> <li>This website contains material which is owned by or licensed to us. This material includes, but is not limited to, the design, layout, look, appearance and graphics. Reproduction is prohibited other than in accordance with the copyright notice, which forms part of these terms and conditions.</li> <li>Unauthorised use of this website may give rise to a claim for damages and/or be a criminal offence.</li> <li>From time to time this website may also include links to other websites. These links are provided for your convenience to provide further information. They do not signify that we endorse the website(s). We have no responsibility for the content of the linked website(s).</li> <li>WW hereby expressly disclaims any implied warranties imputed by the laws of any jurisdiction or country other than those in India. WW considers itself and intends to be subject to the jurisdiction only of the courts of NCR of Delhi, India.</li> <li>You agree and acknowledge that WW will have the right of indemnification for any loss that may be caused to WW for any misuse of its website by You and WW will have all rights to approach any court of law for enforcement of such rights.</li> <li>WW or its affiliate partners will not be liable for any Visa rejections and Hotel cancellation policies would still stand as they are.</li> <li>Traveler are advised to check that passports are valid and eligible for international travel. Wanderwagon or affiliated parties will not be liable for passport being declared ineligible for entry/exit. <ul> <li>Validity of passports should be at least 6 months from date of return.</li> <li>Hand written passports will not be considered valid</li> <li>Passports must have Barcode</li> <li>Passports should not be mutilated or tampered</li> <li>Name on passport should match with name on other documents provided for visa</li> </ul> </li> <li>Force Majeure: None of the parties shall be responsible for, nor be deemed to be in default on account of, any failure to perform or delay in performance hereunder caused directly or indirectly by any fact beyond supplier’s reasonable control including, but not limited to, acts of God, war, terrorism, criminal acts of third parties, embargo, strikes or other labour disputes, work stoppages, riots, civil unrest, fires or acts of government (“Force Majeure”). The Parties shall use their best efforts to avoid, overcome and offset the effects of any cause or potential cause of an event of Force Majeure. Upon cessation of the cause of the Force Majeure, this Agreement shall again become fully operative. However, a Force Majeure event will not relieve either Party of the obligations accrued prior to the occurrence of the Force Majeure. In case Force Majeure event persists, either party can terminate this agreement by communicating in writing and losses, if any, would be decided at large. </li> </ul> <h5 class=\"font-24 sm-font-20\">Platform for Transaction and Communication</h5> <b> The Website is a platform that Users utilize to meet and interact with one another for their transactions. Wanderwagon is not and cannot be a party to or control in any manner any transaction between the Website’s Users. Henceforward: <br></b> <ul> <li>All commercial/contractual terms are offered by and agreed to between Buyers (travelers) and Sellers (travel agents) alone. The commercial/contractual terms include without limitation price, payment methods, payment terms, date, period and mode of delivery, warranties related to products and services and after sales services related to products and services. wanderwagon does not have any control or does not determine or advise or in any way involve itself in the offering or acceptance of such commercial/contractual terms between the Buyers and Sellers. </li> <li>You acknowledge that through this Website, wanderwagon merely provides a platform which enables you to have access to various travel services offered by the Sellers. It is agreed that the contract for sale of any of the products or services shall be a strictly bipartite contract between the Seller and the Buyer.</li> <li>Wanderwagon (including its directors, officers, employees, agents and their respective successors, heirs and assigns) shall not be or deemed to be responsible or liable for any direct, indirect, punitive, incidental, special, or consequential damages arising out of, or in any way connected with, your access to, display of or use of this Website or for any lack or deficiency of services provided by any person (including any airline, travel agent / tour operator, hotel, facility or similar agency) you shall engage or hire or appoint pursuant to or resulting from, the material available on this website.</li> <li>Wanderwagon does not make any representation or warranty as to the item-specifics (such as legal title, creditworthiness, identity, etc) of any of its Users. You are advised to independently verify the bona fides of any particular User that You choose to deal with on the Website and use Your best judgment in that behalf.</li> <li>Wanderwagon shall not be liable for delays or inabilities in performance or nonperformance in whole or in part of its obligations due to any causes that are not due to its acts or omissions and are beyond its reasonable control, such as acts of God, fire, strikes, embargo, acts of government, acts of terrorism or other similar causes, problems at airlines, rails, buses, hotels or transporters end. In such event, the user affected will be promptly given notice as the situation permits.</li> </ul> <h3>Get in touch with Us </h3> <b> Please send any questions or comments (including all inquiries unrelated to copyright infringement) regarding this Website to contact@wanderwagon.com. <br></b> <p>Wanderwagon Pvt. Ltd. D-169, 2nd Floor, Freedom Fighter Enclave, Neb Sarai , Saket, New Delhi - 110068, India Phone: 011 65434303 Email: contact@wanderwagon.com</p> </div>"
  );


  $templateCache.put('views/travel-plan-detail.html',
    "<div class=\"cover-page\" style=\"background-color:#36353B;background-image: url({{planDetail.imageUrl}});background-attachment: fixed;\n" +
    "background-position: center;\n" +
    "background-repeat: no-repeat;\n" +
    "background-size: cover; height:100vh\"> <div class=\"container clearfix\"> </div> </div> <div class=\"mobile-cover-page\" style=\"background-color:#36353B;background: url({{planDetail.mobileImageUrl}}) no-repeat center center fixed ;background-size:cover; height:100vh\"> <div class=\"container clearfix\"> </div> </div> <section class=\"container clearfix\" id=\"about\" style=\"margin-top:5%\"> <div> <h2 class=\"paul-title\"> About the plan <div class=\"underline\" style=\"margin-top:15px\"> </div> </h2> </div> <div class=\"center-block custom-para\"> <p hm-read-more hm-text=\"{{planDetail.description}}\" hm-limit=\"500\" hm-more-text=\"Read more\" hm-less-text=\"Read less\" hm-dots-class=\"dots\" hm-link-class=\"links\"></p> <br> </div> </section> <section class=\"container clearfix custom-height\" id=\"places\"> <h2 class=\"paul-title\"> Key Attractions <div class=\"underline\" style=\"margin-top:15px\"> </div> </h2> <ng-owl-carousel class=\"owl-theme\" owl-items=\"planDetail.keyAttractions\" owl-properties=\"sliderProperties\" owl-ready=\"ready($api)\"> <div class=\"paul-slide-new\" style=\"padding:2% 2% 2% 2%; max-height:550px\" data-ng-repeat=\"item in planDetail.keyAttractions\"> <img style=\"object-fit:fill; width:100%; height:100%\" class=\"owl-lazy\" data-src=\"{{item.imageUrl}}\"> </div> </ng-owl-carousel> </section> <section class=\"container pricing clearfix\" style=\"margin-top:3%\"> <h2 class=\"paul-title\"> Approx Price <div class=\"underline\" style=\"margin-top:15px\"> </div> </h2> <div class=\"col-md-3\"> <div class=\"pricing-box\"> <div class=\"pricing-title\"> <h3>Backpacker</h3> </div> <div class=\"pricing-price\"> <span class=\"price-unit\">&#8377;</span> {{planDetail.pricing.backPackerPrice}}<span class=\"price-tenure\">/head</span> </div> </div> </div> <div class=\"col-md-3\"> <div class=\"pricing-box\"> <div class=\"pricing-title\"> <h3>Budget</h3> </div> <div class=\"pricing-price\"> <span class=\"price-unit\">&#8377;</span>{{planDetail.pricing.budgetPrice}}<span class=\"price-tenure\">/head</span> </div> <!--<div class=\"pricing-features\">\n" +
    "									<ul>\n" +
    "										<li><strong>Full</strong> Access</li>\n" +
    "										<li><i class=\"icon-code\"></i> Source Files</li>\n" +
    "										<li><strong>100</strong> User Accounts</li>\n" +
    "										<li><strong>1 Year</strong> License</li>\n" +
    "										<li>Phone &amp; Email Support</li>\n" +
    "									</ul>\n" +
    "								</div>--> </div> </div> <div class=\"col-md-3\"> <div class=\"pricing-box\"> <div class=\"pricing-title\"> <h3>Comfort</h3> </div> <div class=\"pricing-price\"> <span class=\"price-unit\">&#8377;</span>{{planDetail.pricing.comfortPrice}}<span class=\"price-tenure\">/head</span> </div> </div> </div> <div class=\"col-md-3\"> <div class=\"pricing-box\"> <div class=\"pricing-title\"> <h3>Luxury</h3> </div> <div class=\"pricing-price\"> <span class=\"price-unit\">&#8377;</span>{{planDetail.pricing.luxuryPrice}}<span class=\"price-tenure\">/head</span> </div> </div> </div> </section> <section> <div> <h2 style=\"text-align:center;margin:6rem 0 0rem 0;letter-spacing:-0.45px;line-height:1;font-weight:100;font-size:3.8rem\"> Itinerary <div class=\"underline\" style=\"margin-top:2%\"> </div> </h2> </div> <div class=\"center-block custom-container\"> <flip-book data=\"itineraries\"></flip-book> </div> </section> <section> <div> <h2 style=\"text-align:center;margin:6rem 0 8rem 0;letter-spacing:-0.45px;line-height:1;font-weight:100;font-size:3.8rem\"> Travel Tips <div class=\"underline\" style=\"margin-top:2%\"> </div> </h2> </div> <ul style=\"padding-left:5%\"> <li style=\"padding:1%\" class=\"common-font\" ng-repeat=\"item in planDetail.tips\" type=\"square\">{{item}}</li> </ul> <div ui-sref=\"plan-trip\" class=\"center-block\" style=\"width:60%; cursor:pointer; padding:10%\"> <a class=\"button button-3d button-rounded button-blue loved-it-button\"> Plan My Trip!</a> </div> </section> "
  );


  $templateCache.put('views/travel-plan.html',
    "<div class=\"cover-page\" style=\"background-color:#36353B;background-image: url('https://s3-ap-southeast-1.amazonaws.com/wanderwagon/images/travelplans/cover.jpg');background-attachment: fixed;\n" +
    "background-position: center;\n" +
    "background-repeat: no-repeat;\n" +
    "background-size: cover; height:100vh\"> <div class=\"container clearfix\"> </div> </div> <div class=\"mobile-cover-page\" style=\"background-color:#36353B;background: url('https://s3-ap-southeast-1.amazonaws.com/wanderwagon/images/mobile/travel_plan_cover.jpg') no-repeat center center fixed ;background-size:cover; height:100vh\"> <div class=\"container clearfix\"> </div> </div> <section id=\"travel\" style=\"margin-top:5%\" class=\"custom-padding\"> <h2 class=\"paul-title\"> Travel Inspiration </h2> <p style=\"font-size:2rem\" class=\"text-center\"> Your choices, Your friends, Your travel plans </p><div class=\"underline\" style=\"margin-top:15px\"> </div> <p></p> <ng-owl-carousel class=\"owl-theme\" owl-items=\"sliderData\" owl-properties=\"properties\" owl-ready=\"ready($api)\"> <div class=\"paul-slide\" style=\"padding:2% 0 2% 0%\" data-ng-repeat=\"item in sliderData | orderBy:'title'\"> <img ng-click=\"openOrCloseAccordion(item.id)\" style=\"object-fit:cover; width:100%; height:100%\" class=\"owl-lazy\" data-src=\"{{item.imageUrl}}\"> </div> </ng-owl-carousel> <div id=\"accordion\" class=\"clearfix\"> <uib-accordion> <uib-accordion-group is-open=\"openAccordion\"> <div ng-click=\"closeAccordion()\" style=\"cursor:pointer; font-size:3rem; margin-left:95%\" class=\"glyphicon glyphicon-remove-circle\"></div> <!-- <ng-owl-carousel class=\"owl-theme\" owl-items=\"travelPlanData\" owl-properties=\"nestedCarouselproperties\" owl-ready=\"ready($api)\">\n" +
    "          <div class=\"paul-slide-new\" style=\"padding:2% 0 2% 0\" data-ng-repeat=\"item in travelPlanData\">\n" +
    "            <img ui-sref=\"travel-plan.detail({id: item.id})\" style=\"object-fit:cover; width:100%; height:100%;\" class=\"owl-lazy\" data-src=\"{{item.imageUrl}}\">\n" +
    "          </div>\n" +
    "\n" +
    "        </ng-owl-carousel> --> <div class=\"row row-centered\"> <div style=\"margin-bottom:2%\" ng-repeat=\"item in travelPlanData\" class=\"col-sm-4 col-centered col-fixed\"> <img ui-sref=\"travel-plan.detail({id: item.id})\" class=\"img-responsive\" style=\"cursor:pointer; object-fit:cover; height:300px; display: block;\n" +
    "              position: relative;\n" +
    "              -webkit-transition: all 0.3s;\n" +
    "              transition: all 0.3s;\n" +
    "              margin: 0 auto\" src=\"{{item.imageUrl}}\"> </div> </div> </uib-accordion-group> </uib-accordion> </div> </section> <section id=\"articles\" class=\"custom-padding\" style=\"margin-bottom:5%\"> <div class=\"topmargin\"> <h2 ui-sref=\"blog.list\" style=\"cursor:pointer\" class=\"paul-title\"> The Guide </h2> <p style=\"font-size:2rem\" class=\"text-center\"> Two cents on the journeys ahead </p><div class=\"underline\"> </div> <p></p> </div> <div style=\"overflow:hidden; margin-bottom:2%\"> <div style=\"cursor:pointer; height:400px\" ui-sref=\"blog.detail({postId: blog[0].id})\" class=\"image blog-image-left\"> <picture> <!--<source media=\"(min-width: 1280px)\" srcset=\"https://www.roughguides.com/wp-content/uploads/2016/04/pier-440339-660x420.jpg 1280w\">\n" +
    "        <source media=\"(min-width: 960px)\" srcset=\"https://www.roughguides.com/wp-content/uploads/2016/04/pier-440339-660x420.jpg 960w\">\n" +
    "        <source media=\"(min-width: 640px)\" srcset=\"https://www.roughguides.com/wp-content/uploads/2016/04/pier-440339-660x420.jpg 640w\">--> <img style=\"height:400px\" ng-src=\"{{blog[0].imageUrl}}\" alt=\"{{blog[0].title}}\"> </picture> </div> <div class=\"text blog-content-left\" style=\"height:auto;margin:0; padding:0 0 0 10px\"> <h3 style=\"cursor:pointer\" ui-sref=\"blog.detail({postId: blog[0].id})\" class=\"blog-title\"> {{blog[0].title}}</h3> <div class=\"blog-content\"> <p style=\"margin-bottom:0\">{{blog[0].description}}... </p> <span class=\"icon-calendar3 toppadding\"><b> {{blog[0].date | date : 'dd-MM-yyyy'}} • {{blog[0].author}} </b></span> </div> </div> </div> <div style=\"overflow:hidden\"> <div style=\"cursor:pointer; height:400px\" ui-sref=\"blog.detail({postId: blog[1].id})\" class=\"image blog-image-right\"> <picture> <!--<source media=\"(min-width: 1280px)\" srcset=\"https://www.roughguides.com/wp-content/uploads/2016/04/pier-440339-660x420.jpg 1280w\">\n" +
    "        <source media=\"(min-width: 960px)\" srcset=\"https://www.roughguides.com/wp-content/uploads/2016/04/pier-440339-660x420.jpg 960w\">\n" +
    "        <source media=\"(min-width: 640px)\" srcset=\"https://www.roughguides.com/wp-content/uploads/2016/04/pier-440339-660x420.jpg 640w\">--> <img style=\"height:400px\" ng-src=\"{{blog[1].imageUrl}}\" alt=\"{{blog[1].title}}\"> </picture> </div> <div class=\"text blog-content-right\"> <h3 style=\"cursor:pointer\" ui-sref=\"blog.detail({postId: blog[1].id})\" class=\"blog-title\"> {{blog[1].title}}</h3> <div class=\"blog-content\"> <p style=\"margin-bottom:0\">{{blog[1].description}}... </p> <span class=\"icon-calendar3 toppadding\"> <b> {{blog[1].date | date : 'dd-MM-yyyy'}} • {{blog[1].author}} </b></span> </div> </div> </div> </section> "
  );

}]);
